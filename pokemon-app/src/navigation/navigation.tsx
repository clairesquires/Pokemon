import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pokedex from "../components/Pokedex";
import Details from "../components/Details";

const Stack = createNativeStackNavigator<StackParamList>();

export type StackParamList = {
  Pokedex: undefined;
  Details: {
    name: string;
  };
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={Pokedex} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
