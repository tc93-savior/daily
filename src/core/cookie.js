/*
 * 用途 ：获取指定名称的cookie的值
 * 调用 ：util.getCookie(name)
 * 参数 ：name —— 参数名字
 * return 存值
 */
const getCookie = (key) => {
    let arrStr = document.cookie.split('; ')
    for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split('=')
        if (temp[0] === key) return decodeURIComponent((temp[1] || '').trim())
    }
    return ''
}

/*
   * 用途 ：添加 cookie
   * 调用 ：util.getCookie(name,value,time)
   * 参数 ：name —— 键名 , value —— 键值 , time —— 时间
   */
const addCookie = (name, value, hours) => {
    let str = name + '=' + encodeURIComponent(value) + ';path=/;'
    if (hours) {
        str += 'Max-Age=' + hours * 3600
    }
    document.cookie = str;
}
/*
   * 用途 ：删除cookie
   * 调用 ：util.delCookie(name)
   * 参数 ：name —— 键名
   */
const delCookie = (name) => {
    document.cookie = name + '=;path=/;Max-Age=-1'
}

export { getCookie, addCookie, delCookie }
