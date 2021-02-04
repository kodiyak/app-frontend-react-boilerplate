export function usePercent(current: any = 0, total: any = 0) {
  return (100 * Number(current)) / Number(total)
}
