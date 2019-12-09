'use strict';
 
module.exports = app => {
  const { router, controller, io } = app;
  const logMiddleware = app.middleware.text();
  router.get('/friendChain', logMiddleware, controller.friendChain.getFriendChain);
  router.post('/friendChain', logMiddleware, controller.friendChain.addFriendChain);
  router.del('/friendChain', logMiddleware, controller.friendChain.delFriendChain);
  router.get('/websocketTest', logMiddleware, controller.friendChain.getWebsocketTest);
  io.of('/').route('websocketTest', controller.friendChain.websocketTest)
};