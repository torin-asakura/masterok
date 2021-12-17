export const getBasicAuthToken = (username: string, password: string): string =>
  `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

export const mapKeys = (
  object: { [key: string]: any },
  cb: (key: string) => string
): { [key: string]: any } =>
  Object.entries(object)
    .map(([key, value]) => [cb(key), value])
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {})

export const repeat = (count: number, cb: (iteration: number) => void): void => {
  ;[...Array(count)].forEach((i, index) => cb(index + 1))
}
