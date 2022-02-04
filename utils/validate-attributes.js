const { DICT_PATH, FORBIDDEN_SYMBOLS } = require('./constants')

const dict = require(DICT_PATH)

const isValid = (name) => {
  for (symbol of FORBIDDEN_SYMBOLS) {
    if (name.indexOf(symbol) !== -1) return false
  }

  return true
}

const validate = () => {
  const unique = new Set()

  let iteration = 0
  let total = Object.keys(dict).length
  let invalid = 0

  const invalidOnes = []

  for (key in dict) {
    iteration += 1

    if (!isValid(dict[key])) {
      console.log(`Property ${dict[key]} is invalid`)
      invalid += 1
      invalidOnes.push(key)
    }

    unique.add(dict[key])

    if (unique.size !== iteration) {
      console.log(`Property ${dict[key]} is duplicated`)
      iteration -= 1
      invalid += 1
    }
  }

  console.log(`${invalid} of ${total} are invalid`)

  return invalidOnes
}

validate()

module.exports = {
  validate,
}
