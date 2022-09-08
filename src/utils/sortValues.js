/**
 * Returns sorter function to be used with arrays of objects (Array.prototype.sort()).
 * By default, will sort by the value on key "label". 
 * @param {string} [key = "label"] Key of the values to sort
 * @returns {Function} Result
 */
export function sortValues(key = "label") {
  return (a, b) => {
    // Get values to compare
    let valueA = a?.[key]
    let valueB = b?.[key]
    if (typeof valueA === "string") {
      valueA = valueA.toUpperCase()
    }
    if (typeof valueB === "string") {
      valueB = valueB.toUpperCase()
    }
    // Compare values
    if (valueA > valueB) {
      return 1
    }
    if (valueA < valueB) {
      return -1
    }
    // Equivalent values
    return 0
  }
}

/**
 * Return a sorted shallow copy of an array of objects.
 * By default, will sort by the value on key "label".
 * @param {Object[]} array Array of objects to sort
 * @param {string} [key = "label"] Key of the values to sort
 * @returns {Object[]} Result
 */
export function sortArrayByKey(array, key = "label") {
  if (!Array.isArray(array)) {
    return []
  }
  return [...array].sort(sortValues(key))
}
