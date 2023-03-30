import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/Navigation';

const pokemonList = require("../../assets/kanto.json");

type ItemProps = {
    name: string
    navigation: DetailsScreenNavigationProp["navigation"]
};

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Pokedex'>;

const Item = ({name,navigation}:ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.name} onPress={() => navigation.navigate('Details', {name})}>{name}</Text>
  </View>
);

export default function Pokedex({navigation}: DetailsScreenNavigationProp) {
  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={({item}) => <Item name={item.name} navigation={navigation} />}
        keyExtractor={item=>item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      name: {
        fontSize: 32,
      },
});
