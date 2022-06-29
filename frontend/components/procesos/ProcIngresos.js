import React, { useState, useContext, useRef, useEffect } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Platform } from 'react-native';
// let TouchableOpacity;
// if (Platform.OS === 'ios') {
//   ({ TouchableOpacity } = require('react-native-gesture-handler'));
// } else {
//   ({ TouchableOpacity } = require('react-native'));
// }

import GeneralContext from '../../contexts/GeneralContext';
import colors from '../../assets/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

//___________________________________________________________________________________
const ProcIngresos = ({ navigation, route }) => {
  //___________________________________________________________________________________

  //___________________________________________________________________________________
  const {
    loggedStatus,
    tablesLoaded,
    ipBackend,
    ipRequestDone,
    fechaGC,
    // connecChecked,
    // connectivityCheck,
    connected,
    tablaClientes,
    tablaCompradores,
    tablaComprobantes,
    tablaProductos,
    planillaGC,
    choferGC,
    acompañanteGC,
    dataGCLoaded,
    valorDolarGC,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [calcImporte, setCalcImporte] = useState(false);
  const [editPlanilla, setEditPlanilla] = useState(false);
  const [editComprador, setEditComprador] = useState(false);
  const [editCliente, setEditCliente] = useState(false);
  const [editProducto, setEditProducto] = useState(false);
  const [editCantidad, setEditCantidad] = useState(false);
  const [editObservaciones, setEditObservaciones] = useState(false);
  const [editPrecio, setEditPrecio] = useState(false);
  const [editPrecioUSD, setEditPrecioUSD] = useState(false);
  const [enviarIngreso, setEnviarIngreso] = useState(false);
  const [handleFocus, setHandleFocus] = useState(false);
  const [modifElim, setModifElim] = useState(false);
  const [ingresoGenerado, setIngresoGenerado] = useState(false);
  const [performPedidoCheck, setPerformPedidoCheck] = useState(false);
  const [removeItemsLS, setRemoveItemsLS] = useState(false);
  const [savePedCola, setSavePedCola] = useState(false);
  const [someQueryQueue, setSomeQueryQueue] = useState(false);
  const [estadoOne, setEstadoOne] = useState(false);
  const [estadoTwo, setEstadoTwo] = useState(false);
  const [estadoThree, setEstadoThree] = useState(false);
  const [estadoFour, setEstadoFour] = useState(false);
  const [cleanUp, setCleanUp] = useState(true);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [cajon, setCajon] = useState();
  const [cantidad, setCantidad] = useState();
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState();
  const [comprador, setComprador] = useState();
  const [estado, setEstado] = useState();
  const [idComprador, setIdComprador] = useState();
  const [idCliente, setIdCliente] = useState();
  const [idProducto, setIdProducto] = useState();
  const [importe, setImporte] = useState();
  const [itemsPedidos, setItemsPedidos] = useState([]);
  const [itemsPedBeingSent, setItemsPedBeingSent] = useState([]);
  const [itemToSend, setItemToSend] = useState([]);
  const [letra, setLetra] = useState('A');
  const [numPedBeingSent, setNumPedBeingSent] = useState([]);
  const [planilla, setPlanilla] = useState();
  const [planillaSaved, setPlanillaSaved] = useState();
  const [precio, setPrecio] = useState();
  const [precioTabla, setPrecioTabla] = useState();
  const [precioUSD, setPrecioUSD] = useState();
  const [producto, setProducto] = useState();
  const [queryBeingSent, setQueryBeingSent] = useState([]);
  const [queryEnCola, setQueryEnCola] = useState([]);
  const [queryEnviado, setQueryEnviado] = useState([]);
  const [querySaliente, setQuerySaliente] = useState([]);
  const [queryToSend, setQueryToSend] = useState([]);
  const [selecting, setSelecting] = useState();
  const [total, setTotal] = useState();
  const [observaciones, setObservaciones] = useState();
  const [valorDolar, setValorDolar] = useState();
  const [enviarCotizacion, setEnviarCotizacion] = useState(false)
  const [cotizacionGenerada, setCotizacionGenerada] = useState(false)



  //___________________________________________________________________________________
  const planillaRef = useRef();
  const cantidadRef = useRef();
  const clienteRef = useRef();
  const compradorRef = useRef();
  const precioUSDRef = useRef();
  const observacionesRef = useRef();
  const precioRef = useRef();
  const productoRef = useRef();

  //___________________________________________________________________________________
  useEffect(() => {
    setPlanilla(planillaGC);
    setPlanillaSaved(planillaGC);
    setValorDolar(valorDolarGC);
  }, [dataGCLoaded]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (loggedStatus.isLogged === true && tablesLoaded === true) {
      setComprador(loggedStatus.username);
      setIdComprador(loggedStatus.idCompLogged);
    }
  }, [loggedStatus, tablesLoaded]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editPlanilla === true) {
        planillaRef.current.focus();
      } else if (editComprador === true) {
        compradorRef.current.focus();
      } else if (editCliente === true) {
        clienteRef.current.focus();
      } else if (editProducto === true) {
        productoRef.current.focus();
      } else if (editCantidad === true) {
        cantidadRef.current.focus();
      } else if (editObservaciones === true) {
        observacionesRef.current.focus();
      } else if (editPrecio === true) {
        precioRef.current.focus();
      } else if (editPrecioUSD === true) {
        precioUSDRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

  //_______________
  useEffect(() => {
    if (
      editCantidad === true ||
      editCliente === true ||
      editComprador === true ||
      editObservaciones === true ||
      editPlanilla === true ||
      editPrecio === true ||
      editPrecioUSD === true ||
      editProducto === true
    ) {
      setHandleFocus(true);
    }
  }, [
    editCantidad,
    editCliente,
    editComprador,
    editPrecioUSD,
    editObservaciones,
    editPlanilla,
    editPrecio,
    editProducto,
  ]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof estado !== 'undefined') {
      if (estado == 1) {
        setEstadoOne(true);
        setEstadoTwo(false);
        setEstadoThree(false);
        setEstadoFour(false);
      } else if (estado == 2) {
        setEstadoOne(false);
        setEstadoTwo(true);
        setEstadoThree(false);
        setEstadoFour(false);
      } else if (estado == 3) {
        setEstadoOne(false);
        setEstadoTwo(false);
        setEstadoThree(true);
        setEstadoFour(false);
      } else if (estado == 4) {
        setEstadoOne(false);
        setEstadoTwo(false);
        setEstadoThree(false);
        setEstadoFour(true);
      }
    }
  }, [estado]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (selecting === 'comprador') {
        const filter = (event) => {
          return event.IdCompradores == itemSelected;
        };
        const data = tablaCompradores.filter(filter);
        if (data.length !== 0) {
          setComprador(data[0].RazonSocial);
          setIdComprador(data[0].IdCompradores);
        }
      } else if (selecting === 'cliente') {
        const filter = (event) => {
          return event.IdCliente == itemSelected;
        };
        const data = tablaClientes.filter(filter);
        if (data.length !== 0) {
          setCliente(data[0].RazonSocial);
          setIdCliente(data[0].IdCliente);
          if (data[0].IdComprador != idComprador) {
            Alert.alert(
              'Alerta!',
              'Cliente no corresponde a Comprador - ¿Desea Continuar?',
              [
                {
                  text: 'Si',
                  onPress: () => handleSi(),
                },
                {
                  text: 'No',
                  onPress: () => handleNo(),
                },
              ]
            );
          }
          const handleSi = () => {
            return;
          };
          const handleNo = () => {
            setCliente();
            setEditCliente(true);
            return;
          };
        }
      } else if (selecting === 'producto' || selecting === 'cartItem') {
        const filter = (event) => {
          return event.IdProducto == itemSelected;
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          if (carrito.length !== 0) {
            const prodInCart = (event) => {
              return event.idProducto == data[0].IdProducto;
            };
            const productFound = carrito.filter(prodInCart);
            if (productFound.length !== 0) {
              if (selecting === 'cartItem') {
                setProducto(productFound[0].producto);
                setIdProducto(productFound[0].idProducto);
                setCajon(productFound[0].cajon);
                setCantidad(parseFloat(productFound[0].cantidad));
                setPrecio(parseFloat(productFound[0].precio));
                setImporte(parseFloat(productFound[0].importe));
                setPrecioUSD(parseFloat(productFound[0].precioUSD));
                setValorDolar(productFound[0].valorDolar);
                setEstado(parseFloat(productFound[0].estado));
                setModifElim(true);
              } else {
                Alert.alert(
                  'Alerta!',
                  'Producto ya ingresado. ¿Desea Eliminar / Modificar?',
                  [
                    { text: 'Si', onPress: () => handleSi() },
                    { text: 'No', onPress: () => handleNo() },
                  ]
                );
                const handleSi = () => {
                  setProducto(productFound[0].producto);
                  setIdProducto(productFound[0].idProducto);
                  setCajon(productFound[0].cajon);
                  setCantidad(parseFloat(productFound[0].cantidad));
                  setPrecio(parseFloat(productFound[0].precio));
                  setImporte(parseFloat(productFound[0].importe));
                  setPrecioUSD(parseFloat(productFound[0].precioUSD));
                  setValorDolar(productFound[0].valorDolar);
                  setEstado(parseFloat(productFound[0].estado));
                  setModifElim(true);
                  setEditCantidad(true);
                  return;
                };
                const handleNo = () => {
                  setProducto();
                  setCantidad();
                  setCajon();
                  setPrecio();
                  setImporte();
                  setPrecioUSD();
                  setEstado();
                  setEditProducto(true);
                  return;
                };
              }
            } else {
              setProducto(data[0].Descripcion);
              setIdProducto(data[0].IdProducto);
              if (
                data[0].CostoComprador == 0 ||
                typeof data[0].CostoComprador == 'undefined'
              ) {
                handlePrecioCero();
              } else {
                setPrecio(data[0].CostoComprador);
                setPrecioTabla(data[0].CostoComprador);
              }
              setCajon(data[0].IdCajon);
            }
          } else {
            setProducto(data[0].Descripcion);
            setIdProducto(data[0].IdProducto);
            if (
              data[0].CostoComprador == 0 ||
              typeof data[0].CostoComprador == 'undefined'
            ) {
              handlePrecioCero();
            } else {
              setPrecio(data[0].CostoComprador);
              setPrecioTabla(data[0].CostoComprador);
            }
            setCajon(data[0].IdCajon);
          }
        }
      }
      setSelecting();
      navigation.setParams({ itemSelected: 'null' });
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  const planillaHandler = (event) => {
    if (event !== 'undefined') {
      setPlanilla(event);
    }
  };

  //___________________________________________________________________________________
  const compradorHandler = (event) => {
    if (typeof event !== 'undefined') {
      setComprador(event);
    }
  };

  //___________________________________________________________________________________
  const clienteHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCliente(event);
    }
  };

  //___________________________________________________________________________________
  const productoHandler = (event) => {
    if (typeof event !== 'undefined') {
      setProducto(event);
    }
  };

  //___________________________________________________________________________________
  const cantidadHandler = (cantidad) => {
    if (!isNaN(+cantidad)) {
      setCantidad(parseFloat(cantidad));
    } else {
      Alert.alert('Alerta!', 'Ingrese decimales usando punto', [
        {
          text: 'Cerrar Alerta',
          onPress: () => blurCantidad(),
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const precioHandler = (precio) => {
    // lineas siguiente se usan si precio es entero o integer
    // if (precio !== 0 && typeof precio !== 'undefined') {
    //   const newPrecio = precio.replace(/[^0-9]/g, '');
    //   if (newPrecio !== '') {
    //     setPrecio(parseFloat(newPrecio));
    //   }
    // }
    if (!isNaN(+precio)) {
      setPrecio(parseFloat(precio));
    } else {
      Alert.alert('Alerta!', 'Ingrese decimales usando punto', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const precioUSDHandler = (event) => {
    if (typeof event !== 'undefined') {
      setPrecioUSD(parseFloat(event));
    }
  };

  //___________________________________________________________________________________
  const observacionesHandler = (event) => {
    if (typeof event !== 'undefined') {
      setObservaciones(event);
    }
  };

  //___________________________________________________________________________________
  const planillaTouched = () => {
    setPlanilla();
    setEditPlanilla(true);
  };

  //___________________________________________________________________________________
  const compradorTouched = () => {
    setComprador();
    setIdComprador();
    setSelecting('comprador');
    setEditComprador(true);
  };

  //___________________________________________________________________________________
  const clienteTouched = () => {
    setCliente();
    setIdCliente();
    setSelecting('cliente');
    setEditCliente(true);
  };

  //___________________________________________________________________________________
  const productoTouched = () => {
    setCalcImporte(false);
    setProducto();
    setIdProducto();
    setPrecio();
    setCajon();
    setSelecting('producto');
    setEditProducto(true);
  };

  //___________________________________________________________________________________
  const cantidadTouched = () => {
    setCantidad();
    setCalcImporte(false);
    setEditCantidad(true);
  };

  //___________________________________________________________________________________
  const observacionesTouched = () => {
    setEditObservaciones(true);
  };

  //___________________________________________________________________________________
  const precioTouched = () => {
    setPrecio();
    setCalcImporte(false);
    setEditPrecio(true);
  };

  //___________________________________________________________________________________
  const precioUSDTouched = () => {
    setPrecioUSD();
    setEditPrecioUSD(true);
  };

  //___________________________________________________________________________________
  const compTableTouched = () => {
    setSelecting('comprador');
    navigation.navigate('SearchResults', {
      result: tablaCompradores,
      callBy: 'procIngresosComp',
    });
  };

  //___________________________________________________________________________________
  const agregarItemTouched = () => {
    if (typeof comprador === 'undefined') {
      Alert.alert('Error!', 'Complete Comprador', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof cliente === 'undefined') {
      Alert.alert('Error!', 'Complete Cliente', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof producto === 'undefined') {
      Alert.alert('Error!', 'Complete Producto', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof cantidad === 'undefined') {
      Alert.alert('Error!', 'Complete Cantidad', [{ text: 'Cerrar Alerta' }]);
    } else if (
      (typeof precio === 'undefined' || precio === 0) &&
      typeof precioUSD === 'undefined'
    ) {
      Alert.alert('Error!', 'Complete Precio o Precio USD', [
        { text: 'Cerrar Alerta' },
      ]);
    } else if (typeof estado === 'undefined') {
      Alert.alert('Error!', 'Complete Estado', [{ text: 'Cerrar Alerta' }]);
    } else if (
      typeof comprador !== 'undefined' &&
      typeof cliente !== 'undefined' &&
      typeof producto !== 'undefined' &&
      typeof cantidad !== 'undefined' &&
      (typeof precio !== 'undefined'  ||
      typeof precioUSD !== 'undefined') &&
      typeof estado !== 'undefined' &&
      modifElim === true
    ) {
      if (cantidad === 0) {
        const newCarrito = carrito.filter((item) => {
          return item.idProducto != idProducto;
        });
        setCarrito(newCarrito);
      } else if (precio !== 0 && cantidad !== 0) {
        setCarrito(
          carrito.map((val) => {
            return val.idProducto == idProducto
              ? {
                idNumIngreso: planilla,
                idProducto: idProducto,
                producto: producto,
                cantidad: cantidad,
                precio: precio,
                importe: importe,
                estado: estado,
                cajon: cajon,
                observaciones: observaciones ? observaciones : '-',
                precioUSD: precioUSD,
                valorDolar: valorDolar,
              }
              : val;
          })
        );
      }
      partialCleanUp();
      setModifElim(false);
      return;
    } else if (
      typeof comprador !== 'undefined' &&
      typeof cliente !== 'undefined' &&
      typeof producto !== 'undefined' &&
      typeof cantidad !== 'undefined' &&
      (typeof precio !== 'undefined'  ||
      typeof precioUSD !== 'undefined')&&
      typeof estado !== 'undefined' &&
      cantidad !== 0 &&
      precio !== 0 &&
      modifElim === false
    ) {
      const newCarrito = [
        ...carrito,
        {
          idNumIngreso: planilla,
          idProducto: idProducto,
          producto: producto,
          cantidad: cantidad,
          precio: precio,
          importe: importe,
          estado: estado,
          cajon: cajon,
          observaciones: observaciones ? observaciones : '-',
          precioUSD: precioUSD,
          valorDolar: valorDolar,
        },
      ];
      setCarrito(newCarrito);
      partialCleanUp();
      return;
    }
  };

  // ______________________________________________________________________________________
  const updateComprobanteREM = async (numero) => {
    let source = Axios.CancelToken.source();
    const updateComproREM = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/updateComproREM';
      try {
        await Axios.put(
          urlAxiosRequest,
          { event: numero },
          {
            cancelToken: source.token,
          }
        );
      } catch (error) {
        if (Axios.isCancel(error)) {
        } else {
          console.log(error);
        }
      }
    };
    updateComproREM();
    return () => {
      source.cancel();
    };
  };

  //__________________________
  const blurPlanilla = () => {
    if (typeof planilla !== 'undefined' && tablesLoaded === true) {
      if (planilla === 0) {
        const filter = (event) => {
          return event.Comprobante == 'REM';
        };
        const data = tablaComprobantes.filter(filter);
        if (data.length !== 0) {
          const planillaString = JSON.stringify(data[0].NumeroA);
          setPlanilla(planillaString);
          setPlanillaSaved(planillaString);
          const newREM = parseFloat(data[0].NumeroA) + 1;
          updateComprobanteREM(newREM);
        }
      } else if (planilla != planillaSaved) {
        Alert.alert('Alerta!', 'No coincide Número Planilla!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Planilla!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditPlanilla(false);
  };

  //___________________________________________________________________________________
  const blurComprador = () => {
    if (typeof comprador !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        if (!isNaN(+comprador)) {
          return event.IdCompradores == comprador;
        } else {
          return event.RazonSocial.toLowerCase().includes(
            comprador.toLowerCase()
          );
        }
      };
      const data = tablaCompradores.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          setComprador(data[0].RazonSocial);
          setIdComprador(data[0].IdCompradores);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'procIngresosComp',
          });
        }
      } else {
        setComprador();
        setIdComprador();
        Alert.alert('Alerta!', 'Comprador no encontrado', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Comprador!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditComprador(false);
  };

  //___________________________________________________________________________________
  const blurCliente = () => {
    if (typeof cliente !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        if (!isNaN(+cliente)) {
          return event.IdCliente == cliente;
        } else {
          return event.RazonSocial.toLowerCase().includes(
            cliente.toLowerCase()
          );
        }
      };
      const data = tablaClientes.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          setCliente(data[0].RazonSocial);
          setIdCliente(data[0].IdCliente);
          if (data[0].IdComprador != idComprador) {
            Alert.alert(
              'Alerta!',
              'Cliente no corresponde a Comprador - ¿Desea Continuar?',
              [
                {
                  text: 'Si',
                  onPress: () => handleSi(),
                },
                {
                  text: 'No',
                  onPress: () => handleNo(),
                },
              ]
            );
          }
          const handleSi = () => {
            return;
          };
          const handleNo = () => {
            setCliente();
            setEditCliente(true);
            return;
          };
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'procIngresosClie',
          });
        }
      } else {
        setCliente();
        setIdCliente();
        Alert.alert('Alerta!', 'Cliente no encontrado/a', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Cliente!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditCliente(false);
  };

  //___________________________________________________________________________________
  const handleModifProducto = () => {
    productoTouched();
  };

  const handleModifPrecio = () => {
    setEditPrecio(true);
  };

  const handlePrecioCero = () => {
    Alert.alert(
      'Alerta!',
      'Producto con Precio cero. Modifique Producto o Precio',
      [
        {
          text: 'Producto',
          onPress: () => handleModifProducto(),
        },
        { text: 'Precio', onPress: () => handleModifPrecio() },
      ]
    );
  };

  //___________________________________________________________________________________
  const blurProducto = () => {
    if (typeof producto !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return event.IdProducto.toLowerCase().includes(producto.toLowerCase());
      };
      const data = tablaProductos.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          if (carrito.length !== 0) {
            const prodInCart = (event) => {
              return event.producto.toLowerCase() == producto.toLowerCase();
            };
            const productFound = carrito.filter(prodInCart);
            if (productFound.length != 0) {
              Alert.alert(
                'Alerta!',
                'Producto ya ingresado. ¿Desea Eliminar / Modificar?',
                [
                  { text: 'Si', onPress: () => handleSi() },
                  { text: 'No', onPress: () => handleNo() },
                ]
              );
              const handleSi = () => {
                setProducto(productFound[0].producto);
                setIdProducto(productFound[0].idProducto);
                setCantidad(parseFloat(productFound[0].cantidad));
                setPrecio(parseFloat(productFound[0].precio));
                setImporte(parseFloat(productFound[0].importe));
                setPrecioUSD(parseFloat(productFound[0].precioUSD));
                setValorDolar(productFound[0].valorDolar);
                setEstado(parseFloat(productFound[0].estado));
                setModifElim(true);
                setEditCantidad(true);
                return;
              };
              const handleNo = () => {
                setProducto();
                setIdProducto();
                setCantidad();
                setPrecio();
                setImporte();
                setEstado();
                setEditProducto(true);
                return;
              };
            } else {
              // if product isn't already in carrito
              setProducto(data[0].Descripcion);
              setIdProducto(data[0].IdProducto);
              if (
                data[0].CostoComprador == 0 ||
                typeof data[0].CostoComprador == 'undefined'
              ) {
                handlePrecioCero();
              } else {
                setPrecio(data[0].CostoComprador);
                setPrecioTabla(data[0].CostoComprador);
              }
              setCajon(data[0].IdCajon);
            }
          } else {
            setProducto(data[0].Descripcion);
            setIdProducto(data[0].IdProducto);
            if (
              data[0].CostoComprador == 0 ||
              typeof data[0].CostoComprador == 'undefined'
            ) {
              handlePrecioCero();
            } else {
              setPrecio(data[0].CostoComprador);
              setPrecioTabla(data[0].CostoComprador);
            }
            setCajon(data[0].IdCajon);
          }
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'procIngresosProd',
          });
        }
      } else {
        setProducto();
        setIdProducto();
        Alert.alert('Alerta!', 'Producto no encontrado', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Producto!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditProducto(false);
  };

  //___________________________________________________________________________________
  const blurCantidad = () => {
    if (typeof cantidad === 'undefined') {
      Alert.alert('Alerta!', 'Complete Cantidad!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    } else {
      if (typeof producto === 'undefined') {
        Alert.alert('Alerta!', 'Complete Producto antes que Cantidad!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      } else {
        if (cantidad != 0 && typeof cantidad !== 'undefined') {
          const tempCajon = cajon.substr(1, 2);
          const numCajon = parseInt(tempCajon);
          if (numCajon > 21) {
            if (!isNaN(+cantidad)) {
              const tempCantidad = parseFloat(cantidad).toFixed(2);
              setCantidad(parseFloat(tempCantidad));
            } else {
              Alert.alert('Alerta!', 'Ingrese decimales usando punto', [
                {
                  text: 'Cerrar Alerta',
                },
              ]);
            }
          } else {
            const newCantidad = parseInt(cantidad);
            setCantidad(parseFloat(newCantidad));
          }
        }
      }
      if (
        typeof cantidad !== 'undefined' &&
        (typeof precio !== 'undefined' || typeof precioUSD !== 'undefined')
      ) {
        setCalcImporte(true);
      }
    }
    setEditCantidad(false);
  };

  //___________________________________________________________________________________
  const blurPrecio = () => {
    if (typeof precio === 'undefined') {
      Alert.alert('Alerta!', 'Complete Precio!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    } else {
      if (precio > precioTabla) {
        Alert.alert(
          'Alerta!',
          'Precio ingresado es mayor al de Tabla! - Pida Autorización',
          [
            {
              text: 'Cerrar Alerta',
            },
          ]
        );
      }
      if (typeof cantidad !== 'undefined' && typeof precio !== 'undefined') {
        setCalcImporte(true);
      }
    }
    setEditPrecio(false);
  };

  //___________________________________________________________________________________
  const blurPrecioUSD = () => {
    if (typeof precioUSD === 'undefined') {
      Alert.alert('Alerta!', 'Complete Precio USD!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    } else {
      if (typeof cantidad !== 'undefined' && typeof precioUSD !== 'undefined') {
        setCalcImporte(true);
      }
    }
    setEditPrecioUSD(false);
  };

  //___________________________________________________________________________________
  const blurObservaciones = () => {
    if (typeof observaciones === 'undefined') {
      Alert.alert('Alerta!', 'Complete Observaciones!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditObservaciones(false);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (calcImporte === true) {
      if (typeof precio !== 'undefined') {
        if (cantidad != 0 && precio != 0) {
          const importe = parseFloat(cantidad) * parseFloat(precio);
          setImporte(parseFloat(importe.toFixed(2)));
        }
      } else if (typeof precioUSD !== 'undefined') {
        if (cantidad != 0 && precioUSD != 0) {
          const impUSD = parseFloat(cantidad) * parseFloat(precioUSD);
          setImporte(parseFloat(impUSD.toFixed(2)));
        }
        setCalcImporte(false);
      }
    }
  }, [calcImporte]);

  //___________________________________________________________________________________
  const calcuTotal = () => {
    setTotal();
    if (typeof carrito === 'undefined' || carrito == '') {
      if (cantidad != 0 && precio != 0) {
        setTotal(parseFloat(importe.toFixed(2)));
      }
    } else {
      if (cantidad != 0 && precio != 0) {
        const sum = carrito.reduce((result, item) => {
          return result + parseFloat(item.importe);
        }, 0);
        setTotal(parseFloat(sum.toFixed(2)));
      }
    }
  };

  //_______________
  useEffect(() => {
    if (carrito.length !== 0) {
      calcuTotal();
    }
  }, [carrito]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (modifElim === true && cantidad == 0) {
      setPrecio(0);
      setImporte(0);
    }
  }, [cantidad]);

  //___________________________________________________________________________________
  const handleActualPed = () => {
    return;
  };

  const handleDescartarlo = () => {
    // cleanUpAll();
    setCleanUp(true);
  };

  const handleEnviarlo = () => {
    if (carrito.length !== 0) {
      if (ipRequestDone === true) {
        setEnviarIngreso(true);
      }
    }
  };

  //__________________________
  const nuevoIngreso = () => {
    if (
      typeof cliente !== 'undefined' ||
      typeof producto !== 'undefined' ||
      carrito.length !== 0
    ) {
      Alert.alert(
        'Alerta! - Hay un Ingreso cargado.',
        '¿Desea Continuar con el Actual?  ¿Descartarlo?  ¿Enviarlo?',
        [
          { text: 'Continuar', onPress: () => handleActualPed() },
          { text: 'Descartar', onPress: () => handleDescartarlo() },
          { text: 'Enviar', onPress: () => handleEnviarlo() },
        ]
      );
    }
  };

  //___________________________________________________________________________________

  const handleCotizacion = () => {
    setEnviarCotizacion(true)
  };

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  useEffect(() => {
    if (carrito.length !== 0) {
      if (enviarCotizacion === true) {
        if (ipRequestDone === true) {
          if (typeof producto !== 'undefined') {
            Alert.alert(
              'Alerta!! - Hay un producto ingresado.',
              '¿Desea Descartar y Enviar / O Continuar con la Carga?',
              [
                { text: 'Descartar y Enviar', onPress: () => generarCotizacion() },
                {
                  text: 'Continuar',
                  onPress: () => {
                    return;
                  },
                },
              ]
            );
          } else {
            generarCotizacion();
          }
        }
      }
    }
  }, [enviarCotizacion]);

  //___________________________________________________________________________________
  const generarCotizacion = () => {
    console.log('hola mundo')
    setEnviarCotizacion(false);
    if (carrito.length !== 0) {
      for (let i = 0; i < carrito.length; i++) {
        const item = {
          Comprobante: 'COT',
          Numero: planilla,
          IdProducto: carrito[i].idProducto,
          Descripcion: carrito[i].producto,
          Cantidad: carrito[i].cantidad,
          Precio: carrito[i].precio,
          Estado: carrito[i].estado,
          Proceso: 0,
          FechaCpte: fechaGC,
          IdCompradores: idComprador,
          IdChofer: choferGC,
          IdAcompañante: acompañanteGC,
          IdCliente: idCliente,
          Observaciones: carrito[i].observaciones,
        };
        itemsPedidos.push(item);
      }
    }
    for (let i = 0; i < itemsPedidos.length; i++) {
      const itemTag = {
        idNumIngreso: itemsPedidos[i].Numero,
        idProducto: itemsPedidos[i].IdProducto,
      };
      querySaliente.push(itemTag);
    }
    // dev
    console.log(' ------------------  lol x 1 ------------------ ');
    console.log(querySaliente);
    setItemsPedBeingSent(itemsPedidos);
    setCotizacionGenerada(true);
    // connectivityCheck();
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (cotizacionGenerada === true) {
      // if (connecChecked === true && ingresoGenerado === true) {
      enviarItemsPedidosCoti(itemsPedBeingSent);
    }
    // }, [connecChecked, ingresoGenerado]);
  }, [cotizacionGenerada]);
  //___________________________________________________________________________________
  const enviarItemsPedidosCoti = async (event) => {
    setCotizacionGenerada(false);
    if (event.length !== 0 && connected === true) {
      for (let i = 0; i < event.length; i++) {
        const item = {
          Comprobante: event[i].Comprobante,
          Numero: event[i].Numero,
          IdProducto: event[i].IdProducto,
          Descripcion: event[i].Descripcion,
          Cantidad: event[i].Cantidad,
          Precio: event[i].Precio,
          Estado: event[i].Estado,
          Proceso: event[i].Proceso,
          FechaCpte: event[i].FechaCpte,
          IdCompradores: event[i].IdCompradores,
          IdChofer: event[i].IdChofer,
          IdAcompañante: event[i].IdAcompañante,
          IdCliente: event[i].IdCliente,
          Observaciones: event[i].Observaciones,
        };
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/procCotizacion';
        try {
          await Axios.post(urlAxiosRequest, item, {
            cancelToken: source.token,
          });
        } catch (error) {
          if (Axios.isCancel(error)) {
          } else {
            throw error;
          }
        } finally {
          // if (i < event.length) {
          const itemTag = {
            idNumIngreso: event[i].Numero,
            idProducto: event[i].IdProducto,
          };
          queryEnviado.push(itemTag);
          // }
        }
      }
    }
    //  setPerformPedidoCheck(true);
    setCleanUp(true)
  };

  //_____________________________________________________________











  //___________________________________________________________________________________

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  const verCarrito = () => {
    if (carrito.length !== 0) {
      setSelecting('cartItem');
      navigation.navigate('SearchResults', {
        result: carrito,
        callBy: 'cardProcIngresos',
      });
    }
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (tablesLoaded === true) {
      areSomeQueryQueue();
    }
  }, [tablesLoaded]);

  //_____________________________________
  const areSomeQueryQueue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('queryProcIngresos');
      if (jsonValue != null) {
        setSomeQueryQueue(true);
        // connectivityCheck();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //___________________________________________________________________________________
  const handleEnviarIngreso = () => {
    setEnviarIngreso(true);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (carrito.length !== 0) {
      if (enviarIngreso === true) {
        if (ipRequestDone === true) {
          if (typeof producto !== 'undefined') {
            Alert.alert(
              'Alerta!! - Hay un producto ingresado.',
              '¿Desea Descartar y Enviar / O Continuar con la Carga?',
              [
                { text: 'Descartar y Enviar', onPress: () => generarPedido() },
                {
                  text: 'Continuar',
                  onPress: () => {
                    return;
                  },
                },
              ]
            );
          } else {
            generarPedido();
          }
        }
      }
    }
  }, [enviarIngreso]);

  //___________________________________________________________________________________
  const generarPedido = () => {
    setEnviarIngreso(false);
    if (carrito.length !== 0) {
      for (let i = 0; i < carrito.length; i++) {
        const item = {
          Comprobante: 'PLA',
          Numero: planilla,
          IdProducto: carrito[i].idProducto,
          Descripcion: carrito[i].producto,
          IdCajon: carrito[i].cajon,
          Letra: letra,
          Cantidad: carrito[i].cantidad,
          Precio: carrito[i].precio,
          Signo: 1,
          Estado: carrito[i].estado,
          Proceso: 0,
          Lote: 0,
          FechaCpte: fechaGC,
          IdCompradores: idComprador,
          IdCliente: idCliente,
          IdChofer: choferGC,
          IdAcompañante: acompañanteGC,
          Observaciones: carrito[i].observaciones,
        };
        itemsPedidos.push(item);
      }
    }
    for (let i = 0; i < itemsPedidos.length; i++) {
      const itemTag = {
        idNumIngreso: itemsPedidos[i].Numero,
        idProducto: itemsPedidos[i].IdProducto,
      };
      querySaliente.push(itemTag);
    }
    // dev
    console.log(' ------------------  lol x 1 ------------------ ');
    console.log(querySaliente);
    setItemsPedBeingSent(itemsPedidos);
    setIngresoGenerado(true);
    // connectivityCheck();
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (ingresoGenerado === true) {
      // if (connecChecked === true && ingresoGenerado === true) {
        enviarItemsPedidos(itemsPedBeingSent);
        enviarPdf(itemsPedBeingSent)
      }
      
      // }, [connecChecked, ingresoGenerado]);
    }, [ingresoGenerado]);


    //___________________________________________________________________________________
    
  const enviarPdf = async (event) => {
    
    const item = { payload: event }
    
    let source = Axios.CancelToken.source();
    const urlAxiosRequest = 'http://' + ipBackend + ':3001/procIngresosPdf';
    console.log(item)
    
    try {
          await Axios.post(urlAxiosRequest, item, {
            cancelToken: source.token,
          });
        } catch (error) {
          if (Axios.isCancel(error)) {
          } else {
            throw error;
          }
        }

  }

  //___________________________________________________________________________________
  const enviarItemsPedidos = async (event) => {
    setIngresoGenerado(false);
    if (event.length !== 0 && connected === true) {
      for (let i = 0; i < event.length; i++) {
        const item = {
          Comprobante: event[i].Comprobante,
          Numero: event[i].Numero,
          IdProducto: event[i].IdProducto,
          Descripcion: event[i].Descripcion,
          IdCajon: event[i].IdCajon,
          Letra: event[i].Letra,
          Cantidad: event[i].Cantidad,
          Precio: event[i].Precio,
          Signo: event[i].Signo,
          Estado: event[i].Estado,
          Proceso: event[i].Proceso,
          Lote: event[i].Lote,
          FechaCpte: event[i].FechaCpte,
          IdCompradores: event[i].IdCompradores,
          IdCliente: event[i].IdCliente,
          IdChofer: event[i].IdChofer,
          IdAcompañante: event[i].IdAcompañante,
          Observaciones: event[i].Observaciones,
        };
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/procIngresos';
        try {
          await Axios.post(urlAxiosRequest, item, {
            cancelToken: source.token,
          });
        } catch (error) {
          if (Axios.isCancel(error)) {
          } else {
            throw error;
          }
        } finally {
          // if (i < event.length) {
          const itemTag = {
            idNumIngreso: event[i].Numero,
            idProducto: event[i].IdProducto,
          };
          queryEnviado.push(itemTag);
          // }
        }
      }
    }
    setPerformPedidoCheck(true);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (performPedidoCheck === true) {
      checkPedidoSent();
    }
  }, [performPedidoCheck]);

  //___________________________________________________________________________________
  const checkPedidoSent = async () => {
    if (querySaliente.length === queryEnviado.length) {
      setCleanUp(true);
      // cleanUpAll();
    } else if (querySaliente.length !== queryEnviado.length) {
      if (queryEnviado.length === 0) {
        setQueryEnviado([]);
      }
      for (let i = 0; i < querySaliente.length; i++) {
        const tagItemSal = {
          idNumIngreso: querySaliente[i].idNumIngreso,
          idProducto: querySaliente[i].idProducto,
        };
        const checkQuerySent = queryEnviado.some((item) => {
          return (
            item.idNumIngreso == tagItemSal.idNumIngreso &&
            item.idProducto == tagItemSal.idProducto
          );
        });
        // if (i < querySaliente.length) {
        if (checkQuerySent === false) {
          queryEnCola.push(tagItemSal);
        }
        // }
      }
      // setSavePedCola(true);
    }
    setSavePedCola(true);
    setPerformPedidoCheck(false);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (savePedCola === true) {
      savePedidosEnCola();
    }
  }, [savePedCola]);

  //___________________________________________________________________________________
  const savePedidosEnCola = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('queryProcIngresos');
      if (jsonValue != null) {
        const newQueryToSend = JSON.parse(jsonValue);
        queryToSend.push(...newQueryToSend);
      }
    } catch (error) {
      console.log(error);
    }
    const newQueryToSend = [...queryToSend, ...queryEnCola];
    try {
      await AsyncStorage.setItem(
        'queryProcIngresos',
        JSON.stringify(newQueryToSend)
      );
    } catch (error) {
      console.log(error);
    }
    for (let i = 0; i < queryEnCola.length; i++) {
      const tagItemSal = {
        idNumIngreso: queryEnCola[i].idNumIngreso,
        idProducto: queryEnCola[i].idProducto,
      };
      const item = {
        Comprobante: itemsPedidos[i].Comprobante,
        Numero: itemsPedidos[i].Numero,
        IdProducto: itemsPedidos[i].IdProducto,
        Descripcion: itemsPedidos[i].Descripcion,
        IdCajon: itemsPedidos[i].IdCajon,
        Letra: itemsPedidos[i].Letra,
        Cantidad: itemsPedidos[i].Cantidad,
        Precio: itemsPedidos[i].Precio,
        Signo: itemsPedidos[i].Signo,
        Estado: itemsPedidos[i].Estado,
        Proceso: itemsPedidos[i].Proceso,
        Lote: itemsPedidos[i].Lote,
        FechaCpte: itemsPedidos[i].FechaCpte,
        IdCompradores: itemsPedidos[i].IdCompradores,
        IdCliente: itemsPedidos[i].IdCliente,
        IdChofer: itemsPedidos[i].IdChofer,
        IdAcompañante: itemsPedidos[i].IdAcompañante,
        Observaciones: itemsPedidos[i].Observaciones,
      };
      try {
        await AsyncStorage.setItem(
          JSON.stringify(tagItemSal),
          JSON.stringify(item)
        );
      } catch (error) {
        console.log(error);
      }
    }
    setSavePedCola(false);
    setSomeQueryQueue(true);
    setCleanUp(true);
    // cleanUpAll();
    // connectivityCheck();
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (someQueryQueue === true) {
      // if (someQueryQueue === true && connecChecked === true) {
      // dev
      // console.log('lol x paso por acá');
      sendQueryEnCola();
    }
  }, [someQueryQueue]);
  // }, [someQueryQueue, connecChecked]);

  //___________________________________________________________________________________
  const sendQueryEnCola = async () => {
    if (connected === true) {
      // dev
      // console.log('lol x también --> paso por acá');
      try {
        const jsonValue = await AsyncStorage.getItem('queryProcIngresos');
        if (jsonValue != null) {
          const queryWaiting = JSON.parse(jsonValue);
          queryBeingSent.push(...queryWaiting);
        }
      } catch (error) {
        console.log(error);
      }
      if (queryBeingSent.length !== 0) {
        // dev
        console.log(' ------------------  lol x 1 bis ------------------ ');
        console.log(queryBeingSent);
        console.log(queryBeingSent.length);
        for (let i = 0; i < queryBeingSent.length; i++) {
          const tagItemToSend = {
            idNumIngreso: queryBeingSent[i].idNumIngreso,
            idProducto: queryBeingSent[i].idProducto,
          };
          try {
            const jsonValue = await AsyncStorage.getItem(
              JSON.stringify(tagItemToSend)
            );
            if (jsonValue != null) {
              const newItemToSend = JSON.parse(jsonValue);
              itemToSend.push(newItemToSend);
              // dev
              console.log(' ------------------  lol x 2 ------------------ ');
              console.log(itemToSend);
            }
          } catch (error) {
            console.log(error);
          }
        }
        const enviarItemsEnCola = async (itemToSend) => {
          // for (let i = 0; i < itemToSend.length; i++) {
          //   const idPed = itemToSend[i].IdProducto;
          //   if (i === 0) {
          //     const newNumero = idProductoSaved;
          //     numPedBeingSent.push(newNumero);
          //   } else if (i > 0) {
          //     const previousIdPed = itemToSend[i - 1].IdProducto;
          //     if (idPed == previousIdPed) {
          //       const newNumero = numPedBeingSent[i - 1];
          //       numPedBeingSent.push(newNumero);
          //     } else {
          //       const newNumero = numPedBeingSent[i - 1] + 1;
          //       numPedBeingSent.push(newNumero);
          //     }
          //   }
          // }
          for (let i = 0; i < itemToSend.length; i++) {
            const item = {
              Comprobante: itemToSend[i].Comprobante,
              Numero: itemToSend[i].Numero,
              IdProducto: itemToSend[i].IdProducto,
              Descripcion: itemToSend[i].Descripcion,
              IdCajon: itemToSend[i].IdCajon,
              Letra: itemToSend[i].Letra,
              Cantidad: itemToSend[i].Cantidad,
              Precio: itemToSend[i].Precio,
              Signo: itemToSend[i].Signo,
              Estado: itemToSend[i].Estado,
              Proceso: itemToSend[i].Proceso,
              Lote: itemToSend[i].Lote,
              FechaCpte: itemToSend[i].FechaCpte,
              IdCompradores: itemToSend[i].IdCompradores,
              IdCliente: itemToSend[i].IdCliente,
              IdChofer: itemToSend[i].IdChofer,
              IdAcompañante: itemToSend[i].IdAcompañante,
              Observaciones: itemToSend[i].Observaciones,
            };
            let source = Axios.CancelToken.source();
            const urlAxiosRequest =
              'http://' + ipBackend + ':3001/procIngresos';
            // dev
            console.log(' ------------------  lol x 3 ------------------ ');
            console.log(item);
            try {
              await Axios.post(urlAxiosRequest, item, {
                cancelToken: source.token,
              });
            } catch (error) {
              if (Axios.isCancel(error)) {
              } else {
                throw error;
              }
            } finally {
              // if (i < itemToSend.length) {
              const itemTag = {
                idNumIngreso: itemToSend[i].Numero,
                idProducto: itemToSend[i].IdProducto,
              };
              queryEnviado.push(itemTag);
              // }
            }
            // dev
            console.log(' ------------------  lol x 4 ------------------ ');
            console.log(queryEnviado);
          }
          setSomeQueryQueue(false);
          setRemoveItemsLS(true);
        };
        enviarItemsEnCola(itemToSend);
      }
    }
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (removeItemsLS === true) {
      removeItemsStoraged();
    }
  }, [removeItemsLS]);

  //___________________________________________________________________________________
  const removeItemsStoraged = async () => {
    for (let i = 0; i < queryBeingSent.length; i++) {
      const tagItemSal = {
        idNumIngreso: queryBeingSent[i].idNumIngreso,
        idProducto: queryBeingSent[i].idProducto,
      };
      const checkQuerySent = queryEnviado.some((item) => {
        return (
          item.idNumIngreso == tagItemSal.idNumIngreso &&
          item.idProducto == tagItemSal.idProducto
        );
      });
      if (checkQuerySent === true) {
        try {
          await AsyncStorage.removeItem(JSON.stringify(tagItemSal));
        } catch (error) {
          console.log(error);
        }
      }
    }
    try {
      await AsyncStorage.removeItem('queryProcIngresos');
    } catch (error) {
      console.log(error);
    }
    setRemoveItemsLS(false);
    // cleanUpAll();
    setCleanUp(true);
  };









  //___________________________________________________________________________________
  const partialCleanUp = () => {
    setProducto();
    setIdProducto();
    setCantidad();
    setPrecio();
    setImporte();
    setPrecioUSD();
    setObservaciones();
    setEstado();
    setEstadoOne(false);
    setEstadoTwo(false);
    setEstadoThree(false);
    setEstadoFour(false);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (cleanUp === true) {
      setCleanUp(false);
      cleanUpAll();
    }
  }, [cleanUp]);

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setCliente();
    setIdCliente();
    setProducto();
    setIdProducto();
    setCantidad();
    setPrecio();
    setImporte();
    setPrecioUSD();
    setEstado();
    setObservaciones();
    setTotal();
    setCarrito([]);
    setItemsPedidos([]);
    setItemToSend([]);
    setItemsPedBeingSent([]);
    setNumPedBeingSent([]);
    setQueryBeingSent([]);
    setQueryEnCola([]);
    setQueryEnviado([]);
    setQuerySaliente([]);
    setQueryToSend([]);
    setEstadoOne(false);
    setEstadoTwo(false);
    setEstadoThree(false);
    setEstadoFour(false);
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <SafeAreaView>
      <ScrollView>
        {/* -----------------Form section------------------ */}
        <View style={styles.formContainer}>
          {/* ----------- 1 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Planilla</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignContent: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  planillaTouched();
                }}
              >
                <TextInput
                  editable={editPlanilla}
                  onBlur={() => blurPlanilla()}
                  onChangeText={planillaHandler}
                  placeholder={''}
                  ref={planillaRef}
                  style={[styles.box, { width: 100 }]}
                  underlineColorAndroid='transparent'
                  value={planilla || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.btnTableWrapper,
                { marginLeft: 65, marginRight: 0 },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.btnTablePlace,
                  {
                    alignSelf: 'flex-end',
                    width: 150,
                  },
                ]}
                onPress={() => compTableTouched()}
              >
                <Text style={[styles.btnTable, { alignSelf: 'center' }]}>
                  Compradores
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 2 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Comprador</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  compradorTouched();
                }}
              >
                <TextInput
                  editable={editComprador}
                  onBlur={() => blurComprador()}
                  onChangeText={compradorHandler}
                  placeholder={''}
                  ref={compradorRef}
                  style={[styles.box, { width: 230 }]}
                  underlineColorAndroid='transparent'
                  value={comprador || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 3 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Cliente</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  clienteTouched();
                }}
              >
                <TextInput
                  editable={editCliente}
                  onBlur={() => blurCliente()}
                  onChangeText={clienteHandler}
                  placeholder={''}
                  ref={clienteRef}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={cliente || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 4 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Producto</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  productoTouched();
                }}
              >
                <TextInput
                  editable={editProducto}
                  onBlur={() => blurProducto()}
                  onChangeText={productoHandler}
                  placeholder={''}
                  ref={productoRef}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={producto || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 5 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Cantidad</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  cantidadTouched();
                }}
              >
                <TextInput
                  editable={editCantidad}
                  keyboardType='numeric'
                  onBlur={() => blurCantidad()}
                  onChangeText={cantidadHandler}
                  placeholder={''}
                  ref={cantidadRef}
                  style={[styles.box, { width: 85 }]}
                  underlineColorAndroid='transparent'
                  value={JSON.stringify(cantidad) || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { paddingLeft: 10 }]}>Precio</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  precioTouched();
                }}
              >
                <TextInput
                  editable={editPrecio}
                  keyboardType='numeric'
                  onBlur={() => blurPrecio()}
                  onChangeText={precioHandler}
                  placeholder={''}
                  ref={precioRef}
                  style={[styles.box, { width: 100, alignSelf: 'flex-start' }]}
                  underlineColorAndroid='transparent'
                  value={JSON.stringify(precio) || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 6 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { width: 105 }]}>Precio USD</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  precioUSDTouched();
                }}
              >
                <TextInput
                  editable={editPrecioUSD}
                  keyboardType='numeric'
                  onChangeText={precioUSDHandler}
                  onBlur={() => blurPrecioUSD()}
                  placeholder={''}
                  ref={precioUSDRef}
                  style={[styles.box, { width: 70 }]}
                  underlineColorAndroid='transparent'
                  value={JSON.stringify(precioUSD) || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.labelContainer, {}]}>
              <Text style={[styles.label, { width: 165, paddingLeft: 10 }]}>
                Val Dolar
              </Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                placeholder={''}
                style={[styles.box, { width: 70 }]}
                underlineColorAndroid='transparent'
                value={valorDolar || ''}
              />
            </View>
          </View>
          {/* ----------- 7  ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Imp</Text>
            </View>
            {/* ------------------------------ */}
            <View style={styles.boxContainer}>
              <TextInput
                editable={false}
                placeholder={''}
                style={[styles.box, { width: 110, marginRight: 10 }]}
                underlineColorAndroid='transparent'
                value={JSON.stringify(importe) || ''}
              />
            </View>
            {/* ------------------------------ */}
            <View style={[styles.labelContainer, { marginRight: 5 }]}>
              <Text style={[styles.label, {}]}>Tot</Text>
            </View>
            {/* ------------------------------ */}
            <View style={styles.boxContainer}>
              <TextInput
                editable={false}
                placeholder={''}
                style={[styles.box, { width: 135 }]}
                underlineColorAndroid='transparent'
                value={JSON.stringify(total) || ''}
              />
            </View>
          </View>
          {/* ----------- 8  ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Obs.</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  observacionesTouched();
                }}
              >
                <TextInput
                  editable={editObservaciones}
                  onBlur={() => blurObservaciones()}
                  onChangeText={observacionesHandler}
                  placeholder={''}
                  ref={observacionesRef}
                  style={[styles.box, { width: 300 }]}
                  underlineColorAndroid='transparent'
                  value={observaciones || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 9 ----------- */}
          <View style={[styles.row, { marginVertical: 5 }]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Estado</Text>
            </View>
            <View style={[styles.btnWrapper, { marginLeft: 20 }]}>
              <TouchableOpacity
                style={estadoOne ? styles.btnPlace : styles.offBtnPlace}
                onPress={() => setEstado(1)}
              >
                <Text
                  style={[
                    estadoOne ? styles.btnEstado : styles.offBtnEstado,
                    { paddingHorizontal: 9 },
                  ]}
                >
                  F
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={estadoTwo ? styles.btnPlace : styles.offBtnPlace}
                onPress={() => setEstado(2)}
              >
                <Text
                  style={estadoTwo ? styles.btnEstado : styles.offBtnEstado}
                >
                  3/4
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={estadoThree ? styles.btnPlace : styles.offBtnPlace}
                onPress={() => setEstado(3)}
              >
                <Text
                  style={estadoThree ? styles.btnEstado : styles.offBtnEstado}
                >
                  1/2
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={estadoFour ? styles.btnPlace : styles.offBtnPlace}
                onPress={() => setEstado(4)}
              >
                <Text
                  style={estadoFour ? styles.btnEstado : styles.offBtnEstado}
                >
                  1/4
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 10 ----------- */}
          <View style={[styles.row, { marginVertical: 10 }]}>
            <View style={[styles.agregarItemContainer, {}]}>
              <TouchableOpacity
                style={[styles.agregarTouch]}
                onPress={() => agregarItemTouched()}
              >
                <View
                  style={[
                    styles.containerLabelAgregar,
                    { alignSelf: 'flex-start' },
                  ]}
                >
                  <Text
                    style={[
                      styles.labelAgregar,
                      {
                        color: colors.white,
                      },
                    ]}
                  >
                    Agregar Item
                  </Text>
                </View>
                <View style={[styles.btnAgregar, { alignSelf: 'flex-end' }]}>
                  <MaterialIcons
                    name='file-download-done'
                    size={35}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 11 ----------- */}
        </View>
        {/* --------- Footer -------- */}
        <View style={styles.footerContainer}>
          <View style={styles.btnFooterWrapper}>
            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => nuevoIngreso()}
            >
              <MaterialIcons
                name='post-add'
                size={30}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btnFooterWrapper}>
            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => handleCotizacion()}
            >
              <MaterialIcons
                name='pending-actions'
                // name='assignment'
                // name='account-balance'
                size={30}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btnFooterWrapper}>
            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => verCarrito()}
            >
              <MaterialIcons
                name='shopping-cart'
                size={30}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btnFooterWrapper}>
            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => handleEnviarIngreso()}
            >
              <MaterialIcons name='send' size={30} style={styles.footerIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* ----------------------------------------------- */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 10,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  selecLabelContainer: {
    alignSelf: 'center',
    backgroundColor: colors.green,
    borderRadius: 15,
  },
  selecLabel: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 7,
    paddingHorizontal: 1,
  },
  labelContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    borderColor: colors.greenBlue,
    borderRadius: 10,
    borderWidth: 3,
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 10,
    paddingVertical: 3,
    textAlign: 'right',
  },
  btnWrapper: {
    alignItems: 'flex-start',
    flex: 1,
  },
  btnPlace: {
    backgroundColor: colors.green,
    borderRadius: 100,
    justifyContent: 'flex-start',
    padding: 10,
  },
  btnEstado: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  offBtnPlace: {
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
    justifyContent: 'flex-start',
    padding: 10,
  },
  offBtnEstado: {
    alignSelf: 'flex-start',
    color: colors.greenBlue,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  btnTablePlace: {
    backgroundColor: colors.greenBlue,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  btnTableWrapper: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  btnTable: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  agregarItemContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  agregarTouch: {
    flexDirection: 'row',
    backgroundColor: colors.greenBlue,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 6,
  },
  btnAgregar: {
    alignItems: 'flex-end',
  },
  containerLabelAgregar: {
    paddingTop: 5,
  },
  labelAgregar: {
    color: colors.white,
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: 20,
  },
  footerContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 75,
  },
  btnFooterWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerTouchable: {
    backgroundColor: colors.blue,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footerIcon: {
    color: colors.white,
  },
});

export default ProcIngresos;
