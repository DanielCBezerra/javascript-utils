import * as dataCheckers from './dataCheckers.js'


const runTest = (name, tests) => describe(
  `dataCheckers.${name}`,
  () => tests.forEach(({ props, result, checker = "toBe" }) => it(
    `${name}(${props.map(prop => JSON.stringify(prop)).join(", ")}) ${checker} ${JSON.stringify(result)}`,
    () => expect(dataCheckers[name](...props))[checker](result)
  ))
)

// Tests
runTest("isEqual", [
  { props: [{ a: 1, b: [2, 3] }, { b: [2, 3], a: 1 }], result: true },
  { props: [{ a: 1, b: [2, 3] }, { a: 1, b: [3, 2] }], result: false },
  { props: [null, undefined], result: false },
  { props: [0, "0"], result: false },
])

runTest("isNotEqual", [
  { props: [{ a: 1, b: [2, 3] }, { b: [2, 3], a: 1 }], result: false },
  { props: [{ a: 1, b: [2, 3] }, { a: 1, b: [3, 2] }], result: true },
  { props: [null, undefined], result: true },
  { props: [0, "0"], result: true },
])

runTest("isEmpty", [
  { props: [{}], result: true },
  { props: [{ a: 1 }], result: false },
  { props: [[]], result: true },
  { props: [[1]], result: false },
])

runTest("isNotEmpty", [
  { props: [{}], result: false },
  { props: [{ a: 1 }], result: true },
  { props: [[]], result: false },
  { props: [[1]], result: true },
])

runTest("isDict", [
  { props: [{}], result: true },
  { props: [{ a: 1 }], result: true },
  { props: [[]], result: false },
  { props: [""], result: false },
])

runTest("includesKeyValue", [
  { props: [[{ a: 1 }, { b: 2 }, { c: 3 }], "a", 2], result: false },
  { props: [[{ a: 1 }, { b: 2 }, { c: 3 }], "a", 1], result: true },
  { props: [[{ a: 1 }, { b: 2 }, { c: 3 }], "e", 3], result: false },
  { props: [[{ a: 1 }, { b: 2 }, { c: 3 }], "c", 3], result: true },
])

runTest("isColorLight", [
  { props: ["#noColor"], result: undefined },
  { props: ["#000000"], result: false },
  { props: ["#00b0b0"], result: true },
  { props: ["#ffffff"], result: true },
])

runTest("isColorDark", [
  { props: ["#noColor"], result: undefined },
  { props: ["#000000"], result: true },
  { props: ["#00b0b0"], result: false },
  { props: ["#ffffff"], result: false },
])

runTest("isString", [
  { props: [0], result: false },
  { props: [undefined], result: false },
  { props: [String("string")], result: true },
  { props: ["string"], result: true },
])

runTest("isValidEmail", [
  { props: [""], result: false },
  { props: ["test@test"], result: false },
  { props: ["test.test@test."], result: false },
  { props: ["test.test@test.com"], result: true },
])

runTest("isValidPhone", [
  { props: [""], result: false },
  { props: ["123456"], result: false },
  { props: ["000-555-2233"], result: true },
  { props: ["+1(000)555-2233"], result: true },
])
