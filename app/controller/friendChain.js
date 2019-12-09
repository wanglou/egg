
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
  // 初始查询对话
  async getWebsocketTest() {
    let query = this.ctx.query;
    let result = await this.service.friendChain.getWebsocketTest(query);
    this.ctx.body = result
  }
  // websocket
  async websocketTest() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {}
    this.service.friendChain.websocketTest(message);
    // 向客户端广播消息， 在客户端监听broadcast事件就可以获取消息了
    nsp.emit('broadcast', message)
  }
}
 
module.exports = HomeController;
