export function chunk<T extends any>(arr: T[], chunk = 10): T[][] {
  const chunked = []
  for (let i = 0; i < arr.length; i += chunk) {
    chunked.push(arr.slice(i, i + chunk))
  }

  return chunked
}
