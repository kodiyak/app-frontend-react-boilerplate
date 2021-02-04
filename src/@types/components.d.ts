namespace App {
  namespace Components {
    interface List<T> {
      data: T[]
      revalidate: () => Promise<boolean>
      isValidating: data.isValidating
      error: data.error
      mutate: data.mutate
    }
  }
}
