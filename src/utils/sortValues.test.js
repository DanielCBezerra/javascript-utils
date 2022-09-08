import * as sortValues from './sortValues.js'


const runTest = (name, tests) => describe(
  `sortValues.${name}`,
  () => tests.forEach(({ props, result, checker = "toBe" }) => it(
    `${name}(${props.map(prop => JSON.stringify(prop)).join(", ")}) ${checker} ${JSON.stringify(result)}`,
    () => expect(sortValues[name](...props))[checker](result)
  ))
)

// Tests
// This will tests both sortValues and sortArrayByKey
runTest("sortArrayByKey", [
  {
    props: [[{ a: 1, b: 2 }, { a: 3, b: 1 }, { a: 2, b: 3 }], "a"],
    result: [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 1 }],
    checker: "toEqual"
  },
  {
    props: [[{ a: 1, b: 2 }, { a: 3, b: 1 }, { a: 2, b: 3 }], "b"],
    result: [{ a: 3, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }],
    checker: "toEqual"
  },
  {
    props: [[{ a: "apples", b: "Bananas" }, { a: "ORANGES", b: "apples" }, { a: "Bananas", b: "ORANGES" }], "a"],
    result: [{ a: "apples", b: "Bananas" }, { a: "Bananas", b: "ORANGES" }, { a: "ORANGES", b: "apples" }],
    checker: "toEqual"
  },
  {
    props: [[{ a: "apples", b: "Bananas" }, { a: "ORANGES", b: "apples" }, { a: "Bananas", b: "ORANGES" }], "b"],
    result: [{ a: "ORANGES", b: "apples" }, { a: "apples", b: "Bananas" }, { a: "Bananas", b: "ORANGES" }],
    checker: "toEqual"
  },
])
