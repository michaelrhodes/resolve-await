var suite = require('benchmark').Suite()
var resolve = require('./index')

suite
  .add('resolve-await', async function () {
    var pet = await resolve(dog('Rover'))
  })
  .add('try/catch', async function () {
    try { var pet = await dog('Rover') }
    catch (err) {}
  })
  .add('promise', function () {
    dog('Rover').then(noop, noop)
  })
  .add('callback', function () {
    dogback('Rover', noop)
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

function noop () {}
