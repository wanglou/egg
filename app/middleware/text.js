module.exports = () => {
  return async function text(ctx, next) {
    await next();
    // if (ctx.session.loginName) {
    //   await next();
    // } else {
    //   ctx.body = {
    //     code: -2,
    //     msg: '用户未登录'
    //   }
    // }
  };
};