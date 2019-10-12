import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './screens/loginView'
import GroupScreen from './screens/groupView'
import GroupEditScreen from './screens/groupEditView'
import ProposalScreen from './screens/proposalView'
import ProposalAddScreen from './screens/proposalAddView'

const RootStack = createStackNavigator({
  Login: {screen: LoginScreen},
  Group: {screen: GroupScreen},
  Proposal: {screen: ProposalScreen},
  ProposalAdd: {screen: ProposalAddScreen},
  GroupEdit: {screen: GroupEditScreen},
});

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;