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

const ConProductos = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const {
    tablesLoaded,
    tablaClaves,
    tablaFotos,
    tablaProductos,
    ipBackend,
    connecChecked,
    connected,
    connectivityCheck,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [blurSearchCodigo, setBlurSearchCodigo] = useState(false);
  const [blurSearchDescripcion, setBlurSearchDescripcion] = useState(false);
  const [editCodigo, setEditCodigo] = useState(false);
  const [editDescripcion, setEditDescripcion] = useState(false);
  const [handleFocus, setHandleFocus] = useState(false);
  const [isPath, setIsPath] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [codigo, setCodigo] = useState();
  const [costoComprador, setCostoComprador] = useState();
  const [descripcion, setDescripcion] = useState();
  const [foto, setFoto] = useState();
  const [fotoPath, setFotoPath] = useState();
  const [idProducto, setIdProducto] = useState();
  const [marca, setMarca] = useState();
  const [selecting, setSelecting] = useState();

  //___________________________________________________________________________________
  const codigoRef = useRef();
  const descripcionRef = useRef();

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editCodigo === true) {
        codigoRef.current.focus();
      } else if (editDescripcion === true) {
        descripcionRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

  useEffect(() => {
    if (editCodigo === true || editDescripcion === true) {
      setHandleFocus(true);
    }
  }, [editCodigo, editDescripcion]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (selecting === 'foto') {
        setShowPhoto(false);
        setIsPath(false);
      } else if (
        selecting === 'codigo' ||
        selecting === 'marca' ||
        selecting === 'categoria' ||
        selecting === 'descripcion'
      ) {
        const filter = (event) => {
          return event.IdProducto.toLowerCase() == itemSelected.toLowerCase();
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          setDescripcion(data[0].Descripcion);
          setCodigo(data[0].IdProducto);
          setCostoComprador(data[0].CostoComprador);
          setIdProducto(data[0].IdProducto);
          const filterMarca = (event) => {
            return (
              event.IdClaves.toLowerCase() == data[0].IdMarca.toLowerCase()
            );
          };
          const dataMarca = tablaClaves.filter(filterMarca);
          if (dataMarca.length !== 0) {
            setMarca(dataMarca[0].Descripcion);
          }
        }
      }
      setSelecting();
      navigation.setParams({ itemSelected: 'null' });
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  const codigoHandler = (codigo) => {
    setCodigo(codigo);
  };

  const descripcionHandler = (descripcion) => {
    setDescripcion(descripcion);
  };

  //___________________________________________________________________________________
  const blurCodigo = () => {
    setEditCodigo(false);
    setBlurSearchCodigo(true);
  };

  //_______________
  useEffect(() => {
    if (blurSearchCodigo === true) {
      setSelecting('codigo');
      if (typeof codigo !== 'undefined' && tablesLoaded === true) {
        const filter = (event) => {
          return event.IdProducto.toLowerCase().includes(codigo.toLowerCase());
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          if (data.length === 1) {
            setDescripcion(data[0].Descripcion);
            setCodigo(data[0].IdProducto);
            setCostoComprador(data[0].CostoComprador);
            setIdProducto(data[0].IdProducto);
            const filter = (event) => {
              return (
                event.IdClaves.toLowerCase() == data[0].IdMarca.toLowerCase()
              );
            };
            const dataMarca = tablaClaves.filter(filter);
            if (dataMarca.length !== 0) {
              setMarca(dataMarca[0].Descripcion);
            } else {
              Alert.alert('Alerta!', 'Marca no encontrada!', [
                {
                  text: 'Cerrar Alerta',
                },
              ]);
            }
          } else if (data.length > 1) {
            navigation.navigate('SearchResults', {
              result: data,
              callBy: 'conProdCodigo',
            });
          }
        } else {
          Alert.alert('Alerta!', 'Código no encontrado!', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        }
      } else {
        Alert.alert('Alerta!', 'Complete el Código!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
      setBlurSearchCodigo(false);
    }
  }, [blurSearchCodigo]);

  //___________________________________________________________________________________
  const blurDescripcion = () => {
    setEditDescripcion(false);
    setBlurSearchDescripcion(true);
  };

  //_______________
  useEffect(() => {
    if (blurSearchDescripcion === true) {
      setSelecting('descripcion');
      if (typeof descripcion !== 'undefined' && tablesLoaded === true) {
        const filter = (event) => {
          return event.Descripcion.toLowerCase().includes(
            descripcion.toLowerCase()
          );
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          if (data.length === 1) {
            setDescripcion(data[0].Descripcion);
            setCodigo(data[0].IdProducto);
            setCostoComprador(data[0].CostoComprador);
            setIdProducto(data[0].IdProducto);
            const filterMarca = (event) => {
              return (
                event.IdClaves.toLowerCase() == data[0].IdMarca.toLowerCase()
              );
            };
            const dataMarca = tablaClaves.filter(filterMarca);
            if (dataMarca.length !== 0) {
              setMarca(dataMarca[0].Descripcion);
            }
          } else if (data.length > 1) {
            navigation.navigate('SearchResults', {
              result: data,
              callBy: 'conProdDescripcion',
            });
          }
        } else {
          Alert.alert('Alerta!', 'Alerta!', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        }
      } else {
        Alert.alert('Alerta!', 'Complete el Descripción.', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
      setBlurSearchDescripcion(false);
    }
  }, [blurSearchDescripcion]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof idProducto !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return event.IdProductos.toLowerCase() == idProducto.toLowerCase();
      };
      const data = tablaFotos.filter(filter);
      if (data.length !== 0) {
        if (data[0].Foto != null) {
          setFoto(data[0].Foto);
        } else {
          Alert.alert('Alerta!', 'Foto ausente Tabla Productos Fotos!', [
            {
              text: 'Cerrar Alerta',
            },
          ]);
        }
      } else {
        Alert.alert('Alerta!', 'IdProducto ausente Tabla Productos Fotos', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    }
  }, [idProducto]);

  //___________________________________________________________________________________
  const codigoTouched = () => {
    cleanUpAll();
    setEditCodigo(true);
  };

  //___________________________________________________________________________________
  const descripcionTouched = () => {
    cleanUpAll();
    setEditDescripcion(true);
  };

  //___________________________________________________________________________________
  const marcaTouched = () => {
    cleanUpAll();
    setSelecting('marca');
    const filter = (event) => {
      return event.IdClaves[0].includes('M');
    };
    const data = tablaClaves.filter(filter);
    if (data.length !== 0) {
      navigation.navigate('SearchResults', {
        result: data,
        callBy: 'conProdMarca',
      });
    } else {
      Alert.alert('Alerta!', 'Tabla Claves ausente.', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const categoriaTouched = () => {
    cleanUpAll();
    setSelecting('categoria');
    const filter = (event) => {
      return event.IdClaves[0].includes('A');
    };
    const data = tablaClaves.filter(filter);
    if (data.length !== 0) {
      navigation.navigate('SearchResults', {
        result: data,
        callBy: 'conProdCateg',
      });
    } else {
      Alert.alert('Alerta!', 'Tabla Claves ausente.', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
  };

  //___________________________________________________________________________________
  const refreshTouched = () => {
    cleanUpAll();
  };

  //___________________________________________________________________________________
  const showPhotoTouched = () => {
    // connectivityCheck();
    setSelecting('foto');
    setShowPhoto(true);
  };

  //_______________
  useEffect(() => {
    if (showPhoto === true) {
      if (typeof foto !== 'undefined') {
        const imageUri = 'http://' + ipBackend + ':3001/' + foto;
        setFotoPath(imageUri);
        setIsPath(true);
      } else {
        Alert.alert('Alerta!', 'Foto ausente Tabla Productos Fotos!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    }
  }, [showPhoto]);

  // //_______________
  // useEffect(() => {
  //   if (connected === true && showPhoto === true) {
  //     if (typeof foto !== 'undefined') {
  //       const imageUri = 'http://' + ipBackend + ':3001/' + foto;
  //       setFotoPath(imageUri);
  //       setIsPath(true);
  //     } else {
  //       Alert.alert('Alerta!', 'Foto ausente Tabla Productos Fotos!', [
  //         {
  //           text: 'Cerrar Alerta',
  //         },
  //       ]);
  //     }
  //   }
  // }, [showPhoto, connecChecked]);

  //_______________
  useEffect(() => {
    if (isPath === true) {
      navigation.navigate('ShowPhoto', {
        imageUri: fotoPath,
        callBy: 'conProdFoto',
      });
    }
  }, [isPath]);

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setDescripcion();
    setCodigo();
    setCostoComprador();
    setFoto();
    setFotoPath();
    setIdProducto();
    setMarca();
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* ---------------Selection section--------------- */}
          <View style={styles.selecWrapper}>
            <View style={styles.selecContainer}>
              {/* ------------------------- */}
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    codigoTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Código</Text>
                </TouchableOpacity>
              </View>
              {/* ------------------------- */}
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    descripcionTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Descripción</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* ------------------------- */}
            <View style={styles.selecContainer}>
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    marcaTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Marca</Text>
                </TouchableOpacity>
              </View>
              {/* ------------------------- */}
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    categoriaTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Categoría</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* ---------------Form section--------------- */}
          <View style={styles.formContainer}>
            {/* ----------- 1 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Código</Text>
              </View>
              <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={() => {
                    codigoTouched();
                  }}
                >
                  <TextInput
                    editable={editCodigo}
                    onBlur={() => blurCodigo()}
                    onChangeText={codigoHandler}
                    placeholder={''}
                    ref={codigoRef}
                    style={[styles.box, { width: 250 }]}
                    underlineColorAndroid='transparent'
                    value={codigo || ''}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* ----------- 2 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Desc.</Text>
              </View>
              <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={() => {
                    descripcionTouched();
                  }}
                >
                  <TextInput
                    editable={editDescripcion}
                    onBlur={() => blurDescripcion()}
                    onChangeText={descripcionHandler}
                    placeholder={''}
                    placeholderTextColor={colors.blue}
                    ref={descripcionRef}
                    style={[styles.box, { width: 275 }]}
                    underlineColorAndroid='transparent'
                    value={descripcion || ''}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* ----------- 3 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Marca</Text>
              </View>
              <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={() => {
                    marcaTouched();
                  }}
                >
                  <TextInput
                    editable={false}
                    placeholder={''}
                    style={[styles.box, { width: 250 }]}
                    underlineColorAndroid='transparent'
                    value={marca || ''}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* ----------- 4 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Costo Comprador</Text>
              </View>
              <View style={[styles.boxContainer, { alignItems: 'flex-end' }]}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 150 }]}
                  underlineColorAndroid='transparent'
                  value={JSON.stringify(costoComprador) || ''}
                />
              </View>
            </View>
            {/* ----------- 5 ----------- */}
            <View style={styles.row}>
              <View style={[styles.labelContainer, {}]}>
                <Text
                  style={[
                    styles.label,
                    { alignSelf: 'flex-end', marginRight: 35 },
                  ]}
                >
                  Ver Foto
                </Text>
              </View>
              <View style={styles.imageIconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    showPhotoTouched();
                  }}
                >
                  <Icon name='image-search' color={colors.green} size={70} />
                </TouchableOpacity>
              </View>
              {/* ----------- Refresh ----------- */}
              <View
                style={[
                  styles.refreshContainer,
                  { marginLeft: 15, marginRight: 10 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => refreshTouched()}
                  style={[styles.refreshTouch, { alignSelf: 'flex-start' }]}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingTop: 15,
    paddingBottom: 150,
  },
  selecWrapper: {
    backgroundColor: colors.white,
    marginBottom: 25,
    marginTop: 10,
    width: '75%',
  },
  selecContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selecLabelContainer: {
    alignSelf: 'center',
    backgroundColor: colors.greenBlue,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  selecLabel: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  //----------------------------
  formContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: {
    alignContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
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
  },
  boxContainer: {
    alignSelf: 'flex-end',
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
    fontSize: 19,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingVertical: 3,
    textAlign: 'right',
  },
  descripcionBoxContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  descripcionBox: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderColor: colors.greenBlue,
    borderRadius: 10,
    borderWidth: 3,
    color: colors.blue,
    fontSize: 19,
    fontWeight: 'bold',
    height: 80,
    paddingLeft: 15,
    paddingVertical: 3,
    textAlign: 'left',
    width: '100%',
  },
  imageIconContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.greenBlue,
    borderRadius: 10,
    borderWidth: 3,
    padding: 15,
    marginRight: 20,
    marginTop: 10,
  },
  refreshContainer: {
    alignSelf: 'center',
  },
  refreshTouch: {
    marginHorizontal: 15,
    backgroundColor: colors.green,
    borderRadius: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

export default ConProductos;
