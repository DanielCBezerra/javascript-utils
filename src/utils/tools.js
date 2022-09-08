import { isString } from './dataCheckers'

/**
 * Gets a random hex color value
 * @returns {string} Result
 */
export function getRandomColor() {
  return '#' + ('000000' + Math.floor(Math.random() * 0xffffff).toString(16)).substr(-6)
}

/**
 * Get an unique value for a string to add to a list of strings
 * @param {string} name Name to guarantee uniqueness
 * @param {string[]} listOfNames List of existing names
 * @returns {string} Result
 */
export function getUniqueName(name, listOfNames) {
  // Check parameters
  if (!Array.isArray(listOfNames) || !isString(name)) {
    console.error("Can't get an unique name to", name, "from", listOfNames)
    return undefined
  }
  // If name not on list
  if (!listOfNames.includes(name)) {
    return name
  }
  // Get an unique name
  const cleanedName = name.replace(/_[0-9]+$/, "")
  let nameCopies = 1
  while (listOfNames.includes(cleanedName + "_" + nameCopies)) {
    nameCopies += 1
  }
  return cleanedName + "_" + nameCopies
}

/**
 * Get an unique option ({ label: string, value: string }) to add to a list of options
 * @param {{ label: string, value: string }} option Option object to guarantee label/value uniqueness
 * @param {{ label: string, value: string }[]} listOfOptions List of existing options
 * @returns {{ label: string, value: string }} Result
 */
export function getUniqueOption(option, listOfOptions) {
  return {
    ...option,
    label: getUniqueName(option?.label, listOfOptions?.map?.(o => o.label)),
    value: getUniqueName(option?.value, listOfOptions?.map?.(o => o.value))
  }
}

/**
 * Creates an array of integers between two values
 * @param {number} start First value
 * @param {number} end Last value
 * @returns {number[]} Result
 */
export function range(start, end) {
  const result = []
  for (let i = start; i <= end; i++) result.push(i)
  return result
}

/**
 * Rounds and trims number to the digits place
 * @param {number} number Number to round
 * @param {number} digits Number of digits
 * @returns {number} Result
 */
export function roundAndTruncate(number, digits) {
  if (typeof number !== "number" && typeof digits !== "number") {
    return undefined
  }
  return parseFloat(number.toFixed(digits))
}
