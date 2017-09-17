var suite = require('benchmark').Suite()
var get = require('./index')

suite
  .add('await-get', async function () {
    var pet = await get(dog('Rover'))
    if (pet.err) return pet.err
    return pet.value.name
  })
  .add('try/catch', async function () {
    try { var pet = await dog('Rover') }
    catch (err) { return err }
    return pet.name
  })
  .add('callback', function () {
    dogback('Rover', function (err, pet) {
      if (err) return err
      return pet.name
    })
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .run({ async: true })

function dog (name) {
  return new Promise(function (resolve, reject) {
    Math.round(Math.random()) ?
      reject(new Error('Sorry')) :
      resolve({ name: name })
  })
}

function dogback (name, cb) {
  process.nextTick(function () {
    Math.round(Math.random()) ?
      cb(new Error('Sorry')) :
      cb(null, { name: name })
  })
}
