const routes = require('express').Router();
const routerLesso1 = require('../controller/lesson1')

routes.get('/', routerLesso1.mainRoute);
routes.get('/about', routerLesso1.aboutRoute);
routes.get('/info', routerLesso1.infoRoute);

module.exports = routes;
