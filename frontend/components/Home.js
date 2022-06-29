import React, { useContext } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import GeneralContext from '../contexts/GeneralContext';
import colors from '../assets/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = (props, navigation, route) => {
  //______________________________________________________________________________________
  const { actualizarTablas } = useContext(GeneralContext);

  //______________________________________________________________________________________
  //______________________________________________________________________________________
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_elipse_35percent.png')} />
      </View>
      <View style={styles.barContainer}>
        <View style={styles.btnBarWrapper}>
          <TouchableOpacity
            style={styles.btnBarTouch}
            onPress={() => props.navigation.navigate('Archivos')}
          >
            <Icon name='archive-outline' color={colors.white} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnBarWrapper}>
          <TouchableOpacity
            style={styles.btnBarTouch}
            onPress={() => props.navigation.navigate('Procesos')}
          >
            <Icon name='toolbox-outline' color={colors.white} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnBarWrapper}>
          <TouchableOpacity
            style={styles.btnBarTouch}
            onPress={() => props.navigation.navigate('Consultas')}
          >
            <Icon name='crosshairs-question' color={colors.white} size={35} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actuContainer}>
        <View style={styles.btnActuWrapper}>
          <TouchableOpacity
            style={styles.actuTouch}
            onPress={() => actualizarTablas()}
          >
            <View style={styles.labelActuWrapper}>
              <Text style={styles.labelActu}>Actualizar Tablas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>powered by</Text>
        </View>
        <View style={styles.bannerImage}>
          <Image source={require('../assets/banner_75percent.png')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  barContainer: {
    flexDirection: 'row',
    marginTop: 70,
    marginBottom: 10,
  },
  btnBarWrapper: {
    alignContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    marginHorizontal: 15,
  },
  btnBarTouch: {
    backgroundColor: colors.greenBlue,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  actuContainer: {
    marginTop: 10,
    marginBottom: 70,
  },
  btnActuWrapper: {
    alignContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  actuTouch: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginTop: 10,
  },
  labelActuWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  labelActu: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  bannerContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
  },
  textContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'flex-end',
    color: colors.metallicGrey,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'center',
    paddingBottom: 2,
    paddingRight: 5,
  },
  bannerImage: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Home;
