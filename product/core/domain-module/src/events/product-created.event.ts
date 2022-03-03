export class ProductCreated {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly category: string,
    public readonly subcategory: string,
    public readonly price: {
      buy: number
      sell: number
    },
    public readonly article: string,
    public readonly supplierCode: string,
    public readonly brand: string
  ) {}
}
