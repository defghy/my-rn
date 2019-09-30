import { getType, getHeaders, readBlobAsText, getSize, getDiffTime } from './util';
import { uid } from '../../lib/util';

let reqs = [];
let comp = null;

export const parseUrl = (link) => {
  if (!link) {
    return {};
  }
  let [ protocal, loc ] = link && link.split('//');
  let urlUnits = loc.split('/');
  let domain = urlUnits[0];
  let url = urlUnits.slice(1).join('/');
  let [href, hash] = url && url.split('#');
  let [pathname, search] = href && href.split('?');
  const pathanmes = pathname.split('/');
  return {
    protocal,
    domain,
    lastPath: pathanmes[pathanmes.length - 1],
    pathname,
    hash,
    search,
    href: `${protocal}//${domain}/${pathname}`,
  };
};

// XMLHttpRequest
const XMLHttpRequestProxy = {
  open(method, url) {
    const xhr = this;
    xhr.rnRequest = {
      uid: uid(),
      method,
      url,
      urlObj: parseUrl(url),
    };

    const update = function(req) {
      Object.assign(xhr.rnRequest, req);
      if (comp) {
        comp.freshReq();
      }
    };

    const handlers = {
      2: function() {
        const type = getType(xhr.getResponseHeader('Content-Type'));
        update({
          type: type.type,
          subType: type.subType,
          size: getSize(xhr, true),
          time: new Date().getTime(),
          resHeaders: getHeaders(xhr),
          reqHeaders: (xhr.rnRequest && xhr.rnRequest._headers) || {}
        });
      },
      4: function() {
        const resType = xhr.responseType
        let resTxt = ''

        const updateReq = () => {
          const diff = new Date().getTime() - xhr.rnRequest.startTime;

          let formatResTxt = resTxt;
          if (resTxt.startsWith('{')) {
            try {
              formatResTxt = JSON.stringify(JSON.parse(resTxt));
            } catch (e) {}
          }

          update({
            status: xhr.status,
            done: true,
            size: getSize(xhr, false),
            time: getDiffTime(diff),
            resTxt: formatResTxt,
          });
        };

        const type = getType(xhr.getResponseHeader('Content-Type'))
        if (
          resType === 'blob' &&
          (type.type === 'text' ||
            type.subType === 'javascript' ||
            type.subType === 'json')
        ) {
          readBlobAsText(xhr.response, (err, result) => {
            if (err) {}
            if (result) {
              resTxt = result;
            }
            updateReq();
          });
        } else {
          if (resType === '' || resType === 'text') {
            resTxt = xhr.responseText;
          }
          if (resType === 'json') {
            resTxt = JSON.stringify(xhr.response);
          }

          updateReq();
        }
      },
      noop: function() {},
    };

    xhr.addEventListener('readystatechange', function() {
      const handler = handlers[xhr.readyState] || handlers.noop;
      handler();
    });

  },
  send(data) {
    const xhr = this;
    Object.assign(xhr.rnRequest, {
      data: typeof data === 'string'? data: '',
      startTime: new Date().getTime()
    })
    if (comp) {
      comp.addReq(xhr)
    } else {
      reqs.push(xhr)
    }
  },
  setRequestHeader() {
    const req = this.rnRequest
    if (!req._headers) {
      req._headers = {}
    }
    const key = arguments[0];
    const val = arguments[1];
    if (key && val) {
      req._headers[key] = val;
    }
  },
};
if (global.USE_DEBUG) {
  const xhrproto = XMLHttpRequest.prototype;
  Object.keys(XMLHttpRequestProxy).forEach(name => {
    let origin = xhrproto[name] || function() {};

    xhrproto[name] = function (...args) {
      XMLHttpRequestProxy[name].apply(this, args);

      // 原始调用
      origin.apply(this, args);
    };
  });
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
  reqs,
};
