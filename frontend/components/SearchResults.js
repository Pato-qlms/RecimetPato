import React from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../assets/colors';

import Card from './cards/Card';
import CardTwo from './cards/CardTwo';
import CardProcIngresos from './cards/CardProcIngresos';
import CardConIngresos from './cards/CardConIngresos';
import CardDeuda from './cards/CardDeuda';

const SearchResults = ({ navigation, route }) => {
  //____________________________________________________________________________________________
  const { result, callBy } = route.params;

  //____________________________________________________________________________________________
  const cardNavigation = navigation;
  const cardRoute = route;

  //____________________________________________________________________________________________
  const renderCard = ({ route, item }) => {
    return <Card navigation={cardNavigation} route={cardRoute} item={item} />;
  };

  const renderCardTwo = ({ route, item }) => {
    return (
      <CardTwo navigation={cardNavigation} route={cardRoute} item={item} />
    );
  };

  const renderCardProcIng = ({ route, item }) => {
    return (
      <CardProcIngresos
        navigation={cardNavigation}
        route={cardRoute}
        item={item}
      />
    );
  };

  const renderCardConIngresos = ({ route, item }) => {
    return (
      <CardConIngresos
        navigation={cardNavigation}
        route={cardRoute}
        item={item}
      />
    );
  };

  const renderCardDeuda = ({ route, item }) => {
    return (
      <CardDeuda navigation={cardNavigation} route={cardRoute} item={item} />
    );
  };

  //____________________________________________________________________________________________
  const renderFlatList = () => {
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdProducto
    if (
      callBy === 'conProdCodigo' ||
      callBy === 'conProdDescripcion' ||
      callBy === 'cardConProdMarca' ||
      callBy === 'cardConProdCateg' ||
      callBy === 'procIngresosProd'
    ) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.IdProducto)}
            renderItem={renderCard}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: idProducto
    if (callBy === 'cardProcIngresos') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.idProducto)}
            renderItem={renderCardProcIng}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdClaves
    if (
      callBy === 'conProdMarca' ||
      callBy === 'conProdCateg' ||
      callBy === 'conClientesLocal' ||
      callBy === 'archClientesLocal' ||
      callBy === 'archClieTablaLocal' ||
      callBy === 'archClientesProvin' ||
      callBy === 'archClieTablaProvin' ||
      callBy === 'archClavesCla'
    ) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.IdClaves)}
            renderItem={renderCard}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdCliente
    if (
      callBy === 'conComprasClie' ||
      callBy === 'conClientesComp' ||
      callBy === 'conClientesRaZoc' ||
      callBy === 'conClientesDom' ||
      callBy === 'cardConClientesLocal' ||
      callBy === 'procIngresosClie' ||
      callBy === 'archClientesClie' ||
      callBy === 'procGastosClie' ||
      callBy === 'conIngresosClie'
    ) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.IdCliente)}
            renderItem={renderCardTwo}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdCompradores
    if (
      callBy === 'procIngresosComp' ||
      callBy === 'conIngresosComp' ||
      callBy === 'conIngresosChof'
    ) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.IdCompradores)}
            renderItem={renderCard}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdConcepto
    if (callBy === 'procGastosCpto') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.IdConcepto)}
            renderItem={renderCard}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdAuto
    if (callBy === 'conIngresosNum') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item) => JSON.stringify(item.IdAuto)}
            renderItem={renderCardConIngresos}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: index del arrey
    // |---> caso especial xq tabla Deuda no tiene un campo que sirva como clave única
    // |---> this case is unique, table Debt hasn't a file that can be used as key
    if (callBy === 'conFichaDeuda') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCardDeuda}
          />
        </View>
      );
    } else if (callBy === 'conIngresosFromTo') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCardConIngresos}
          />
        </View>
      );
    }

    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key:

    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
  };

  //____________________________________________________________________________________________
  const handleGoBack = () => {
    if (
      callBy === 'conProdCodigo' ||
      callBy === 'conProdDescripcion' ||
      callBy === 'conProdMarca' ||
      callBy === 'conProdCateg' ||
      callBy === 'cardConProdMarca' ||
      callBy === 'cardConProdCateg'
    ) {
      navigation.navigate('ConProductos', { itemSelected: 'null' });
    } else if (
      callBy === 'cardProcIngresos' ||
      callBy === 'procIngresosProd' ||
      callBy === 'procIngresosComp' ||
      callBy === 'procIngresosClie'
    ) {
      navigation.navigate('ProcIngresos', { itemSelected: 'null' });
    } else if (
      callBy === 'conClientesLocal' ||
      callBy === 'conClientesComp' ||
      callBy === 'conClientesRaZoc' ||
      callBy === 'conClientesDom' ||
      callBy === 'cardConClientesLocal'
    ) {
      navigation.navigate('ConClientes', { itemSelected: 'null' });
    } else if (
      callBy === 'archClientesLocal' ||
      callBy === 'archClieTablaLocal' ||
      callBy === 'archClientesProvin' ||
      callBy === 'archClieTablaProvin' ||
      callBy === 'archClientesClie'
    ) {
      navigation.navigate('ArchClientes', { itemSelected: 'null' });
    } else if (callBy === 'procGastosCpto' || callBy === 'procGastosClie') {
      navigation.navigate('ProcGastos', { itemSelected: 'null' });
    } else if (
      callBy === 'conIngresosClie' ||
      callBy === 'conIngresosComp' ||
      callBy === 'conIngresosChof' ||
      callBy === 'conIngresosNum' ||
      callBy === 'conIngresosFromTo'
    ) {
      navigation.navigate('ConIngresos', { itemSelected: 'null' });
    } else if (callBy === 'archClavesCla') {
      navigation.navigate('ArchClaves', { itemSelected: 'null' });
    } else if (callBy === 'conComprasClie' || callBy === 'conFichaDeuda') {
      navigation.navigate('ConDeuda', { itemSelected: 'null' });
    }
  };

  //____________________________________________________________________________________________
  //____________________________________________________________________________________________
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.safeArea}>{renderFlatList()}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleGoBack();
          }}
          style={styles.textContainer}
        >
          <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 20,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.green,
    borderRadius: 15,
    marginBottom: 15,
    marginRight: 15,
    marginTop: 15,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
});

export default SearchResults;

//____________________________________________________________________________________________
