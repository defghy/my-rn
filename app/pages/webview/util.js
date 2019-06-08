export const urlParams = (testUrl) => {
  const res = {}
  function str2query (url) {
    if (url.indexOf('?') > -1) {
      let str = url.substr(url.indexOf('?') + 1)
      if (str.indexOf('&') !== -1) {
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          res[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
      } else {
        res[str.split('=')[0]] = decodeURIComponent(str.split('=')[1])
      }
    }
  }
  let urls = testUrl.split('#')
  urls[0] && str2query(urls[0])
  urls[1] && str2query(urls[1])
  return res
}

export const query2str = (params = {}) => {
  let res = Object.keys(params).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  })

  return res.join('&')
}

// link追加参数
export const urlAppendParams = (link, params) => {
  link = link || '';

  let [href, hash] = link && link.split('#')
  let path = href && href.split('?')[0]
  // 合并参数
  let search = Object.assign({}, urlParams(href), params)
  search = query2str(search)
  search = search ? '?' + search : ''
  hash = hash ? '#' + hash : ''
  return path + search + hash
}