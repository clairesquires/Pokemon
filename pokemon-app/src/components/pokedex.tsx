import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/Navigation';
import { Card } from 'react-native-paper';
import {
  useFonts as changaOne,
  Changa_400Regular,
} from "@expo-google-fonts/changa";

type Pokemon = {
  name: string;
};

type ItemProps = {
  name: string;
  navigation: DetailsScreenNavigationProp["navigation"];
  imageLink: string;
};

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Pokedex'>;

const Item = ({name,navigation,imageLink}:ItemProps) => (
  <View style={styles.view}>
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Image source={{uri: imageLink}} style={styles.image}/>
        <Text style={styles.name} onPress={() => navigation.navigate('Details', {name})}>{name}</Text>
        <Text style={styles.id}>#id</Text>
      </Card.Content>
    </Card>
  </View>
);

export default function Pokedex({navigation}: DetailsScreenNavigationProp) {
  
    //Primary data
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
          renderItem={({item}) => <Item name={item.name} navigation={navigation} imageLink={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/44.png"}/>}
          keyExtractor={item=>item.name}
          style={styles.flatList}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%'
  },
  flatList: {
    display: 'flex',
    flexDirection: 'row',
  },
  view: {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  card: {
    display: 'flex',
    maxWidth: 250,
    height: 300,
    backgroundColor: 'white',
  },
  cardContent: {
    height: 300,
  },
  image: {
    width: 'auto',
    height: '80%',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  id: {
    fontSize: 15,
    textAlign: 'center',
  }
});
