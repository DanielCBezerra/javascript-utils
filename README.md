# JavaScript Utils
Useful functions for JavaScript apps

## Installation
Using npm:
```shell
$ npm i @danielcbezerra/utils
```
Note: add `--save` if you are using npm < 5.0.0

## Usage
```js
import { * as utils } from '@danielcbezerra/utils'

function getTextColor(backgroundColor) {
    if (utils.isColorLight(backgroundColor)) {
        return "#000000"
    }
    return "#FFFFFF"
}
```
Or
```js
import { isColorLight } from '@danielcbezerra/utils'

function getTextColor(backgroundColor) {
    if (isColorLight(backgroundColor)) {
        return "#000000"
    }
    return "#FFFFFF"
}
```
You can import `capitalizeString`, `copyDeep`, `datetimeToString`, `dateToString`, `getRandomColor`, `getUniqueName`, `getUniqueOption`, `includesKeyValue`, `isColorDark`, `isColorLight`, `isDict`, `isEmpty`, `isEqual`, `isNotEmpty`, `isNotEqual`, `isString`, `isValidEmail`, `isValidPhone`, `mappingKeyToString`, `momentLocalDateFormat`, `momentLocalTimeFormat`, `numberToString`, `range`, `roundAndTruncate`, `sortArrayByKey`, `sortValues`, `timeToString` respectively.
