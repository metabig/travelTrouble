import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import GroupListScreen from './screens/groupListView'
import GroupScreen from './screens/groupView'
import GroupEditScreen from './screens/groupEditView'
import ProposalAddScreen from './screens/proposalAddView'
import FlightInfoScreen from './screens/flightInfoView'

const RootStack = createStackNavigator({
  GroupList: { screen: GroupListScreen},
  GroupView: {screen: GroupScreen},
  ProposalAdd: {screen: ProposalAddScreen},
  GroupEdit: {screen: GroupEditScreen},
  FlighyInfo: {screen: FlightInfoScreen},
});

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;