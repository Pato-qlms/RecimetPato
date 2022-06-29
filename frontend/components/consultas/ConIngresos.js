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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';

const ConIngresos = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const {
    fechaGC,
    tablesLoaded,
    tablaClientes,
    tablaCompradores,
    tablaOperaItems,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [editAñoDesde, setEditAñoDesde] = useState(false);
  const [editAñoHasta, setEditAñoHasta] = useState(false);
  const [editClientes, setEditClientes] = useState(false);
  const [editChofer, setEditChofer] = useState(false);
  const [editComprador, setEditComprador] = useState(false);
  const [editDiaDesde, setEditDiaDesde] = useState(false);
  const [editDiaHasta, setEditDiaHasta] = useState(false);
  const [editNumero, setEditNumero] = useState(false);
  const [editMesDesde, setEditMesDesde] = useState(false);
  const [editMesHasta, setEditMesHasta] = useState(false);
  const [handleFocus, setHandleFocus] = useState(false);
  const [handleDateFocus, setHandleDateFocus] = useState(false);
  const [itemsToCardOK, setItemsToCardOK] = useState(false);
  const [hideFechaHasta, setHideFechaHasta] = useState(false);
  const [asignarFecha, setAsignarFecha] = useState(false);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [añoDesde, setAñoDesde] = useState();
  const [añoHasta, setAñoHasta] = useState();
  const [chofer, setChofer] = useState();
  const [cliente, setCliente] = useState();
  const [comprador, setComprador] = useState();
  const [diaDesde, setDiaDesde] = useState();
  const [diaHasta, setDiaHasta] = useState();
  const [fechaDesde, setFechaDesde] = useState();
  const [fechaHasta, setFechaHasta] = useState();
  const [idChofer, setIdChofer] = useState();
  const [idCliente, setIdCliente] = useState();
  const [idComprador, setIdComprador] = useState();
  const [itemsFound, setItemsFound] = useState([]);
  const [itemsToCard, setItemsToCard] = useState([]);
  const [mesDesde, setMesDesde] = useState();
  const [mesHasta, setMesHasta] = useState();
  const [numero, setNumero] = useState();
  const [selecting, setSelecting] = useState();

  //___________________________________________________________________________________
  const añoDesdeRef = useRef();
  const añoHastaRef = useRef();
  const choferRef = useRef();
  const clientesRef = useRef();
  const compradorRef = useRef();
  const diaDesdeRef = useRef();
  const diaHastaRef = useRef();
  const numeroRef = useRef();
  const mesDesdeRef = useRef();
  const mesHastaRef = useRef();

  //___________________________________________________________________________________
  useEffect(() => {
    setAsignarFecha(true);
  }, [fechaGC]);

  //_______________
  useEffect(() => {
    if (asignarFecha === true) {
      const dd = fechaGC.substr(8, 2);
      const mm = fechaGC.substr(5, 2);
      const aa = fechaGC.substr(0, 4);
      setDiaDesde(dd);
      setMesDesde(mm);
      setAñoDesde(aa);
      setDiaHasta(dd);
      setMesHasta(mm);
      setAñoHasta(aa);
      setAsignarFecha(false);
    }
  }, [asignarFecha]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editNumero === true) {
        numeroRef.current.focus();
      } else if (editComprador === true) {
        compradorRef.current.focus();
      } else if (editClientes === true) {
        clientesRef.current.focus();
      } else if (editChofer === true) {
        choferRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

  //_______________
  useEffect(() => {
    if (
      editNumero === true ||
      editComprador === true ||
      editClientes === true ||
      editChofer === true
    ) {
      setHandleFocus(true);
    }
  }, [editNumero, editComprador, editClientes, editChofer]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleDateFocus === true) {
      if (editDiaDesde === true) {
        diaDesdeRef.current.focus();
      } else if (editMesDesde === true) {
        mesDesdeRef.current.focus();
      } else if (editAñoDesde === true) {
        añoDesdeRef.current.focus();
      } else if (editDiaHasta === true) {
        diaHastaRef.current.focus();
      } else if (editMesHasta === true) {
        mesHastaRef.current.focus();
      } else if (editAñoHasta === true) {
        añoHastaRef.current.focus();
      }
      setHandleDateFocus(false);
    }
  }, [handleDateFocus]);

  //_______________
  useEffect(() => {
    if (
      editDiaDesde === true ||
      editMesDesde === true ||
      editAñoDesde === true ||
      editDiaHasta === true ||
      editMesHasta === true ||
      editAñoHasta === true
    ) {
      setHandleDateFocus(true);
    }
  }, [
    editDiaDesde,
    editMesDesde,
    editAñoDesde,
    editDiaHasta,
    editMesHasta,
    editAñoHasta,
  ]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (selecting !== 'numero' && selecting !== 'fromTo') {
        if (selecting === 'comprador') {
          const filterCompra = (event) => {
            return event.IdCompradores == itemSelected;
          };
          const dataCompra = tablaCompradores.filter(filterCompra);
          if (dataCompra.length !== 0) {
            setIdComprador(dataCompra[0].IdCompradores);
            setComprador(dataCompra[0].RazonSocial);
          }
        } else if (selecting === 'cliente') {
          const filterClie = (event) => {
            return event.IdCliente == itemSelected; // this has to be non-strict
          };
          const dataClie = tablaClientes.filter(filterClie);
          if (dataClie.length !== 0) {
            setIdCliente(dataClie[0].IdCliente);
            setCliente(dataClie[0].RazonSocial);
          }
        } else if (selecting === 'chofer') {
          const filterChof = (event) => {
            return event.IdCompradores == itemSelected; // this has to be non-strict
          };
          const dataChof = tablaCompradores.filter(filterChof);
          if (dataChof.length !== 0) {
            setIdChofer(dataChof[0].IdCompradores);
            setChofer(dataChof[0].RazonSocial);
          }
        }
      } else {
        const filter = (event) => {
          return event.IdAuto == itemSelected; // this has to be non-strict
        };
        const data = tablaOperaItems.filter(filter);
        if (data.length !== 0) {
          fillBoxes(data);
        }
        setSelecting();
        setHideFechaHasta(true);
        navigation.setParams({ itemSelected: 'null' });
      }
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  const fillBoxes = (data) => {
    setNumero(JSON.stringify(data[0].Numero));
    const filterCompra = (event) => {
      return event.IdCompradores == data[0].IdCompradores;
    };
    const dataCompra = tablaCompradores.filter(filterCompra);
    if (dataCompra.length !== 0) {
      setIdComprador(dataCompra[0].IdCompradores);
      setComprador(dataCompra[0].RazonSocial);
    }
    const filterClie = (event) => {
      return event.IdCliente == data[0].IdCliente; // this has to be non-strict
    };
    const dataClie = tablaClientes.filter(filterClie);
    if (dataClie.length !== 0) {
      setIdCliente(dataClie[0].IdCliente);
      setCliente(dataClie[0].RazonSocial);
    }
    const filterChof = (event) => {
      return event.IdCompradores == data[0].IdCompradores; // this has to be non-strict
    };
    const dataChof = tablaCompradores.filter(filterChof);
    if (dataChof.length !== 0) {
      setIdChofer(dataChof[0].IdCompradores);
      setChofer(dataChof[0].RazonSocial);
    }
    const fechaString = data[0].FechaCpte;
    const dd = fechaString.substr(8, 2);
    const mm = fechaString.substr(5, 2);
    const aa = fechaString.substr(0, 4);
    setDiaDesde(dd);
    setMesDesde(mm);
    setAñoDesde(aa);
  };

  //___________________________________________________________________________________
  const numeroHandler = (event) => {
    if (typeof event !== 'undefined') {
      const newEvent = event.replace(/[^0-9]/g, '');
      setNumero(newEvent);
    }
  };

  //___________________________________________________________________________________
  const compradorHandler = (event) => {
    if (typeof event !== 'undefined') {
      setComprador(event);
    }
  };

  //___________________________________________________________________________________
  const clientesHandler = (event) => {
    if (typeof event !== 'undefined') {
      setCliente(event);
    }
  };

  //___________________________________________________________________________________
  const choferHandler = (event) => {
    if (typeof event !== 'undefined') {
      setChofer(event);
    }
  };

  //___________________________________________________________________________________
  const diaDesdeHandler = (event) => {
    if (typeof event !== 'undefined') {
      setDiaDesde(event);
    }
  };

  //___________________________________________________________________________________
  const mesDesdeHandler = (event) => {
    if (typeof event !== 'undefined') {
      setMesDesde(event);
    }
  };

  //___________________________________________________________________________________
  const añoDesdeHandler = (event) => {
    if (typeof event !== 'undefined') {
      setAñoDesde(event);
    }
  };

  //___________________________________________________________________________________
  const diaHastaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setDiaHasta(event);
    }
  };

  //___________________________________________________________________________________
  const mesHastaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setMesHasta(event);
    }
  };

  //___________________________________________________________________________________
  const añoHastaHandler = (event) => {
    if (typeof event !== 'undefined') {
      setAñoHasta(event);
    }
  };

  //___________________________________________________________________________________
  const numeroTouched = () => {
    setNumero();
    setEditNumero(true);
  };

  //___________________________________________________________________________________
  const compradorTouched = () => {
    setComprador();
    setIdComprador();
    setEditComprador(true);
  };

  //___________________________________________________________________________________
  const clienteTouched = () => {
    setCliente();
    setIdCliente();
    setEditClientes(true);
  };

  //___________________________________________________________________________________
  const choferTouched = () => {
    setChofer();
    setIdChofer();
    setEditChofer(true);
  };

  //___________________________________________________________________________________
  const diaDesdeTouched = () => {
    setDiaDesde();
    setEditDiaDesde(true);
  };

  //___________________________________________________________________________________
  const mesDesdeTouched = () => {
    setMesDesde();
    setEditMesDesde(true);
  };

  //___________________________________________________________________________________
  const añoDesdeTouched = () => {
    setEditAñoDesde(true);
  };

  //___________________________________________________________________________________
  const diaHastaTouched = () => {
    setDiaHasta();
    setEditDiaHasta(true);
  };

  //___________________________________________________________________________________
  const mesHastaTouched = () => {
    setMesHasta();
    setEditMesHasta(true);
  };

  //___________________________________________________________________________________
  const añoHastaTouched = () => {
    setEditAñoHasta(true);
  };

  //___________________________________________________________________________________
  const refreshTouched = () => {
    cleanUpAll();
  };

  //___________________________________________________________________________________
  const bottomButtonTouched = () => {
    if (tablesLoaded === true && hideFechaHasta === false) {
      if (typeof numero !== 'undefined') {
        const filter = (event) => {
          return event.Numero == numero;
        };
        const data = tablaOperaItems.filter(filter);
        if (data.length !== 0) {
          setSelecting('numero');
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'conIngresosNum',
          });
        } else {
          Alert.alert('Alerta!', 'Número no encontrado', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        }
      } else if (
        typeof fechaDesde !== 'undefined' &&
        typeof fechaHasta !== 'undefined'
      ) {
        for (let i = 0; i < tablaOperaItems.length; i++) {
          const fechaString = tablaOperaItems[i].FechaCpte;
          const aa = fechaString.substr(0, 4);
          const mm = fechaString.substr(5, 2);
          const dd = fechaString.substr(8, 2);
          const fecha = `${dd}/${mm}/${aa}`;
          //---------------------------------
          const from = fechaDesde.split('/');
          const to = fechaHasta.split('/');
          const check = fecha.split('/');
          //---------------------------------
          const desde = new Date(from[2], parseInt(from[1]) - 1, from[0]); // -1 because months are from 0 to 11
          const hasta = new Date(to[2], parseInt(to[1]) - 1, to[0]); // -1 because months are from 0 to 11
          const busqueda = new Date(check[2], parseInt(check[1]) - 1, check[0]);
          //---------------------------------
          if (
            typeof comprador === 'undefined' &&
            typeof cliente === 'undefined' &&
            typeof chofer === 'undefined'
          ) {
            if (busqueda >= desde && busqueda <= hasta) {
              itemsFound.push(tablaOperaItems[i].IdAuto);
            }
          } else if (typeof comprador !== 'undefined') {
            if (
              busqueda >= desde &&
              busqueda <= hasta &&
              tablaOperaItems[i].IdCompradores == idComprador
            ) {
              itemsFound.push(tablaOperaItems[i].IdAuto);
            }
          } else if (typeof cliente !== 'undefined') {
            if (
              busqueda >= desde &&
              busqueda <= hasta &&
              tablaOperaItems[i].IdCliente == idCliente
            ) {
              itemsFound.push(tablaOperaItems[i].IdAuto);
            }
          } else if (typeof chofer !== 'undefined') {
            if (
              busqueda >= desde &&
              busqueda <= hasta &&
              tablaOperaItems[i].IdChofer == idChofer
            ) {
              itemsFound.push(tablaOperaItems[i].IdAuto);
            }
          }
        }
        if (itemsFound.length !== 0) {
          for (let i = 0; i < itemsFound.length; i++) {
            const filter = (event) => {
              return event.IdAuto == itemsFound[i];
            };
            const data = tablaOperaItems.filter(filter);
            if (data.length !== 0) {
              itemsToCard.push(data[0]);
            }
          }
          setItemsToCardOK(true);
        } else {
          Alert.alert('Alerta!', 'No se encontraron Ingresos', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        }
        setItemsFound([]);
      }
    }
  };

  //___________________________________________________________________________________
  const blurNumero = () => {
    if (typeof numero === 'undefined' || numero === '') {
      Alert.alert('Alerta!', 'Complete Número!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditNumero(false);
  };

  //___________________________________________________________________________________
  const blurComprador = () => {
    if (
      typeof comprador !== 'undefined' &&
      comprador !== '' &&
      tablesLoaded === true
    ) {
      const filter = (event) => {
        if (!isNaN(+comprador)) {
          return event.IdCompradores == comprador; // this has to be non-strict
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
          setSelecting('comprador');
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'conIngresosComp',
          });
        }
      } else {
        setComprador();
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
    if (
      typeof cliente !== 'undefined' &&
      cliente !== '' &&
      tablesLoaded === true
    ) {
      const filter = (event) => {
        if (!isNaN(+cliente)) {
          return event.IdCliente == cliente; // this has to be non-strict
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
          setSelecting('cliente');
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'conIngresosClie',
          });
        }
      } else {
        setCliente();
        Alert.alert('Alerta!', 'Cliente no encontrado', [
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
    setEditClientes(false);
  };

  //___________________________________________________________________________________
  const blurChofer = () => {
    if (
      typeof chofer !== 'undefined' &&
      chofer !== '' &&
      tablesLoaded === true
    ) {
      const filter = (event) => {
        if (!isNaN(+chofer)) {
          return event.IdCompradores == chofer; // this has to be non-strict
        } else {
          return event.RazonSocial.toLowerCase().includes(chofer.toLowerCase());
        }
      };
      const data = tablaCompradores.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          setChofer(data[0].RazonSocial);
          setIdChofer(data[0].IdCompradores);
        } else if (data.length > 1) {
          setSelecting('chofer');
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'conIngresosChof',
          });
        }
      } else {
        setChofer();
        Alert.alert('Alerta!', 'Chofer no encontrado', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Chofer!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditChofer(false);
  };

  //___________________________________________________________________________________
  const blurDiaDesde = () => {
    if (typeof diaDesde !== 'undefined' && diaDesde !== '') {
      if (isNaN(+diaDesde)) {
        setEditDiaDesde(false);
        Alert.alert('Alerta!', 'Utilice Solamente Números', [
          {
            text: 'Cerrar Alerta',
            onPress: () => {
              setDiaDesde();
              setEditDiaDesde(true);
              return;
            },
          },
        ]);
      } else {
        if (diaDesde < 1 || diaDesde > 31) {
          setEditDiaDesde(false);
          Alert.alert('Alerta!', 'Día debe estar entre 1 y 31', [
            {
              text: 'Cerrar Alerta',
              onPress: () => {
                setDiaDesde();
                setEditDiaDesde(true);
                return;
              },
            },
          ]);
        }
      }
    } else {
      Alert.alert('Alerta!', 'Complete Dia Desde!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditDiaDesde(false);
  };

  //___________________________________________________________________________________
  const blurMesDesde = () => {
    if (typeof mesDesde !== 'undefined' && mesDesde !== '') {
      if (isNaN(+mesDesde)) {
        setEditMesDesde(false);
        Alert.alert('Alerta!', 'Utilice Solamente Números', [
          {
            text: 'Cerrar Alerta',
            onPress: () => {
              setMesDesde();
              setEditMesDesde(true);
              return;
            },
          },
        ]);
      } else {
        if (mesDesde < 1 || mesDesde > 12) {
          setEditMesDesde(false);
          Alert.alert('Alerta!', 'Mes debe estar entre 1 y 12', [
            {
              text: 'Cerrar Alerta',
              onPress: () => {
                setMesDesde();
                setEditMesDesde(true);
                return;
              },
            },
          ]);
        }
      }
    } else {
      Alert.alert('Alerta!', 'Complete Mes Desde!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditMesDesde(false);
  };

  //___________________________________________________________________________________
  const blurAñoDesde = () => {
    if (typeof añoDesde !== 'undefined' && añoDesde !== '') {
      if (isNaN(+añoDesde)) {
        setEditAñoDesde(false);
        Alert.alert('Alerta!', 'Utilice Solamente Números', [
          {
            text: 'Cerrar Alerta',
            onPress: () => {
              setAñoDesde();
              setEditAñoDesde(true);
              return;
            },
          },
        ]);
      } else {
        if (añoDesde < 999 || añoDesde > 9999) {
          setEditAñoDesde(false);
          Alert.alert('Alerta!', 'Utilice 4 números para Año', [
            {
              text: 'Cerrar Alerta',
              onPress: () => {
                setAñoDesde();
                setEditAñoDesde(true);
                return;
              },
            },
          ]);
        } else if (añoDesde < 1950) {
          Alert.alert('Alerta!', 'Ingreso año Anterior a 1950', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        } else if (typeof añoHasta !== 'undefined' && añoHasta !== '') {
          if (añoDesde > añoHasta) {
            setEditAñoDesde(false);
            Alert.alert('Alerta!', 'Año Hasta Menor que Año Desde', [
              {
                text: `Modificar - ${añoHasta} - Año Hasta`,
                onPress: () => {
                  setAñoHasta();
                  setEditAñoHasta(true);
                  return;
                },
              },
              {
                text: `Modificar - ${añoDesde} - Año Desde`,
                onPress: () => {
                  setAñoDesde();
                  setEditAñoDesde(true);
                  return;
                },
              },
            ]);
          } else {
            setFechaDesde(`${diaDesde}/${mesDesde}/${añoDesde}`);
            setFechaHasta(`${diaHasta}/${mesHasta}/${añoHasta}`);
          }
        }
      }
    } else {
      setEditAñoDesde(false);
      Alert.alert('Alerta!', 'Complete Año Desde!', [
        {
          text: 'Cerrar Alerta',
          onPress: () => {
            return;
          },
        },
      ]);
    }
    setEditAñoDesde(false);
  };

  //___________________________________________________________________________________
  const blurDiaHasta = () => {
    if (typeof diaHasta !== 'undefined' && diaHasta !== '') {
      if (isNaN(+diaHasta)) {
        setEditDiaHasta(false);
        Alert.alert('Alerta!', 'Utilice Solamente Números', [
          {
            text: 'Cerrar Alerta',
            onPress: () => {
              setDiaHasta();
              setEditDiaHasta(true);
              return;
            },
          },
        ]);
      } else {
        setEditDiaHasta(false);
        if (diaHasta < 1 || diaHasta > 31) {
          Alert.alert('Alerta!', 'Día debe estar entre 1 y 31', [
            {
              text: 'Cerrar Alerta',
              onPress: () => {
                setDiaHasta();
                setEditDiaHasta(true);
                return;
              },
            },
          ]);
        }
      }
    } else {
      Alert.alert('Alerta!', 'Complete Dia Hasta!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditDiaHasta(false);
  };

  //___________________________________________________________________________________
  const blurMesHasta = () => {
    if (typeof mesHasta !== 'undefined' && mesHasta !== '') {
      if (isNaN(+mesHasta)) {
        setEditMesHasta(false);
        Alert.alert('Alerta!', 'Utilice Solamente Números', [
          {
            text: 'Cerrar Alerta',
            onPress: () => {
              setMesHasta();
              setEditMesHasta(true);
              return;
            },
          },
        ]);
      } else {
        if (mesHasta < 1 || mesHasta > 12) {
          setEditMesHasta(false);
          Alert.alert('Alerta!', 'Mes debe estar entre 1 y 12', [
            {
              text: 'Cerrar Alerta',
              onPress: () => {
                setMesHasta();
                setEditMesHasta(true);
                return;
              },
            },
          ]);
        }
      }
    } else {
      Alert.alert('Alerta!', 'Complete Mes Hasta!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditMesHasta(false);
  };

  //___________________________________________________________________________________
  const blurAñoHasta = () => {
    if (typeof añoHasta !== 'undefined' && añoHasta !== '') {
      if (isNaN(+añoHasta)) {
        setEditAñoHasta(false);
        Alert.alert('Alerta!', 'Utilice Solamente Números', [
          {
            text: 'Cerrar Alerta',
            onPress: () => {
              setAñoHasta();
              setEditAñoHasta(true);
              return;
            },
          },
        ]);
      } else {
        if (añoHasta < 999 || añoHasta > 9999) {
          setEditAñoHasta(false);
          Alert.alert('Alerta!', 'Utilice 4 números para Año', [
            {
              text: 'Cerrar Alerta',
              onPress: () => {
                setAñoHasta();
                setEditAñoHasta(true);
                return;
              },
            },
          ]);
        } else {
          if (añoHasta < añoDesde) {
            setEditAñoHasta(false);
            Alert.alert('Alerta!', 'Año Hasta Menor que Año Desde', [
              {
                text: `Modificar - ${añoHasta} - Año Hasta`,
                onPress: () => {
                  setAñoHasta();
                  setEditAñoHasta(true);
                  return;
                },
              },
              {
                text: `Modificar - ${añoDesde} - Año Desde`,
                onPress: () => {
                  setAñoDesde();
                  setEditAñoDesde(true);
                  return;
                },
              },
            ]);
          } else if (añoHasta < 1950) {
            Alert.alert('Alerta!', 'Ingreso año Anterior a 1950', [
              {
                text: 'Cerrar Alerta',
              },
            ]);
          } else {
            setFechaDesde(`${diaDesde}/${mesDesde}/${añoDesde}`);
            setFechaHasta(`${diaHasta}/${mesHasta}/${añoHasta}`);
          }
        }
      }
    } else {
      setEditAñoHasta(false);
      Alert.alert('Alerta!', 'Complete Año Hasta!', [
        {
          text: 'Cerrar Alerta',
          onPress: () => {
            return;
          },
        },
      ]);
    }
    setEditAñoHasta(false);
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (
      typeof diaDesde !== 'undefined' &&
      typeof diaDesde != '' &&
      typeof mesDesde !== 'undefined' &&
      typeof mesDesde != ''
    ) {
      setFechaDesde(`${diaDesde}/${mesDesde}/${añoDesde}`);
    }
  }, [diaDesde, mesDesde]);

  //_______________
  useEffect(() => {
    if (
      typeof diaHasta !== 'undefined' &&
      typeof diaHasta != '' &&
      typeof mesHasta !== 'undefined' &&
      typeof mesHasta != ''
    ) {
      setFechaHasta(`${diaHasta}/${mesHasta}/${añoHasta}`);
    }
  }, [diaHasta, mesHasta]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (itemsToCard.length !== 0 && itemsToCardOK === true) {
      setItemsToCardOK(false);
      setSelecting('fromTo');
      navigation.navigate('SearchResults', {
        result: itemsToCard,
        callBy: 'conIngresosFromTo',
      });
    }
  }, [itemsToCard, itemsToCardOK]);

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setNumero();
    setComprador();
    setIdComprador();
    setCliente();
    setIdCliente();
    setChofer();
    setIdChofer();
    setDiaDesde();
    setMesDesde();
    setAñoDesde();
    setDiaHasta();
    setMesHasta();
    setAñoHasta();
    setItemsFound([]);
    setItemsToCard([]);
    setItemsToCardOK(false);
    setHideFechaHasta(false);
    setAsignarFecha(true);
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
              <Text style={styles.label}>Número</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[
                styles.boxContainer,
                { flex: 1, alignItems: 'flex-end', marginRight: 10 },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  numeroTouched();
                }}
              >
                <TextInput
                  editable={editNumero}
                  keyboardType='numeric'
                  onBlur={() => blurNumero()}
                  onChangeText={numeroHandler}
                  placeholder={''}
                  ref={numeroRef}
                  style={[styles.box, { width: 150, alignSelf: 'flex-end' }]}
                  underlineColorAndroid='transparent'
                  value={numero || ''}
                />
              </TouchableOpacity>
            </View>
            {/* ----------- Refresh ----------- */}
            <View
              style={[
                styles.refreshContainer,
                { marginLeft: 25, marginRight: 12 },
              ]}
            >
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
          </View>
          {/* ----------- 2 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Comprador</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[styles.boxContainer, { flex: 1, alignItems: 'flex-end' }]}
            >
              <TouchableOpacity
                onPress={() => {
                  compradorTouched();
                }}
              >
                <TextInput
                  editable={editComprador}
                  onBlur={() => blurComprador()}
                  onChangeText={compradorHandler}
                  ref={compradorRef}
                  placeholder={''}
                  style={[styles.box, { width: 235 }]}
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
            <View
              style={[styles.boxContainer, { flex: 1, alignItems: 'flex-end' }]}
            >
              <TouchableOpacity
                onPress={() => {
                  clienteTouched();
                }}
              >
                <TextInput
                  editable={editClientes}
                  onBlur={() => blurCliente()}
                  onChangeText={clientesHandler}
                  placeholder={''}
                  ref={clientesRef}
                  style={[styles.box, { width: 235 }]}
                  underlineColorAndroid='transparent'
                  value={cliente || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 4 ----------- */}
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Chofer</Text>
            </View>
            {/* ------------------------------ */}
            <View
              style={[styles.boxContainer, { flex: 1, alignItems: 'flex-end' }]}
            >
              <TouchableOpacity
                onPress={() => {
                  choferTouched();
                }}
              >
                <TextInput
                  editable={editChofer}
                  onBlur={() => blurChofer()}
                  onChangeText={choferHandler}
                  placeholder={''}
                  ref={choferRef}
                  style={[styles.box, { width: 235 }]}
                  underlineColorAndroid='transparent'
                  value={chofer || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 5 ----------- */}
          <View style={[styles.row, { paddingVertical: 5 }]}>
            <View style={[styles.labelContainer, {}]}>
              <Text style={[styles.label, { width: 150 }]}>
                {!hideFechaHasta ? 'Fecha Desde' : 'Fecha'}
              </Text>
            </View>
            {/* ------------------------------ */}
            {/* Día - Fecha Desde */}
            {/* ------------------------------ */}
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={() => {
                    diaDesdeTouched();
                  }}
                >
                  <TextInput
                    editable={editDiaDesde}
                    keyboardType='numeric'
                    onBlur={() => blurDiaDesde()}
                    onChangeText={diaDesdeHandler}
                    placeholder={'dd'}
                    ref={diaDesdeRef}
                    style={[
                      styles.box,
                      {
                        fontSize: diaDesde ? 18 : 16,
                        width: 50,
                        alignSelf: 'flex-end',
                      },
                    ]}
                    underlineColorAndroid='transparent'
                    value={diaDesde || ''}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.dateBarContainer, { marginHorizontal: 5 }]}>
                <Text style={styles.dateBar}>/</Text>
              </View>
              {/* ------------------------------ */}
              {/* Mes - Fecha Desde */}
              {/* ------------------------------ */}
              <View style={[styles.boxContainer, { marginLeft: 0 }]}>
                <TouchableOpacity
                  onPress={() => {
                    mesDesdeTouched();
                  }}
                >
                  <TextInput
                    editable={editMesDesde}
                    keyboardType='numeric'
                    onBlur={() => blurMesDesde()}
                    onChangeText={mesDesdeHandler}
                    placeholder={'mm'}
                    ref={mesDesdeRef}
                    style={[
                      styles.box,
                      {
                        width: 50,
                        fontSize: mesDesde ? 18 : 16,
                      },
                    ]}
                    underlineColorAndroid='transparent'
                    value={mesDesde || ''}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.dateBarContainer, { marginHorizontal: 5 }]}>
                <Text style={styles.dateBar}>/</Text>
              </View>
              {/* ------------------------------ */}
              {/* Año - Fecha Desde */}
              {/* ------------------------------ */}
              <View style={[styles.boxContainer, { marginLeft: 0 }]}>
                <TouchableOpacity
                  onPress={() => {
                    añoDesdeTouched();
                  }}
                >
                  <TextInput
                    editable={editAñoDesde}
                    keyboardType='numeric'
                    onBlur={() => blurAñoDesde()}
                    onChangeText={añoDesdeHandler}
                    placeholder={'aaaa'}
                    ref={añoDesdeRef}
                    style={[
                      styles.box,
                      {
                        width: 75,
                        fontSize: añoDesde ? 18 : 16,
                      },
                    ]}
                    underlineColorAndroid='transparent'
                    value={añoDesde || ''}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* ----------- 6 ----------- */}
          {hideFechaHasta ? (
            <View style={[{ height: 0 }]}></View>
          ) : (
            <View style={[styles.row, { paddingVertical: 5 }]}>
              <View style={styles.labelContainer}>
                <Text style={[styles.label, { width: 150 }]}>Fecha Hasta</Text>
              </View>
              {/* ------------------------------ */}
              {/* Día - Fecha Hasta */}
              {/* ------------------------------ */}
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
                  <TouchableOpacity
                    onPress={() => {
                      diaHastaTouched();
                    }}
                  >
                    <TextInput
                      editable={editDiaHasta}
                      keyboardType='numeric'
                      onBlur={() => blurDiaHasta()}
                      onChangeText={diaHastaHandler}
                      placeholder={!hideFechaHasta ? 'dd' : ''}
                      ref={diaHastaRef}
                      style={[
                        styles.box,
                        { width: 50, fontSize: diaHasta ? 18 : 16 },
                      ]}
                      underlineColorAndroid='transparent'
                      value={diaHasta || ''}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[styles.dateBarContainer, { marginHorizontal: 5 }]}
                >
                  <Text style={styles.dateBar}>/</Text>
                </View>
                {/* ------------------------------ */}
                {/* Mes - Fecha Hasta */}
                {/* ------------------------------ */}
                <View style={[styles.boxContainer, { marginLeft: 0 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      mesHastaTouched();
                    }}
                  >
                    <TextInput
                      editable={editMesHasta}
                      keyboardType='numeric'
                      onBlur={() => blurMesHasta()}
                      onChangeText={mesHastaHandler}
                      placeholder={!hideFechaHasta ? 'mm' : ''}
                      ref={mesHastaRef}
                      style={[
                        styles.box,
                        {
                          width: 50,
                          fontSize: mesHasta ? 18 : 16,
                        },
                      ]}
                      underlineColorAndroid='transparent'
                      value={mesHasta || ''}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[styles.dateBarContainer, { marginHorizontal: 5 }]}
                >
                  <Text style={styles.dateBar}>/</Text>
                </View>
                {/* ------------------------------ */}
                {/* Año - Fecha Hasta */}
                {/* ------------------------------ */}
                <View style={[styles.boxContainer, { marginLeft: 0 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      añoHastaTouched();
                    }}
                  >
                    <TextInput
                      editable={editAñoHasta}
                      keyboardType='numeric'
                      onBlur={() => blurAñoHasta()}
                      onChangeText={añoHastaHandler}
                      placeholder={!hideFechaHasta ? 'aaaa' : ''}
                      ref={añoHastaRef}
                      style={[
                        styles.box,
                        { width: 75, fontSize: añoHasta ? 18 : 16 },
                      ]}
                      underlineColorAndroid='transparent'
                      value={añoHasta || ''}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {/* --------------------------------------------- */}
          <View style={styles.row}>
            <View style={styles.buttomButtonContainer}>
              <TouchableOpacity
                style={
                  !hideFechaHasta
                    ? styles.buttomButtonTouch
                    : [
                        styles.buttomButtonTouch,
                        { backgroundColor: colors.metallicGrey },
                      ]
                }
                onPress={() => bottomButtonTouched()}
              >
                <View style={styles.bbLabelWrapper}>
                  <Text style={styles.bbLabel}>Buscar </Text>
                </View>
                <View style={styles.buttomButton}>
                  <Icon
                    name='crosshairs-question'
                    size={30}
                    color={colors.white}
                  />
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
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flex: 1,
    paddingBottom: 210,
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
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
  dateBarContainer: {
    alignSelf: 'center',
  },
  dateBar: {
    alignSelf: 'flex-start',
    color: colors.greenBlue,
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  hideDateBar: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  refreshContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  refreshTouch: {
    backgroundColor: colors.green,
    borderRadius: 100,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  buttomButtonContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    marginTop: 40,
  },
  buttomButtonTouch: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginTop: 10,
  },
  buttomButton: {
    alignItems: 'flex-end',
  },
  bbLabelWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bbLabel: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 20,
  },
});

export default ConIngresos;
