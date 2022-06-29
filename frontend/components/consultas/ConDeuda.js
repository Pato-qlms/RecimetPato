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
import colors from '../../assets/colors';
import GeneralContext from '../../contexts/GeneralContext';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConDeuda = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const { tablesLoaded, tablaClientes, tablaDeuda } =
    useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [editCliente, setEditCliente] = useState(false);
  const [editRazonSocial, setEditRazonSocial] = useState(false);
  const [handleFocus, setHandleFocus] = useState(false);
  const [showCpte, setShowCpte] = useState(false);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [cliente, setCliente] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [total, setTotal] = useState();
  const [selecting, setSelecting] = useState();
  const [cardNumero, setCardNumero] = useState();
  const [cardLetra, setCardLetra] = useState();
  const [cardIdConcepto, setCardIdConcepto] = useState();
  const [cardFechaCpte, setCardFechaCpte] = useState();
  const [cardFechaVto, setCardFechaVto] = useState();
  const [cardImporte, setCardImporte] = useState();
  const [cardSaldo, setCardSaldo] = useState();

  //___________________________________________________________________________________
  const clienteRef = useRef();
  const razonSocialRef = useRef();

  //___________________________________________________________________________________
  useEffect(() => {
    if (editCliente === true || editRazonSocial === true) {
      setHandleFocus(true);
    }
  }, [editCliente, editRazonSocial]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editCliente === true) {
        clienteRef.current.focus();
      } else if (editRazonSocial === true) {
        razonSocialRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

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
  const clienteTouched = () => {
    setSelecting('cliente');
    setEditCliente(true);
  };

  //___________________________________________________________________________________
  const refreshTouched = () => {
    cleanUpAll();
  };

  //___________________________________________________________________________________
  const razonSocialTouched = () => {
    setSelecting('razonSocial');
    setEditRazonSocial(true);
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
            callBy: 'conComprasClie',
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
    if (
      typeof razonSocial !== 'undefined' &&
      razonSocial !== '' &&
      tablesLoaded === true
    ) {
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
            callBy: 'conComprasClie',
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
  const buttomButtonTouched = () => {
    if (
      typeof cliente !== 'undefined' &&
      cliente !== '' &&
      tablesLoaded === true
    ) {
      const filter = (event) => {
        return event.IdCliente == cliente && event.Saldo != 0;
      };
      const dataDeuda = tablaDeuda.filter(filter);
      if (dataDeuda.length !== 0) {
        navigation.navigate('SearchResults', {
          result: dataDeuda,
          callBy: 'conFichaDeuda',
        });
      }
      setSelecting('comprobante');
    }
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
      } else if (selecting === 'comprobante') {
        const splitKey = itemSelected.split('/');
        const filter = (event) => {
          return (
            event.Numero == splitKey[0] &&
            event.Letra == splitKey[1] &&
            event.IdConcepto == splitKey[2]
          );
        };
        const data = tablaDeuda.filter(filter);
        if (data.length !== 0) {
          setCardNumero(data[0].Numero);
          setCardLetra(data[0].Letra);
          setCardIdConcepto(data[0].IdConcepto);
          const fechaCpteString = data[0].FechaCpte;
          const dd1 = fechaCpteString.substr(8, 2);
          const mm1 = fechaCpteString.substr(5, 2);
          const aa1 = fechaCpteString.substr(0, 4);
          setCardFechaCpte(`${dd1}/${mm1}/${aa1}`);
          const fechaVtoString = data[0].FechaVto;
          const dd2 = fechaVtoString.substr(8, 2);
          const mm2 = fechaVtoString.substr(5, 2);
          const aa2 = fechaVtoString.substr(0, 4);
          setCardFechaVto(`${dd2}/${mm2}/${aa2}`);
          setCardImporte(data[0].Importe);
          setCardSaldo(data[0].Saldo);
          setShowCpte(true);
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
    const filter = (event) => {
      return event.IdCliente == data[0].IdCliente && event.Saldo != 0;
    };
    const dataDeuda = tablaDeuda.filter(filter);
    if (dataDeuda.length !== 0) {
      const sum = dataDeuda.reduce((result, item) => {
        return result + parseFloat(item.Saldo);
      }, 0);
      const deudaString = JSON.stringify(sum);
      setTotal(deudaString);
    }
  };

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setCliente();
    setRazonSocial();
    setTotal();
    setSelecting();
    setCardNumero();
    setCardLetra();
    setCardIdConcepto();
    setCardFechaCpte();
    setCardFechaVto();
    setCardImporte();
    setCardSaldo();
    setShowCpte(false);
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
                      width: 150,
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
          </View>
          {/* ----------- 2 ----------- */}
          <View
            style={[
              styles.row,
              { alignSelf: 'flex-start', paddingVertical: 7 },
            ]}
          >
            <View style={[styles.labelContainer, { alignSelf: 'flex-start' }]}>
              <Text
                style={[styles.label, { flex: 1, alignSelf: 'flex-start' }]}
              >
                Razón Social
              </Text>
            </View>
          </View>
          {/* ------------------------------ */}
          <View style={[styles.row, { paddingTop: 0 }]}>
            <View style={[styles.boxContainer, {}]}>
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
                    {
                      paddingLeft: 15,
                      width: '100%',
                      textAlign: 'left',
                    },
                  ]}
                  underlineColorAndroid='transparent'
                  value={razonSocial || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ----------- 3 ----------- */}
          <View style={[styles.row, { paddingTop: 20 }]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Total</Text>
            </View>
            {/* ------------------------------ */}
            <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
              <TextInput
                placeholder={''}
                style={[styles.box, { width: 245 }]}
                underlineColorAndroid='transparent'
                value={total || ''}
              />
            </View>
          </View>
          {/* --------------------------------------------- */}
          <View style={styles.row}>
            <View
              style={
                !showCpte
                  ? [
                      styles.buttomButtonContainer,
                      { marginTop: 20, paddingBottom: 400 },
                    ]
                  : [
                      styles.buttomButtonContainer,
                      { marginTop: 20, paddingBottom: 5 },
                    ]
              }
            >
              {' '}
              <TouchableOpacity
                style={[styles.buttomButtonTouch, {}]}
                onPress={() => buttomButtonTouched()}
              >
                <View style={styles.bbLabelWrapper}>
                  <Text style={styles.bbLabel}>Ficha Deuda </Text>
                </View>
                <View style={styles.btnBuscar}>
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
          {showCpte ? (
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Numero</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Letra</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Concepto</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { alignSelf: 'center' }]}>
                    {cardNumero}
                  </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { alignSelf: 'center' }]}>
                    {cardLetra}
                  </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { alignSelf: 'center' }]}>
                    {cardIdConcepto}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Fecha Cpte</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { marginRight: 10 }]}>
                    {cardFechaCpte}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Fecha Vto</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { marginRight: 10 }]}>
                    {cardFechaVto}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Importe</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { marginRight: 10 }]}>
                    {cardImporte}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Saldo</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { marginRight: 10 }]}>
                    {cardSaldo}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={[{ height: 0 }]}></View>
          )}
          {/* --------------------------------------------- */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 20,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
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
  refreshContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 20,
    marginRight: 20,
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
    marginTop: 10,
  },
  buttomButtonTouch: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 7,
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
  cardContainer: {
    borderRadius: 20,
    marginBottom: 125,
    marginTop: 20,
    paddingVertical: 3,
  },
  textContainer: {
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 15,
  },
  text: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    color: colors.greenBlue,
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});

export default ConDeuda;
