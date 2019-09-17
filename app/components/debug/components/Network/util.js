export function getType(contentType) {
  if (!contentType) return 'unknown'

  const type = contentType.split(';')[0].split('/')

  return {
    type: type[0],
    //subType: last(type)
  }
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