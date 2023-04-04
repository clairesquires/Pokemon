import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/Navigation";
import { Card } from "react-native-paper";
import { typeColors } from "./Colours";

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
    elevation={0}
  >
    <Card.Content style={styles.cardContent}>
      <Image source={{ uri: imageLink }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.id}>#{id}</Text>
    </Card.Content>
  </Card>
);

export default function Pokedex({ navigation }: DetailsScreenNavigationProp) {
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
        id: result.id,
        type: result.types[0]["type"]["name"],
      }));
      return pokemon;
    });
    setData(result);
  };

  // Initialise empty
  const [data, setData] = useState<Pokemon[]>([]);
  // Set with data and rerender
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

const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
  },
  flatListItem: {
    justifyContent: "center",
  },
  card: {
    height: 200,
    width: "40%",
    margin: 10,
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
