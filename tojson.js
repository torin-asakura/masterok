const { join } = require('path')
const { writeFileSync, readFileSync } = require('fs')

const raw = readFileSync(join(__dirname, './lamp-attrs.txt'))

writeFileSync(join(__dirname, './lamp-attrs.json'), JSON.stringify({
  ru: {
    attributes: new Buffer(raw).toString('utf-8').split('\n')
  }
}))
