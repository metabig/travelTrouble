import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class GroupButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Button title={this.props.text} onPress={() => 
                this.props.navigation.navigate('GroupView', {
                	group: this.props.group,
                })} />
        );
    }
}