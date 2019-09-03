'use strict';
 
module.exports = app => {
  const { router, controller } = app;
  const logMiddleware = app.middleware.text();
  router.get('/article/comment', logMiddleware, controller.comment.articleComment);
  router.get('/comment/detail', logMiddleware, controller.comment.commentDetail);
  router.post('/addComment', logMiddleware, controller.comment.addComment);
  router.del('/delComment', logMiddleware, controller.comment.delComment);
};