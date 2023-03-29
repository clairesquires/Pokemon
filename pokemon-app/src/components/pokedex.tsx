import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native';

const pokemonList = require("../../assets/kanto.json");

type ItemProps = {name: string};

const Item = ({name}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default function Pokedex() {
  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={({item}) => <Item name={item.name} />}
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
