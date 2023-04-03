import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/Navigation";
import { Card } from "react-native-paper";
import {
  useFonts as changaOne,
  Changa_400Regular,
} from "@expo-google-fonts/changa";
import { BackgroundImage } from "react-native-elements/dist/config";

type Pokemon = {
  name: string;
  image: string;
  id: string;
  type: string;
};

type ItemProps = {
  name: string;
  navigation: DetailsScreenNavigationProp["navigation"];
  imageLink: string;
  id: string;
  type: string;
};

type DetailsScreenNavigationProp = NativeStackScreenProps<
  StackParamList,
  "Pokedex"
>;

// Alternative way to putting image in Card
{
  /* <Card
  image={require("./assets/beach.png")}
  imageStyle={{ height: 50 }}
  containerStyle={[styles.card, { height: item.height }]}
></Card>; */
}

const Item = ({ name, navigation, imageLink, id, type }: ItemProps) => (
  <Card
    style={[styles.card, { backgroundColor: typeColors[type] }]}
    onPress={() => navigation.navigate("Details", { name })}
  >
    <Card.Content style={styles.cardContent}>
      <Image source={{ uri: imageLink }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.id}>#{id}</Text>
    </Card.Content>
  </Card>
);

export default function Pokedex({ navigation }: DetailsScreenNavigationProp) {
  const [data, setData] = useState<Pokemon[]>([]);

  const fetchPokemon = async () => {
    const promises = [];
    for (let i = 1; i <= 898; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
    const result = await Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites["other"]["official-artwork"]["front_default"],
        type: result.types[0]["type"]["name"],
        id: result.id,
      }));
      return pokemon;
    });
    setData(result);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.flatListItem}
        numColumns={2}
        horizontal={false}
        data={data}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            navigation={navigation}
            imageLink={item.image}
            id={item.id}
            type={item.type}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const typeColors = {
  normal: "rgba(168,167,122,0.3)",
  fire: "rgba(238,129,48,0.3)",
  water: "rgba(99,144,240,0.3)",
  electric: "rgba(247,208,44,0.3)",
  grass: "rgba(122,199,76,0.3)",
  ice: "rgba(150,217,214,0.3)",
  fighting: "rgba(194,46,40,0.3)",
  poison: "rgba(163,62,161,0.3)",
  ground: "rgba(226,191,101,0.3)",
  flying: "rgba(169,143,243,0.3)",
  psychic: "rgba(249,85,135,0.3)",
  bug: "rgba(166,185,26,0.3)",
  rock: "rgba(182,161,54,0.3)",
  ghost: "rgba(115,87,151,0.3)",
  dragon: "rgba(111,53,252,0.3)",
  dark: "rgba(112,87,70,0.3)",
  steel: "rgba(183,183,206,0.3)",
  fairy: "rgba(214,133,173,0.3)",
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // maxWidth: 810,
    // alignContent: "center",
  },
  flatListItem: {
    marginTop: 5,
    justifyContent: "space-evenly",
  },
  card: {
    height: 200,
    width: 150,
    margin: 5,
  },
  cardContent: {
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  id: {
    fontSize: 15,
    textAlign: "center",
  },
});
