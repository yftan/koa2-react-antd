import { mock } from 'mockjs'

export function appConfig(){
  return {
    code: 200,
    msg: 'ok',
    result:mock({
      "id|+1":100,
      "username":'@cname',
      "email":'@email',
      "mobile|13800000000-13999999999":13800004500,
      "gmtCreate": 1455614704000,
      "gmtUpdate": 1462593500000,
      "avator":"@image(100x100)",
      "county":"@county(true)"
    })
  }
}

export function news(){
  return {
    code: 200,
    msg: 'ok',
    result: mock({
      "count": 128,
      "list|10": [{
          "id|+1": 1,
          "title": "@ctitle(8, 18)",
          "thumb": "http://placeimg.com/100/100?"+"@natural()",
          "summary": "@cparagraph(3, 7)",
          "gmtCreate": 1449139208000,
          "gmtUpdate": 1449139208000,
          "operator": 3,
          "text": "@cparagraph(3, 10)",
          "pv|0-88": 6,
          "status": 0,
          "tag|1": ['', 0, 1, 2]
      }]
    })
  }
}

export function about(){
  return {
    code: 200,
    msg:'ok',
    result: mock({
        about: "@cparagraph(3, 10)",
    })
  }
}

export function notes() {
    return {
        code: 200,
        msg:'ok',
        result: mock({
            notes: "@cparagraph(3, 10)",
        })
    }
}

export function envInfo() {
    return{
        code:200,
        msg:'ok',
        result:mock({
            "count": 100,
            "list|17": [{
                "id|+1": 1,
                "Package": /^[a-zA-Z0-9]{15,20}$/,
                "Source": /^[a-zA-Z0-9]{15,20}$/,
                "Priority":/^[a-zA-Z0-9]{15,20}$/,
                "Installed-Size":/[0-9]{3,6}/,
                "Maintainer":/^[a-zA-Z0-9]{15,20}$/,
                "Architecture":/^[a-zA-Z0-9]{15,20}$/,
                "Version":/^[a-zA-Z0-9]{15,20}$/,
                "Depends":/^[a-zA-Z0-9]{15,20}$/,
                "Filename":/^[a-zA-Z0-9]{15,20}$/,
                "Size":13458,
                "MD5sum":/\d{5,20}/,
                "SHA1":/^[a-zA-Z0-9]{15,20}$/,
                "SHA256":/\d{5,20}/,
                "Description":/^[a-zA-Z0-9]{15,20}$/,
                "Description-zh_CN":/^[a-zA-Z0-9]{15,20}$/,
                "Description-md5":/^[a-zA-Z0-9]{15,20}$/,
                "Homepage":'@url'
            }]

        })
    }
}