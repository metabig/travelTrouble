import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

export default class ProposalAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destination: '',
      inbound_date: '',
      outbound_date: '',
    }

    this.origin_cities = [{ value: 'None'}];
    this.destination_cities = [{ value: 'None'}];

    this.origin_cities_dict = {"none" : "none"};
    this.destination_cities_dict = {"none" : "none"};
  }

  render() {
    return (
      <View style={styles.basic}>
        <Text>Proposal add</Text>

        <Text>From</Text>
        <Input placeholder='Search origin' onChangeText={(origin) => {
          this.setState({origin});
          if (origin.length >= 1) {
            fetch("https://www.skyscanner.net/g/chiron/api/v1/places/autosuggest/v1.0/ES/EUR/en-US?query=".concat(origin), {
              method: 'GET',
              headers: { 'api-key': 'skyscanner-hackupc2019' }
            }).then((response) => response.json()).then((responseJson) => {
              const cities = [];
              responseJson["Places"].map(
                (city) => {
                  cities.push({value: city["PlaceName"]});
                  this.origin_cities_dict[city["PlaceName"]] = city["PlaceId"];
                }
              );
              this.origin_cities = cities;
            }).catch((error) => {
              console.error(error);
            });
          }
        }}/>

        <View style={{ width: 300 }}>
        <Dropdown label='Origin' 
                  data={this.origin_cities}
                  onChangeText = {(value, index, data) => {
                    this.setState({origin: this.origin_cities_dict[value]});
                  }}
                  />
        </View>

        <Text>To</Text>
        <Input placeholder='Search destination' onChangeText={(destination) => {
          this.setState({destination});
          if (destination.length >= 1) {
            fetch("https://www.skyscanner.net/g/chiron/api/v1/places/autosuggest/v1.0/ES/EUR/en-US?query=".concat(destination), {
              method: 'GET',
              headers: { 'api-key': 'skyscanner-hackupc2019' }
            }).then((response) => response.json()).then((responseJson) => {
              const cities = [];
              responseJson["Places"].map(
                (city) => {
                  cities.push({value: city["PlaceName"]});
                  this.destination_cities_dict[city["PlaceName"]] = city["PlaceId"];
                }
              );
              this.destination_cities = cities;
            }).catch((error) => {
              console.error(error);
            });
          }
        }}/>

        <View style={{ width: 300 }}>
        <Dropdown label='Destination' 
                  data={this.destination_cities}
                  onChangeText = {(value, index, data) => {
                    this.setState({destination: this.destination_cities_dict[value]});
                  }}
                  />
        </View>

        <Text>Outbound flight date:</Text>
        <DatePicker mode="date" 
                    format="YYYY-MM-DD" 
                    confirmBtnText="Confirm" 
                    cancelBtnText="Cancel" 
                    showIcon={false}
                    date = {this.state.outbound_date}
                    onDateChange={(date) => {this.setState({outbound_date: date});}}
                    />

        <Text>Inbound flight date:</Text>
        <DatePicker mode="date" 
                    format="YYYY-MM-DD" 
                    confirmBtnText="Confirm" 
                    cancelBtnText="Cancel"
                    showIcon={false}
                    date = {this.state.inbound_date}
                    onDateChange={(date) => {this.setState({inbound_date: date});}}
                    />

        <Button title="Find flights" 
                onPress = { () => {
                  this.props.navigation.navigate('FlightInfo', {
                    outbound_date: this.state.outbound_date,
                    inbound_date: this.state.inbound_date,
                    origin: this.state.origin,
                    destination: this.state.destination
                })}}/>

        <Text>{this.state.outbound_date}</Text>
        <Text>{this.state.inbound_date}</Text>
        <Text>{this.state.origin}</Text>
        <Text>{this.state.destination}</Text>
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
