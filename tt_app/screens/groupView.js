import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Input } from 'react-native-elements';

export default class GrupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      dataSource: null,
      loading: true
    };
  }

  componentWillMount() {
    fetch("http://192.168.43.104:3000/user/groups", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.props.navigation.getParam("user", "unknown") })
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ loading:false, dataSource: responseJson });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    if (!this.state.isLogged || this.state.loading)
      return (
        <View style={styles.basic}>
          <Text>Welcome to Travel Trouble app, brodaaaaa</Text>
          <Input placeholder='Username' onChangeText={(username) => this.setState({username})}/>
          <Button title="Log in" onPress={() => {
            this.setState({
              isLogged: true
            });
            this.render;
          }}/>
        </View>
      );
    return (
      <View style={styles.basic}>
        <Text>Welcome!! {this.state.username}</Text>
        <Text>{JSON.stringify(this.state.dataSource, null, 2)}</Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  basic: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
