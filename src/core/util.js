/**
 * 对象深拷贝
 * @param {any} obj
 * @returns {Object}
 */
export function deepCloneObj(obj, cache = []) {
  // 如果传入的内容为 null 或者 不为 object 那么就表示到最底层了
  // 当前拷贝是一个基础的数据类型，此时直接返回内容，停止递归
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 如果对象在缓存中找到的话，那就直接返回缓存对象
  // 因为虽然是深拷贝，但是原对象中的某几个属性同时引用了某个对象的话
  // 这个时候为了与之前对象保持一致，不应该进行深拷贝，而是直接传递引用，比如函数什么的
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  // 判断当前拷贝的是数组还是对象，然后生成对应的类型，然后将当前对象传入到缓存中
  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy
  })

  // 对对象的每一个属性进行深拷贝处理，这里是用递归
  Object.keys(obj).forEach(key => {
    copy[key] = deepCloneObj(obj[key], cache)
  })

  // 返回内容
  return copy
}

// 扁平化数组
export function flattenArray(array) {
  while (array.some(item => Array.isArray(item))) {
    array = [].concat(...array)
  }
  return array
}

const hasDecimal = num => (num ? /\d+\.\d+/.test(num.toString()) : false)

/**
 * 获取小数位长度
 * @param {Number | String Array} 数字、字符串数组
 * @returns {Array} 返回小数位数组
 */
function getFloatLen(floats) {
  const floatLen = []
  floats.forEach((float, index) => {
    if (hasDecimal(float)) {
      floatLen[index] = float.toString().split('.')[1].length
    } else {
      floatLen[index] = 0
    }
  })
  return floatLen
}

/**
 * 小数加法运算
 * @param  {string | number} args
 * @returns {number}
 */
export function floatAdd(...args) {
  if (args.length <= 0) return 0
  const floatLen = getFloatLen(args)
  const decimalLen = Math.max.apply(null, floatLen)
  const radix = Math.pow(10, decimalLen)
  const total = args.reduce((acc, cur) => {
    return acc + cur * radix
  }, 0)
  return total / radix
}

/**
 * 小数减法运算
 * @param  {string | number} args
 * @returns {number}
 */
export function floatSub(...args) {
  if (args.length < 1) return 0
  const floatLen = getFloatLen(args)
  const decimalLen = Math.max.apply(null, floatLen)
  const radix = Math.pow(10, decimalLen)
  const res1 = floatMul(args[0], radix)
  const res2 = floatMul(args[1], radix)
  return (res1 - res2) / radix
}

/**
 * 小数乘法运算
 * @param  {string | number} args
 * @returns {number}
 */
export function floatMul(...args) {
  if (args.length <= 0) return 0
  if (args.some(arg => !arg)) return 0
  let radix = 0
  let result = 0
  args.forEach((arg, index) => {
    if (hasDecimal(arg)) {
      radix += arg.toString().split('.')[1].length
    }
    if (index === 0) {
      arg && (result = arg.toString().replace('.', ''))
    } else {
      arg && (result *= arg.toString().replace('.', ''))
    }
  })
  result /= Math.pow(10, radix)
  return result
}

export function debounce(fn, timeout) {
  let timer
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, timeout)
  }
}

export async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = e => reject(e)
    image.src = url
  })
}

/* eslint-disable */
// 数值千分位
export function thousandBitSeparator(str) {
  if (str === undefined || str === null) return ''
  str = String(str)
  if (str.indexOf('.') >= 0) {
    var postfix = str.substring(str.indexOf('.'))
    str = str.substring(0, str.indexOf('.'))
  } else {
    var postfix = ''
  }
  // console.log(postfix);
  // .99
  // console.log(str);
  // 9999999999999
  let iNum = str.length % 3
  let prev = ''
  let iNow = 0
  let temp = ''
  let arr = []
  if (iNum != 0) {
    prev = str.substring(0, iNum)
    arr.push(prev)
  }
  str = str.substring(iNum)
  for (let i = 0; i < str.length; i++) {
    iNow++
    temp += str[i]
    if (iNow == 3 && temp) {
      arr.push(temp)
      temp = ''
      iNow = 0
    }
  }
  // console.log(arr);
  // ["9", "999", "999", "999", "999"]
  return arr.join(',') + postfix
}

export default {deepCloneObj,flattenArray,thousandBitSeparator,loadImage,debounce,floatMul,floatSub,floatAdd}