'use strict';
 
module.exports = app => {
  const { router, controller } = app;
  const logMiddleware = app.middleware.text();
  router.get('/article', logMiddleware, controller.article.getArticle);
  router.post('/article', logMiddleware, controller.article.addArticle);
  router.del('/article', logMiddleware, controller.article.delArticle);
  router.put('/article', logMiddleware, controller.article.updateArticle);
  router.get('/article/detail', logMiddleware, controller.article.articleDetail);
  router.get('/article/category', logMiddleware, controller.article.articleCategory);
  router.post('/article/category', logMiddleware, controller.article.addArticleCategory);
  router.del('/article/category', logMiddleware, controller.article.delArticleCategory);
  router.get('/category/has/article', logMiddleware, controller.article.categoryHasArticle);
};