
'use strict';
 
const Service = require('egg').Service;
class HomeService extends Service {
  // 初始化信息
  async initPage(query) {
    let sql = `select id,loginName,url from user where loginName = "${query}"`;
    let result = await this.app.mysql.query(sql);
    return result[0];
  }
  // 查询用户
  async getUser(query) {
    let user = []
    if (query.keywords) {
      let sql = `select id,loginName from user where loginName like "%${query.keywords}%" limit ${(query.currentPage - 1) * 10}, 10`;
      let data = await this.app.mysql.query(sql);
      if (data) {
        let sql2 = `select * from user where loginName like "%${query.keywords}%"`;
        let count = await this.app.mysql.query(sql2)
        user = {
          totalCount: count.length,
          list: data
        }
      } else user = []
    } else {
      let sql = `select id,loginName from user limit ${(query.currentPage - 1) * 10}, 10`;
      let list = await this.app.mysql.query(sql);
      let count = await this.app.mysql.count('user')
      user = {
        totalCount: count,
        list: list
      }
    }
    return user;
  }
  // 添加用户
  async addUser (query) {
    const user = await this.app.mysql.get('user', {loginName: query.loginName});
    if (!user) {
      await this.app.mysql.insert('user', { loginName: query.loginName, loginPassword: query.loginPassword });
      return {code: 1, message: '添加成功'}
    } else {
      return {code: 0, message: '登录名重复'}
    }
  }
  // 删除用户
  async delUser (query) {
    let arr = query.ids.split(',')
    const result = await this.app.mysql.delete('user', {id: arr});
    if (result.affectedRows === 0) {
      return {code: 0, message: '删除失败'}
    } else {
      return {code: 1, message: '删除成功'}
    }
  }
  // 编辑用户
  async updateUser (query) {
    const user = await this.app.mysql.get('user', {loginName: query.loginName});
    if (user && user.id !== Number(query.id)) {
      return {code: 0, message: '登录名重复'}
    } else {
      const result = await this.app.mysql.update('user', {id: query.id, loginName: query.loginName, loginPassword: query.loginPassword});
      if (result.affectedRows === 0) {
        return {code: 0, message: '修改失败'}
      } else {
        return {code: 1, message: '修改成功'}
      }
    }
  }
  // 登录
  async login (query) {
    let result = await this.app.mysql.get('user', {loginName: query.loginName, loginPassword: query.loginPassword});
    return result
  }
}
 
module.exports = HomeService;
