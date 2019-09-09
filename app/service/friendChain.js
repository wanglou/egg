
'use strict';
 
const Service = require('egg').Service;
class HomeService extends Service {
  async getFriendChain() {
    const result = await this.app.mysql.select('friendChain');
    return { code: 1, message: '查询成功', result: result}
  }
  async addFriendChain(query) {
    await this.app.mysql.insert('friendChain', { name: query.name, url: query.url });
    return {code: 1, message: '添加成功'}
  }
  async delFriendChain(query) {
    await this.app.mysql.delete('friendChain', { id: query.id });
    return {code: 1, message: '删除成功'}
  }
}
 
module.exports = HomeService;
