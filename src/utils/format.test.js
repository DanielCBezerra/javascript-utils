import * as format from './format.js'


const runTest = (name, tests) => describe(
  `format.${name}`,
  () => tests.forEach(({ props, result, checker = "toBe" }) => it(
    `${name}(${props.map(prop => JSON.stringify(prop)).join(", ")}) ${checker} ${JSON.stringify(result)}`,
    () => expect(format[name](...props))[checker](result)
  ))
)

// Tests
// TODO: All those will vary by location
// numberToString(numberValue, twoDigits = false, isCurrency = false)
// datetimeToString(datetimeValue, options)
// dateToString(datetimeValue, options)
// timeToString(datetimeValue)
// momentLocalDateFormat = testDate.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
// momentLocalTimeFormat = Intl.DateTimeFormat([], { hour: 'numeric' }).resolvedOptions().hourCycle === "h12" ? "hh:mm A" : "HH:mm"

runTest("capitalizeString", [
  { props: [null], result: "" },
  { props: ["test string"], result: "Test String" },
  { props: ["tEST String"], result: "Test String" },
  { props: ["TEST STRING"], result: "Test String" },
])

runTest("mappingKeyToString", [
  { props: [null], result: "" },
  { props: ["testKey"], result: "Test Key" },
  { props: ["test-key"], result: "Test Key" },
  { props: ["test_key"], result: "Test Key" },
])
