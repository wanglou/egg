
'use strict';
 
const Controller = require('egg').Controller;
 
class HomeController extends Controller {
  async messageList() {
    // 留言
    let query = this.ctx.query
    let result = await this.service.messageWall.messageList(query);
    this.ctx.body = result
  }
  async delMessage() {
    // 删除留言
    let query = this.ctx.query
    let result = await this.service.messageWall.delMessage(query);
    this.ctx.body = result
  }
}
 
module.exports = HomeController;
