import fs from 'fs';
import os from 'os'
import readline from 'readline'
import Axios from 'axios'
import Env from '../models/EnvModel'

// 为了让服务端渲染正确请求数据
if (typeof window == "undefined") {
    Axios.defaults.baseURL = 'http://127.0.0.1:3099';
}

export function EnvRead(path) {
    fs.readFile(__dirname + '/text.txt', 'utf-8', (err, data) => {
        if (err) throw err
        // console.log(data);
        // console.log('输出结束');
        return data;
    })
}

export async function EnvReadLine(path) {
    let fReadName = __dirname + '/text.txt';
    let fWriteName = __dirname + '/readline.log';

    let enableWriteIndex = true;
    let fRead = fs.createReadStream(fReadName);
    let fWrite = fs.createWriteStream(fWriteName);
    fRead.on('end', () => {
        console.log('end');
        enableWriteIndex = false
    })

    let objReadline = readline.createInterface({
        input: fRead,
        output: fWrite,
        terminal: true
    });

    let index = 1;
    fWrite.write('line' + index.toString() + ':');

    var Package = ''
    var Version = ''
    var Depends = ''
    var Origin = ''
    let i = 0
    objReadline.on('line', (line) => {
        if (line.match(/Package: /)) {
            Package = line.substr(9)

            //if ((Package !== '' && Origin !== '') || (Package !== '' && Origin == '' && Depends !== '')) {
            if ((Package !== '' && Origin !== '')|| (Package !== '' && Origin == '' && Depends !== '')) {
                addEnv(Package, Version, Depends, Origin)
                Package = ''
                Version = ''
                Depends = ''
                Origin = ''
            }
        } else if (line.match(/Version: /)) {
            Version = line.substr(9)
        } else if (line.match(/Depends: /)) {
            Depends = line.substr(13)
        } else if (line.match(/Origin: /)) {
            Origin = line.substr(8)
        } else {

        }

        // console.log(index, line);
        // if (enableWriteIndex) {
        //     // 由于readline::output是先写入后调用的on('line')事件，  
        //     // 所以已经读取文件完毕时就不需要再写行号了... sodino.com  
        //     index++;
        //     var tmp = 'line' + index.toString() + ':';
        //     fWrite.write(tmp);
        // }


    });
}

async function addEnv(Package, Version, Depends, Origin) {
    const env = new Env({
        Package: Package,
        Version: Version,
        Depends: Depends,
        Origin: Origin
    })
    await env.save().catch(err => console.log(err))
}