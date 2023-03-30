import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/Navigation';

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Details'>;

export default function Details({route}: DetailsScreenNavigationProp) {
  const name = route.params.name;

  return (
    <View>
      <Text>My name is {name}</Text>
    </View>
  );
}
