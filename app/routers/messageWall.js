'use strict';
 
module.exports = app => {
  const { router, controller } = app;
  const logMiddleware = app.middleware.text();
  router.get('/messageList', logMiddleware, controller.messageWall.messageList);
  router.del('/messageList', logMiddleware, controller.messageWall.delMessage);
};