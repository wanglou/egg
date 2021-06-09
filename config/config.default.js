/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  
  // 配置 mysql 数据库
  config.mysql  = {
    // 单数据库信息配置
    client: {
      // host
      host: '124.70.88.47',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'egg_database',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };
  // 改变启动端口号
  config.cluster = {
    listen: {
      path: '',
      port: 8082,
      hostname: '0.0.0.0',
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565945829189_3895';

  // add your middleware config here
  // config.middleware = ['text'];

  //多出来的配置==========
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.security = {
    csrf: {
      enable: false,
    }
  };
  config.io = {
    init: {},
    namespace: {
      '/': {
      }
    }
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
