
'use strict';
 
const Controller = require('egg').Controller;
 
class HomeController extends Controller {
  // 查询友链
  async getFriendChain() {
    let query = this.ctx.query;
    let result = await this.service.friendChain.getFriendChain(query);
    this.ctx.body = result
  }
  // 添加友链
  async addFriendChain() {
    let query = this.ctx.request.body;
    let result = await this.service.friendChain.addFriendChain(query);
    this.ctx.body = result
  }
  // 删除友链
  async delFriendChain() {
    let query = this.ctx.query;
    let result = await this.service.friendChain.delFriendChain(query);
    this.ctx.body = result
  }
}
 
module.exports = HomeController;
