//_______________________________________________________________________________________
const mysql = require('mysql');
const _ = require('underscore');

const PdfPrinter = require('pdfmake');
const fs = require('fs');

const fonts = require('./fonts');
const styles = require('./styles');
const { content } = require('./pdfContent');

const produccionRecimet = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'patricio177',
  database: 'producciondev_recim',
  port: 3306,
});

//___________________________________________________

// const produccionRecimet = mysql.createConnection({
//   host: 'recimet.ddns.net',
//   user: 'root',
//   password: 'ka7224',
//   database: 'produccion_recim',
//   port: 3306,
// });

//___________________________________________________

// const produccionRecimet = mysql.createConnection({
//   host: 'kayrossistemas.ddns.net',
//   user: 'root',
//   password: 'ka7224',
//   database: 'produccion_recim',
//   port: 3306,
// });

//_______________________________________________________________________________________
// --- Keeping the connection alive ---
//_______________________________________________________________________________________
setInterval(function () {
  produccionRecimet.query(
    'SELECT Stock FROM Cajones WHERE IdCajon = ?',
    ['C00'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log('Keeping connection to Produccion alive');
        // console.log(result);
      }
    }
  );
}, 300000); // query every 5 min to keep the connection alive

//_______________________________________________________________________________________
// --- Login Component ---
//_______________________________________________________________________________________
const UsersListCont = (req, res) => {
  produccionRecimet.query(
    'SELECT IdCompradores, RazonSocial, Usuario, Pwd, Nivel FROM Compradores',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//_______________________________________________________________________________________
// --- General Context ---
//_______________________________________________________________________________________
const ClavesControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Claves', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//_________________________________________
const ClientesControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Clientes', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//____________________________________________
const CompradoresControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Compradores', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//_____________________________________________
const ComprobantesControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Comprobantes', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//__________________________________________
const ConceptosControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Conceptos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//__________________________________________
const DeudaControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Deuda', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//___________________________________________
const ProductosFotosControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM ProductosFotos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//___________________________________________
const OperaItemsControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM OperaItems', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//_________________________________________
const OperaMesControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM OperaMes', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//________________________________________
const PreciosControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Precios', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//__________________________________________
const ProductosControllers = (req, res) => {
  produccionRecimet.query('SELECT * FROM Productos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

//________________________________________
const UpdateCheckRequest = (req, res) => {
  const IdCompradores = req.query.IdCompradores;
  produccionRecimet.query(
    'SELECT Actualizar FROM Compradores WHERE IdCompradores = ?',
    [IdCompradores],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//______________________________________
const TablesUpdateDone = (req, res) => {
  const IdCompradores = req.body.IdCompradores;
  produccionRecimet.query(
    'UPDATE Compradores SET Actualizar = ? WHERE IdCompradores = ?',
    [0, IdCompradores],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//_______________________________________________________________________________________
// --- Procesos Ingresos ---
//_______________________________________________________________________________________
const UpdateComprobanteREM = (req, res) => {
  const comproREM = req.body.event;
  produccionRecimet.query(
    'UPDATE Comprobantes SET NumeroA = ? WHERE Comprobante = ?',
    [comproREM, 'REM'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//_____________________________
// form:[
//   { text: 'PLanilla' + `${content[0].Numero}`, style: "header" },
//   "segundo Parrafo"
//    ]

const EnvioIngresosPdf = (req, res) => {
  const content = req.body.payload;
  console.log(content);

  // const contentString = JSON.stringify(content, null, 3);
  const form = [];
  const widthCUno = 150;
  const widthCDos = 100;
  const widthCTres = 50;
  const widthCCuatro = 75;
  const itemTres = [
    // {
    //   table: [{
    //     body:[['Fecha:']],
    //     text: '\n \n \n \n \n  ' + `${content[0].FechaCpte}`,
    //     style: 'header',
    //   },],
    // },
    {
      table: {
        text: '\n \n \n \n \n \n',
        widths: [widthCUno, widthCDos, widthCTres, widthCCuatro],
        body: [
          [
            `Fecha: ${content[0].FechaCpte}`,
            `Planilla: ${content[0].Numero}`,
            `Chofer: ${content[0].IdChofer}`,
          ],
        ],
      },
    },
    {
      columns: [
        {
          text: '\n \n \n \n \n Comprobante de Pedido ',
          style: 'header',
        },
      ],
    },
    {
      columns: [
        {
          text: '\n \n \n \n \n',
          style: 'header',
        },
      ],
    },
  ];
  form.push([...itemTres]);

  const item = [
    {
      table: {
        text: '\n \n \n \n \n \n',
        widths: [widthCUno, widthCDos, widthCTres, widthCCuatro],
        body: [['Producto', 'Cantidad', 'Precio', 'Importe']],
      },
    },
  ];
  form.push([...item]);

  for (let i = 0; i < content.length; i++) {
    const itemDos = [
      {
        table: {
          borderWidth: 0,
          widths: [widthCUno, widthCDos, widthCTres, widthCCuatro],
          body: [
            [
              `${content[i].Descripcion}`,
              `${content[i].Cantidad}`,
              `${content[i].Precio}`,
              `${content[i].Cantidad * content[i].Precio}`,
            ],
          ],
        },
      },
    ];

    form.push([...itemDos]);
  }
  const itemCuatro = [
    {
      text: '\n \n \n \n \nGrupo Recimet y Cia S.R.L. ',
      style: 'header',
    },
  ];
  form.push([...itemCuatro]);

  let docDefinition = {
    content: form,
    styles: styles,
  };

  const printer = new PdfPrinter(fonts);

  let pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(
    fs.createWriteStream(
      `pdfTst${content[0].Numero}` + `${content[0].IdCliente}` + '.pdf'
    )
  );
  pdfDoc.end();
};

//_____________________________

const EnvioCotizacion = (req, res) => {
  const content = req.body.payload;
  console.log(content);

  // const contentString = JSON.stringify(content, null, 3);
  const form = [];
  const widthCUno = 150;
  const widthCDos = 100;
  const widthCTres = 50;
  const widthCCuatro = 75;
  const itemTres = [
    // {
    //   table: [{
    //     body:[['Fecha:']],
    //     text: '\n \n \n \n \n  ' + `${content[0].FechaCpte}`,
    //     style: 'header',
    //   },],
    // },
    {
      table: {
        text: '\n \n \n \n \n \n',
        widths: [widthCUno, widthCDos, widthCTres, widthCCuatro],
        body: [
          [
            `Fecha: ${content[0].FechaCpte}`,
            `Planilla: ${content[0].Numero}`,
            `Chofer: ${content[0].IdChofer}`,
          ],
        ],
      },
    },
    {
      columns: [
        {
          text: '\n \n \n \n \n Comprobante de Cotizacion ',
          style: 'header',
        },
      ],
    },
    {
      columns: [
        {
          text: '\n \n \n \n \n',
          style: 'header',
        },
      ],
    },
  ];
  form.push([...itemTres]);

  const item = [
    {
      table: {
        text: '\n \n \n \n \n \n',
        widths: [widthCUno, widthCDos, widthCTres, widthCCuatro],
        body: [['Producto', 'Cantidad', 'Precio', 'Importe']],
      },
    },
  ];
  form.push([...item]);

  for (let i = 0; i < content.length; i++) {
    const itemDos = [
      {
        table: {
          borderWidth: 0,
          widths: [widthCUno, widthCDos, widthCTres, widthCCuatro],
          body: [
            [
              `${content[i].Descripcion}`,
              `${content[i].Cantidad}`,
              `${content[i].Precio}`,
              `${content[i].Cantidad * content[i].Precio}`,
            ],
          ],
        },
      },
    ];

    form.push([...itemDos]);
  }
  const itemCuatro = [
    {
      text: '\n \n \n \n \nGrupo Recimet y Cia S.R.L. ',
      style: 'header',
    },
  ];
  form.push([...itemCuatro]);

  let docDefinition = {
    content: form,
    styles: styles,
  };

  const printer = new PdfPrinter(fonts);

  let pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(
    fs.createWriteStream(
      `pdfTst${content[0].Numero}` + `${content[0].IdCliente}` + '.pdf'
    )
  );
  pdfDoc.end();
  
  //-----------------------------------------
  const Comprobante = req.body.Comprobante;
  const Numero = req.body.Numero;
  const IdProducto = req.body.IdProducto;
  const Descripcion = req.body.Descripcion;
  const Cantidad = req.body.Cantidad;
  const Precio = req.body.Precio;
  const Estado = req.body.Estado;
  const Proceso = req.body.Proceso;
  const FechaCpte = req.body.FechaCpte;
  const IdCompradores = req.body.IdCompradores;
  const IdChofer = req.body.IdChofer;
  const IdAcompañante = req.body.IdAcompañante;
  const IdCliente = req.body.IdCliente;
  const Observaciones = req.body.Observaciones;
  produccionRecimet.query(
    'INSERT Cotizacion SET Comprobante = ?, Numero = ?, IdProducto = ?, Descripcion = ?,  Cantidad = ?, Precio = ?, Estado = ?, Proceso = ?, FechaCpte = ?, IdCompradores = ?, IdChofer = ?, IdAcompañante = ?, IdCliente = ?, Observaciones = ?',
    [
      Comprobante,
      Numero,
      IdProducto,
      Descripcion,
      Cantidad,
      Precio,
      Estado,
      Proceso,
      FechaCpte,
      IdCompradores,
      IdChofer,
      IdAcompañante,
      IdCliente,
      Observaciones,
    ],
    (err, result) => {
     
      // setTest(req.body);
      // msg()
      // pdf(test);

      //console.log(req.body)
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  //-----------------------------------------
};

// idCajon: req.body.IdCajon,
// letra: req.body.Letra,
// signo: req.body.Signo,
// estado: req.body.Estado,
// proceso: req.body.Proceso,
// lote: req.body.Lote,
// idCliente: req.body.IdCliente,
// idAcompañante: req.body.IdAcompañante,
// observaciones: req.body.Observaciones

//___________________________________
const EnvioIngresos = (req, res) => {
  //-----------------------------------------
  const Comprobante = req.body.Comprobante;
  const Numero = req.body.Numero;
  const IdProducto = req.body.IdProducto;
  const Descripcion = req.body.Descripcion;
  const IdCajon = req.body.IdCajon;
  const Letra = req.body.Letra;
  const Cantidad = req.body.Cantidad;
  const Precio = req.body.Precio;
  const Signo = req.body.Signo;
  const Estado = req.body.Estado;
  const Proceso = req.body.Proceso;
  const Lote = req.body.Lote;
  const FechaCpte = req.body.FechaCpte;
  const IdCompradores = req.body.IdCompradores;
  const IdCliente = req.body.IdCliente;
  const IdChofer = req.body.IdChofer;
  const IdAcompañante = req.body.IdAcompañante;
  const Observaciones = req.body.Observaciones;
  produccionRecimet.query(
    'INSERT OperaItems SET Comprobante = ?, Numero = ?, IdProducto = ?, Descripcion = ?, IdCajon = ?, Letra = ?, Cantidad = ?, Precio = ?, Signo = ?, Estado = ?, Proceso = ?, Lote = ?, FechaCpte = ?, IdCompradores = ?, IdCliente = ?, IdChofer = ?, IdAcompañante = ?, Observaciones = ?',
    [
      Comprobante,
      Numero,
      IdProducto,
      Descripcion,
      IdCajon,
      Letra,
      Cantidad,
      Precio,
      Signo,
      Estado,
      Proceso,
      Lote,
      FechaCpte,
      IdCompradores,
      IdCliente,
      IdChofer,
      IdAcompañante,
      Observaciones,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  //-----------------------------------------
};

//_______________________________________________________________________________________
// --- Procesos Gastos ---
//_______________________________________________________________________________________
const EnvioGastos = (req, res) => {
  const Descripcion = req.body.Descripcion;
  const Cantidad = req.body.Cantidad;
  const FechaCpte = req.body.FechaCpte;
  const FechaIngreso = req.body.FechaIngreso;
  const IdAcompañante = req.body.IdAcompañante;
  const IdBanco = req.body.IdBanco;
  const IdCliente = req.body.IdCliente;
  const IdChofer = req.body.IdChofer;
  const IdConcepto = req.body.IdConcepto;
  const IdCuenta = req.body.IdCuenta;
  const Importe = req.body.Importe;
  const ImporteDolar = req.body.ImporteDolar;
  const NroCheque = req.body.NroCheque;
  const Numero = req.body.Numero;
  const Observaciones = req.body.Observaciones;
  const Signo = req.body.Signo;
  const ValorDolar = req.body.ValorDolar;
  produccionRecimet.query(
    'INSERT Gastos SET Descripcion = ?, Cantidad = ?, FechaCpte = ?, FechaIngreso = ?, IdAcompañante = ?, IdBanco = ?, IdCliente = ?, IdChofer = ?, IdConcepto = ?, IdCuenta = ?, Importe = ?, ImporteDolar = ?, NroCheque = ?, Numero = ?, Observaciones = ?, Signo = ?, ValorDolar = ?',
    [
      Descripcion,
      Cantidad,
      FechaCpte,
      FechaIngreso,
      IdAcompañante,
      IdBanco,
      IdCliente,
      IdChofer,
      IdConcepto,
      IdCuenta,
      Importe,
      ImporteDolar,
      NroCheque,
      Numero,
      Observaciones,
      Signo,
      ValorDolar,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//_______________________________________________________________________________________
// --- Archivos Clientes ---
//_______________________________________________________________________________________
const AltaCliente = (req, res) => {
  const IdComprador = req.body.IdComprador;
  const IdCliente = req.body.IdCliente;
  const RazonSocial = req.body.RazonSocial;
  const Domicilio = req.body.Domicilio;
  const IdLocalidad = req.body.IdLocalidad;
  const IdProvincia = req.body.IdProvincia;
  const Telefono = req.body.Telefono;
  const Responsable = req.body.Responsable;
  const IdCategoriaIVA = req.body.IdCategoriaIVA;
  const Cuit = req.body.Cuit;
  const Observaciones = req.body.Observaciones;
  const Celular = req.body.Celular;
  const Email = req.body.Email;
  const EmailFW = req.body.EmailFW;
  const CodPostal = req.body.CodPostal;
  const Descuento = req.body.Descuento;
  const Habilitado = req.body.Habilitado;
  const ListaPrecios = req.body.ListaPrecios;
  const IdZona = req.body.IdZona;
  const IdForPago = req.body.IdForPago;
  const AcuVenta = req.body.AcuVenta;
  produccionRecimet.query(
    'INSERT Clientes SET IdComprador = ?, IdCliente = ?, RazonSocial = ?, Domicilio = ?, IdLocalidad = ?, IdProvincia = ?, Telefono = ?, Responsable = ?, IdCategoriaIVA = ?, Cuit = ?, Observaciones = ?, Celular = ?, Email = ?, EmailFW = ?, CodPostal = ?, Descuento = ?, Habilitado = ?, ListaPrecios = ?, IdZona = ?, IdForPago = ?, AcuVenta = ?',
    [
      IdComprador,
      IdCliente,
      RazonSocial,
      Domicilio,
      IdLocalidad,
      IdProvincia,
      Telefono,
      Responsable,
      IdCategoriaIVA,
      Cuit,
      Observaciones,
      Celular,
      Email,
      EmailFW,
      CodPostal,
      Descuento,
      Habilitado,
      ListaPrecios,
      IdZona,
      IdForPago,
      AcuVenta,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//__________________________________
const ModifCliente = (req, res) => {
  const IdComprador = req.body.IdComprador;
  const IdCliente = req.body.IdCliente;
  const RazonSocial = req.body.RazonSocial;
  const Domicilio = req.body.Domicilio;
  const IdLocalidad = req.body.IdLocalidad;
  const IdProvincia = req.body.IdProvincia;
  const Telefono = req.body.Telefono;
  const Responsable = req.body.Responsable;
  const IdCategoriaIVA = req.body.IdCategoriaIVA;
  const Cuit = req.body.Cuit;
  const Observaciones = req.body.Observaciones;
  const Celular = req.body.Celular;
  const Email = req.body.Email;
  const EmailFW = req.body.EmailFW;
  const CodPostal = req.body.CodPostal;
  const Descuento = req.body.Descuento;
  const Habilitado = req.body.Habilitado;
  const ListaPrecios = req.body.ListaPrecios;
  const IdZona = req.body.IdZona;
  const IdForPago = req.body.IdForPago;
  const AcuVenta = req.body.AcuVenta;
  produccionRecimet.query(
    'UPDATE Clientes SET IdComprador = ?, RazonSocial = ?, Domicilio = ?, IdLocalidad = ?, IdProvincia = ?, Telefono = ?, Responsable = ?, IdCategoriaIVA = ?, Cuit = ?, Observaciones = ?, Celular = ?, Email = ?, EmailFW = ?, CodPostal = ?, Descuento = ?, Habilitado = ?, ListaPrecios = ?, IdZona = ?, IdForPago = ?, AcuVenta = ? WHERE IdCliente = ?',
    [
      IdComprador,
      RazonSocial,
      Domicilio,
      IdLocalidad,
      IdProvincia,
      Telefono,
      Responsable,
      IdCategoriaIVA,
      Cuit,
      Observaciones,
      Celular,
      Email,
      EmailFW,
      CodPostal,
      Descuento,
      Habilitado,
      ListaPrecios,
      IdZona,
      IdForPago,
      AcuVenta,
      IdCliente,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//_______________________________________________________________________________________
// --- Archivos Claves ---
//_______________________________________________________________________________________
const AltaClave = (req, res) => {
  const IdClaves = req.body.IdClaves;
  const Descripcion = req.body.Descripcion;
  const Valor = req.body.Valor;
  const Variable = req.body.Variable;
  produccionRecimet.query(
    'INSERT Claves SET IdClaves = ?, Descripcion = ?, Valor = ?, Variable = ?',
    [IdClaves, Descripcion, Valor, Variable],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//__________________________________
const ModifClave = (req, res) => {
  const IdClaves = req.body.IdClaves;
  const Descripcion = req.body.Descripcion;
  const Valor = req.body.Valor;
  const Variable = req.body.Variable;
  produccionRecimet.query(
    'UPDATE Claves SET Descripcion = ?, Valor = ?, Variable = ? WHERE IdClaves = ?',
    [Descripcion, Valor, Variable, IdClaves],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// //__________________________________
// const PresupuestoControllers = (req, res) => {
//   ventasdev_beiko.query('SELECT * FROM Vendedores', (err, result) => {
//     // console.log(JSON.parse(res))
//     //console.log(result)
//     const PDFDocument = require("pdfkit");
//     const fs = require("fs");
//     doc = new PDFDocument();

//     // let id = 3

//     const format = '.pdf'
//     // if (id >= 0) {
//       const resultados = `vendedoresTest`
//       // const resultados = `vendedores27${id}`
//       doc.pipe(fs.createWriteStream(resultados + format));

//      // console.log(id)
//     // }
//     // const resultados = `vendedores27`
//     // doc.pipe(fs.createWriteStream(resultados + id +'.pdf'));
//     //console.log(stringify(res))
//     const loremIpsum = JSON.stringify(result, null, 3)
//    // doc.y = 320;
//     doc.fillColor("black");
//     console.log(loremIpsum.IdVendedores)
//     doc.text(loremIpsum, {
//       paragraphGap: 10,
//       indent: 20,
//       align: "justify",
//       columns: 1
//     });
//     //doc.pipe();
//     doc.end();
//     // id++
//     console.log(id)
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// };

//_______________________________________________________________________________________
//_______________________________________________________________________________________
module.exports = {
  AltaClave,
  AltaCliente,
  ClavesControllers,
  ClientesControllers,
  CompradoresControllers,
  ComprobantesControllers,
  ConceptosControllers,
  DeudaControllers,
  EnvioGastos,
  EnvioIngresos,
  ProductosFotosControllers,
  ModifClave,
  ModifCliente,
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
};

//_______________________________________________________________________________________
