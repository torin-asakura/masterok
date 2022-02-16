export const mapKeys = (
  object: { [key: string]: any },
  cb: (key: string) => string
): { [key: string]: any } =>
  Object.entries(object)
    .map(([key, value]) => [cb(key), value])
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {})
