export function getType(contentType) {
  if (!contentType) return 'unknown'

  const type = contentType.split(';')[0].split('/')

  return {
    type: type[0],
    subType: type[type.length - 1]
  }
}

export function getDiffTime(millSeconds) {
  if (millSeconds > 1000 * 60 ) {
    return (millSeconds/ (1000 * 60)).toFixed(1) + 'm';
  }
  if (millSeconds > 1000 ) {
    return (millSeconds/ (1000)).toFixed(1) + 's';
  }
  return millSeconds + 'ms'
}

export function getHeaders(xhr) {
  const raw = xhr.getAllResponseHeaders(),
    lines = raw.split('\n')

  const ret = {}

  lines.forEach(line => {
    line = line.trim(line)

    if (line === '') return

    const [key, val] = line.split(':', 2)

    ret[key] = (val || '').trim()
  })

  return ret
}

export function readBlobAsText(blob, callback) {
  const reader = new FileReader()
  reader.onload = () => {
    callback(null, reader.result)
  }
  reader.onerror = err => {
    callback(err)
  }
  reader.readAsText(blob)
}

export function getSize(xhr, headersOnly) {
  let size = 0

  function lenToUtf8Bytes(str) {
    let m = encodeURIComponent(str).match(/%[89ABab]/g)

    return str.length + (m ? m.length : 0)
  }

  function fileSize(bytes) {
      var suffixList = ['', 'K', 'M', 'G', 'T'];
      if (bytes <= 0) return '0';
      var suffixIdx = Math.floor(Math.log(bytes) / Math.log(1024)),
          val = bytes / Math.pow(2, suffixIdx * 10);
      return +val.toFixed(1) + suffixList[suffixIdx];
  }

  function getStrSize() {
    if (!headersOnly) {
      const resType = xhr.responseType
      let resTxt = ''

      if (resType === '' || resType === 'text') resTxt = xhr.responseText
      if (resTxt) size = lenToUtf8Bytes(resTxt)
    }
  }

  if (xhr.getResponseHeader('Content-Length')) {
    size = +xhr.getResponseHeader('Content-Length')
  } else {
    getStrSize()
  }

  if (size === 0) getStrSize()

  return `${fileSize(size)}B`
}