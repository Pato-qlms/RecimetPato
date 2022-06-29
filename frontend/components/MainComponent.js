import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GeneralContext from '../contexts/GeneralContext';
import DrawerContent from '../components/DrawerContent';
import colors from '../assets/colors';
import Home from '../components/Home';
import ArchClaves from './archivos/ArchClaves';
import ArchClientes from './archivos/ArchClientes';
import ArchProveedores from './archivos/ArchProveedores';
import ConCataComprados from './consultas/ConCataComprados';
import ConClientes from './consultas/ConClientes';
import ConDeuda from './consultas/ConDeuda';
import ConComprasPorComprador from './consultas/ConComprasPorComprador';
import ConConceptos from './consultas/ConConceptos';
import ConGastos from './consultas/ConGastos';
import ConIngresos from './consultas/ConIngresos';
import ConPreveedores from './consultas/ConPreveedores';
import ConProductos from './consultas/ConProductos';
import ConStock from './consultas/ConStock';
import ProcGastos from './procesos/ProcGastos';
import ProcIngresos from './procesos/ProcIngresos';
import SearchResults from '../components/SearchResults';
import ShowPhoto from '../components/ShowPhoto';
import LoadingScreen from '../components/LoadingScreen';
import LoginScreen from '../components/Login';

//___________________________________________________________________________________
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

//___________________________________________________________________________________
const ArchivosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='StackArchivos' children={ArchivosTabs} />
      <Stack.Screen name='SearchResults' component={SearchResults} />
    </Stack.Navigator>
  );
};

//___________________________________________________________________________________
const ArchivosTabs = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.blue },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.metallicGrey,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          flex: 1,
          width: 'auto',
          marginLeft: 10,
          marginRight: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
          height: 3,
        },
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
      }}
    >
      <MaterialTopTabs.Screen
        name='ArchClaves'
        component={ArchClaves}
        options={{ title: 'Claves' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      <MaterialTopTabs.Screen
        name='ArchClientes'
        component={ArchClientes}
        options={{ title: 'Clientes' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      {/* <MaterialTopTabs.Screen
        name='ArchProveedores'
        component={ArchProveedores}
        options={{ title: 'Proveedores' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
    </MaterialTopTabs.Navigator>
  );
};

//___________________________________________________________________________________
const ProcesosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='StackProcesos' children={ProcesosTabs} />
      <Stack.Screen name='SearchResults' component={SearchResults} />
    </Stack.Navigator>
  );
};

//___________________________________________________________________________________
const ProcesosTabs = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.blue },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.metallicGrey,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          flex: 1,
          width: 'auto',
          marginLeft: 10,
          marginRight: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
          height: 3,
        },
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
      }}
    >
      {/* <MaterialTopTabs.Screen
        name='ProcGastos'
        component={ProcGastos}
        options={{ title: 'Gastos' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      <MaterialTopTabs.Screen
        name='ProcIngresos'
        component={ProcIngresos}
        options={{ title: 'Ingresos' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
    </MaterialTopTabs.Navigator>
  );
};

//___________________________________________________________________________________
const ConsultasStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='StackConsultas' children={ConsultasTabs} />
      <Stack.Screen name='SearchResults' component={SearchResults} />
      <Stack.Screen name='ShowPhoto' component={ShowPhoto} />
    </Stack.Navigator>
  );
};

//___________________________________________________________________________________
const ConsultasTabs = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.blue },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.metallicGrey,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          flex: 1,
          width: 'auto',
          marginLeft: 5,
          marginRight: 5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
          height: 3,
        },
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
      }}
    >
      {/* <MaterialTopTabs.Screen
        name='ConStock'
        component={ConStock}
        options={{ title: 'Stock' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      <MaterialTopTabs.Screen
        name='ConClientes'
        component={ConClientes}
        options={{ title: 'Clientes' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      {/* <MaterialTopTabs.Screen
        name='ConConceptos'
        component={ConConceptos}
        options={{ title: 'Conceptos' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      <MaterialTopTabs.Screen
        name='ConPreveedores'
        component={ConPreveedores}
        options={{ title: 'Preveedores' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      <MaterialTopTabs.Screen
        name='ConIngresos'
        component={ConIngresos}
        options={{ title: 'Ingresos' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      {/* <MaterialTopTabs.Screen
        name='ConGastos'
        component={ConGastos}
        options={{ title: 'Gastos' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      {/* <MaterialTopTabs.Screen
        name='ConCataComprados'
        component={ConCataComprados}
        options={{ title: 'Catalizadores Comprados' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      {/* <MaterialTopTabs.Screen
        name='ConDeuda'
        component={ConDeuda}
        options={{ title: 'Deuda' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      {/* <MaterialTopTabs.Screen
        name='ConComprasPorComprador'
        component={ConComprasPorComprador}
        options={{ title: 'Compras Comprador' }}
        initialParams={{ itemSelected: 'undefined' }}
      /> */}
      <MaterialTopTabs.Screen
        name='ConProductos'
        component={ConProductos}
        options={{ title: 'Productos' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
    </MaterialTopTabs.Navigator>
  );
};

//___________________________________________________________________________________
const MainComponent = () => {
  const { loggedCheckDone, loggedStatus, tablesLoaded } =
    useContext(GeneralContext);

  //___________________________________________________________________________________
  const renderLoadingScreen = () => {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  };

  //___________________________________________________________________________________
  const renderLogin = () => {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  };

  //___________________________________________________________________________________
  const renderNavigContainer = () => {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
              drawerStyle: {
                backgroundColor: colors.blue,
              },
              headerStyle: { backgroundColor: colors.blue },
              headerTitleStyle: {
                color: colors.white,
                fontSize: 25,
                fontWeight: 'bold',
                paddingBottom: 5,
                textShadowColor: colors.black,
                textShadowRadius: 1,
                textShadowOffset: { width: -1, height: 1 },
              },
              headerTintColor: colors.white,
              swipeEnabled: false,
              gestureEnabled: false,
              animationEnabled: false,
              lazy: false,
            }}
          >
            <Drawer.Screen
              name='Home'
              component={Home}
              options={{ title: 'Grupo RECiMET' }}
            />
            <Drawer.Screen name='Archivos' children={ArchivosStack} />
            <Drawer.Screen name='Procesos' children={ProcesosStack} />
            <Drawer.Screen name='Consultas' children={ConsultasStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  };

  //___________________________________________________________________________________
  const renderMainScreen = () => {
    if (loggedStatus.isLogged === false) {
      return <View style={styles.container}>{renderLogin()}</View>;
    } else {
      if (tablesLoaded === false) {
        return <View style={styles.container}>{renderLoadingScreen()}</View>;
      } else {
        return <View style={styles.container}>{renderNavigContainer()}</View>;
      }
    }
  };

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <SafeAreaView style={styles.safeArea}>
      {!loggedCheckDone ? renderLoadingScreen() : renderMainScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

//___________________________________________________________________________________
export default MainComponent;
