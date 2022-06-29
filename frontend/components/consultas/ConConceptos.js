import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConConceptos = () => {
  return (
    <View style={styles.container}>
      <Text>Consultas - Conceptos</Text>
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

export default ConConceptos;
