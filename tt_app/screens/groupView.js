import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Input } from 'react-native-elements';

export default class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    fetch("http://192.168.43.104:3000/user/groups", {
      method: 'POST',
      body: JSON.stringify({
        user: this.props.navigation.getParam("user", "unknown"),
      }),
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({isLoading: false, dataSource: responseJson});
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.basic}>
        <Text>Welcome, {this.props.navigation.getParam("user", "unknown")}</Text>
        <Text>These are your groups:</Text>
        <Text>{this.state.dataSource}</Text>
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
