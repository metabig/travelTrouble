import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

export default class GroupEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: null
    }
  }

  addMember() {
    //fetch
    this.render();
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Member 1</Text>
          <Button title="Delete"/>
        </View>
        <View>
          <Text>Member 2</Text>
          <Button title="Delete" />
        </View>
        <View>
          <Text>Member 3</Text>
          <Button title="Delete" />
        </View>
        <Input placeholder="New Member's Name" onPress={(n) => this.setState({newMember: n})}/>
        <Button title="Add Memeber" onPress={() => this.addMember()}/>
      </ScrollView>
    );
  }
}
