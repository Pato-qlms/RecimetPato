import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConPreveedores = () => {
  return (
    <View style={styles.container}>
      <Text>Consultas - Proveedores</Text>
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

export default ConPreveedores;
