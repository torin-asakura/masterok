import builder from 'xmlbuilder'

import { IRetailCRMAdapter } from './retailcrm.interfaces'

export class RetailCRMAdapter implements IRetailCRMAdapter{
  generateICML(object) {
    const date = new Date()
    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`

    object.offers = object.offers.map((offer, idx) => {
      offer.picture = offer.pictures
      offer.categoryId = object.categories.length + object.subcategories.indexOf(object.subcategories.find(({ name }) => name === offer.category))
      offer.xmlId = offer.externalCode

      delete offer.pictures
      delete offer.category
      delete offer.externalCode

      return {
        '@id': idx,
        '@productId': idx,
        param: {
          '@name': 'Артикул',
          '@code': 'article',
          '#text': offer.code
        },
        ...offer,
      }
    })
    object.subcategories = object.subcategories.map((subcategory, idx) => {
      return {
        '@id': object.categories.length + idx,
        '@parentId': object.categories.indexOf(subcategory.parentCategory),
        '#text': subcategory.name
      }
    })
    object.categories = object.categories.map((category, idx) => {
      return {
        '#text': category,
        '@id': idx
      }
    })

    const writeable = {
      yml_catalog: {
        '@date': currentDate,
        shop: {
          name: 'masterok-market',
          company: 'masterok-market',
          categories: {
            category: [...object.categories, ...object.subcategories]
          },
          offers: {
            offer: object.offers
          }
        }
      }
    }

    const xml = builder.create(writeable).end({ pretty: true })

    return xml
  }
}
