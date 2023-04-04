import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/Navigation";
import { Card } from "react-native-elements";

type PokemonDetails = {
  id: string;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
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

  const [data, setData] = useState<PokemonDetails | null>(null);
  const getPokemonFromApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    const json = await response.json();
    setData(json);
  };
  useEffect(() => {
    getPokemonFromApi();
  }, []);

  const imageLink: string = data?.sprites.other["official-artwork"]
    .front_default as string;
  console.log(imageLink);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageLink }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>#{data?.id}</Text>

        <Text>Type: {data?.type}</Text>
        <Text>Height: {data?.height}</Text>
        <Text>Weight: {data?.weight}</Text>
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
});
