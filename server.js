const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const GetTaxController = require('./taxes/get-tax');
const taxRegulator = require('./taxes/tax-regulators')
const calculator = require('./taxes/calculator')

const app = new Koa();
const router = new Router({
    prefix: '/api/v1/'
});

app.use(bodyParser());

router.get('/', ctx => {
    ctx.body = "Root of project"
});

const taxController = new GetTaxController({taxRegulator, calculator});
router.post('get-tax', taxController.process.bind(taxController));

app.use(router.routes());

app.listen(4000);