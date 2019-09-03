
'use strict';
 
const Service = require('egg').Service;
// 文件存储
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
class HomeService extends Service {
  // 查询天气
  async getWeather(query) {
    let result = await this.ctx.curl(`http://apis.juhe.cn/simpleWeather/query?city=${query.city}&key=59c51a9088c745497b111759dea37ed3`, {
      dataType: 'json'
    })
    if (result.data.error_code === 0) {
      return { code: 1, message: '成功', result: result.data.result }
    } else {
      return { code: 0, message: '查询失败' }
    }
  }
  // 获取ip
  async getIp() {
    let result = await this.ctx.curl(`http://pv.sohu.com/cityjson`, {
      dataType: 'text'
    })
    return { code: 1, message: '成功', result: result.data }
  }
  // 上传头像
  async uploadAvatar() {
    let parts = this.ctx.multipart({ autoFields: true });
    let stream, imgUrl = ''; // 图片访问地址集合
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      // 文件名为：时间戳+随机字符串+.文件后缀
      let filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
      // 上传图片的目录
      let target = 'app/public/admin/upload/' + filename;
      imgUrl = '/public/admin/upload/' + filename
      let writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
    }
    await this.app.mysql.update('user', {id: parts.field.userId, url: imgUrl});
    if (parts.field.url) {
      let url = 'app/public/admin/upload'
      let start = parts.field.url.indexOf('/upload/') + 8
      let name = parts.field.url.slice(start)
      let files = fs.readdirSync(url)
      files.forEach(function(file){
        var curPath = path.join(url,file);
        if(file.indexOf(name) > -1){
          fs.unlinkSync(curPath);
        }
      });
    }
    return {
      code: 1,
      message: '上传成功',
      result: {
        url: imgUrl
      }
    }
  }
}
 
module.exports = HomeService;
