import React, { useRef } from 'react';

import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

import colors from '../assets/colors';

const ShowPhoto = ({ navigation, route }) => {
  //____________________________________________________________________________________________
  const { imageUri } = route.params;

  //___________________________________________________________________________________
  const width = Dimensions.get('window').width;
  const imageHeight = width;
  const imageWidth = width;

  //___________________________________________________________________________________
  const scale = useRef(new Animated.Value(1)).current;
  const pinchHandler = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: false,
  });

  //___________________________________________________________________________________
  const translateX = useRef(new Animated.Value(0)).current;
  const panHandler = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    {
      useNativeDriver: true,
    }
  );

  //___________________________________________________________________________________
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.white,
      flex: 1,
      justifyContent: 'center',
    },
    imageContainer: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
    },
    image: {
      borderColor: colors.green,
      borderWidth: 5,
      borderRadius: 15,
      height: imageHeight,
      marginTop: 15,
      resizeMode: 'cover',
      width: imageWidth,
    },
    buttonContainer: {
      flex: 2,
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
    },
    textContainer: {
      paddingHorizontal: 10,
      backgroundColor: colors.green,
      borderRadius: 15,
      marginBottom: 25,
      marginRight: 25,
      marginTop: 25,
    },
    text: {
      color: colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      paddingVertical: 7,
      paddingHorizontal: 5,
    },
  });

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.imageContainer}>
        <Animated.View>
          <PinchGestureHandler
            onGestureEvent={pinchHandler}
            simultaneousHandlers={panHandler}
            minPointers={2}
          >
            <Animated.View>
              <PanGestureHandler
                minPointers={1}
                maxPointers={1}
                onGestureEvent={panHandler}
                simultaneousHandlers={pinchHandler}
              >
                <Animated.View>
                  <Animated.Image
                    source={{
                      uri: imageUri,
                    }}
                    style={[
                      styles.image,
                      {
                        transform: [
                          { scale: scale },
                          { translateX: translateX },
                        ],
                      },
                    ]}
                  />
                </Animated.View>
              </PanGestureHandler>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
      {/* ----------------------------------- */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ConProductos', {
              itemSelected: 'botonVolver',
            });
          }}
          style={styles.textContainer}
        >
          <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShowPhoto;
