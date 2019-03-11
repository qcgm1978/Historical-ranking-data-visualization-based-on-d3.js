const Koa = require("koa");
var Router = require("koa-router");

var app = new Koa();
var router = new Router();
const elements = require("./get-elements");
router
  .get("/", (ctx, next) => {
    debugger;
    // ctx.router available
  })
  .get("/foo", (ctx, next) => {
    ctx.body = "elements";
  })
  .get("/elements", (ctx, next) => {
    // ctx.header.content - type
    ctx.body = elements.getAllElements();
  });
// app.use(ctx => {
//   ctx.body = "Hello Koa";
// });

app.use(router.routes()).use(router.allowedMethods());
app.listen(4000);
