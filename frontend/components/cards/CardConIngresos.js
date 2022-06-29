import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { View, Text, StyleSheet } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../../assets/colors';

const CardConIngresos = ({ navigation, route, item }) => {
  //___________________________________________________________________________________
  const { callBy } = route.params;

  //___________________________________________________________________________________
  const [fechaCard, setFechaCard] = useState();

  //___________________________________________________________________________________
  const handleSelection = () => {
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdAuto
    if (typeof item.IdAuto != 'undefined') {
      if (callBy == 'conIngresosNum' || callBy === 'conIngresosFromTo') {
        navigation.navigate('ConIngresos', { itemSelected: item.IdAuto });
      }
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key:

    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  };

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof item.IdAuto != 'undefined') {
      const fechaString = item.FechaCpte;
      const aa = fechaString.substr(0, 4);
      const mm = fechaString.substr(5, 2);
      const dd = fechaString.substr(8, 2);
      const fecha = `${dd}/${mm}/${aa}`;
      setFechaCard(fecha);
    }
  }, []);

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <TouchableOpacity
      onPress={() => {
        handleSelection();
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { width: 90 }]}>Num:</Text>
          </View>
          <View style={[styles.valueContainer, {}]}>
            <Text style={[styles.value, { alignSelf: 'flex-start' }]}>
              {item.Numero}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, { alignSelf: 'flex-start', width: 100 }]}
            >
              Cant:
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { alignSelf: 'flex-start' }]}>
              {item.Cantidad}
            </Text>
          </View>
          <View style={[styles.textContainer, { marginLeft: 80 }]}>
            <Text style={[styles.text, { alignSelf: 'flex-end', width: 125 }]}>
              Precio:
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text
              style={[
                styles.value,
                { alignSelf: 'flex-end', paddingLeft: 30, width: 125 },
              ]}
            >
              {item.Precio}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Fecha</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Producto</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.valueContainer}>
            <Text
              style={[
                styles.value,
                { alignSelf: 'flex-start', marginLeft: 15 },
              ]}
            >
              {fechaCard}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{item.IdProducto}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.green,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  text: {
    color: colors.white,
    fontSize: 19,
    fontWeight: 'bold',
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CardConIngresos;
