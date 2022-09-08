import * as objectHandlers from './objectHandlers.js'


const runTest = (name, tests) => describe(
  `objectHandlers.${name}`,
  () => tests.forEach(({ props, result, checker = "toBe" }) => it(
    `${name}(${props.map(prop => JSON.stringify(prop)).join(", ")}) ${checker} ${JSON.stringify(result)}`,
    () => expect(objectHandlers[name](...props))[checker](result)
  ))
)

// Tests
runTest("copyDeep", [
  { props: [false], result: false },
  { props: [[1, 2, 3]], result: [1, 2, 3], checker: "toEqual" },
  { props: [{ a: 1, b: 2, c: 3 }], result: { a: 1, b: 2, c: 3 }, checker: "toEqual" },
  { props: [{ a: 1, b: 2, c: { d: [3, 4, 5, { e: false }] } }], result: { a: 1, b: 2, c: { d: [3, 4, 5, { e: false }] } }, checker: "toEqual" },
])
