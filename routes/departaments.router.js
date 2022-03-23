const express = require('express');
const router = express.Router();
const departamentsJson = require('../json/departaments.json');
/* REQUEST HTTP API */
/* Endpoint: http://localhost:4000/api/v1/departaments */
router.get('/', (req, res) => {
  res.json(departamentsJson);
});
/* Dependiendo del codigo del departamenta que el usuario ingrese como parametro */
/* Endpoint: http://localhost:4000/api/v1/departaments/5 */
router.get('/:departmentId', (req, res) => {
  const { departmentId } = req.params;
  const departaments_muncipalities = departamentsJson.filter(
    (department) => department['c_digo_dane_del_departamento'] === departmentId
  );
  res.json(departaments_muncipalities);
});
/* Consultar los departamentos que tienen un nombre con más de ocho caracteres */
/* Endpoint: http://localhost:4000/api/v1/departaments/department/name */
router.get('/department/name', (req, res) => {
  const departaments = departamentsJson.filter(
    (department) => department['departamento'].length > 8
  );
  res.json(departaments);
});
/* Actividad:  */
/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* Endpoint: http://localhost:4000/api/v1/departaments/department/codigo */
router.get('/department/codigo', (req, res) => {
  const departaments = departamentsJson.filter(
    (department) =>
      department['c_digo_dane_del_departamento'] > 15 &&
      department['c_digo_dane_del_departamento'] < 20
  );
  res.json(departaments);
});
/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON*/
/* Con parametro: http://localhost:4000/api/v1/departaments/department/municipies?cd=5 */
/* Sin parametro: http://localhost:4000/api/v1/departaments/department/municipies */
router.get('/department/municipies', (req, res) => {
  const { cd } = req.query;
  if (cd) {
    const dep = departamentsJson.filter(
      (departament) => departament['c_digo_dane_del_departamento'] == cd
    );
    res.json(dep);
  } else {
    res.json(departamentsJson);
  }
});
/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
/* Con parametro: http://localhost:4000/api/v1/departaments/department/nombreMunicipio?MunName=Armenia */
/* Sin parametro: http://localhost:4000/api/v1/departaments/department/nombreMunicipio */
router.get('/department/nombreMunicipio', (req, res) => {
  const { MunName } = req.query;
  if (MunName) {
    const muncipalities = departamentsJson.filter(
      (municipality) => municipality['municipio'] == MunName
    );
    res.json(muncipalities);
  } else {
    const muncipalities = departamentsJson.filter(
      (municipality) => municipality['departamento'] == 'Caldas'
    );
    res.json(muncipalities);
  }
});
/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
/* http://localhost:4000/api/v1/departaments/department/nameC */
router.get('/department/nameC', (req, res) => {
  const departaments = departamentsJson.filter(
    (department) => department['departamento'].charAt(0) == 'C'
  );
  res.json(departaments);
});
module.exports = router;