import React, { useEffect, useState } from 'react';
import { Text, View, Image} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/Navigation';
import { Card } from 'react-native-elements';

type PokemonDetails = {
  id: string;
  name: string;
  order: string;
  sprites: {
    other: {
      home: {
        front_default: string
      };
    };
  };
};

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Details'>;

export default function Details({route}: DetailsScreenNavigationProp) {
  const name = route.params.name;

  const [data, setData] = useState<PokemonDetails | null>(null);
  const getPokemonFromApi = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
      const json = await response.json();
      setData(json);
  };
  useEffect(() => {
      getPokemonFromApi();
  }, []);

  const imageLink:string = data?.sprites.other.home.front_default as string;
  console.log(imageLink);

  return (
    <View>
      <Image source={{uri: imageLink}} style={{width: 400, height: 400}} />
      <Text>My name is {name}</Text>
      <Text>My id is {data?.id}</Text>
      <Text>My order is {data?.order}</Text>
      <Text>Image path {data?.sprites.other.home.front_default}</Text>
      
    </View>
  );
}

/*
id:    https://pokeapi.co/api/v2/ability/{id or name}/          [id]
image: [data.sprites.other.dream_world.front_default]
*/