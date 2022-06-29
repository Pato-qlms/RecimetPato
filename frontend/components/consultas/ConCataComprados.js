import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConCataComprados = () => {
  return (
    <View style={styles.container}>
      <Text>Consultas - Catalizadores Comprados en un Período</Text>
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

export default ConCataComprados;
