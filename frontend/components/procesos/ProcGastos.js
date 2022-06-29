import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import colors from '../../assets/colors';
import GeneralContext from '../../contexts/GeneralContext';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProcGastos = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const {
    loggedStatus,
    tablesLoaded,
    ipBackend,
    ipRequestDone,
    connecChecked,
    connected,
    connectivityCheck,
    fechaGC,
    tablaClaves,
    tablaClientes,
    tablaCompradores,
    tablaComprobantes,
    tablaConceptos,
    tablaOperaMes,
    planillaGC,
    valorDolarGC,
    dataGCLoaded,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [editCliente, setEditCliente] = useState(false);
  const [editConcepto, setEditConcepto] = useState(false);
  const [editPlanilla, setEditPlanilla] = useState(false);
  const [editFecha, setEditFecha] = useState(false);
  const [editImporte, setEditImporte] = useState(false);
  const [editImporteUSD, setEditImporteUSD] = useState(false);
  const [editObservaciones, setEditObservaciones] = useState(false);
  const [editValorDolar, setEditValorDolar] = useState(false);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [cliente, setCliente] = useState(0);
  const [idCliente, setIdCliente] = useState();
  const [concepto, setConcepto] = useState();
  const [idConcepto, setIdConcepto] = useState();
  const [fecha, setFecha] = useState();
  const [importe, setImporte] = useState();
  const [importeUSD, setImporteUSD] = useState();
  const [handleFocus, setHandleFocus] = useState(false);
  const [planilla, setPlanilla] = useState();
  const [planillaSaved, setPlanillaSaved] = useState();
  const [observaciones, setObservaciones] = useState();
  const [selecting, setSelecting] = useState();
  const [valorDolar, setValorDolar] = useState();
  const [signo, setSigno] = useState();
  const [idCuenta, setIdCuenta] = useState();
  const [idChofer, setIdChofer] = useState();
  const [idAcompañante, setIdAcompañante] = useState();
  const [fechaIngreso, setFechaIngreso] = useState();

  //___________________________________________________________________________________
  const [modifElim, setModifElim] = useState(false);
  const [generarEnvio, setGenerarEnvio] = useState(false);
  const [envioGenerado, setEnvioGenerado] = useState(false);
  const [performPedidoCheck, setPerformPedidoCheck] = useState(false);
  const [someQueryQueue, setSomeQueryQueue] = useState(false);
  const [removeItemsLS, setRemoveItemsLS] = useState(false);
  const [savePedCola, setSavePedCola] = useState(false);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [carrito, setCarrito] = useState([]);
  const [querySaliente, setQuerySaliente] = useState([]);
  const [itemsPedidos, setItemsPedidos] = useState([]);
  const [itemsPedBeingSent, setItemsPedBeingSent] = useState();
  const [queryEnviado, setQueryEnviado] = useState([]);
  const [itemToSend, setItemToSend] = useState([]);
  const [queryBeingSent, setQueryBeingSent] = useState([]);
  const [queryEnCola, setQueryEnCola] = useState([]);
  const [queryToSend, setQueryToSend] = useState([]);

  //___________________________________________________________________________________
  //___________________________________________________________________________________

  //___________________________________________________________________________________
  const clienteRef = useRef();
  const conceptoRef = useRef();
  const fechaRef = useRef();
  const importeRef = useRef();
  const importeUSDRef = useRef();
  const planillaRef = useRef();
  const observacionesRef = useRef();
  const valorDolarRef = useRef();

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editPlanilla === true) {
        planillaRef.current.focus();
      } else if (editConcepto === true) {
        conceptoRef.current.focus();
      } else if (editCliente === true) {
        clienteRef.current.focus();
      } else if (editFecha === true) {
        fechaRef.current.focus();
      } else if (editImporte === true) {
        importeRef.current.focus();
      } else if (editImporteUSD === true) {
        importeUSDRef.current.focus();
      } else if (editValorDolar === true) {
        valorDolarRef.current.focus();
      } else if (editObservaciones === true) {
        observacionesRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

  //_______________
  useEffect(() => {
    if (
      editCliente === true ||
      editConcepto === true ||
      editFecha === true ||
      editImporte === true ||
      editImporteUSD === true ||
      editObservaciones === true ||
      editPlanilla === true ||
      editValorDolar === true
    ) {
      setHandleFocus(true);
    }
  }, [
    editCliente,
    editConcepto,
    editFecha,
    editImporte,
    editImporteUSD,
    editObservaciones,
    editPlanilla,
    editValorDolar,
  ]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (tablesLoaded === true) {
      setFecha(fechaGC);
      setPlanilla(planillaGC);
      setPlanillaSaved(planillaGC);
      setValorDolar(valorDolarGC);
    }
  }, [dataGCLoaded]);

  // //___________________________________________________________________________________
  // useEffect(() => {
  //   if (tablesLoaded === true && typeof planilla !== 'undefined') {
  //     const filter = (event) => {
  //       return event.Numero == planilla;
  //     };
  //     const data = tablaOperaMes.filter(filter);
  //     if (data.length !== 0) {
  //       setIdChofer(data[0].IdChofer);
  //       setIdAcompañante(data[0].IdAcompañante);
  //       const fechaCpteString = data[0].FechaCpte;
  //       const aa = fechaCpteString.substr(0, 4);
  //       const mm = fechaCpteString.substr(5, 2);
  //       const dd = fechaCpteString.substr(8, 2);
  //       const fecha = `${aa}/${mm}/${dd}`;
  //       setFechaIngreso(fecha);
  //     }
  //   }
  // }, [tablesLoaded, planilla]);

  //___________________________________________________________________________________
  const planillaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setPlanilla(event);
    }
  };

  //___________________________________________________________________________________
  const conceptoHandler = (event) => {
    if (typeof event !== 'undefined') {
      setConcepto(event);
    }
  };

  //___________________________________________________________________________________
  const clienteHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCliente(event);
    }
  };

  //___________________________________________________________________________________
  const fechaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setFecha(event);
    }
  };

  //___________________________________________________________________________________
  const importeHandler = (event) => {
    if (typeof event !== 'undefined') {
      setImporte(event);
    }
  };

  //___________________________________________________________________________________
  const importeUSDHandler = (event) => {
    if (typeof event !== 'undefined') {
      setImporteUSD(event);
    }
  };

  //___________________________________________________________________________________
  const valorDolarHandler = (event) => {
    if (typeof event !== 'undefined') {
      setValorDolar(event);
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
  const conceptoTouched = () => {
    setConcepto();
    setSelecting('concepto');
    setEditConcepto(true);
  };

  //___________________________________________________________________________________
  const showConcepto = () => {
    setSelecting('concepto');
    if (tablesLoaded === true) {
      const filter = (event) => {
        return event.Signo == 2 && event.IdConcepto < 100;
      };
      const data = tablaConceptos.filter(filter);
      if (data.length !== 0) {
        navigation.navigate('SearchResults', {
          result: data,
          callBy: 'procGastosCpto',
        });
      }
    }
  };

  //___________________________________________________________________________________
  const clienteTouched = () => {
    setCliente();
    setSelecting('cliente');
    setEditCliente(true);
  };

  //___________________________________________________________________________________
  const fechaTouched = () => {
    setFecha();
    setEditFecha(true);
  };

  //___________________________________________________________________________________
  const importeTouched = () => {
    setImporte();
    setSelecting('importe');
    setEditImporte(true);
  };

  //___________________________________________________________________________________
  const importeUSDTouched = () => {
    setImporteUSD();
    setSelecting('importeUSD');
    setEditImporteUSD(true);
  };

  //___________________________________________________________________________________
  const valorDolarTouched = () => {
    setValorDolar();
    setSelecting('valorDolar');
    setEditValorDolar(true);
  };

  //___________________________________________________________________________________
  const observacionesTouched = () => {
    setObservaciones();
    setSelecting('observaciones');
    setEditObservaciones(true);
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  //___________________________________________________________________________________
  const agregarItemTouched = () => {
    if (typeof planilla === 'undefined') {
      Alert.alert('Error!', 'Complete Planilla', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof concepto === 'undefined') {
      Alert.alert('Error!', 'Complete Concepto', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof cliente === 'undefined') {
      Alert.alert('Error!', 'Complete Cliente', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof fecha === 'undefined') {
      Alert.alert('Error!', 'Complete Fecha', [{ text: 'Cerrar Alerta' }]);
    } else if (
      typeof importe === 'undefined' &&
      typeof importeUSD === 'undefined'
    ) {
      Alert.alert('Error!', 'Complete Importe o Importe USD', [
        { text: 'Cerrar Alerta' },
      ]);
    } else if (typeof valorDolar === 'undefined') {
      Alert.alert('Error!', 'Complete Valor Dolar', [
        { text: 'Cerrar Alerta' },
      ]);
    } else if (
      typeof planilla !== 'undefined' &&
      typeof concepto !== 'undefined' &&
      typeof cliente !== 'undefined' &&
      typeof fecha !== 'undefined' &&
      typeof valorDolar !== 'undefined' &&
      (typeof importe !== 'undefined' || typeof importeUSD !== 'undefined')
    ) {
      const planillaFloat = parseFloat(planilla);
      const importeFloat = parseFloat(importe);
      const importeUSDFloat = parseFloat(importeUSD);
      if (modifElim === true) {
        setCarrito(
          carrito.map((val) => {
            return val.idProducto == idProducto
              ? {
                  idNumGasto: planillaFloat,
                  idConcepto: idConcepto,
                  descripcion: concepto,
                  idCliente: idCliente,
                  fechaCpte: fecha,
                  importe: importe ? importeFloat : 0.0,
                  importeDolar: importeUSD ? importeUSDFloat : 0.0,
                  valorDolar: valorDolar,
                  observaciones: observaciones ? observaciones : '-',
                }
              : val;
          })
        );
        partialCleanUp();
        setModifElim(false);
        return;
      } else if (modifElim === false) {
        const newCarrito = [
          ...carrito,
          {
            idNumGasto: planillaFloat,
            idConcepto: idConcepto,
            descripcion: concepto,
            idCliente: idCliente,
            fechaCpte: fecha,
            importe: importe ? importeFloat : 0.0,
            importeDolar: importeUSD ? importeUSDFloat : 0.0,
            valorDolar: valorDolar,
            observaciones: observaciones ? observaciones : '-',
          },
        ];
        setCarrito(newCarrito);
        partialCleanUp();
        return;
      }
    }
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  //___________________________________________________________________________________
  const nuevoGastoTourched = () => {
    console.log('lol x nuevoGastoTourched');
  };

  //___________________________________________________________________________________
  const verCarritoTourched = () => {
    console.log('lol x nuevoGastoTourched');
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________

  //___________________________________________________________________________________
  const enviarGastoTourched = () => {
    console.log(carrito);
    setGenerarEnvio(true);
  };

  //___________________________________________________________________________________
  const generarItem = () => {
    setGenerarEnvio(false);
    if (carrito.length !== 0) {
      for (let i = 0; i < carrito.length; i++) {
        const item = {
          Cantidad: 0.0,
          Descripcion: carrito[i].descripcion,
          FechaCpte: carrito[i].fechaCpte,
          IdBanco: 0,
          IdConcepto: carrito[i].idConcepto,
          IdCliente: carrito[i].idCliente,
          Importe: carrito[i].importe,
          ImporteDolar: carrito[i].importeDolar,
          Observaciones: carrito[i].observaciones,
          Numero: planilla,
          NroCheque: 0,
          ValorDolar: carrito[i].valorDolar,
          Signo: signo,
          IdCuenta: idCuenta,
          IdChofer: idChofer,
          IdAcompañante: idAcompañante,
          FechaIngreso: fechaIngreso,
        };
        itemsPedidos.push(item);
      }
    }
    //---------------------------------------------
    for (let i = 0; i < itemsPedidos.length; i++) {
      const itemTag = {
        idNumGasto: itemsPedidos[i].Numero,
        idConcepto: itemsPedidos[i].IdConcepto,
      };
      querySaliente.push(itemTag);
    }
    setItemsPedBeingSent(itemsPedidos);
    connectivityCheck();
    setEnvioGenerado(true);
    setItemsPedidos([]);
    setQuerySaliente([]);
  };

  //_______________
  useEffect(() => {
    if (carrito.length !== 0) {
      if (generarEnvio === true) {
        if (ipRequestDone === true) {
          if (typeof concepto !== 'undefined') {
            Alert.alert(
              'Alerta!! - Hay un concepto ingresado.',
              '¿Desea Descartar y Enviar / O Continuar con la Carga?',
              [
                { text: 'Descartar y Enviar', onPress: () => generarItem() },
                {
                  text: 'Continuar',
                  onPress: () => {
                    return;
                  },
                },
              ]
            );
          } else {
            generarItem();
          }
        }
      }
    }
  }, [generarEnvio, ipRequestDone]);

  //___________________________________________________________________________________
  const enviarItem = async (event) => {
    setEnvioGenerado(false);
    if (event.length != 0) {
      for (let i = 0; i < event.length; i++) {
        const item = {
          IdConcepto: event[i].IdConcepto,
          Descripcion: event[i].Descripcion,
          FechaCpte: event[i].FechaCpte,
          Importe: event[i].Importe,
          Observaciones: event[i].Observaciones,
          IdCliente: event[i].IdCliente,
          ImporteDolar: event[i].ImporteDolar,
          ValorDolar: event[i].ValorDolar,
          Numero: event[i].Numero,
          Signo: event[i].Signo,
          IdCuenta: event[i].IdCuenta,
          IdChofer: event[i].IdChofer,
          IdAcompañante: event[i].IdAcompañante,
          FechaIngreso: event[i].FechaIngreso,
          Cantidad: event[i].Cantidad,
          IdBanco: event[i].IdBanco,
          NroCheque: event[i].NroCheque,
        };
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/procGastos';
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
          const itemTag = {
            idNumGasto: event[i].Numero,
            idConcepto: event[i].IdConcepto,
          };
          queryEnviado.push(itemTag);
        }
      }
    }
    setPerformPedidoCheck(true);
    //
    // dev
    cleanUpAll();
  };

  //_______________
  useEffect(() => {
    if (connected === true && envioGenerado === true) {
      enviarItem(itemsPedBeingSent);
    }
  }, [connecChecked, envioGenerado]);

  // //___________________________________________________________________________________

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  //___________________________________________________________________________________
  //___________________________________________________________________________________

  //___________________________________________________________________________________
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
    } else if (typeof planilla == 'undefined' && tablesLoaded === true) {
      Alert.alert('Alerta!', 'Complete Planilla!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditPlanilla(false);
  };

  //______________________________________________________________________________________
  const blurConcepto = () => {
    if (typeof concepto !== 'undefined' && tablesLoaded === true) {
      const firstFilter = (event) => {
        return event.Signo == 2 && event.IdConcepto < 100;
      };
      const dataConceptos = tablaConceptos.filter(firstFilter);
      if (dataConceptos.length !== 0) {
        const filter = (event) => {
          if (!isNaN(+concepto)) {
            return event.IdConcepto == concepto;
          } else {
            return event.Descripcion.toLowerCase().includes(
              concepto.toLowerCase()
            );
          }
        };
        const data = dataConceptos.filter(filter);
        if (data.length !== 0) {
          if (data.length === 1) {
            setIdConcepto(data[0].IdConcepto);
            setConcepto(data[0].Descripcion);
            setSigno(data[0].Signo);
            setIdCuenta(data[0].IdCuenta);
          } else if (data.length > 1) {
            navigation.navigate('SearchResults', {
              result: data,
              callBy: 'procGastosCpto',
            });
          }
        } else {
          setConcepto();
          Alert.alert('Alerta!', 'Concepto no encontrado', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        }
      }
    } else {
      Alert.alert('Alerta!', 'Complete Concepto!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditConcepto(false);
  };

  //______________________________________________________________________________________
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
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'procGastosClie',
          });
        }
      } else {
        setCliente();
        Alert.alert('Alerta!', 'Cliente no encontrada/o', [
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

    //
    setEditCliente(false);
  };

  //______________________________________________________________________________________
  const blurFecha = () => {
    setEditFecha(false);
  };

  //___________________________________________________________________________________
  const blurImporte = () => {
    setEditImporte(false);
  };

  //___________________________________________________________________________________
  const blurImporteusd = () => {
    setEditImporteUSD(false);
  };

  //___________________________________________________________________________________
  const blurValorDolar = () => {
    setEditValorDolar(false);
  };

  //___________________________________________________________________________________
  const blurObservaciones = () => {
    setEditObservaciones(false);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (selecting === 'concepto') {
        const filter = (event) => {
          return event.IdConcepto == itemSelected;
        };
        const data = tablaConceptos.filter(filter);
        if (data.length !== 0) {
          setIdConcepto(data[0].IdConcepto);
          setConcepto(data[0].Descripcion);
          setSigno(data[0].Signo);
          setIdCuenta(data[0].IdCuenta);
        }
      } else if (selecting === 'cliente') {
        const filter = (event) => {
          return event.IdCliente == itemSelected;
        };
        const data = tablaClientes.filter(filter);
        if (data.length !== 0) {
          setCliente(data[0].RazonSocial);
          setIdCliente(data[0].IdCliente);
        }
      }
      setSelecting();
      navigation.setParams({ itemSelected: 'null' });
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  const partialCleanUp = () => {
    setConcepto();
    setIdConcepto();
    setImporte();
    setImporteUSD();
    setObservaciones();
  };

  //__________________________
  const cleanUpAll = () => {
    setConcepto();
    setIdConcepto();
    setCliente();
    setIdCliente();
    // setFecha();
    setImporte();
    setImporteUSD();
    // setValorDolar();
    setObservaciones();
  };

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <SafeAreaView>
      <ScrollView>
        {/* -----------------Form section------------------ */}
        <View style={styles.formContainer}>
          {/* --------------------------------------------- */}
          {/* ----------- 1 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Planilla</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.boxContainer,
                { alignItems: 'flex-start', marginRight: 25 },
              ]}
            >
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
                  style={[styles.box, { width: 100, alignSelf: 'flex-start' }]}
                  underlineColorAndroid='transparent'
                  value={planilla || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={styles.btnTableWrapper}>
              <TouchableOpacity
                style={[
                  styles.btnTablePlace,
                  { width: 115, alignSelf: 'flex-end' },
                ]}
                onPress={() => showConcepto()}
              >
                <Text style={[styles.btnTable, { alignSelf: 'center' }]}>
                  Concepto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 2 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Concepto</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  conceptoTouched();
                }}
              >
                <TextInput
                  editable={editConcepto}
                  onBlur={() => blurConcepto()}
                  onChangeText={conceptoHandler}
                  ref={conceptoRef}
                  placeholder={''}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={concepto || ''}
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
              <Text style={styles.label}>Fecha</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  fechaTouched();
                }}
              >
                <TextInput
                  editable={editFecha}
                  onBlur={() => blurFecha()}
                  onChangeText={fechaHandler}
                  placeholder={''}
                  ref={fechaRef}
                  style={[styles.box, { width: 225 }]}
                  underlineColorAndroid='transparent'
                  value={fecha || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 5 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Importe</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  importeTouched();
                }}
              >
                <TextInput
                  editable={editImporte}
                  onBlur={() => blurImporte()}
                  onChangeText={importeHandler}
                  placeholder={''}
                  ref={importeRef}
                  style={[styles.box, { width: 225 }]}
                  underlineColorAndroid='transparent'
                  value={importe || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 6 ----------- */}
          <View style={styles.row}>
            <View style={[styles.labelContainer, { marginLeft: 3 }]}>
              <Text style={styles.label}>Importe USD</Text>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  importeUSDTouched();
                }}
              >
                <TextInput
                  editable={editImporteUSD}
                  keyboardType='numeric'
                  onBlur={() => blurImporteusd()}
                  onChangeText={importeUSDHandler}
                  placeholder={''}
                  ref={importeUSDRef}
                  style={[styles.box, { width: 225 }]}
                  underlineColorAndroid='transparent'
                  value={importeUSD || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 7 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Valor Dolar</Text>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  valorDolarTouched();
                }}
              >
                <TextInput
                  editable={editValorDolar}
                  keyboardType='numeric'
                  onBlur={() => blurValorDolar()}
                  onChangeText={valorDolarHandler}
                  placeholder={''}
                  ref={valorDolarRef}
                  style={[styles.box, { width: 225 }]}
                  underlineColorAndroid='transparent'
                  value={valorDolar || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 8 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Obs.</Text>
            </View>
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
          <View style={[styles.row, { marginTop: 15, marginBottom: 10 }]}>
            <View style={[styles.agregarItemContainer, {}]}>
              <TouchableOpacity
                style={styles.agregarTouch}
                onPress={() => agregarItemTouched()}
              >
                <View style={styles.containerLabelAgregar}>
                  <Text
                    style={[
                      styles.labelAgregar,
                      { alignSelf: 'flex-end', marginRight: 20 },
                    ]}
                  >
                    Agregar Item
                  </Text>
                </View>
                <View style={styles.btnAgregar}>
                  <MaterialIcons
                    name='file-download-done'
                    size={35}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* --------------------------------------------- */}
        </View>
        {/* --------------------------------------------- */}
        {/* --------- Footer -------- */}
        <View style={styles.footerContainer}>
          <View style={styles.btnFooterWrapper}>
            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => nuevoGastoTourched()}
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
              onPress={() => verCarritoTourched()}
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
              onPress={() => enviarGastoTourched()}
            >
              <MaterialIcons name='send' size={30} style={styles.footerIcon} />
            </TouchableOpacity>
          </View>
          {/* ----------------------------------------------- */}
        </View>
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
    paddingVertical: 5,
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
    fontSize: 19,
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
    paddingTop: 15,
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

export default ProcGastos;
