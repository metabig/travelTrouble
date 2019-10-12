import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Input } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
  }

  render() {
    return (
      <View style={styles.basic}>
        <Text>Welcome to Travel Trouble app</Text>
        <Input placeHolder='Username' onChangeText={(username) => this.setState({username})}/>
        <Button title="Log in" onPress={() => {
          this.props.navigation.navigate('Group', {'user': this.state.username});
        }}/>
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
