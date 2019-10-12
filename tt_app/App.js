import React from 'react';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  render() {
    return (
     	<AppNavigator/>
    );
  }

  function callbackUserInfo(u, list) {
  	this.setState({user: u});
  	this.setState({group_list: list});
  }
}