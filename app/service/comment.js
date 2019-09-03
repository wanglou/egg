
'use strict';
 
const Service = require('egg').Service;
class HomeService extends Service {
  // 获取有评论的文章
  async articleComment(query) {
    let hasKeywords = `title like "%${query.keywords}%" and`
    if (!query.keywords)  hasKeywords = ''
    let sql = `select title,commentCount,id from article where ${hasKeywords} commentCount > 0 order by commentCount desc limit ${(query.currentPage - 1) * 10}, 10`
    let list = await this.app.mysql.query(sql)
    let hasKeywords2 = `where title like "%${query.keywords}%" and commentCount > 0`
    if (!query.keywords)  hasKeywords2 = 'where commentCount > 0'
    let sql2 = `select * from article ${hasKeywords2}`;
    let count = await this.app.mysql.query(sql2)
    return {
      totalCount: count.length,
      list: list
    }
  }
  // 评论列表
  async commentDetail(query) {
    let sql = `select * from comment where articleId = ${query.articleId} order by id desc`
    let list = await this.app.mysql.query(sql)
    return list
  }
  // 添加评论
  async addComment(query) {
    await this.app.mysql.insert('comment', {
      articleId: query.articleId,
      creatName: query.creatName,
      creatTime: new Date(),
      content: query.content
    });
    let sql = `select id from comment where articleId = ${query.articleId}`
    let count = await this.app.mysql.query(sql)
    await this.app.mysql.update('article', {
      id: query.articleId,
      commentCount: count.length
    });
    return '评论成功'
  }
  // 删除评论
  async delComment(query) {
    const result = await this.app.mysql.delete('comment', {id: query.id});
    let sql = `select id from comment where articleId = ${query.articleId}`
    let count = await this.app.mysql.query(sql)
    await this.app.mysql.update('article', {
      id: query.articleId,
      commentCount: count.length
    });
    if (result.affectedRows === 0) {
      return {code: 0, message: '删除失败'}
    } else {
      return {code: 1, message: '删除成功'}
    }
  }
}
 
module.exports = HomeService;
