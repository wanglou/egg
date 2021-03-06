
'use strict';
 
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async getWeather() {
    // 天气
    let query = this.ctx.query
    let result = await this.service.index.getWeather(query);
    this.ctx.body = result
  }
  async getIp() {
    // 获取ip
    let result = await this.service.index.getIp();
    this.ctx.body = result
  }
  // 上传头像
  async uploadAvatar() {
    let query = this.ctx.query
    let result = await this.service.index.uploadAvatar(query);
    this.ctx.body = result
  }
  // 获取个人信息
  async getPerson() {
    let result = await this.service.index.getPerson();
    this.ctx.body = result
  }
  // 修改个人信息
  async updatePerson() {
    let query = this.ctx.request.body
    let result = await this.service.index.updatePerson(query);
    this.ctx.body = result
  }
  // 获取首页总数
  async getCount() {
    let result = await this.service.index.getCount();
    this.ctx.body = result
  }
  // 获取首页文章分类
  async getArticle() {
    let result = await this.service.index.getArticle();
    this.ctx.body = result
  }
  // 获取首页最近五日访问量
  async getFiveCount() {
    let result = await this.service.index.getFiveCount();
    this.ctx.body = result
  }
}
 
module.exports = HomeController;
