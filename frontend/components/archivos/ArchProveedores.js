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

import GeneralContext from '../../contexts/GeneralContext';
import colors from '../../assets/colors';

import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const ArchProveedores = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const {
    loggedStatus,
    tablesLoaded,
    tablaProveedores,
    tablaClaves,
    ipBackend,
    ipRequestDone,
    connectivityCheck,
    connected,
    connecChecked,
    getProveedores,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [editProveedor, setEditProveedor] = useState(false);
  const [editRazonSocial, setEditRazonSocial] = useState(false);
  const [editDomicilio, setEditDomicilio] = useState(false);
  const [editLocalidad, setEditLocalidad] = useState(false);
  const [editProvincia, setEditProvincia] = useState(false);
  const [editTelefono, setEditTelefono] = useState(false);
  const [editResponsable, setEditResponsable] = useState(false);
  const [editCategoria, setEditCategoria] = useState(false);
  const [editCuit, setEditCuit] = useState(false);
  const [editObservaciones, setEditObservaciones] = useState(false);
  const [editCelulares, setEditCelulares] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [handleFocus, setHandleFocus] = useState(false);
  const [alta, setAlta] = useState(false);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [proveedor, setProveedor] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [domicilio, setDomicilio] = useState();
  const [localidad, setLocalidad] = useState();
  const [provincia, setProvincia] = useState();
  const [idLocalidad, setIdLocalidad] = useState();
  const [idProvincia, setIdProvincia] = useState();
  const [telefono, setTelefono] = useState();
  const [responsable, setResponsable] = useState('');
  const [categoria, setCategoria] = useState();
  const [cuit, setCuit] = useState();
  const [observaciones, setObservaciones] = useState('');
  const [celulares, setCelulares] = useState();
  const [email, setEmail] = useState();
  const [selecting, setSelecting] = useState();
  const [saldo, setSaldo] = useState(0);
  const [codPostal, setCodPostal] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [habilitado, setHabilitado] = useState('S');
  const [listaPrecios, setListaPrecios] = useState(1);
  const [zona, setZona] = useState('Z01');
  const [idForPago, setIdForPago] = useState('FP1');
  const [acuVenta, setAcuVenta] = useState(0);

  // dev - envio de cambios
  const [generarEnvio, setGenerarEnvio] = useState(false);
  const [envioGenerado, setEnvioGenerado] = useState(false);
  const [performPedidoCheck, setPerformPedidoCheck] = useState(false);
  const [querySaliente, setQuerySaliente] = useState([]);
  const [itemsPedidos, setItemsPedidos] = useState([]);
  const [itemsPedBeingSent, setItemsPedBeingSent] = useState();
  const [queryEnviado, setQueryEnviado] = useState([]);

  // const [removeItemsLS, setRemoveItemsLS] = useState(false);
  // const [savePedCola, setSavePedCola] = useState(false);
  // const [someQueryQueue, setSomeQueryQueue] = useState(false);
  // const [itemToSend, setItemToSend] = useState([]);
  // const [queryBeingSent, setQueryBeingSent] = useState([]);
  // const [queryEnCola, setQueryEnCola] = useState([]);
  // const [queryToSend, setQueryToSend] = useState([]);

  //___________________________________________________________________________________
  const proveedorRef = useRef();
  const razonSocialRef = useRef();
  const domicilioRef = useRef();
  const localidadRef = useRef();
  const provinciaRef = useRef();
  const telefonoRef = useRef();
  const responsableRef = useRef();
  const categoriaRef = useRef();
  const cuitRef = useRef();
  const observacionesRef = useRef();
  const celularesRef = useRef();
  const emailRef = useRef();

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  const enviarTourched = () => {
    setGenerarEnvio(true);
  };

  //___________________________________________________________________________________
  const generarItem = () => {
    console.log('prueba 1');
    setGenerarEnvio(false);
    const item = {
      IdProveedor: JSON.parse(proveedor),
      RazonSocial: razonSocial,
      Domicilio: domicilio,
      IdLocalidad: idLocalidad,
      IdProvincia: idProvincia,
      Telefono: telefono,
      Responsable: responsable,
      IdCategoriaIVA: categoria,
      Cuit: cuit,
      Observaciones: observaciones,
      Celular: celulares,
      Email: email,
      HabCtaCte: 'S',
      Saldo: 0,
      IdTipo: 'T01',
      IdForPago: 'FP1',
      Orden: '-',
    };
    itemsPedidos.push(item);
    const itemTag = {
      idNumIngreso: itemsPedidos[0].IdProveedor,
    };
    querySaliente.push(itemTag);
    setItemsPedBeingSent(itemsPedidos);
    connectivityCheck();
    setEnvioGenerado(true);
    setItemsPedidos([]);
    setQuerySaliente([]);
  };

  //_______________
  useEffect(() => {
    if (generarEnvio === true) {
      if (ipRequestDone === true) {
        if (typeof proveedor === 'undefined') {
          Alert.alert('Error!', 'Complete Proveedor', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof razonSocial === 'undefined') {
          Alert.alert('Error!', 'Complete Razón Social', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof domicilio === 'undefined') {
          Alert.alert('Error!', 'Complete Domicilio', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof localidad === 'undefined') {
          Alert.alert('Error!', 'Complete Localidad', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof provincia === 'undefined') {
          Alert.alert('Error!', 'Complete Provincia', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof telefono === 'undefined') {
          Alert.alert('Error!', 'Complete Teléfono', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof categoria === 'undefined') {
          Alert.alert('Error!', 'Complete Categoria IVA', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof cuit === 'undefined') {
          Alert.alert('Error!', 'Complete CUIT', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof celulares === 'undefined') {
          Alert.alert('Error!', 'Complete Celulares', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else if (typeof email === 'undefined') {
          Alert.alert('Error!', 'Complete Email', [
            { text: 'Cerrar Alerta', onPress: () => setGenerarEnvio(false) },
          ]);
        } else {
          generarItem();
        }
      }
    }
  }, [generarEnvio]);

  //___________________________________________________________________________________
  const enviarItem = async (event) => {
    console.log('prueba 3');
    setEnvioGenerado(false);
    if (event.length !== 0) {
      const item = {
        IdProveedor: event[0].IdProveedor,
        RazonSocial: event[0].RazonSocial,
        Domicilio: event[0].Domicilio,
        IdLocalidad: event[0].IdLocalidad,
        IdProvincia: event[0].IdProvincia,
        Telefono: event[0].Telefono,
        Responsable: event[0].Responsable,
        IdCategoriaIVA: event[0].IdCategoriaIVA,
        Cuit: event[0].Cuit,
        Observaciones: event[0].Observaciones,
        Celular: event[0].Celular,
        Email: event[0].Email,
        HabCtaCte: event[0].HabCtaCte,
        Saldo: event[0].Saldo,
        IdTipo: event[0].IdTipo,
        IdForPago: event[0].IdForPago,
        Orden: event[0].Orden,
      };
      console.log(item);
      if (alta === true) {
        console.log('prueba4');
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/altaProveedor';
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
          cleanUpAll();
          getProveedores();
          setAlta(false);
          // const itemTag = {
          //   idNumIngreso: event[0].IdCliente,
          // };
          // queryEnviado.push(itemTag);
        }
      } else {
        console.log('prueba5');

        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/modifProveedor';
        try {
          await Axios.put(urlAxiosRequest, item, {
            cancelToken: source.token,
          });
        } catch (error) {
          if (Axios.isCancel(error)) {
          } else {
            throw error;
          }
        } finally {
          cleanUpAll();
          getProveedores();
          const itemTag = {
            idNumIngreso: event[0].IdProveedor,
          };
          queryEnviado.push(itemTag);
        }
      }
    }
    setPerformPedidoCheck(true);
    console.log('envio generado');
  };

  //_______________
  useEffect(() => {
    if (connected === true && envioGenerado === true) {
      console.log('prueba 2');
      enviarItem(itemsPedBeingSent);
    }
  }, [connecChecked, envioGenerado]);

  // //___________________________________________________________________________________
  // const checkPedidoSent = async () => {
  // if (querySaliente.length === queryEnviado.length) {
  //   cleanUpAll();
  // } else if (querySaliente.length !== queryEnviado.length) {
  //   if (queryEnviado.length === 0) {
  //     setQueryEnviado([]);
  //   }
  //   for (let i = 0; i < querySaliente.length; i++) {
  //     const tagItemSal = {
  //       idNumIngreso: querySaliente[i].idNumIngreso,
  //       idProducto: querySaliente[i].idProducto,
  //     };
  //     const checkQuerySent = queryEnviado.some((item) => {
  //       return (
  //         item.idNumIngreso == tagItemSal.idNumIngreso &&
  //         item.idProducto == tagItemSal.idProducto
  //       );
  //     });
  //     if (checkQuerySent === false) {
  //       queryEnCola.push(tagItemSal);
  //     }
  //   }
  // }
  // setSavePedCola(true);
  //   setPerformPedidoCheck(false);
  // };

  // //_______________
  // useEffect(() => {
  //   if (performPedidoCheck === true) {
  //     console.log(queryEnviado);
  //     checkPedidoSent();
  //   }
  // }, [performPedidoCheck]);

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  //___________________________________________________________________________________

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  const getCodigoLibre = () => {
    const tablaProveedoresLength = tablaProveedores.length;
    const lastIdUsed = tablaProveedores[tablaProveedoresLength - 1].IdProveedor;
    const proveedorString = JSON.stringify(lastIdUsed + 1);
    setProveedor(proveedorString);
  };

  //_______________
  useEffect(() => {
    if (alta === true) {
      getCodigoLibre();
    }
  }, [alta]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editProveedor === true) {
        proveedorRef.current.focus();
      } else if (editRazonSocial === true) {
        razonSocialRef.current.focus();
      } else if (editDomicilio === true) {
        domicilioRef.current.focus();
      } else if (editLocalidad === true) {
        localidadRef.current.focus();
      } else if (editProvincia === true) {
        provinciaRef.current.focus();
      } else if (editTelefono === true) {
        telefonoRef.current.focus();
      } else if (editResponsable === true) {
        responsableRef.current.focus();
      } else if (editCategoria === true) {
        categoriaRef.current.focus();
      } else if (editCuit === true) {
        cuitRef.current.focus();
      } else if (editObservaciones === true) {
        observacionesRef.current.focus();
      } else if (editCelulares === true) {
        celularesRef.current.focus();
      } else if (editEmail === true) {
        emailRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

  //_______________
  useEffect(() => {
    if (
      editProveedor === true ||
      editRazonSocial === true ||
      editDomicilio === true ||
      editLocalidad === true ||
      editProvincia === true ||
      editTelefono === true ||
      editResponsable === true ||
      editCategoria === true ||
      editCuit === true ||
      editObservaciones === true ||
      editCelulares === true ||
      editEmail === true
    ) {
      setHandleFocus(true);
    }
  }, [
    editProveedor,
    editRazonSocial,
    editDomicilio,
    editLocalidad,
    editProvincia,
    editTelefono,
    editResponsable,
    editCategoria,
    editCuit,
    editObservaciones,
    editCelulares,
    editEmail,
  ]);

  //___________________________________________________________________________________
  const proveedorHandler = (event) => {
    if (typeof event !== 'undefined') {
      setProveedor(event);
    }
  };

  //___________________________________________________________________________________
  const razonSocialHandler = (event) => {
    if (typeof event !== 'undefined') {
      setRazonSocial(event);
    }
  };

  //___________________________________________________________________________________
  const domicilioHandler = (event) => {
    if (typeof event !== 'undefined') {
      setDomicilio(event);
    }
  };

  //___________________________________________________________________________________
  const localidadHandler = (event) => {
    if (typeof event !== 'undefined') {
      setLocalidad(event);
    }
  };

  //___________________________________________________________________________________
  const provinciaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setProvincia(event);
    }
  };

  //___________________________________________________________________________________
  const telefonoHandler = (event) => {
    if (typeof event !== 'undefined') {
      setTelefono(event);
    }
  };

  //___________________________________________________________________________________
  const responsableHandler = (event) => {
    if (typeof event !== 'undefined') {
      setResponsable(event);
    }
  };

  //___________________________________________________________________________________
  const categoriaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCategoria(event);
    }
  };

  //___________________________________________________________________________________
  const cuitHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCuit(event);
    }
  };

  //___________________________________________________________________________________
  const observacionesHandler = (event) => {
    if (typeof event !== 'undefined') {
      setObservaciones(event);
    }
  };

  //___________________________________________________________________________________
  const celularesHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCelulares(event);
    }
  };

  //___________________________________________________________________________________
  const emailHandler = (event) => {
    if (typeof event !== 'undefined') {
      setEmail(event);
    }
  };

  //___________________________________________________________________________________
  const proveedorTouched = () => {
    setSelecting('proveedor');
    setEditProveedor(true);
  };

  //___________________________________________________________________________________
  const altaTouched = () => {
    cleanUpAll();
    setAlta(true);
  };

  //___________________________________________________________________________________
  const razonSocialTouched = () => {
    setEditRazonSocial(true);
  };

  //___________________________________________________________________________________
  const domicilioTouched = () => {
    setEditDomicilio(true);
  };

  //___________________________________________________________________________________
  const localidadTouched = () => {
    setSelecting('localidad');
    setEditLocalidad(true);
  };

  //___________________________________________________________________________________
  const provinciaTouched = () => {
    setSelecting('provincia');
    setEditProvincia(true);
  };

  //___________________________________________________________________________________
  const telefonoTouched = () => {
    setEditTelefono(true);
  };

  //___________________________________________________________________________________
  const responsableTouched = () => {
    setEditResponsable(true);
  };

  //___________________________________________________________________________________
  const categoriaTouched = () => {
    setEditCategoria(true);
  };

  //___________________________________________________________________________________
  const cuitTouched = () => {
    setEditCuit(true);
  };

  //___________________________________________________________________________________
  const observacionesTouched = () => {
    setEditObservaciones(true);
  };

  //___________________________________________________________________________________
  const celularesTouched = () => {
    setEditCelulares(true);
  };

  //___________________________________________________________________________________
  const emailTouched = () => {
    setEditEmail(true);
  };

  //___________________________________________________________________________________
  const refreshTouched = () => {
    cleanUpAll();
  };

  //___________________________________________________________________________________
  const blurProveedor = () => {
    if (typeof proveedor !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        if (!isNaN(+proveedor)) {
          // this has to be non-strict ( this ==, not this === )
          return event.IdProveedor == proveedor;
        } else {
          return event.RazonSocial.toLowerCase().includes(
            proveedor.toLowerCase()
          );
        }
      };
      const data = tablaProveedores.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          fillBoxes(data);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'archProveedoresProve',
          });
        }
      } else {
        Alert.alert('Alerta!', 'Proveedor no encontrado/a', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Proveedor!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditProveedor(false);
  };

  //___________________________________________________________________________________
  const blurRazonSocial = () => {
    if (typeof razonSocial !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        if (!isNaN(+razonSocial)) {
          // this has to be non-strict ( this ==, not this === )
          return event.RazonSocial == razonSocial;
        } else {
          return event.RazonSocial.toLowerCase().includes(
            razonSocial.toLowerCase()
          );
        }
      };
      const data = tablaProveedores.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          fillBoxes(data);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'archProveedoresProve',
          });
        }
      } else {
        Alert.alert('Alerta!', 'Proveedor no encontrado/a', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Proveedor!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditRazonSocial(false);
  };
  //___________________________________________________________________________________
  const blurDomicilio = () => {
    setEditDomicilio(false);
    if (typeof domicilio === 'undefined') {
      Alert.alert('Alerta!', 'Complete Domicilio!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const blurLocalidad = () => {
    if (typeof localidad !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return (
          event.IdClaves[0].includes('L') &&
          event.Descripcion.toLowerCase().includes(localidad.toLowerCase())
        );
      };
      const data = tablaClaves.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          setLocalidad(data[0].Descripcion);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'archProveedoresLocal',
          });
        }
      } else {
        Alert.alert('Alerta!', 'Localidad no encontrada', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Localidad!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditLocalidad(false);
  };

  //___________________________________________________________________________________
  const blurProvincia = () => {
    if (typeof provincia !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return (
          event.IdClaves[0].includes('P') &&
          event.Descripcion.toLowerCase().includes(provincia.toLowerCase())
        );
      };
      const data = tablaClaves.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          setProvincia(data[0].Descripcion);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'archProveedoresProvin',
          });
        }
      } else {
        Alert.alert('Alerta!', 'Provincia no encontrada', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Provincia!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditProvincia(false);
  };

  //___________________________________________________________________________________
  const blurTelefono = () => {
    setEditTelefono(false);
    if (typeof telefono === 'undefined') {
      Alert.alert('Alerta!', 'Complete Telefono!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const blurResponsable = () => {
    setEditResponsable(false);
  };

  //___________________________________________________________________________________
  const blurCategoria = () => {
    setEditCategoria(false);
    if (typeof categoria === 'undefined') {
      Alert.alert('Alerta!', 'Complete Categoría!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const blurCuit = () => {
    setEditCuit(false);
    if (typeof cuit === 'undefined') {
      Alert.alert('Alerta!', 'Complete Cuit!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const blurObservaciones = () => {
    setEditObservaciones(false);
  };

  //___________________________________________________________________________________
  const blurCelulares = () => {
    setEditCelulares(false);
    if (typeof celulares === 'undefined') {
      Alert.alert('Alerta!', 'Complete Celulares!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const blurEmail = () => {
    setEditEmail(false);
    if (typeof email === 'undefined') {
      Alert.alert('Alerta!', 'Complete Email!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const showLocalidad = () => {
    setSelecting('localidad');
    const filter = (event) => {
      return event.IdClaves[0].includes('L');
    };
    const data = tablaClaves.filter(filter);
    if (data.length !== 0) {
      navigation.navigate('SearchResults', {
        result: data,
        callBy: 'archProveedoresLocal',
      });
    }
  };

  //___________________________________________________________________________________
  const showProvincia = () => {
    setSelecting('provincia');
    const filter = (event) => {
      return event.IdClaves[0].includes('P');
    };
    const data = tablaClaves.filter(filter);
    if (data.length !== 0) {
      navigation.navigate('SearchResults', {
        result: data,
        callBy: 'archProveedoresProvin',
      });
    }
  };

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setProveedor();
    setRazonSocial();
    setDomicilio();
    setLocalidad();
    setProvincia();
    setIdLocalidad();
    setIdProvincia();
    setTelefono();
    setResponsable();
    setCategoria();
    setCuit();
    setObservaciones();
    setCelulares();
    setEmail();
    setAlta(false);
  };

  //___________________________________________________________________________________
  const fillBoxes = (data) => {
    const proveedorString = JSON.stringify(data[0].IdProveedor);
    setProveedor(proveedorString);
    setRazonSocial(data[0].RazonSocial);
    setDomicilio(data[0].Domicilio);
    const filterLocalidad = (event) => {
      // return event.IdProveedor.toLowerCase() == data[0].IdLocalidad.toLowerCase();
    };
    const dataLocal = tablaProveedores.filter(filterLocalidad);
    if (dataLocal.length !== 0) {
      setIdLocalidad(dataLocal[0].IdProveedor);
      setLocalidad(dataLocal[0].Descripcion);
    }
    const filterProvincia = (event) => {
      return event.IdClaves.toLowerCase() == data[0].IdProvincia.toLowerCase();
    };
    const dataProvincia = tablaClaves.filter(filterProvincia);
    if (dataProvincia.length !== 0) {
      setIdProvincia(dataProvincia[0].IdClaves);
      setProvincia(dataProvincia[0].Descripcion);
    }
    setRazonSocial(data[0].RazonSocial);
    setTelefono(data[0].Telefono);
    setResponsable(data[0].Responsable);
    setCategoria(data[0].IdCategoriaIVA);
    setCuit(data[0].Cuit);
    setObservaciones(data[0].Observaciones);
    setCelulares(data[0].Celular);
    setEmail(data[0].EmailFW);
    setCodPostal(data[0].CodPostal);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (selecting === 'proveedor') {
        const filter = (event) => {
          return event.IdProveedor == itemSelected;
        };
        const data = tablaProveedores.filter(filter);
        if (data.length !== 0) {
          fillBoxes(data);
        }
      } else if (selecting === 'localidad') {
        setIdLocalidad(itemSelected);
        const filter = (event) => {
          return event.IdClaves === itemSelected;
        };
        const data = tablaClaves.filter(filter);
        if (data.length !== 0) {
          setLocalidad(data[0].Descripcion);
        }
        // dev
      } else if (selecting === 'provincia') {
        setIdProvincia(itemSelected);
        const filter = (event) => {
          return event.IdClaves === itemSelected;
        };
        const data = tablaClaves.filter(filter);
        if (data.length !== 0) {
          setProvincia(data[0].Descripcion);
        }
      }
      setSelecting();
      navigation.setParams({ itemSelected: 'null' });
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <SafeAreaView>
      <ScrollView>
        {/* -----------------Form section------------------ */}
        <View style={styles.formContainer}>
          {/* --------------------1------------------------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { width: 100 }]}>Proveedor</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-start' }]}>
              <TouchableOpacity
                onPress={() => {
                  proveedorTouched();
                }}
              >
                <TextInput
                  editable={editProveedor}
                  onBlur={() => blurProveedor()}
                  onChangeText={proveedorHandler}
                  placeholder={''}
                  ref={proveedorRef}
                  style={[
                    styles.box,
                    {
                      width: 100,
                      alignSelf: 'flex-start',
                      marginLeft: 44,
                    },
                  ]}
                  underlineColorAndroid='transparent'
                  value={proveedor || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={styles.refreshContainer}>
              <TouchableOpacity
                style={styles.refreshTouch}
                onPress={() => refreshTouched()}
              >
                <View>
                  <MaterialIcons
                    name='refresh'
                    size={30}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={styles.btnTableWrapper}>
              <TouchableOpacity
                style={[styles.btnTablePlace, { alignSelf: 'flex-end' }]}
                onPress={() => altaTouched()}
              >
                <Text style={styles.btnTable}>Alta</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 2 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Raz. Social</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  razonSocialTouched();
                }}
              >
                <TextInput
                  editable={editRazonSocial}
                  onBlur={() => blurRazonSocial()}
                  onChangeText={razonSocialHandler}
                  ref={razonSocialRef}
                  placeholder={''}
                  style={[styles.box, { width: 240 }]}
                  underlineColorAndroid='transparent'
                  value={razonSocial || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 3 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Domicilio</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  domicilioTouched();
                }}
              >
                <TextInput
                  editable={editDomicilio}
                  onBlur={() => blurDomicilio()}
                  onChangeText={domicilioHandler}
                  placeholder={''}
                  ref={domicilioRef}
                  style={[styles.box, { width: 240 }]}
                  underlineColorAndroid='transparent'
                  value={domicilio || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 4 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Local.</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.boxContainer,
                { alignItems: 'flex-end', marginLeft: 175 },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  localidadTouched();
                }}
              >
                <TextInput
                  editable={editLocalidad}
                  onBlur={() => blurLocalidad()}
                  onChangeText={localidadHandler}
                  placeholder={''}
                  ref={localidadRef}
                  style={[styles.box, { width: 230, fontSize: 17 }]}
                  underlineColorAndroid='transparent'
                  value={localidad || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={styles.btnTableWrapper}>
              <TouchableOpacity
                style={[
                  styles.btnTablePlace,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    alignSelf: 'flex-end',
                    width: 35,
                  },
                ]}
                onPress={() => showLocalidad()}
              >
                <Text style={styles.btnTable}>L</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 5 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { width: 125 }]}>Provincia</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.boxContainer,
                { alignItems: 'flex-end', marginLeft: 175 },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  provinciaTouched();
                }}
              >
                <TextInput
                  editable={editProvincia}
                  onBlur={() => blurProvincia()}
                  onChangeText={provinciaHandler}
                  placeholder={''}
                  ref={provinciaRef}
                  style={[styles.box, { width: 200, fontSize: 17 }]}
                  underlineColorAndroid='transparent'
                  value={provincia || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={styles.btnTableWrapper}>
              <TouchableOpacity
                style={[
                  styles.btnTablePlace,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    alignSelf: 'flex-end',
                    width: 35,
                  },
                ]}
                onPress={() => showProvincia()}
              >
                <Text style={styles.btnTable}>P</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 6 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <TouchableOpacity
                onPress={() => {
                  telefonoTouched();
                }}
              >
                <Text style={styles.label}>Teléfono</Text>
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editTelefono}
                onBlur={() => blurTelefono()}
                onChangeText={telefonoHandler}
                placeholder={''}
                ref={telefonoRef}
                style={[styles.box, { width: 240 }]}
                underlineColorAndroid='transparent'
                value={telefono || ''}
              />
            </View>
          </View>
          {/* ----------- 7 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <TouchableOpacity
                onPress={() => {
                  responsableTouched();
                }}
              >
                <Text style={styles.label}>Responsable</Text>
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editResponsable}
                onBlur={() => blurResponsable()}
                onChangeText={responsableHandler}
                placeholder={''}
                ref={responsableRef}
                style={[styles.box, { width: 220 }]}
                underlineColorAndroid='transparent'
                value={responsable || ''}
              />
            </View>
          </View>
          {/* ----------- 8 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <TouchableOpacity
                onPress={() => {
                  categoriaTouched();
                }}
              >
                <Text style={[styles.label, { paddingRight: 1, width: 70 }]}>
                  Cat IVA
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editCategoria}
                keyboardType='numeric'
                onBlur={() => blurCategoria()}
                onChangeText={categoriaHandler}
                placeholder={''}
                ref={categoriaRef}
                style={[
                  styles.box,
                  {
                    width: 50,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                  },
                ]}
                underlineColorAndroid='transparent'
                value={categoria || ''}
              />
            </View>
            {/* ----------- */}
            <View
              style={[
                styles.labelContainer,
                { alignContent: 'flex-start', marginRight: 50 },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  cuitTouched();
                }}
              >
                <Text style={styles.label}>CUIT</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editCuit}
                keyboardType='numeric'
                onBlur={() => blurCuit()}
                onChangeText={cuitHandler}
                placeholder={''}
                ref={cuitRef}
                style={[styles.box, { width: 150 }]}
                underlineColorAndroid='transparent'
                value={cuit || ''}
              />
            </View>
          </View>
          {/* ----------- 9 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <TouchableOpacity
                onPress={() => {
                  observacionesTouched();
                }}
              >
                <Text style={styles.label}>Obs.</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editObservaciones}
                keyboardType='numeric'
                onBlur={() => blurObservaciones()}
                onChangeText={observacionesHandler}
                placeholder={''}
                ref={observacionesRef}
                style={[styles.box, { width: 275 }]}
                underlineColorAndroid='transparent'
                value={observaciones || ''}
              />
            </View>
          </View>
          {/* ----------- 10 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <TouchableOpacity
                onPress={() => {
                  celularesTouched();
                }}
              >
                <Text style={styles.label}>Cel.</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editCelulares}
                keyboardType='numeric'
                onBlur={() => blurCelulares()}
                onChangeText={celularesHandler}
                placeholder={''}
                ref={celularesRef}
                style={[styles.box, { width: 275 }]}
                underlineColorAndroid='transparent'
                value={celulares || ''}
              />
            </View>
          </View>
          {/* ----------- 11 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <TouchableOpacity
                onPress={() => {
                  emailTouched();
                }}
              >
                <Text style={styles.label}>Email</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                editable={editEmail}
                onBlur={() => blurEmail()}
                onChangeText={emailHandler}
                placeholder={''}
                ref={emailRef}
                style={[styles.box, { width: 275 }]}
                underlineColorAndroid='transparent'
                value={email || ''}
              />
            </View>
          </View>
          {/* ----------- 12 ----------- */}
          <View style={styles.row}>
            <View style={styles.enviarContainer}>
              <TouchableOpacity
                style={styles.enviarTouch}
                onPress={() => enviarTourched()}
              >
                <View style={styles.containerLabelEnviar}>
                  <Text style={styles.labelEnviar}>Enviar Cambios</Text>
                </View>
                <View style={styles.btnEnviar}>
                  <MaterialIcons name='send' size={25} color={colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* --------------------------------------------- */}
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
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  labelContainer: {
    alignSelf: 'center',
    backgroundColor: colors.green,
    borderRadius: 15,
  },
  label: {
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
  btnTablePlace: {
    backgroundColor: colors.greenBlue,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  btnTableWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  btnTable: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 40,
  },
  refreshTouch: {
    backgroundColor: colors.green,
    borderRadius: 100,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  enviarContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  enviarTouch: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginTop: 5,
  },
  btnEnviar: {
    alignItems: 'flex-end',
  },
  containerLabelEnviar: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  labelEnviar: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  },
});

export default ArchProveedores;
