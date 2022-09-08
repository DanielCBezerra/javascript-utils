/**
 * Deep copy objects of any type, except for functions and files (though will still shallow copy them).
 * @param {any} source The object to be copied
 * @returns {any} Result
 */
export function copyDeep(source) {
  let sourceCopy

  if (source instanceof Object && !(source instanceof File) && !(typeof source === 'function')) {
    if (Array.isArray(source)) {
      sourceCopy = []
    } else {
      sourceCopy = {}
    }
    for (let key in source) {
      sourceCopy[key] = copyDeep(source[key])
    }
  } else {
    sourceCopy = source
  }
  return sourceCopy
}
