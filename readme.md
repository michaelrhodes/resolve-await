# await-get

await-get helps you cleanly handle async/await errors

## install

```sh
npm install michaelrhodes/await-get
```

## use

```js
var get = require('await-get')

function dog (name) {
  return new Promise(function (resolve, reject) {
    Math.round(Math.random()) ?
      reject(new Error('Sorry')) :
      resolve({ name: name })
  })
}

;(async function () {
  var pet = await get(dog('Rover'))
  if (pet.err) return console.error(pet.err)
  console.log(pet.value.name)
})()

;(async function () {
  try { var pet = await dog('Rover') }
  catch (err) { return console.error(err) }
  console.log(pet.name)
})()
```

## benchmark

```
await-get x 116,451 ops/sec ±3.04% (73 runs sampled)
try/catch x 149,528 ops/sec ±3.94% (67 runs sampled)
callback x 1,091,891 ops/sec ±9.88% (36 runs sampled)
```

await-get is a litter slower than a try/catch, but if performance is an issue you should probably already be using plain old callbacks instead of all this promisey async magic jazz.

## obey

[MIT](http://opensource.org/licenses/MIT)
