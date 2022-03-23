const express = require('express');
const departmentsRouter = require('./departaments.router');
function routerApi(my_app) {
  const route = express.Router();
  /* Endpont estático: http://localhost:4000/api/v1/ */
  my_app.use('/api/v1', route);
  /* Endpont estático: http://localhost:4000/api/v1/departments */
  route.use('/departaments', departmentsRouter);
}
module.exports = routerApi;