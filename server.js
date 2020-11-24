const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const TaxController = require('./taxes/tax-controller');

const app = new Koa();
const router = new Router({
    prefix: '/api/v1/'
});

app.use(bodyParser());

router.get('/', ctx => {
    ctx.body = "Root of project"
});

const taxController = new TaxController();
router.post('get-tax', taxController.process);

app.use(router.routes());

app.listen(4000);