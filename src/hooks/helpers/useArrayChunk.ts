import { chunk } from '../../helpers/chunk'

export function useArrayChunk<T extends Array<any>>(
  arr: T,
  chunkItems: number
): T[] {
  // @ts-ignore
  return chunk(arr, chunkItems)
}
