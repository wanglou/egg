
'use strict';
 
const Service = require('egg').Service;
class HomeService extends Service {
  // 查询文章
  async getArticle(query) {
    let result = []
    let hasStatus = `status = ${query.status}`
    if (!query.status) hasStatus = `status in (1,2)`
    let hasKeywords = `title like "%${query.keywords}%" and`
    if (!query.keywords) hasKeywords = ``
    let hasCategory = `categoryId = ${query.categoryId} and`
    if (!query.categoryId) hasCategory = ``
    let sql = `select id,title,creatName,creatTime,creatUserId,status,readCount,categoryId from article where ${hasKeywords} ${hasCategory} ${hasStatus} order by id desc limit ${(query.currentPage - 1) * 10}, 10`;
    let data = await this.app.mysql.query(sql);
    if (data) {
      let sql2 = `select * from article where ${hasKeywords} ${hasCategory} ${hasStatus}`;
      let count = await this.app.mysql.query(sql2)
      result = {
        totalCount: count.length,
        list: data
      }
    } else result = []
    return result;
  }
  // 添加文章
  async addArticle (query) {
    const result = await this.app.mysql.get('article', {title: query.title});
    if (!result) {
      // 根据当前用户id , 查询登录名
      const user = await this.app.mysql.get('user', {id: query.creatUserId});
      await this.app.mysql.insert('article', {
        title: query.title,
        type: query.type,
        categoryId: query.categoryId,
        content: query.content,
        creatTime: new Date(),
        status: query.status,
        creatUserId: query.creatUserId,
        creatName: user.loginName
      });
      return {code: 1, message: '添加成功'}
    } else {
      return {code: 0, message: '文章题目重复'}
    }
  }
  // 删除文章
  async delArticle (query) {
    let arr = query.ids.split(',')
    const result = await this.app.mysql.delete('article', {id: arr});
    if (arr.indexOf(',') === -1) {
      const result2 = await this.app.mysql.get('comment', { articleId: arr });
      if (result2) {
        await this.app.mysql.delete('comment', { articleId: arr });
      }
    } else {
      arr.split(',').forEach(async (item) => {
        const result2 = await this.app.mysql.get('comment', { articleId: item });
        if (result2) {
          await this.app.mysql.delete('comment', { articleId: item });
        }
      })
    }
    if (result.affectedRows === 0) {
      return {code: 0, message: '删除失败'}
    } else {
      return {code: 1, message: '删除成功'}
    }
  }
  // 编辑文章
  async updateArticle (query) {
    const result = await this.app.mysql.get('article', {title: query.title});
    if (result && result.id !== Number(query.id)) {
      return {code: 0, message: '文章名重复'}
    } else {
      // 根据当前用户id , 查询登录名
      const user = await this.app.mysql.get('user', {id: query.creatUserId});
      const result2 = await this.app.mysql.update('article', {
        id: query.id,
        title: query.title,
        type: query.type,
        categoryId: query.categoryId,
        content: query.content,
        creatTime: new Date(),
        status: query.status,
        creatUserId: query.creatUserId,
        creatName: user.loginName
      });
      if (result2.affectedRows === 0) {
        return {code: 0, message: '修改失败'}
      } else {
        return {code: 1, message: '修改成功'}
      }
    }
  }
  // 文章详情
  async articleDetail (query) {
    const result = await this.app.mysql.get('article', {id: query.id});
    await this.app.mysql.update('article', {
      id: query.id,
      readCount: result.readCount + 1
    });
    const result2 = await this.app.mysql.get('article', {id: query.id});
    return {code: 1, message: '查询成功', result: result2}
  }
  // 查询文章分类
  async articleCategory () {
    const result = await this.app.mysql.select('article_category')
    return result
  }
  // 添加文章分类
  async addArticleCategory (query) {
    const result = await this.app.mysql.get('article_category', {name: query.name});
    if (!result) {
      await this.app.mysql.insert('article_category', { name: query.name });
      return {code: 1, message: '添加成功'}
    } else {
      return {code: 0, message: '文章题目重复'}
    }
  }
  // 删除前查询当前分类下是否有文章
  async categoryHasArticle (query) {
    const result = await this.app.mysql.get('article', { categoryId: query.id });
    if (!result) {
      return { code: 1, message: '当前分类下没有文章' }
    } else {
      return { code: 0, message: '当前分类下有文章' }
    }
  }
  // 删除文章分类
  async delArticleCategory (query) {
    const result = await this.app.mysql.get('article', { categoryId: query.id });
    if (result) {
      let sql = `select id from article where categoryId = ${query.id}`
      const result2 = await this.app.mysql.query(sql);
      result2.forEach(async item => {
        await this.app.mysql.delete('comment', { articleId: item.id });
      })
      await this.app.mysql.delete('article', { categoryId: query.id });
    }
    await this.app.mysql.delete('article_category', { id: query.id });
    return { code: 1, message: '删除成功',result: result }
  }
}
 
module.exports = HomeService;
