'use strict';
 
module.exports = app => {
  const { router, controller } = app;
  const logMiddleware = app.middleware.text();
  router.get('/getWeather', logMiddleware, controller.index.getWeather);
  router.get('/getIp', logMiddleware, controller.index.getIp);
  router.post('/upload/avatar', logMiddleware, controller.index.uploadAvatar);
  router.get('/index/count', logMiddleware, controller.index.getCount);
  router.get('/index/article', logMiddleware, controller.index.getArticle);
  router.get('/index/fiveCount', logMiddleware, controller.index.getFiveCount);
  router.get('/person', logMiddleware, controller.index.getPerson);
  router.put('/person', logMiddleware, controller.index.updatePerson);
};