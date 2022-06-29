import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../../assets/colors';

const CardProcIngresos = ({ navigation, route, item }) => {
  //___________________________________________________________________________________
  const { callBy } = route.params;

  //___________________________________________________________________________________
  const handleSelection = () => {
    if (typeof item.idProducto != 'undefined') {
      if (callBy == 'cardProcIngresos') {
        navigation.navigate('ProcIngresos', {
          itemSelected: item.idProducto,
        });
      }
    }
  };

  //____________________________________________________________________________________________
  const renderItem = () => {
    if (typeof item.idProducto != 'undefined') {
      return (
        <TouchableOpacity
          onPress={() => {
            handleSelection();
          }}
        >
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.producto}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Cantidad</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Precio</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Importe</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.cantidad}</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.precio}</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.importe}</Text>
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
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 15,
  },
  itemContainer: {
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: colors.green,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 15,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});

export default CardProcIngresos;
