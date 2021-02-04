export function truncate(str?: string, length: number = 10) {
  if (!str || str === '') return str
  if (str.length <= length) {
    return str
  }
  return str.slice(0, length) + '...'
}
