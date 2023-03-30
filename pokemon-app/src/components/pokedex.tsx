import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/Navigation';

type Pokemon = {
    name: string;
};

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
    const [data, setData] = useState<Pokemon[]>([]);
    const getPokemonFromApi = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=898');
        const json = await response.json();
        setData(json.results);
    };
    useEffect(() => {
        getPokemonFromApi();
    }, []);

    return (
        <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({item}) => <Item name={item.name} navigation={navigation} />}
            keyExtractor={item=>item.name}
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
