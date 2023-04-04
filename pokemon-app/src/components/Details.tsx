import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/Navigation";
import { Card } from "react-native-elements";

type PokemonDetails = {
  name: string;
  image: string;
  id: string;
  type: string;
  height: string;
  weight: string;
};

type DetailsScreenNavigationProp = NativeStackScreenProps<
  StackParamList,
  "Details"
>;

export default function Details({ route }: DetailsScreenNavigationProp) {
  const name = route.params.name;

  const fetchPokemonDetails = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const result = await fetch(url).then((res) => res.json());

    const pokemon = [result].map((res) => ({
      name: res.name,
      image: res.sprites["other"]["official-artwork"]["front_default"],
      id: res.id,
      type: res.types[0]["type"]["name"],
      height: res.height,
      weight: res.weight,
    }));
    setData(pokemon[0]);
  };

  const [data, setData] = useState<PokemonDetails>();
  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data?.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>#{data?.id}</Text>
        <View style={styles.details}>
          <Text>Type: {data?.type}</Text>
          <Text>Height: {data?.height}</Text>
          <Text>Weight: {data?.weight}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    flex: 1,
    width: "80%",
    hight: "auto",
    alignSelf: "center",
  },
  content: {
    flex: 1,
    alignSelf: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  id: {
    fontSize: 20,
    textAlign: "center",
  },
  details: {
    marginTop: 20,
  },
});
