import { mock } from 'mockjs'
import NodeExcel from 'excel-export'

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

export function summary(){
    let pv = Math.floor(Math.random()*20)+150;
    let uv = Math.floor(pv/3);
    let bounceRate =(Math.random()*30+15)+''

    let milliFormat = (input) => {
        return input && input.toString()
        .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
    return{
        'status' : 200,
        'data' :{
            'totalVisitors' : milliFormat(pv),
            'bounceRate' : bounceRate.substr(0,5) + '%',
            'uniqueVisitors' : milliFormat(uv),
            'avgTime' : '00:12:23'
        }
    }
}

export function linechart(){
    let origin = []
    for (let i = 0; i < 20; i++) {
        origin.push(Math.floor(Math.random() * 300) + 90 )
    }

    let pv = origin.map( (i, index) => {return [index+1, i]})
    let uv = origin.map( (i, index) => {return [index+1, Math.floor(i/3.0)]})
    let legends = [[1, ""], [2, ""], [3, "May&nbsp;15"], [4, ""], [5, ""], [6, "May&nbsp;19"], [7, ""], [8, ""], [9, "May&nbsp;22"], [10, ""], [11, ""], [12, "May&nbsp;25"], [13, ""], [14, ""], [15, "May&nbsp;28"], [16, ""], [17, ""], [18, "May&nbsp;31"], [19, ""], [20, ""]];
   
    return {
        'status' : 200,
        'data' : {
            'pv' : pv,
            'uv' : uv,
            'legends' : legends
        }
    }
}

export function pv(ctx){
    let conf ={}
    conf.cols = [{
        caption:'Header',
        type:'string',
        width:145
    }]
    conf.rows = [['value01'],['value02'],['value03']]
    ctx.type = 'application/vnd.openxmlformats'
    ctx.attachment( "Report-PV.xlsx")
    ctx.body = new Buffer(NodeExcel.execute(conf), 'binary')
    return ctx;
}

export function cv(ctx){
     let conf = {}
    conf.cols = [{
        caption:'Header',
        type:'string',
        width: 145
    }]
    
    conf.rows = [['value01'], ['value02'], ['value03']] 
    
    ctx.type = 'application/vnd.openxmlformats'
    ctx.attachment( "Report-UV.xlsx")
    ctx.body = new Buffer(NodeExcel.execute(conf), 'binary')
    return ctx;
}