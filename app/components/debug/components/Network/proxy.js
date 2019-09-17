import { getType, getHeaders, readBlobAsText } from './util'
import { uid } from '../../lib/util'

let reqs = [];
let comp = null;

// XMLHttpRequest
const XMLHttpRequestProxy = {
  open(method, url) {
    const xhr = this
    xhr.rnRequest = {
      uid: uid(),
      method,
      url
    }

    const handlers = {
      2: function() {
        const type = getType(xhr.getResponseHeader('Content-Type'))
        Object.assign(xhr.rnRequest, {
          type: type.type,
          subType: type.subType,
          size: xhr.getResponseHeader('Content-Length'),
          time: new Date().getTime(),
          resHeaders: getHeaders(xhr),
          reqHeaders: (xhr.erudaRequest && xhr.erudaRequest._headers) || null
        });
      },
      4: function() {
        const resType = xhr.responseType
        let resTxt = ''

        const update = () => {
          Object.assign(xhr.rnRequest, {
            status: xhr.status,
            done: true,
            size: xhr.getResponseHeader('Content-Length'),
            time: new Date().getTime(),
            resTxt
          });
        }

        const type = getType(xhr.getResponseHeader('Content-Type'))
        if (
          resType === 'blob' &&
          (type.type === 'text' ||
            type.subType === 'javascript' ||
            type.subType === 'json')
        ) {
          readBlobAsText(xhr.response, (err, result) => {
            if (result) resTxt = result
            update()
          })
        } else {
          if (resType === '' || resType === 'text') resTxt = xhr.responseText
          if (resType === 'json') resTxt = JSON.stringify(xhr.response)

          update()
        }
      },
      noop: function() {}
    };

    xhr.addEventListener('readystatechange', function() {
      const handler = handlers[xhr.readyState] || handlers.noop
      handler();
    })

  },
  send(data) {
    const xhr = this;
    Object.assign(xhr.rnRequest, {
      data: typeof data === 'string'? data: ''
    })
    if (comp) {
      comp.addReq(xhr)
    }
    reqs.push(xhr)
  },
  setRequestHeader() {
    const req = this.rnRequest
    if (!req._headers) {
      req._headers = {}
    }
    const key = arguments[0]
    const val = arguments[1]
    if (key && val) {
      req._headers[key] = val
    }
  }
};
if (global.USE_DEBUG) {
  const xhrproto = XMLHttpRequest.prototype;
  Object.keys(XMLHttpRequestProxy).forEach(name => {
    let origin = xhrproto[name] || function() {};

    xhrproto[name] = function (...args) {
      XMLHttpRequestProxy[name].apply(this, args);

      // 原始调用
      origin.apply(this, args);
    }
  })
}

export const setProxyData = (data) => {
  if (data.hasOwnProperty('comp')) {
    comp = data.comp;
  }
  if (data.hasOwnProperty('reqs')) {
    comp = data.reqs;
  }
};
export {
  reqs
};
