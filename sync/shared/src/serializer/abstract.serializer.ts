export abstract class Serializer<T extends object> {
  protected rules: { [key: string]: (value: any) => object } = {}

  toObject(): T {
    return {} as any
  }
}
