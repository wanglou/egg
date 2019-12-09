module.exports = () => {
  return async function connection(ctx, next) {
    console.log('connection');
  };
};