export function useArrayLimit<T>(count: number, _arr?: T[]) {
  return _arr ? _arr.filter((_, key) => key <= count - 1) : []
}
