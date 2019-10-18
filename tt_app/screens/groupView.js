import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import styles from '../assets/styles'

export default class GroupScreen extends React.Component {

  static navigationOptions = ({navigation}) => { 
    return {
      title: navigation.getParam('title', 'null')
    };
  };

  constructor(props) {
    super(props);
  }

  vote() {
  //  fetch
  }

  render() {

    return (
      <ScrollView>
        <Text>{this.props.navigation.getParam('group', 'null')}</Text>
        <View>
          <Text>Boston</Text>
          <Text>143€</Text>
          <Text>Votes: 34</Text>
          <Button title="Vote" onPress={() => this.vote()}/>
        </View>
        <Text>...............</Text>
        <View>
          <Text>New York</Text>
          <Text>203€</Text>
          <Text>Votes: 34</Text>
          <Button title="Vote" onPress={() => this.vote()} />
        </View>
        <Text>...............</Text>

        <View>
          <Text>New York</Text>
          <Text>203€</Text>
          <Text>Votes: 34</Text>
          <Button title="Vote" onPress={() => this.vote()} />
        </View>
        <Text>...............</Text>
        <Text>...............</Text>
        <Text>...............</Text>

        <Button title="Edit Group" onPress={() => this.props.navigation.navigate('GroupEdit', {
          group: this.props.navigation.getParam('group', 'null'),
        })}/>
        <Button title="Propose" onPress={() => {this.props.navigation.navigate('ProposalAdd')}}/>
      </ScrollView>
    );
  }
}