import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Input } from 'react-native-elements';

export default class FlightInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      inbound_date: '',
      outbound_date: '',
      dataSource: null,
      loading: true,
    }
  }

  componentDidMount(){
    const { navigation } = this.props;

    let origin = navigation.getParam('origin', 'null');
    let destination = navigation.getParam('destination', 'null');
    let inbound_date = navigation.getParam('inbound_date', 'null');
    let outbound_date = navigation.getParam('outbound_date', 'null');

    this.setState({origin : origin});
    this.setState({destination : destination});
    this.setState({inbound_date : inbound_date});
    this.setState({outbound_date : outbound_date});

    const query = "https://www.skyscanner.net/g/chiron/api/v1/flights/browse/browsequotes/v1.0/ES/EUR/en-US"
                + '/' + origin
                + '/' + destination
                + '/' + outbound_date
                + '/' + inbound_date;

    fetch(query, { method: 'GET', headers: { 'api-key': 'skyscanner-hackupc2019' }
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({ loading:false, dataSource: responseJson });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.basic}>
          <Text>Loading flight info...</Text>
        </View>
      );
    } else {
      quotes = this.state.dataSource["Quotes"];
      if (quotes.length == 0) {
        return (
          <View style={styles.basic}>
            <Text>No flights were found for your query</Text>
            <Button title="Try something else" onPress = { () => { this.props.navigation.navigate('ProposalAdd') }}/>
          </View>
        );
      } else {
        return (
          <View style={styles.basic}>
            <Text>Avaliable flights:</Text>
            <QuoteBox quote={quotes[0]} navigation={this.props.navigation}/>
          </View>
        );
      }
    }
  }
}

class QuoteBox extends React.Component {
  render() {
    const quote = this.props.quote;
    const price = quote["MinPrice"];
    const outbound_time = quote["OutboundLeg"]["DepartureDate"];
    const inbound_time = quote["InboundLeg"]["DepartureDate"];

    return (
      <View style={styles.basic}>
        <Text>Outbound time: {outbound_time}</Text>
        <Text>Inbound time: {inbound_time}</Text>
        <Text>Price: {price}</Text>
        <Button title="Select" onPress = { () => {
          // Fetch POST new proposal
          this.props.navigation.navigate('Proposal')
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