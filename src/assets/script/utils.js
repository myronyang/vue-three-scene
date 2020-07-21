export const generateUUID = () => {
  for (var a = [], b = 0; 256 > b; b++)a[b] = (16 > b ? '0' : '') + b.toString(16)
  return function () {
    const b = 4294967295 * Math.random() | 0,
      d = 4294967295 * Math.random() | 0,
      e = 4294967295 * Math.random() | 0,
      f = 4294967295 * Math.random() | 0
    return (a[b & 255] + a[b >> 8 & 255] + a[b >> 16 & 255] + a[b >> 24 & 255] + '-' + a[d & 255] + a[d >> 8 & 255] + '-' + a[d >> 16 & 15 | 64] + a[d >> 24 & 255] + '-' + a[e & 63 | 128] + a[e >> 8 & 255] + '-' + a[e >> 16 & 255] + a[e >> 24 & 255] + a[f & 255] + a[f >> 8 & 255] + a[f >> 16 & 255] + a[f >> 24 & 255]).toUpperCase()
  }()
}

export const deepClone = obj => {
  let result = obj
  if (typeof obj === 'object' && obj !== null) {
    result = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    for (let prop in obj) {
      result[prop] = deepClone(obj[prop])
    }
  }
  return result
}

export const extname = filename => {
  if (!filename || typeof filename != 'string') {
    return false
  }
  const a = filename.split('').reverse().join('');
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('');
  return b
}