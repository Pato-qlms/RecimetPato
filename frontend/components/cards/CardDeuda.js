import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { View, Text, StyleSheet } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../../assets/colors';

const CardDeuda = ({ navigation, route, item }) => {
  //____________________________________________________________________________________________
  const { callBy } = route.params;

  //____________________________________________________________________________________________
  const [fechaCpte, setFechaCpte] = useState();
  const [fechaVto, setFechaVto] = useState();

  //____________________________________________________________________________________________
  useEffect(() => {
    const fechaCpteString = item.FechaCpte;
    const dd1 = fechaCpteString.substr(8, 2);
    const mm1 = fechaCpteString.substr(5, 2);
    const aa1 = fechaCpteString.substr(0, 4);
    setFechaCpte(`${dd1}/${mm1}/${aa1}`);
    const fechaVtoString = item.FechaCpte;
    const dd2 = fechaVtoString.substr(8, 2);
    const mm2 = fechaVtoString.substr(5, 2);
    const aa2 = fechaVtoString.substr(0, 4);
    setFechaVto(`${dd2}/${mm2}/${aa2}`);
  }, []);

  const handleSelection = () => {
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: index, para desarrollo
    if (typeof item.IdConcepto != 'undefined') {
      if (callBy == 'conFichaDeuda') {
        navigation.navigate('ConDeuda', {
          itemSelected: `${item.Numero}/${item.Letra}/${item.IdConcepto}`,
        });
        //_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      }
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key:

    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  };

  //____________________________________________________________________________________________

  //____________________________________________________________________________________________
  //____________________________________________________________________________________________
  return (
    <TouchableOpacity
      onPress={() => {
        handleSelection();
      }}
    >
      <View style={styles.container}>
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
              {item.Numero}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { alignSelf: 'center' }]}>
              {item.Letra}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { alignSelf: 'center' }]}>
              {item.IdConcepto}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Fecha Cpte</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { marginRight: 10 }]}>{fechaCpte}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Fecha Vto</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { marginRight: 10 }]}>{fechaVto}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Importe</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { marginRight: 10 }]}>
              {item.Importe}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Saldo</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { marginRight: 10 }]}>
              {item.Saldo}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: colors.green,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    color: colors.white,
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
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
  },
});

export default CardDeuda;
