import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Button
} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View style={{marginTop:50}}>
            <Text>Welcome to Travel Trouble</Text>
            <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('Details')}
            />
          </View>


        </ScrollView>

      </View>
    );
  }
}


class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}


HomeScreen.navigationOptions = {
  header: null,
};

export { HomeScreen, DetailsScreen };
