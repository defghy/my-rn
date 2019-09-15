import beautify from 'js-beautify'
import getAbstract from '../../lib/getAbstract';
import { escape } from '../../lib/util';

const stringify = function (obj) {
  let res;
  try {
    res = JSON.stringify(obj);
  } catch (e) {
    res = Object.keys(obj).map(key => {
      let val = obj[key];
      return `${key}: ${val ? val.toString() : val + ''}`;
    }).join(', ');
    res = `{ ${res} }`;
  }

  return res;
};

function formatFn(val) {
  return `<pre>${beautify.js(val.toString())}</pre>`
}

function formatObj(val) {
  return {
    msg: `Object ${getAbstract(val)}`,
    detail: stringify(val)
  }
}

function formatArr(val) {
  return {
    msg: `Array(${val.length}) ${getAbstract(val)}`,
    detail: stringify(val)
  }
}

function formatStr(val) {
  let res = val;
  res = val.replace('%s', ' ');
  res = escape(val);
  res = res.toString().split('\n').join('<br />')
  return res
}

function formatErr(err) {
  let stackStr = escape(err.stack || '');
  let lines = stackStr ? stackStr.split('\n') : [];
  const msg = `<div style="color: #f44336">${err.message || lines[0]}<div/>`

  const stack = `<div style="color: #f44336">${lines
    .slice(1)
    .join('<br/>')}</div>`

  return `${msg} ${stack}`;
}

const formatHandlers = {
  '[object Function]': formatFn,
  '[object Object]': formatObj,
  '[object Array]': formatArr,
  '[object Undefined]': () => 'undefined',
  '[object Null]': () => 'null',
  '[object String]': formatStr,
  '[object Error]': formatErr
};
function formatMsg(args, { htmlForEl = true } = {}) {

  const result = []


  args.forEach((val, i) => {
    const type = Object.prototype.toString.call(val);
    const handler = formatHandlers[type] || formatHandlers['[object String]'];
    const res = handler(val);
    result[i] = typeof res === 'object'?
      res :  { msg: res, detail: '' }
  });

  return {
    msg: result.map(res => res.msg).join(' '),
    detail: result.filter(res => res.detail).map(res => res.detail).join('<br />'),
  }

}

// 信息格式化 =》 html字符串
export const formatConsole = function(msgItem) {
  const { type, args } = msgItem

  let msg = '';

  switch (type) {
    case 'log':
      msg = formatMsg(args)
      break
    case 'info':
      msg = formatMsg(args)
      break
    case 'warn':
      msg = formatMsg(args)
      break
    case 'error':
      msg = formatMsg(args)
      break
  }

  return msg
}