import React from 'react';

import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../assets/colors';

const LoadingScreen = () => {
  //______________________________________________________________________________________
  //______________________________________________________________________________________
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={[{ height: 175, width: 175 }]}
              source={require('../assets/adaptive-icon.png')}
            />
          </View>
          <View style={styles.main}>
            <View style={styles.rowContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Cargando App...</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <ActivityIndicator size='large' color='#9abc94' />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenLogo,
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    // flex: 1,
    alignSelf: 'center',
    marginTop: 100,
  },
  main: {
    alignSelf: 'center',
    // flex: 1,
    justifyContent: 'center',
    marginVertical: 75,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.green,
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  bannerContainer: {
    // flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: 30,
    paddingTop: 15,
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

export default LoadingScreen;
