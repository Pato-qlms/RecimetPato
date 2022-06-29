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

const ConGastos = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Consultas - Gastos en un Período</Text>
    </View>
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

export default ConGastos;
