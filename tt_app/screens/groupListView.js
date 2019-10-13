import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { Input, Divider } from 'react-native-elements';
import GroupButton from '../components/GroupButton';

export default class GroupListScreen extends React.Component {
  static navigationOptions = {
    title: 'Group List',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isLogged: false,
      dataSource: null,
      loading: true,
      newGroup: null
    };
  }

  fetchApi() {
    fetch("http://192.168.43.104:3000/user/groups", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.state.user })

    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ loading: false, dataSource: responseJson });
    }).catch((error) => {
      console.error(error);
    });
  }

  createGroup() {
    fetch("http://192.168.43.104:3000/group/new", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.state.user, group_name: this.state.newGroup })
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ loading: true, dataSource: responseJson });
      this.fetchApi();
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    if (!this.state.isLogged || this.state.loading)
      return (
        <View>
          <Text>Welcome to Travel Troublee!</Text>
          <Input placeholder='Username' onChangeText={(u) => this.setState({ user: u })} />
          
          <Button title="Log in" onPress={() => {
            this.setState({
              isLogged: true
            });
            this.fetchApi();
            this.render;
          }} />
        </View>
      );
    return (
      <View>
        <Text>Welcome {this.state.user}!!</Text>
        <Input placeholder="New Group" onChangeText={(g) => this.setState({ newGroup: g })} />
        <Button title="Create" onPress={() => this.createGroup()} />
        <Text>Your groups are:</Text>
        {this.state.dataSource.map(
          (data) => {
            return(
              <View key={data.id}>
                <GroupButton text={data} group={data} navigation={this.props.navigation}/>
              </View>
            )
          }
        )}
        
      </View>
    );
  }
}


