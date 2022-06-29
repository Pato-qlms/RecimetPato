import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';

import GeneralContext from '../contexts/GeneralContext';
import colors from '../assets/colors';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = (props) => {
  //______________________________________________________________________________________
  const { handleIsLoggedOut } = useContext(GeneralContext);

  //______________________________________________________________________________________
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.companySection}>
            <View style={styles.avatarSection}>
              <Avatar.Image
                source={require('../assets/logo_elipse_8percent_whiteBack.png')}
              />
            </View>
            <View style={styles.titleSection}>
              <Title style={styles.title}>Grupo</Title>
              <Title style={styles.title}>RECiMET</Title>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='home-outline' color={colors.white} size={35} />
              )}
              label='Home'
              labelStyle={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='archive-outline' color={colors.white} size={35} />
              )}
              label='Archivos'
              labelStyle={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate('Archivos');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='toolbox-outline' color={colors.white} size={35} />
              )}
              label='Procesos'
              labelStyle={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate('Procesos');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name='crosshairs-question'
                  color={colors.white}
                  size={35}
                />
              )}
              label='Consultas'
              labelStyle={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate('Consultas');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.logoutSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name='exit-to-app' color={colors.white} size={35} />
          )}
          label='Log Out'
          labelStyle={styles.labelStyle}
          onPress={() => handleIsLoggedOut()}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  companySection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  avatarSection: {
    paddingLeft: 25,
    paddingRight: 5,
    paddingTop: 3,
  },
  titleSection: {
    marginLeft: 15,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 50,
    marginLeft: 5,
  },
  labelStyle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutSection: {
    marginTop: 15,
    marginLeft: 5,
  },
});

export default DrawerContent;
