'use strict';
 
module.exports = app => {
  const { router, controller } = app;
  const logMiddleware = app.middleware.text();
  router.get('/user', logMiddleware, controller.user.getUser);
  router.get('/initPage', logMiddleware, controller.user.initPage);
  router.post('/user', logMiddleware, controller.user.addUser);
  router.del('/user', logMiddleware, controller.user.delUser);
  router.put('/user', logMiddleware, controller.user.updateUser);
  router.post('/login', controller.user.login);
  router.get('/logout', controller.user.logout);
};