import * as tools from './tools.js'


const runTest = (name, tests) => describe(
  `tools.${name}`,
  () => tests.forEach(({ props, result, checker = "toBe" }) => it(
    `${name}(${props.map(prop => JSON.stringify(prop)).join(", ")}) ${checker} ${JSON.stringify(result)}`,
    () => expect(tools[name](...props))[checker](result)
  ))
)

// Tests
runTest("getRandomColor", [
  { props: [], result: /^#[0-9A-f]{6}$/, checker: "toMatch" },
  { props: [], result: /^#[0-9A-f]{6}$/, checker: "toMatch" },
  { props: [], result: /^#[0-9A-f]{6}$/, checker: "toMatch" },
  { props: [], result: /^#[0-9A-f]{6}$/, checker: "toMatch" },
])

runTest("getUniqueName", [
  { props: ["apple", ["apple", "banana", "orange"]], result: "apple_1" },
  { props: ["Apple", ["apple", "banana", "orange"]], result: "Apple" },
  { props: ["banana", ["apple", "banana", "banana_1", "banana_2", "orange"]], result: "banana_3" },
  { props: ["banana_3", ["apple", "banana", "banana_1", "banana_3", "orange"]], result: "banana_2" },
])

const optionsList = [{ label: "Apple", value: "apple" }, { label: "Banana", value: "banana" }]
runTest("getUniqueOption", [
  { props: [{ label: "Orange", value: "orange" }, optionsList], result: { label: "Orange", value: "orange" }, checker: "toEqual" },
  { props: [{ label: "Apple", value: "apple" }, optionsList], result: { label: "Apple_1", value: "apple_1" }, checker: "toEqual" },
  { props: [{ label: "Orange", value: "apple" }, optionsList], result: { label: "Orange", value: "apple_1" }, checker: "toEqual" },
  { props: [{ label: "Apple", value: "orange" }, optionsList], result: { label: "Apple_1", value: "orange" }, checker: "toEqual" },
])

runTest("range", [
  { props: [1, 1], result: [1], checker: "toEqual" },
  { props: [1, 5], result: [1, 2, 3, 4, 5], checker: "toEqual" },
  { props: [7, 10], result: [7, 8, 9, 10], checker: "toEqual" },
  { props: [10, 7], result: [], checker: "toEqual" },
])

runTest("roundAndTruncate", [
  { props: [54321.123456, 0], result: 54321 },
  { props: [54321.123456, 3], result: 54321.123 },
  { props: [7.5999, 2], result: 7.6 },
  { props: [7.5039, 2], result: 7.5 },
])
