
'use strict';
 
const Service = require('egg').Service;
class HomeService extends Service {
  // 留言列表
  async messageList() {
    const result = await this.app.mysql.select('message');
    return { code: 1, message: '查询成功', result: result}
  }
  // 删除留言
  async delMessage(query) {
    await this.app.mysql.delete('message', {
      id: query.id,
    });
    return { code: 1, message: '删除成功'}
  }
}
 
module.exports = HomeService;
