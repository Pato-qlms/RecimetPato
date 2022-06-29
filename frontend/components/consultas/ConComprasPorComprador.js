import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConComprasPorComprador = () => {
  return (
    <View style={styles.container}>
      <Text>Consultas - Comrpas por Compradores en un Período</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConComprasPorComprador;
