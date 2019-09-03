
'use strict';
 
const Controller = require('egg').Controller;
 
class HomeController extends Controller {
  async articleComment() {
    // 获取有评论的文章
    let query = this.ctx.query
    let result = await this.service.comment.articleComment(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: result
    }
  }
  async commentDetail() {
    // 评论列表
    let query = this.ctx.query
    let result = await this.service.comment.commentDetail(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: result
    }
  }
  async addComment() {
    // 添加评论
    let query = this.ctx.request.body
    let result = await this.service.comment.addComment(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: result
    }
  }
  async delComment() {
    // 删除评论
    let query = this.ctx.query;
    let result = await this.service.comment.delComment(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: result
    }
  }
}
 
module.exports = HomeController;
