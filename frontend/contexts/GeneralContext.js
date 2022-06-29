import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const initialLoggedStatus = {
  isLogged: false,
  username: '',
  idCompLogged: '',
};

const GeneralContext = createContext();

const GeneralProvider = ({ children }) => {
  //______________________________________________________________________________________
  const [loggedCheckDone, setLoggedCheckDone] = useState(false);
  const [loginUpdate, setLoginUpdate] = useState(false);
  const [ipRequestDone, setIpRequestDone] = useState(false);
  const [connected, setConnected] = useState();
  const [connecChecked, setConnecChecked] = useState(false);
  const [tablesLoaded, setTablesLoaded] = useState(false);
  const [dataGCLoaded, setDataGCLoaded] = useState(false);
  const [netInfoFetch, setNetInfoFetch] = useState(false);
  // const [timerStop, setTimerStop] = useState(false);
  //--------------------------------------------------------------------------------------
  const [getClavesDone, setGetClavesDone] = useState(false);
  const [getClientesDone, setGetClientesDone] = useState(false);
  const [getCompradoresDone, setGetCompradoresDone] = useState(false);
  const [getComprobantesDone, setGetComprobantesDone] = useState(false);
  const [getConceptosDone, setGetConceptosDone] = useState(false);
  const [getDeudaDone, setGetDeudaDone] = useState(false);
  const [getFotosDone, setGetFotosDone] = useState(false);
  const [getOperaItemsDone, setGetOperaItemsDone] = useState(false);
  const [getOperaMesDone, setGetOperaMesDone] = useState(false);
  const [getPreciosDone, setGetPreciosDone] = useState(false);
  const [getProductosDone, setGetProductosDone] = useState(false);
  const [getProveedoresDone, setGetProveedoresDone] = useState(false);
  //--------------------------------------------------------------------------------------
  const [clavesUpdated, setClavesUpdated] = useState(false);
  const [clientesUpdated, setClientesUpdated] = useState(false);
  const [compradoresUpdated, setCompradoresUpdated] = useState(false);
  const [comprobantesUpdated, setComprobantesUpdated] = useState(false);
  const [conceptosUpdated, setConceptosUpdated] = useState(false);
  const [deudaUpdated, setDeudaUpdated] = useState(false);
  const [fotosUpdated, setFotosUpdated] = useState(false);
  const [operaMesUpdated, setOperaMesUpdated] = useState(false);
  const [operaItemsUpdated, setOperaItemsUpdated] = useState(false);
  const [preciosUpdated, setPreciosUpdated] = useState(false);
  const [productosUpdated, setProductosUpdated] = useState(false);
  const [proveedoresUpdated, setProveedoresUpdated] = useState(false);
  //______________________________________________________________________________________
  const [updateTables, setUpdateTables] = useState(3);
  const [loggedStatus, setLoggedStatus] = useState(initialLoggedStatus);
  const [idComprador, setIdComprador] = useState();
  const [ipBackend, setIpBackend] = useState();
  const [tablaClaves, setTablaClaves] = useState([]);
  const [tablaClientes, setTablaClientes] = useState([]);
  const [tablaCompradores, setTablaCompradores] = useState([]);
  const [tablaComprobantes, setTablaComprobantes] = useState([]);
  const [tablaConceptos, setTablaConceptos] = useState([]);
  const [tablaDeuda, setTablaDeuda] = useState([]);
  const [tablaFotos, setTablaFotos] = useState([]);
  const [tablaOperaMes, setTablaOperaMes] = useState([]);
  const [tablaOperaItems, setTablaOperaItems] = useState([]);
  const [tablaPrecios, setTablaPrecios] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [tablaProveedores, setTablaProveedores] = useState([]);
  const [fechaGC, setFechaGC] = useState('');
  const [hora, setHora] = useState('');
  const [planillaGC, setPlanillaGC] = useState();
  const [valorDolarGC, setValorDolarGC] = useState();
  const [choferGC, setChoferGC] = useState();
  const [acompañanteGC, setAcompañanteGC] = useState();

  //______________________________________________________________________________________
  const getFecha = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const aa = String(hoy.getFullYear());
    const fecha = `${aa}/${mm}/${dd}`;
    setFechaGC(fecha);
  };

  //_____________________
  const getHora = () => {
    const hoy = new Date();
    const hours = String(hoy.getHours() - 3).padStart(2, '0');
    const min = String(hoy.getMinutes()).padStart(2, '0');
    const sec = String(hoy.getSeconds()).padStart(2, '0');
    const hora = `${hours}/${min}/${sec}`;
    setHora(hora);
  };



  //_______________
  useEffect(() => {
    getFecha();
    getHora();
  }, []);

  //______________________________________________________________________________________
  // dev --> backend in Marcos's PC --> uncomment next four lines when working with emulator
  useEffect(() => {
   // setIpBackend('192.168.0.111');
   setIpBackend('192.168.1.55');

    setIpRequestDone(true);
  }, []);

  // //______________________________________________________________________________________
  // const getBackendIP = async () => {
  //   const responseIP = await fetch(
  //     'https://dns.google/resolve?name=recimet.ddns.net'
  //   );
  //   const json = await responseIP.json();
  //   const ip = json.Answer[0].data;
  //   setIpBackend(ip);
  //   setIpRequestDone(true);
  // };
  // useEffect(() => {
  //   getBackendIP();
  // }, []);

  // //______________________________________________________________________________________
  // const getBackendIP = async () => {
  //   const responseIP = await fetch(
  //     'https://dns.google/resolve?name=kayrossistemas.ddns.net'
  //   );
  //   const json = await responseIP.json();
  //   const ip = json.Answer[0].data;
  //   setIpBackend(ip);
  //   setIpRequestDone(true);
  // };
  // useEffect(() => {
  //   getBackendIP();
  // }, []);

  //______________________________________________________________________________________
  //______________________________________________________________________________________
  //______________________________________________________________________________________
  useEffect(() => {
    loadUserInfo();
  }, []);

  //________________________________
  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      if (jsonValue != null) {
        const userInfo = JSON.parse(jsonValue);
        handleIsLogged(userInfo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoggedCheckDone(true);
    }
  };

  //______________________________________________________________________________________
  const handleIsLogged = (userInfo) => {
    const newLoggedStatus = {
      isLogged: true,
      username: userInfo.username,
      idCompLogged: userInfo.idCompLogged,
    };
    setLoggedStatus(newLoggedStatus);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (loggedStatus.isLogged === true) {
      setIdComprador(loggedStatus.idCompLogged);
    }
  }, [loggedStatus]);

  //______________________________________________________________________________________
  const handleLoginUpdate = () => {
    setLoginUpdate(true);
  };

  //______________________________________________________________________________________
  useEffect(() => {
    if (
      ipRequestDone === true &&
      typeof idComprador !== 'undefined' &&
      loggedStatus.isLogged === true
    ) {
      checkActualizar();
    }
  }, [ipRequestDone, idComprador, loggedStatus]);

  //_____________________________
  const checkActualizar = () => {
    const actualizar = async () => {
      let source = Axios.CancelToken.source();
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/updateCheck';
      try {
        await Axios.get(
          urlAxiosRequest,
          { params: { IdCompradores: idComprador } },
          {
            cancelToken: source.token,
          }
        ).then((response) => {
          setUpdateTables(response.data[0].Actualizar);
        });
      } catch (error) {
        setUpdateTables(2);
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }
    };
    actualizar();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  useEffect(() => {
    if (updateTables !== 3) {
      if (
        (loggedStatus.isLogged === true && updateTables === 1) ||
        loginUpdate === true
      ) {
        getClaves();
        getClientes();
        getCompradores();
        getComprobantes();
        getConceptos();
        getDeuda();
        getFotos();
        getOperaItems();
        getOperaMes();
        getPrecios();
        getProductos();
        getProveedores();
      } else if (loggedStatus.isLogged === true && updateTables === 0) {
        loadTablaClaves();
        loadTablaClientes();
        loadTablaCompradores();
        loadTablaComprobantes();
        loadTablaConceptos();
        loadTablaDeuda();
        loadTablaFotos();
        loadTablaOperaItems();
        loadTablaOperaMes();
        loadTablaPrecios();
        loadTablaProductos();
        loadTablaProveedores();
      } else if (loggedStatus.isLogged === true && updateTables === 2) {
        loadTablaClaves();
        loadTablaClientes();
        loadTablaCompradores();
        loadTablaComprobantes();
        loadTablaConceptos();
        loadTablaDeuda();
        loadTablaFotos();
        loadTablaOperaItems();
        loadTablaOperaMes();
        loadTablaPrecios();
        loadTablaProductos();
        loadTablaProveedores();
        Alert.alert(
          'Sin conexión a Internet',
          'Trabajando con tablas no actualizadas',
          [{ text: 'Cerrar Alerta' }]
        );
      }
    }
  }, [updateTables, loginUpdate]);

  //______________________________________________________________________________________
  const loadTablaClaves = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaClaves');
      if (jsonValue != null) {
        const tablaClavesParsed = JSON.parse(jsonValue);
        setTablaClaves(tablaClavesParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetClavesDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaClientes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaClientes');
      if (jsonValue != null) {
        const tablaClientesParsed = JSON.parse(jsonValue);
        setTablaClientes(tablaClientesParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetClientesDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaCompradores = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaCompradores');
      if (jsonValue != null) {
        const tablaCompradoresParsed = JSON.parse(jsonValue);
        setTablaCompradores(tablaCompradoresParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetCompradoresDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaComprobantes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaComprobantes');
      if (jsonValue != null) {
        const tablaComprobantesParsed = JSON.parse(jsonValue);
        setTablaComprobantes(tablaComprobantesParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetComprobantesDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaDeuda = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaDeuda');
      if (jsonValue != null) {
        const tablaDeudaParsed = JSON.parse(jsonValue);
        setTablaDeuda(tablaDeudaParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetDeudaDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaConceptos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaConceptos');
      if (jsonValue != null) {
        const tablaConceptosParsed = JSON.parse(jsonValue);
        setTablaConceptos(tablaConceptosParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetConceptosDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaFotos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaFotos');
      if (jsonValue != null) {
        const tablaFotosParsed = JSON.parse(jsonValue);
        setTablaFotos(tablaFotosParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetFotosDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaOperaItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaOperaItems');
      if (jsonValue != null) {
        const tablaOperaItemsParsed = JSON.parse(jsonValue);
        setTablaOperaItems(tablaOperaItemsParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetOperaItemsDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaOperaMes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaOperaMes');
      if (jsonValue != null) {
        const tablaOperaMesParsed = JSON.parse(jsonValue);
        setTablaOperaMes(tablaOperaMesParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetOperaMesDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaPrecios = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaPrecios');
      if (jsonValue != null) {
        const tablaPreciosParsed = JSON.parse(jsonValue);
        setTablaPrecios(tablaPreciosParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetPreciosDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaProductos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaProductos');
      if (jsonValue != null) {
        const tablaProductosParsed = JSON.parse(jsonValue);
        setTablaProductos(tablaProductosParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetProductosDone(true);
    }
  };

  //______________________________________________________________________________________
  const loadTablaProveedores = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaProveedores');
      if (jsonValue != null) {
        const tablaProveedoresParsed = JSON.parse(jsonValue);
        setTablaProveedores(tablaProveedoresParsed);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGetProveedoresDone(true);
    }
  };

  //______________________________________________________________________________________
  const getClaves = () => {
    removeTablaClaves();
    let source = Axios.CancelToken.source();
    const claves = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/claves';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaClaves', JSON.stringify(response.data));
          setTablaClaves(response.data);
          setClavesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetClavesDone(true);
      }
    };
    claves();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getClientes = () => {
    removeTablaClientes();
    let source = Axios.CancelToken.source();
    const clientes = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/clientes';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaClientes', JSON.stringify(response.data));
          setTablaClientes(response.data);
          setClientesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetClientesDone(true);
      }
    };
    clientes();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getCompradores = () => {
    removeTablaCompradores();
    let source = Axios.CancelToken.source();
    const compradores = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/compradores';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaCompradores',
            JSON.stringify(response.data)
          );
          setTablaCompradores(response.data);
          setCompradoresUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetCompradoresDone(true);
      }
    };
    compradores();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getComprobantes = () => {
    removeTablaComprobantes();
    let source = Axios.CancelToken.source();
    const comprobantes = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/comprobantes';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaComprobantes',
            JSON.stringify(response.data)
          );
          setTablaComprobantes(response.data);
          setComprobantesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetComprobantesDone(true);
      }
    };
    comprobantes();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getConceptos = () => {
    removeTablaConceptos();
    let source = Axios.CancelToken.source();
    const conceptos = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/conceptos';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaConceptos', JSON.stringify(response.data));
          setTablaConceptos(response.data);
          setConceptosUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetConceptosDone(true);
      }
    };
    conceptos();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getDeuda = () => {
    removeTablaDeuda();
    let source = Axios.CancelToken.source();
    const deuda = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/deuda';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaDeuda', JSON.stringify(response.data));
          setTablaDeuda(response.data);
          setDeudaUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetDeudaDone(true);
      }
    };
    deuda();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getFotos = () => {
    removeTablaFotos();
    let source = Axios.CancelToken.source();
    const fotos = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/productosFotos';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaFotos', JSON.stringify(response.data));
          setTablaFotos(response.data);
          setFotosUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetFotosDone(true);
      }
    };
    fotos();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getOperaItems = () => {
    removeTablaOperaItems();
    let source = Axios.CancelToken.source();
    const operaItems = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/operaItems';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaOperaItems',
            JSON.stringify(response.data)
          );
          setTablaOperaItems(response.data);
          setOperaItemsUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetOperaItemsDone(true);
      }
    };
    operaItems();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getOperaMes = () => {
    removeTablaOperaMes();
    let source = Axios.CancelToken.source();
    const operaMes = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/operaMes';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaOperaMes', JSON.stringify(response.data));
          setTablaOperaMes(response.data);
          setOperaMesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetOperaMesDone(true);
      }
    };
    operaMes();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getPrecios = () => {
    removeTablaPrecios();
    let source = Axios.CancelToken.source();
    const precios = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/precios';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaPrecios', JSON.stringify(response.data));
          setTablaPrecios(response.data);
          setPreciosUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetPreciosDone(true);
      }
    };
    precios();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getProductos = () => {
    removeTablaProductos();
    let source = Axios.CancelToken.source();
    const productos = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/productos';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaProductos', JSON.stringify(response.data));
          setTablaProductos(response.data);
          setProductosUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetProductosDone(true);
      }
    };
    productos();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getProveedores = () => {
    removeTablaProveedores();
    let source = Axios.CancelToken.source();
    const proveedores = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/proveedores';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaProveedores',
            JSON.stringify(response.data)
          );
          setTablaProveedores(response.data);
          setProveedoresUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      } finally {
        setGetProveedoresDone(true);
      }
    };
    proveedores();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const removeTablaClaves = async () => {
    try {
      await AsyncStorage.removeItem('tablaClaves');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaClientes = async () => {
    try {
      await AsyncStorage.removeItem('tablaClientes');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaCompradores = async () => {
    try {
      await AsyncStorage.removeItem('tablaCompradores');
    } catch (error) {
      console.log(error);
    }
  };

  //___________________________________________
  const removeTablaComprobantes = async () => {
    try {
      await AsyncStorage.removeItem('tablaComprobantes');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaConceptos = async () => {
    try {
      await AsyncStorage.removeItem('tablaConceptos');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaDeuda = async () => {
    try {
      await AsyncStorage.removeItem('tablaDeuda');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaFotos = async () => {
    try {
      await AsyncStorage.removeItem('tablaFotos');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaOperaItems = async () => {
    try {
      await AsyncStorage.removeItem('tablaOperaItems');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaOperaMes = async () => {
    try {
      await AsyncStorage.removeItem('tablaOperaMes');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaPrecios = async () => {
    try {
      await AsyncStorage.removeItem('tablaPrecios');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaProductos = async () => {
    try {
      await AsyncStorage.removeItem('tablaProductos');
    } catch (error) {
      console.log(error);
    }
  };

  //______________________________________________________________________________________
  const removeTablaProveedores = async () => {
    try {
      await AsyncStorage.removeItem('tablaProveedores');
    } catch (error) {
      console.log(error);
    }
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (
      getClavesDone === true &&
      getClientesDone === true &&
      getCompradoresDone === true &&
      getComprobantesDone === true &&
      getConceptosDone === true &&
      getDeudaDone === true &&
      getFotosDone === true &&
      getOperaItemsDone === true &&
      getOperaMesDone === true &&
      getPreciosDone === true &&
      getProductosDone === true &&
      getProveedoresDone === true
    ) {
      setTablesLoaded(true);
    }
  }, [
    getClavesDone,
    getClientesDone,
    getCompradoresDone,
    getComprobantesDone,
    getConceptosDone,
    getDeudaDone,
    getFotosDone,
    getOperaItemsDone,
    getOperaMesDone,
    getPreciosDone,
    getProductosDone,
    getProveedoresDone,
  ]);

  //______________________________________________________________________________________
  useEffect(() => {
    if (
      typeof idComprador !== 'undefined' &&
      clavesUpdated === true &&
      clientesUpdated === true &&
      compradoresUpdated === true &&
      comprobantesUpdated === true &&
      conceptosUpdated === true &&
      deudaUpdated === true &&
      fotosUpdated === true &&
      operaItemsUpdated === true &&
      operaMesUpdated === true &&
      preciosUpdated === true &&
      productosUpdated === true &&
      proveedoresUpdated === true
    ) {
      // setTimerStop(true);  // usar para una rueda de carga, poner rueda de carga en el home
      tablesUpdateDone();
    }
  }, [
    idComprador,
    clavesUpdated,
    clientesUpdated,
    compradoresUpdated,
    comprobantesUpdated,
    conceptosUpdated,
    deudaUpdated,
    fotosUpdated,
    operaItemsUpdated,
    operaMesUpdated,
    preciosUpdated,
    productosUpdated,
    proveedoresUpdated,
  ]);

  //____________________________________
  const tablesUpdateDone = async () => {
    const item = { IdCompradores: idComprador };
    let source = Axios.CancelToken.source();
    const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablesUpdateDone';
    try {
      await Axios.put(urlAxiosRequest, item, {
        cancelToken: source.token,
      });
    } catch (error) {
      if (Axios.isCancel(error)) {
      } else {
        console.log(error);
      }
    }
  };

  //___________________________________________________________________________________
  const getValorDolar = () => {
    const filter = (event) => {
      return event.IdClaves == 'Dolar';
    };
    const data = tablaClaves.filter(filter);
    if (data.length !== 0) {
      const valorDolarString = JSON.stringify(data[0].Valor);
      setValorDolarGC(valorDolarString);
    }
  };

  //_______________________________
  const getNumeroPlanilla = () => {
    const filter = (event) => {
      return event.IdCompradores == loggedStatus.idCompLogged;
    };
    const data = tablaCompradores.filter(filter);
    if (data.length !== 0) {
      const planillaString = JSON.stringify(data[0].Planilla);
      setPlanillaGC(planillaString);
    }
  };

  //_______________
  useEffect(() => {
    if (loggedStatus.isLogged === true && tablesLoaded === true) {
      getValorDolar();
      getNumeroPlanilla();
    }
  }, [loggedStatus, tablesLoaded]);

  //_____________________________
  const getDataOperaMes = () => {
    const filter = (event) => {
      return event.Numero == planillaGC;
    };
    const data = tablaOperaMes.filter(filter);
    if (data.length !== 0) {
      setChoferGC(data[0].IdChofer);
      setAcompañanteGC(data[0].IdAcompañante);
    }
  };

  //_______________
  useEffect(() => {
    if (typeof planillaGC !== 'undefined') {
      getDataOperaMes();
    }
  }, [planillaGC]);

  //_______________
  useEffect(() => {
    if (
      typeof acompañanteGC !== 'undefined' &&
      typeof choferGC !== 'undefined' &&
      typeof valorDolarGC !== 'undefined' &&
      typeof planillaGC !== 'undefined'
    ) {
      setDataGCLoaded(true);
    }
  }, [valorDolarGC, planillaGC, choferGC, acompañanteGC]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (loggedCheckDone === true) {
      connectivityCheck();
    }
  }, [loggedCheckDone]);

  //___________________________________________________________________________________
  const connectivityCheck = () => {
    setConnected();
    setConnecChecked(false);
    setNetInfoFetch(true);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (connected === true || connected === false) {
      // if (typeof connected !== 'undefined' && connected !== '') {
      setConnecChecked(true);
    }
  }, [connected]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (netInfoFetch === true) {
      const checkConnection = async () => {
        try {
          await NetInfo.fetch().then((res) => {
            setConnected(res.isConnected);
          });
        } catch (error) {
          console.log(error);
        } finally {
          setNetInfoFetch(false);
        }
      };
      checkConnection();
    }
  }, [netInfoFetch]);

  //______________________________________________________________________________________
  const handleIsLoggedOut = () => {
    removeUserInfo();
    cleanUpTables();
  };

  //______________________________________________________________________________________
  const removeUserInfo = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.log(error);
    } finally {
      setLoggedStatus(initialLoggedStatus);
    }
  };

  //______________________________________________________________________________________
  const cleanUpTables = () => {
    setLoginUpdate(false);
    setTablesLoaded(false);
    setTablaClaves([]);
    setTablaClientes([]);
    setTablaCompradores([]);
    setTablaComprobantes([]);
    setTablaConceptos([]);
    setTablaDeuda([]);
    setTablaFotos([]);
    setTablaOperaMes([]);
    setTablaOperaItems([]);
    setTablaPrecios([]);
    setTablaProductos([]);
    setTablaProveedores([]);
    setGetClavesDone(false);
    setGetClientesDone(false);
    setGetCompradoresDone(false);
    setGetComprobantesDone(false);
    setGetConceptosDone(false);
    setGetDeudaDone(false);
    setGetFotosDone(false);
    setGetOperaItemsDone(false);
    setGetOperaMesDone(false);
    setGetPreciosDone(false);
    setGetProductosDone(false);
    setGetProveedoresDone(false);
    setClavesUpdated(false);
    setClientesUpdated(false);
    setCompradoresUpdated(false);
    setComprobantesUpdated(false);
    setConceptosUpdated(false);
    setDeudaUpdated(false);
    setFotosUpdated(false);
    setOperaMesUpdated(false);
    setOperaItemsUpdated(false);
    setPreciosUpdated(false);
    setProductosUpdated(false);
    setProveedoresUpdated(false);
  };

  //___________________________________________________________________________________
  const actualizarTablas = () => {
    cleanUpTables();
    getClaves();
    getClientes();
    getCompradores();
    getComprobantes();
    getConceptos();
    getDeuda();
    getFotos();
    getOperaItems();
    getOperaMes();
    getPrecios();
    getProductos();
    getProveedores();
  };

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  // data: states & functions exported by the provider
  const data = {
    connecChecked,
    connected,
    connectivityCheck,
    fechaGC,
    getClaves,
    getClientes,
    getHora,
    getProveedores,
    hora,
    ipBackend,
    ipRequestDone,
    tablaClaves,
    tablaClientes,
    tablaCompradores,
    tablaComprobantes,
    tablaConceptos,
    tablaDeuda,
    tablaFotos,
    tablaOperaItems,
    tablaOperaMes,
    tablaPrecios,
    tablaProductos,
    tablaProveedores,
    tablesLoaded,
    planillaGC,
    valorDolarGC,
    choferGC,
    acompañanteGC,
    dataGCLoaded,
    loggedStatus,
    loggedCheckDone,
    handleIsLoggedOut,
    handleIsLogged,
    handleLoginUpdate,
    actualizarTablas,
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};

export { GeneralProvider };
export default GeneralContext;
