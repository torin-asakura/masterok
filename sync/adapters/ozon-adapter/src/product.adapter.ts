import { CreateOzonProductRequest } from '@marketplace/product-proto'
import { Product }                  from '@product/product-proto'
import { Serializer }               from '@sync/shared'

export class OzonProductAdapter extends Serializer<CreateOzonProductRequest> {
  constructor(private readonly product: Product) {
    super()

    this.rules = {
      name: (name) => ({ name }),
      price: (price) => ({
        // TODO apply coefficient
        price: price * 0.9,
        old_price: price,
        premium_price: price * 0.8,
      }),
      barcode: (barcode) => ({ barcode }),
      article: (article) => ({
        offer_id: article,
      }),
      images: (images) => ({
        images,
        primary_image: images[0],
      }),
      category: (category) => ({
        category_id: 17033876,
      }),
    }
  }

  toRequest() {
    return Object.entries(this.product).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...(this.rules[key](value) ?? {}),
      }
    }, {})
  }
}
