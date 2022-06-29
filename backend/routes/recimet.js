//_______________________________________________________________________________________
const { Router } = require('express');
const router = Router();

const {
  AltaClave,
  AltaCliente,
  ModifClave,
  ModifCliente,
  ClavesControllers,
  ClientesControllers,
  CompradoresControllers,
  ComprobantesControllers,
  ConceptosControllers,
  DeudaControllers,
  EnvioGastos,
  EnvioIngresos,
  ProductosFotosControllers,
  OperaItemsControllers,
  OperaMesControllers,
  PreciosControllers,
  ProductosControllers,
  UpdateComprobanteREM,
  TablesUpdateDone,
  UpdateCheckRequest,
  UsersListCont,
  EnvioCotizacion,
  EnvioIngresosPdf,
  // PresupuestoControllers,
} = require('../controllers/producion.controllers');

const {
  ProveedoresControllers,
  AltaProveedor,
  ModifProveedor,
} = require('../controllers/vehiculos.controllers');

//_______________________________________________________________________________________
// --- Login Component ---
//_______________________________________________________________________________________
router.get('/usersList', UsersListCont);

//_______________________________________________________________________________________
// --- General Context ---
//_______________________________________________________________________________________
router.get('/claves', ClavesControllers);

router.get('/clientes', ClientesControllers);

router.get('/compradores', CompradoresControllers);

router.get('/comprobantes', ComprobantesControllers);

router.get('/conceptos', ConceptosControllers);

router.get('/deuda', DeudaControllers);

router.get('/operaItems', OperaItemsControllers);

router.get('/productosFotos', ProductosFotosControllers);

router.get('/operaMes', OperaMesControllers);

router.get('/precios', PreciosControllers);

router.get('/productos', ProductosControllers);

router.get('/updateCheck', UpdateCheckRequest);

router.put('/tablesUpdateDone', TablesUpdateDone);

//_______________________________________________________________________________________
// --- Procesos Ingresos ---
//_______________________________________________________________________________________
router.put('/updateComproREM', UpdateComprobanteREM);

router.post('/procIngresos', EnvioIngresos);

router.post('/procIngresosPdf', EnvioIngresosPdf);

router.post('/procCotizacion', EnvioCotizacion);
//


// router.post('/procPresupuesto', PresupuestoControllers);

//_______________________________________________________________________________________
// --- Procesos Gastos ---
//_______________________________________________________________________________________
router.post('/procGastos', EnvioGastos);

//_______________________________________________________________________________________
// --- Archivos Claves ---
//_______________________________________________________________________________________
router.post('/altaClave', AltaClave);

router.put('/modifClave', ModifClave);

//_______________________________________________________________________________________
// --- Archivos Clientes ---
//_______________________________________________________________________________________
router.post('/altaCliente', AltaCliente);

router.put('/modifCliente', ModifCliente);

//_______________________________________________________________________________________
// --- Archivos Proveedores ---
//_______________________________________________________________________________________
router.get('/proveedores', ProveedoresControllers);

router.post('/altaProveedor', AltaProveedor);

router.put('/modifproveedor', ModifProveedor);

//_______________________________________________________________________________________
//_______________________________________________________________________________________
module.exports = router;

//_______________________________________________________________________________________
