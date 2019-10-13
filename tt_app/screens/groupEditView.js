import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

export default class GroupEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: null,
      group: null,
      dataSource: null,
      loading: true,
    };
  }

  getMembers() {
    fetch("http://192.168.43.104:3000/group/user/all", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ group: this.state.group })
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ loading: false, dataSource: responseJson });
    }).catch((error) => {
      console.error(error);
    });
  }

  addMember() {
    fetch("http://192.168.43.104:3000/user/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.state.newMember, group_name: this.state.group_name })
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ dataSource: responseJson });
      this.render();
    }).catch((error) => {
      console.error(error);
    });
  }

  deleteMember(user) {

  }

  contentDidMount() {
    this.setState({group: this.props.navigation.getParam('group', 'null')});
    this.setState({loading: false});
    this.getMembers();
  }

  render() {
    if (this.state.loading) {
      <View>
        <Text>Loading members</Text>
      </View>
    }

    return (
      <ScrollView>
        <Text>Group members: { JSON.stringify(this.state.dataSource)}</Text>
      </ScrollView>
    );
  }
}
