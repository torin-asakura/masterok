export const repeat = (count: number, cb: (iteration: number) => void): void => {
  ;[...Array(count)].forEach((i, index) => cb(index + 1))
}
