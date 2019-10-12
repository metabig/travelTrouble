import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Input } from 'react-native-elements';

export default function ProposeScreen() {

  let inp = ''

  return (
    <ScrollView style={styles.container}>
      <Input label='From:' placeholder='E.g: Barcelona' />
      <Input label='To:' placeholder='E.g: Paris' onChangeText={(z) => inp = z} />
      <Text>{inp}</Text>
    </ScrollView>
  );
}

ProposeScreen.navigationOptions = {
  title: 'Propose trip',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});