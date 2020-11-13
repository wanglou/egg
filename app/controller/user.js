
'use strict';
 
const Controller = require('egg').Controller;
 
class HomeController extends Controller {
  async initPage() {
    // 初始化信息
    let query = this.ctx.query;
    let result = await this.service.user.initPage(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: result
    }
  }
  async getUser() {
    // 查询user
    let query = this.ctx.query;
    let users = await this.service.user.getUser(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: users
    }
  }
  async addUser() {
     // 添加user
     let query = this.ctx.request.body;
     if (query.loginName && query.loginPassword) {
      let res = await this.service.user.addUser(query);
      this.ctx.body = res
     } else {
      this.ctx.body = {
        code: -1,
        message: '服务器繁忙！'
      }
     }
  }
  async delUser() {
     // 删除user
     let query = this.ctx.query;
     if (query.ids) {
      let res = await this.service.user.delUser(query);
      this.ctx.body = res
     } else {
      this.ctx.body = {
        code: -1,
        message: '服务器繁忙！'
      }
     }
  }
  async updateUser() {
     // 编辑user
     let query = this.ctx.request.body;
     if (query.id) {
      let res = await this.service.user.updateUser(query);
      this.ctx.body = res
     } else {
      this.ctx.body = {
        code: -1,
        message: '服务器繁忙！'
      }
     }
  }
  async login() {
    // 登录
    let query = this.ctx.request.body;
    let result = await this.service.user.login(query);
    if (result) {
      this.ctx.session.loginName = result.loginName
      console.log(result.loginName)
      console.log(this.ctx.session)
      this.ctx.body = {
        code: 1,
        message: 'success',
        result: result
      }
    } else {
      this.ctx.body = {
        code: 0,
        message: 'error',
        result: '登录失败,请检查登录名或者密码 !'
      }
    }
  }
  async logout() {
    // 退出
    this.ctx.session.loginName = ''
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: '退出成功 !'
    }
  }
}
 
module.exports = HomeController;
