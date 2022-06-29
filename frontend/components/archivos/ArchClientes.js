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

import Axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const ArchClientes = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const {
    loggedStatus,
    tablesLoaded,
    tablaClaves,
    tablaClientes,
    ipBackend,
    ipRequestDone,
    connectivityCheck,
    connected,
    connecChecked,
    getClientes,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [editCliente, setEditCliente] = useState(false);
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
  const [cliente, setCliente] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [domicilio, setDomicilio] = useState();
  const [localidad, setLocalidad] = useState();
  const [provincia, setProvincia] = useState();
  const [idLocalidad, setIdLocalidad] = useState();
  const [idProvincia, setIdProvincia] = useState();
  const [telefono, setTelefono] = useState();
  const [responsable, setResponsable] = useState('');
  const [cuit, setCuit] = useState();
  const [observaciones, setObservaciones] = useState('');
  const [celulares, setCelulares] = useState();
  const [email, setEmail] = useState();
  const [codigoLibre, setCodigoLibre] = useState();
  const [selecting, setSelecting] = useState();

  const [categoria, setCategoria] = useState('I8');
  const [codPostal, setCodPostal] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [habilitado, setHabilitado] = useState('S');
  const [listaPrecios, setListaPrecios] = useState(1);
  const [zona, setZona] = useState('Z01');
  const [idForPago, setIdForPago] = useState('FP1');
  const [acuVenta, setAcuVenta] = useState(0);

  // dev - envio de cambios
  const [genEnvioFirst, setGenEnvioFirst] = useState(false);
  const [genEnvioSecond, setGenEnvioSecond] = useState(false);
  const [genEnvioThird, setGenEnvioThird] = useState(false);

  const [envioGenerado, setEnvioGenerado] = useState(false);
  const [querySaliente, setQuerySaliente] = useState([]);
  const [itemsPedidos, setItemsPedidos] = useState([]);
  const [itemsPedBeingSent, setItemsPedBeingSent] = useState();

  const [queryEnviado, setQueryEnviado] = useState([]);
  const [performPedidoCheck, setPerformPedidoCheck] = useState(false);

  // const [removeItemsLS, setRemoveItemsLS] = useState(false);
  // const [savePedCola, setSavePedCola] = useState(false);
  // const [someQueryQueue, setSomeQueryQueue] = useState(false);
  // const [itemToSend, setItemToSend] = useState([]);
  // const [queryBeingSent, setQueryBeingSent] = useState([]);
  // const [queryEnCola, setQueryEnCola] = useState([]);
  // const [queryToSend, setQueryToSend] = useState([]);

  //___________________________________________________________________________________
  const clienteRef = useRef();
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
    if (typeof razonSocial === 'undefined' || razonSocial === '') {
      Alert.alert('Error!', 'Complete Rrazón Social', [
        { text: 'Cerrar Alerta' },
      ]);
    } else if (typeof domicilio === 'undefined' || domicilio === '') {
      Alert.alert('Error!', 'Complete Domicilio', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof localidad === 'undefined' || localidad === '') {
      Alert.alert('Error!', 'Complete Localidad', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof provincia === 'undefined' || provincia === '') {
      Alert.alert('Error!', 'Complete Provincia', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof telefono === 'undefined' || telefono === '') {
      Alert.alert('Error!', 'Complete Teléfono', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof categoria === 'undefined' || categoria === '') {
      Alert.alert('Error!', 'Complete Categoria IVA', [
        { text: 'Cerrar Alerta' },
      ]);
    } else if (typeof cuit === 'undefined' || cuit === '') {
      Alert.alert('Error!', 'Complete CUIT', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof celulares === 'undefined' || celulares === '') {
      Alert.alert('Error!', 'Complete Celulares', [{ text: 'Cerrar Alerta' }]);
    } else if (typeof email === 'undefined' || email === '') {
      Alert.alert('Error!', 'Complete Email', [{ text: 'Cerrar Alerta' }]);
    } else {
      if (alta === true) {
        setGenEnvioFirst(true);
        getClientes();
      } else {
        setGenEnvioFirst(true);
      }
    }
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (genEnvioFirst === true) {
      if (alta === true) {
        setGenEnvioSecond(true);
        getCodigoLibre();
      } else {
        setGenEnvioSecond(true);
      }
    }
  }, [tablaClientes, genEnvioFirst]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (genEnvioSecond === true) {
      setGenEnvioThird(true);
    }
  }, [genEnvioSecond]);

  //___________________________________________________________________________________
  const generarItem = () => {
    setGenEnvioFirst(false);
    setGenEnvioSecond(false);
    setGenEnvioThird(false);
    const item = {
      IdComprador: loggedStatus.idCompLogged,
      IdCliente: cliente,
      RazonSocial: razonSocial,
      Domicilio: domicilio,
      IdLocalidad: idLocalidad,
      IdProvincia: idProvincia,
      Telefono: telefono,
      Responsable: responsable ? responsable : '-',
      IdCategoriaIVA: categoria,
      Cuit: cuit,
      Observaciones: observaciones ? observaciones : '-',
      Celular: celulares,
      Email: email,
      EmailFW: email,
      CodPostal: codPostal,
      Descuento: descuento,
      Habilitado: habilitado,
      ListaPrecios: listaPrecios,
      IdZona: zona,
      IdForPago: idForPago,
      AcuVenta: acuVenta,
    };
    itemsPedidos.push(item);
    const itemTag = {
      idNumIngreso: itemsPedidos[0].IdCliente,
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
    if (genEnvioThird === true) {
      if (ipRequestDone === true) {
        if (typeof razonSocial === 'undefined') {
          Alert.alert('Error!', 'Complete Rrazón Social', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof domicilio === 'undefined') {
          Alert.alert('Error!', 'Complete Domicilio', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof localidad === 'undefined') {
          Alert.alert('Error!', 'Complete Localidad', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof provincia === 'undefined') {
          Alert.alert('Error!', 'Complete Provincia', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof telefono === 'undefined') {
          Alert.alert('Error!', 'Complete Teléfono', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof categoria === 'undefined') {
          Alert.alert('Error!', 'Complete Categoria IVA', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof cuit === 'undefined') {
          Alert.alert('Error!', 'Complete CUIT', [{ text: 'Cerrar Alerta' }]);
        } else if (typeof celulares === 'undefined') {
          Alert.alert('Error!', 'Complete Celulares', [
            { text: 'Cerrar Alerta' },
          ]);
        } else if (typeof email === 'undefined') {
          Alert.alert('Error!', 'Complete Email', [{ text: 'Cerrar Alerta' }]);
        } else if (
          typeof razonSocial !== 'undefined' &&
          typeof domicilio !== 'undefined' &&
          typeof localidad !== 'undefined' &&
          typeof provincia !== 'undefined' &&
          typeof telefono !== 'undefined' &&
          typeof categoria !== 'undefined' &&
          typeof cuit !== 'undefined' &&
          typeof celulares !== 'undefined' &&
          typeof email !== 'undefined'
        ) {
          generarItem();
          console.log('lol 3 x testeo');
        }
      }
    }
  }, [genEnvioThird]);

  //___________________________________________________________________________________
  const enviarItem = async (event) => {
    setEnvioGenerado(false);
    if (event.length != 0) {
      const item = {
        IdComprador: event[0].IdComprador,
        IdCliente: event[0].IdCliente,
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
        EmailFW: event[0].EmailFW,
        CodPostal: event[0].CodPostal,
        Descuento: event[0].Descuento,
        Habilitado: event[0].Habilitado,
        ListaPrecios: event[0].ListaPrecios,
        IdZona: event[0].IdZona,
        IdForPago: event[0].IdForPago,
        AcuVenta: event[0].AcuVenta,
      };
      if (alta === true) {
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/altaCliente';
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
          getClientes();
          setAlta(false);
          // const itemTag = {
          //   idNumIngreso: event[0].IdCliente,
          // };
          // queryEnviado.push(itemTag);
        }
      } else {
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/modifCliente';
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
          getClientes();
          // const itemTag = {
          //   idNumIngreso: event[0].IdCliente,
          // };
          // queryEnviado.push(itemTag);
        }
      }
    }
    setPerformPedidoCheck(true);
  };

  //_______________
  useEffect(() => {
    if (connected === true && envioGenerado === true) {
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
    const tablaClientesLength = tablaClientes.length;
    const lastIdUsed = tablaClientes[tablaClientesLength - 1].IdCliente;
    setCodigoLibre(lastIdUsed + 1);
    const clienteString = JSON.stringify(lastIdUsed + 1);
    setCliente(clienteString);
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
      if (editCliente === true) {
        clienteRef.current.focus();
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
      editCliente === true ||
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
    editCliente,
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
  const clienteHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCliente(event);
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
  const clienteTouched = () => {
    setSelecting('cliente');
    setEditCliente(true);
  };

  //___________________________________________________________________________________
  const altaTouched = () => {
    cleanUpAll();
    setAlta(true);
  };

  //___________________________________________________________________________________
  const razonSocialTouched = () => {
    setSelecting('razonSocial');
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
  const blurCliente = () => {
    if (typeof cliente !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        if (!isNaN(+cliente)) {
          // this has to be non-strict ( this ==, not this === )
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
          fillBoxes(data);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'archClientesClie',
          });
        }
      } else {
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
  const blurRazonSocial = () => {
    if (typeof razonSocial !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return event.RazonSocial.toLowerCase().includes(
          razonSocial.toLowerCase()
        );
      };
      const data = tablaClientes.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          fillBoxes(data);
        } else if (data.length > 1) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'archClientesClie',
          });
        }
      } else {
        Alert.alert('Alerta!', 'Razón Social no encontrada', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Razón Social!', [
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
    if (typeof domicilio === 'undefined' || domicilio === '') {
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
            callBy: 'archClientesLocal',
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
            callBy: 'archClientesProvin',
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
    if (typeof telefono === 'undefined' || telefono === '') {
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
    if (typeof categoria === 'undefined' || categoria === '') {
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
    if (typeof cuit === 'undefined' || cuit === '') {
      Alert.alert('Alerta!', 'Complete Cuit!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    } else if (isNaN(+cuit)) {
      Alert.alert('Alerta!', 'Utilice solo números para el Cuit!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    } else if (cuit.length < 11 || cuit.length > 11) {
      Alert.alert('Alerta!', 'Cuit deben ser 11 dígitos!', [
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
    if (typeof celulares === 'undefined' || celulares === '') {
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
    if (typeof email === 'undefined' || email === '') {
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
        callBy: 'archClieTablaLocal',
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
        callBy: 'archClieTablaProvin',
      });
    }
  };

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setCliente();
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
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (selecting === 'cliente' || selecting === 'razonSocial') {
        const filter = (event) => {
          return event.IdCliente == itemSelected;
        };
        const data = tablaClientes.filter(filter);
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
  const fillBoxes = (data) => {
    const clienteString = JSON.stringify(data[0].IdCliente);
    setCliente(clienteString);
    setRazonSocial(data[0].RazonSocial);
    setDomicilio(data[0].Domicilio);
    const filterLocalidad = (event) => {
      return event.IdClaves.toLowerCase() == data[0].IdLocalidad.toLowerCase();
    };
    const dataLocal = tablaClaves.filter(filterLocalidad);
    if (dataLocal.length !== 0) {
      setIdLocalidad(dataLocal[0].IdClaves);
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
              <Text style={styles.label}>Cliente</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-start' }]}>
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
                  style={[
                    styles.box,
                    {
                      width: 110,
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                    },
                  ]}
                  underlineColorAndroid='transparent'
                  value={cliente || ''}
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
            <View
              style={[
                styles.btnTableWrapper,
                { marginLeft: 25, marginRight: 10, alignItems: 'flex-start' },
              ]}
            >
              <TouchableOpacity
                style={[styles.btnTablePlace, { width: 80 }]}
                onPress={() => altaTouched()}
              >
                <Text
                  style={[
                    styles.btnTable,
                    { paddingHorizontal: 10, alignSelf: 'center' },
                  ]}
                >
                  Alta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 2 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>R Soc</Text>
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
                  style={[
                    styles.box,
                    { width: 275, textAlign: 'left', paddingLeft: 10 },
                  ]}
                  underlineColorAndroid='transparent'
                  value={razonSocial || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 3 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Domi</Text>
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
                  style={[styles.box, { width: 275 }]}
                  underlineColorAndroid='transparent'
                  value={domicilio || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 4 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Local</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.boxContainer,
                { alignItems: 'flex-start', marginRight: 150 },
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
                  style={[
                    styles.box,
                    {
                      alignSelf: 'flex-start',
                      fontSize: 16,
                      width: 235,
                    },
                  ]}
                  underlineColorAndroid='transparent'
                  value={localidad || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.btnTableWrapper, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                style={[
                  styles.btnTablePlace,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    // alignSelf: 'flex-end',
                    width: 35,
                  },
                ]}
                onPress={() => showLocalidad()}
              >
                <Text style={[styles.btnTable, { alignSelf: 'center' }]}>
                  L
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 5 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Provincia</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.boxContainer,
                { alignItems: 'flex-start', marginRight: 45 },
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
                  style={[
                    styles.box,
                    {
                      alignSelf: 'flex-start',
                      width: 200,
                    },
                  ]}
                  underlineColorAndroid='transparent'
                  value={provincia || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.btnTableWrapper, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                style={[
                  styles.btnTablePlace,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    // alignSelf: 'flex-end',
                    width: 35,
                  },
                ]}
                onPress={() => showProvincia()}
              >
                <Text style={[styles.btnTable, { alignSelf: 'center' }]}>
                  P
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 6 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Teléfono</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  telefonoTouched();
                }}
              >
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
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 7 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Responsable</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  responsableTouched();
                }}
              >
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
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 8 ----------- */}
          <View style={styles.row}>
            <View style={[styles.labelContainer, {}]}>
              <Text style={[styles.label, { paddingRight: 1, width: 75 }]}>
                Cat IVA
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                onPress={() => {
                  categoriaTouched();
                }}
              >
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
              </TouchableOpacity>
            </View>
            {/* ----------- */}
            <View
              style={[
                styles.labelContainer,
                { alignContent: 'flex-start', marginRight: 50 },
              ]}
            >
              <Text style={styles.label}>CUIT</Text>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  cuitTouched();
                }}
              >
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
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 9 ----------- */}
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
                  style={[styles.box, { width: 275 }]}
                  underlineColorAndroid='transparent'
                  value={observaciones || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 10 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Cel.</Text>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  celularesTouched();
                }}
              >
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
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 11 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email</Text>
            </View>
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  emailTouched();
                }}
              >
                <TextInput
                  editable={editEmail}
                  keyboardType='email-address'
                  onBlur={() => blurEmail()}
                  onChangeText={emailHandler}
                  placeholder={''}
                  ref={emailRef}
                  style={[styles.box, { width: 275 }]}
                  underlineColorAndroid='transparent'
                  value={email || ''}
                />
              </TouchableOpacity>
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
    paddingBottom: 75,
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

export default ArchClientes;
