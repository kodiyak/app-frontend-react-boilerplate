import filesize from 'file-size'

export function useFilesize(size: number | string, unit: App.SizeFormat = 'MB') {
  return filesize(Number(size), {
    fixed: 0,
  }).to(unit as any)
}
