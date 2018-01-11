# resolve-await

resolve-await helps you cleanly handle async/await errors

## install

```sh
npm install michaelrhodes/resolve-await
```

## use

```js
var resolve = require('resolve-await')

function dog (name) {
  return new Promise(function (resolve, reject) {
    Math.round(Math.random()) ?
      reject(new Error('Sorry')) :
      resolve({ name: name })
  })
}

;(async function () {
  var pet = await resolve(dog('Rover'))
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
resolve-await x 116,712 ops/sec ±3.62% (60 runs sampled)
try/catch x 149,417 ops/sec ±0.99% (63 runs sampled)
promise x 201,733 ops/sec ±1.04% (86 runs sampled)
callback x 1,095,879 ops/sec ±14.51% (34 runs sampled)
```

resolve-await is a litter slower than a try/catch, but if performance is an issue you should probably already be using plain old callbacks instead of all this promisey async magic jazz.

## obey

[MIT](http://opensource.org/licenses/MIT)
