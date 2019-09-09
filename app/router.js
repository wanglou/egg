'use strict';

const userRouter = require('./routers/user');
const articleRouter = require('./routers/article');
const articleComment = require('./routers/comment');
const index = require('./routers/index');
const messageWall = require('./routers/messageWall');
const friendChain = require('./routers/friendChain');
module.exports = app => {
  const { router, controller } = app;
  userRouter(app);
  articleRouter(app);
  articleComment(app);
  index(app);
  messageWall(app);
  friendChain(app);
};
