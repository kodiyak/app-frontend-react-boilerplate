namespace App {
  namespace Helpers {
    type MapKeysToType<T> = T extends Array<any> ? keyof T[0] : keyof T
    type QueryKeyValue<T, V> = {
      [key in T]?: V
    }
    type StrictValues = string | number | boolean | Date
  }

  interface QueryString<
    T extends any = any,
    P extends string | number | symbol = string | number | symbol,
    Types = Helpers.MapKeysToType<T>
  > {
    fields: (Types | '*')[]
    limit?: number
    offset?: number
    page?: number
    perPage?: number
    first?: boolean
    last?: boolean
    includes?: {
      // @ts-ignore
      [K in P]?: QueryString<T[K], keyof T[K] | '*'> | QueryString
    }
    eq?: {
      [A in Types]?: T[A]
    }
    sort?: Helpers.QueryKeyValue<Types, 'asc' | 'desc'>
    like?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    lt?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    gt?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    lte?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    gte?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    startsWith?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    endsWith?: Helpers.QueryKeyValue<Types, Helpers.StrictValues>
    in?: Helpers.QueryKeyValue<Types, Helpers.StrictValues[]>
    notIn?: Helpers.QueryKeyValue<Types, Helpers.StrictValues[]>
    isNull?: Types[]
    isNotNull?: Types[]
    between?: {
      [key in Types]?: [Helpers.StrictValues, Helpers.StrictValues]
    }
    notBetween?: {
      [key in keyof T]?: [Helpers.StrictValues, Helpers.StrictValues]
    }
  }
}
