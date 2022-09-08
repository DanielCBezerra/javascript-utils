// Objects

/**
 * Check if two objects are equals.
 * This will deep compare values, instead of the default memory address comparing.
 * @param {any} obj1 First object to compare
 * @param {any} obj2 Second object to compare
 * @returns {boolean} Result
 */
export function isEqual(obj1, obj2) {
  // Check if objects are are of the same type
  if (obj1?.__proto__ !== obj2?.__proto__) {
    return false
  }
  // If objects are an array
  if (Array.isArray(obj1)) {
    // Check lenght
    if (obj1.length !== obj2.length) {
      return false
    }
    // Check content
    for (let i in obj1) {
      if (!isEqual(obj1[i], obj2[i])) {
        return false
      }
    }
    // If all pass
    return true
  }
  // If objects are an Object
  if (obj1 instanceof Object && typeof obj1 !== "function") {
    // Check keys (ignoring order and undefined)
    if (Object.keys(obj1).filter(
      k => obj1[k] !== undefined
    ).sort().toString() !== Object.keys(obj2).filter(
      k => obj2[k] !== undefined
    ).sort().toString()) {
      return false
    }
    // Check content
    for (let i in obj1) {
      if (!isEqual(obj1[i], obj2[i])) {
        return false
      }
    }
    // If all pass
    return true
  }
  // If objects are anything else
  return obj1 === obj2
}

/**
 * Check if two objects are not equals.
 * This will deep compare values, instead of the default memory address comparing.
 * @param {any} obj1 First object to compare
 * @param {any} obj2 Second object to compare
 * @returns {boolean} Result
 */
export function isNotEqual(obj1, obj2) {
  return !isEqual(obj1, obj2)
}

/**
 * Check if an object is empty.
 * @param {(Object|Object[])} obj Object to check
 * @returns {boolean} Result
 */
export function isEmpty(obj) {
  for (let key in obj) {
    return false
  }
  return true
}

/**
 * Check if an object is not empty.
 * @param {(Object|Object[])} obj Object to check
 * @returns {boolean} Result
 */
export function isNotEmpty(obj) {
  return !isEmpty(obj)
}

/**
 * Check if an object is a dictionary.
 * @param {any} obj Object to check
 * @returns {boolean} Result
 */
export function isDict(obj) {
  return obj?.__proto__ === {}.__proto__
}

/**
 * Checks if any object in an array inclues a value on a given key.
 * @param {Object[]} array Array of objects
 * @param {string} key Key of the value to check
 * @param {any} value Value to check
 * @returns {boolean} Result
 */
export function includesKeyValue(array, key, value) {
  if (Array.isArray(array)) {
    return array.some(item => item?.[key] === value)
  }
  return false
}


// Colors

const colorRegex = new RegExp("^#[0-9A-f]{6}$")
function _isColorLight(color) {
  const convertRgb = (c) => {
    // sRGB to linear RGB
    c = c / 255.0
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  const r = convertRgb(parseInt(color.substr(1, 2), 16))
  const g = convertRgb(parseInt(color.substr(3, 2), 16))
  const b = convertRgb(parseInt(color.substr(5, 2), 16))
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b // 709 luma coefficients
  return l > 0.3 // W3C value was looking too low -> 0.1791 // From W3C: (l + 0.05) / (0.0(or lBlack) + 0.05) > (1.0(or lWhite) + 0.05) / (l + 0.05)
}

/**
 * Check if a color (hex) is light.
 * Use to decide if text should be white or black by the background color.
 * @param {string} color Color hex value. Ex. #000000
 * @returns {boolean} Result
 */
export function isColorLight(color) {
  if (!colorRegex.test(color)) {
    return undefined
  }
  return _isColorLight(color)
}

/**
 * Check if a color (hex) is dark.
 * Use to decide if text should be white or black by the background color.
 * @param {string} color Color hex value. Ex. #000000
 * @returns {boolean} Result
 */
export function isColorDark(color) {
  if (!colorRegex.test(color)) {
    return undefined
  }
  return !_isColorLight(color)
}


// Strings

/**
 * Check if a value is a string
 * @param {any} value Value to check
 * @returns {boolean} Result
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

// Using  RFC2822. Another solution on https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")

/**
 * Check if an email address is valid.
 * @param {string} email Email to check
 * @returns {boolean} Result
 */
export function isValidEmail(email) {
  return emailRegex.test(email)
}

const phoneRegex = new RegExp("^(\\+[1-9]\\d?[\\s.-]?)?(\\(\\d{3}\\)|\\d{3})[\\s.-]?\\d{3,4}[\\s.-]?\\d{4,5}$")

/**
 * Check if a phone number is valid.
 * @param {string} phone Phone number to test
 * @returns {boolean} Result
 */
export function isValidPhone(phone) {
  return phoneRegex.test(phone)
}
