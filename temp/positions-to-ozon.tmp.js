const axios = require('axios')

const getBasicAuthToken = (username, password) =>
  `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

const ids = [
  '8e8456e8-b504-11e9-9ff4-34e80003c649',
  '771417aa-d0e5-11e5-7a69-93a7001ddf2e',
  '771bd615-d0e5-11e5-7a69-93a7001ddf69',
  '773dc728-d0e5-11e5-7a69-93a7001de059',
  '60d51af8-01f8-11e9-9107-5048001a27a8',
  '77359ec4-d0e5-11e5-7a69-93a7001de01a',
  '773fa29b-d0e5-11e5-7a69-93a7001de066',
  'ade1df1a-6ac0-11e6-7a69-93a7000b5988',
  '79f5978f-31b0-11e8-9107-5048002153f5',
  '1ddd5f57-7a97-11ec-0a80-00ab0007f372',
  '21135c6b-31b0-11e8-9109-f8fc002060b5',
  '7755022c-d0e5-11e5-7a69-93a7001de118',
  'ea17b69a-b8c9-11e8-9109-f8fc0016ac6e',
  '87adff13-f7cc-11e9-0a80-00d0000cccfa',
  '914b7df6-9b09-11e8-9107-50480012aa35',
  '76509c03-d0e5-11e5-7a69-93a7001ddb37',
  '76563228-d0e5-11e5-7a69-93a7001ddb58',
  'd4e89869-768a-11e6-7a31-d0fd000ea32b',
]

const msHeaders = {
  Authorization: getBasicAuthToken(
    process.env.MOYSKLAD_LOGIN || '',
    process.env.MOYSKLAD_PASSWORD || ''
  ),
  'Content-Type': 'application/json',
}
const ozonHeaders = {
  'api-key': '',
  'client-id': '',
  'Content-Type': 'application/json',
}

const fetchId = async (id) => {
  const result = await axios.get(`https://online.moysklad.ru/api/remap/1.2/entity/product/${id}`, {
    headers: msHeaders,
  })

  if (result.data) {
    let prices = []

    for (const price of result.data.salePrices) {
      prices.push({
        [price.priceType.name]: price.value,
      })
    }
  }

  return result
}

const fetchAll = async (onDone) => {
  const positions = []
  let seed = 0

  for (const id of ids) {
    seed += 1

    setTimeout(async () => {
      try {
        const result = await fetchId(id)
        positions.push(result.data)
        console.log(`Progress ${positions.length}/${ids.length}`)
      } catch (e) {
        console.error('Not fetched :(', 'seed', seed)
      }
    }, 1000 * seed)
  }

  setTimeout(() => onDone(positions), 1000 * (seed + 1))
}

const writePosition = async (position) => {
  const response = await axios.post(
    'https://api-seller.ozon.ru/v2/product/import',
    { items: [position] },
    { headers: ozonHeaders }
  )
}

const bootstrap = async () => {
  // await fetchAll(async (positions) => {
  //   for (const position of positions) {
  //     await writePosition(position)
  //   }
  // })

  await fetchId(ids[0])
}

bootstrap()
// lamp category id 17028609
