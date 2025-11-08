const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

router.use('./api-docs', swaggerUI.serve);
router.get('./api-docs', swaggerUI.setup(swaggerFile));

module.exports = router;