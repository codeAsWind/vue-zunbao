function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function getMobilePlatform() {
  if (navigator.userAgent.match(/Android/i))
    return 'Android';
  if (navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i))
    return 'IOS';
  if (navigator.userAgent.match(/Windows Phone/i))
    return 'Windows Phone';
  return 'other';
}

export function isMobilePlatform() {
  return window.navigator.userAgent.toString().search(/(iPhone|iPod|Android|ios|Windows Phone|mobile|iPad|SymbianOS)/i) !== -1
}

export function formatStr(str, startStrNumber, endStrNumber, starNumber) {
  if (!str) return ''
  for (var i = 0, star = ''; i < starNumber; i++) {
    star += '*'
  }
  var reg = new RegExp('^(\.{' + startStrNumber + '})\.+(\.{' + endStrNumber + '})$')
  return str.replace(reg, '$1' + star + '$2')
}

//读取分页数据
export function getPageContents(allDataList, size, pageIndex) {
  if (allDataList.length) {
    let startNum = (pageIndex - 1) * size
    let endNum = startNum + size
    return allDataList.slice(startNum, endNum)
  }
  return []
}

//获取当月第一天
export function getMonthFirstDay(now) {
  let d = null
  if (!now) {
    d = new Date()
  } else {
    d = now
  }
  let vYear = d.getFullYear()
  let vMon = d.getMonth() + 1
  return vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-01 00:00:00"
}

//数组对象去重
export function unique(arr, key) {
  const res = new Map()
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1))
}


export function getUrlParams(url) {
  let Params = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    Params[key] = value
  })
  return Params
}

export function setUrlParams(oldUrl, data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  url = url.substring(1) || ''
  oldUrl += (oldUrl.indexOf('?') < 0 ? '?' : '&')
  return oldUrl + url
}

export function getQueryString(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 写入表单提交页面
export function getHtml(postAddress, opentype, params) {
  var postDataHtml = "<html lang=\"en\"><head><meta charset=\"UTF-8\"></head><body>"
  postDataHtml = postDataHtml + "<form id='postDataForm' method='" + opentype + "' action='" + postAddress + "'>"
  for (let key in params) {
    postDataHtml = postDataHtml + "<input type='hidden' name='" + key + "' value='" + params[key] + "'/>"
  }
  postDataHtml = postDataHtml + "</form><script type='text/javascript'>document.getElementById(\"postDataForm\").submit()<\/script><body><html>";
  return postDataHtml
}

export function ajaxRequst(url, type, params) {
  return new Promise((res) => {
    let xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.setRequestHeader("Content-type", "application/json;charset=utf-8")
    xhr.send(JSON.stringify(params))
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let result = xhr.responseText
        result = eval('(' + result + ')')
        res(result)
      }
    }
  })
}
