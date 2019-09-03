
'use strict';
 
const Controller = require('egg').Controller;
 
class HomeController extends Controller {
  // 查询文章
  async getArticle() {
    let query = this.ctx.query;
    let data = await this.service.article.getArticle(query);
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: data
    }
  }
  // 添加文章
  async addArticle() {
    let query = this.ctx.request.body;
    if (query.title) {
      let result= await this.service.article.addArticle(query);
      this.ctx.body = result
     } else {
      this.ctx.body = {
        code: -1,
        message: '服务器繁忙！'
      }
     }
  }
  // 删除文章
  async delArticle() {
    let query = this.ctx.query;
    if (query.ids) {
     let res = await this.service.article.delArticle(query);
     this.ctx.body = res
    } else {
     this.ctx.body = {
       code: -1,
       message: '服务器繁忙！'
     }
    }
  }
  // 编辑文章
  async updateArticle() {
    let query = this.ctx.request.body;;
    if (query.id) {
     let res = await this.service.article.updateArticle(query);
     this.ctx.body = res
    } else {
     this.ctx.body = {
       code: -1,
       message: '服务器繁忙！'
     }
    }
  }
  // 文章详情
  async articleDetail() {
    let query = this.ctx.query;
    if (query.id) {
     let res = await this.service.article.articleDetail(query);
     this.ctx.body = res
    } else {
     this.ctx.body = {
       code: -1,
       message: '服务器繁忙！'
     }
    }
  }
  // 查询文章分类
  async articleCategory() {
    let result = await this.service.article.articleCategory();
    this.ctx.body = {
      code: 1,
      message: 'success',
      result: result
    }
  }
  // 添加文章分类
  async addArticleCategory() {
    let query = this.ctx.request.body;
    if (query.name) {
      let result= await this.service.article.addArticleCategory(query);
      this.ctx.body = result
    } else {
      this.ctx.body = {
        code: -1,
        message: '服务器繁忙！'
      }
    }
  }
  // 删除文章分类
  async delArticleCategory() {
    let query = this.ctx.query;
    if (query.id) {
     let res = await this.service.article.delArticleCategory(query);
     this.ctx.body = res
    } else {
     this.ctx.body = {
       code: -1,
       message: '服务器繁忙！'
     }
    }
  }
  // 删除前查询当前分类下是否有文章
  async categoryHasArticle() {
    let query = this.ctx.query;
    if (query.id) {
     let res = await this.service.article.categoryHasArticle(query);
     this.ctx.body = res
    } else {
     this.ctx.body = {
       code: -1,
       message: '服务器繁忙！'
     }
    }
  }
}
 
module.exports = HomeController;
