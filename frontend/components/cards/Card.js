import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import GeneralContext from '../../contexts/GeneralContext';
import colors from '../../assets/colors';

const Card = ({ navigation, route, item }) => {
  //____________________________________________________________________________________________
  const { tablaClientes, tablaProductos } = useContext(GeneralContext);

  //____________________________________________________________________________________________
  const { callBy } = route.params;

  //____________________________________________________________________________________________
  const handleSelection = () => {
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdProducto
    if (typeof item.IdProducto != 'undefined') {
      if (
        callBy == 'conProdCodigo' ||
        callBy == 'conProdDescripcion' ||
        callBy == 'cardConProdMarca' ||
        callBy == 'cardConProdCateg'
      ) {
        navigation.navigate('ConProductos', { itemSelected: item.IdProducto });
        //_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      } else if (callBy == 'procIngresosProd') {
        navigation.navigate('ProcIngresos', { itemSelected: item.IdProducto });
      }
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdClaves
    if (typeof item.IdClaves != 'undefined') {
      if (callBy == 'conProdMarca') {
        const filter = (event) => {
          return event.IdMarca.toLowerCase() == item.IdClaves.toLowerCase();
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'cardConProdMarca',
          });
        }
        //_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      } else if (callBy == 'conProdCateg') {
        const filter = (event) => {
          return event.IdCategoria.toLowerCase() == item.IdClaves.toLowerCase();
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'cardConProdCateg',
          });
        }
        //_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      } else if (callBy == 'conClientesLocal') {
        const filter = (event) => {
          return event.IdLocalidad.toLowerCase() == item.IdClaves.toLowerCase();
        };
        const data = tablaClientes.filter(filter);
        if (data.length !== 0) {
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'cardConClientesLocal',
          });
        }
        //_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      } else if (
        callBy == 'archClientesLocal' ||
        callBy == 'archClieTablaLocal' ||
        callBy == 'archClientesProvin' ||
        callBy == 'archClieTablaProvin'
      ) {
        navigation.navigate('ArchClientes', { itemSelected: item.IdClaves });
      } else if (callBy == 'archClavesCla') {
        navigation.navigate('ArchClaves', { itemSelected: item.IdClaves });
      }
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdPCompradores
    if (typeof item.IdCompradores != 'undefined') {
      if (callBy == 'procIngresosComp') {
        navigation.navigate('ProcIngresos', {
          itemSelected: item.IdCompradores,
        });
      } else if (callBy == 'conIngresosComp') {
        navigation.navigate('ConIngresos', {
          itemSelected: item.IdCompradores,
        });
      } else if (callBy == 'conIngresosChof') {
        navigation.navigate('ConIngresos', {
          itemSelected: item.IdCompradores,
        });
      }
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdConcepto
    if (typeof item.IdConcepto != 'undefined') {
      if (callBy == 'procGastosCpto') {
        navigation.navigate('ProcGastos', {
          itemSelected: item.IdConcepto,
        });
      }
    }
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key:

    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  };

  //____________________________________________________________________________________________
  const renderItem = () => {
    if (
      typeof item.IdClaves != 'undefined' ||
      typeof item.IdConcepto != 'undefined' ||
      typeof item.IdProducto != 'undefined'
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            handleSelection();
          }}
        >
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.Descripcion}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (
      typeof item.IdCompradores != 'undefined' ||
      typeof item.IdCliente != 'undefined'
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            handleSelection();
          }}
        >
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.RazonSocial}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  //____________________________________________________________________________________________
  //____________________________________________________________________________________________
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.safeArea}>{renderItem()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    backgroundColor: colors.white,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: colors.green,
    borderRadius: 15,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
});

export default Card;

//____________________________________________________________________________________________
