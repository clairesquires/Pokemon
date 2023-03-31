import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/Navigation";
import { Card } from "react-native-paper";
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

type DetailsScreenNavigationProp = NativeStackScreenProps<
  StackParamList,
  "Pokedex"
>;

const Item = ({ name, navigation, imageLink }: ItemProps) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <Image source={{ uri: imageLink }} style={styles.image} />
      <Text
        style={styles.name}
        onPress={() => navigation.navigate("Details", { name })}
      >
        {name}
      </Text>
      <Text style={styles.id}>#id</Text>
    </Card.Content>
  </Card>
);

export default function Pokedex({ navigation }: DetailsScreenNavigationProp) {
  //Primary data
  const [data, setData] = useState<Pokemon[]>([]);
  const getPokemonFromApi = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=898"
    );
    const json = await response.json();
    setData(json.results);
  };
  useEffect(() => {
    getPokemonFromApi();
  }, []);

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Item
          name={"item.name"}
          navigation={navigation}
          imageLink={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/44.png"
          }
        />
      ))}

      {/* <FlatList
        columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
        numColumns={5}
        horizontal={false}
          data={data}
          renderItem={({item}) => <Item name={item.name} navigation={navigation} imageLink={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/44.png"}/>}
          keyExtractor={item=>item.name}
          style={styles.flatList}
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 810,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    height: 300,
    width: 250,
    margin: 10,
  },
  cardContent: {
    height: 300,
    width: 250,
    textAlign: "center",
  },
  image: {
    width: "auto",
    height: "80%",
    marginBottom: 10,
  },
  name: {
    backgroundColor: "red",
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
