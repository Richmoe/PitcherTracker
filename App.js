/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Game from "./Game";
import LayoutTest from './LayoutTest';
import RosterView from './RosterView';


class Home extends Component {

  constructor(props) {
    console.log("Setting up App");
    super(props);
    this.state = { roster :  [
    {
      name: "Alex Merryman",
      abbrev: "AXM"
    },        
    {
      name: "Ashton Merryman",
      abbrev: "ASM"
    }, 
    {
      name: "Bowie Thorner Moe",
      abbrev: "BTM",
    },
    {
      name: "Calvin Polivka",
      abbrev: "CP"
    },    
    {
      name: "Felix Hester",
      abbrev: "FH"
    }, 
    {
      name: "Gunner O'Neill",
      abbrev: "GO"
    }, 
    {
      name: "Hayden Hilpert",
      abbrev: "HH"
    },  
    {
      name: "Hunter Rose",
      abbrev: "HR"
    },   
    {
      name: "June Pierce",
      abbrev: "JP"
    },
    {        
      name: "Leon Sievers",
      abbrev: "LS"
    },
    {
      name: "Sherif El-Shimi",
      abbrev: "SES"
    },        
    {
      name: "Trent Sislow",
      abbrev: "TS"
    },
    ]};
  }


  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Start Game"
          onPress={() => this.props.navigation.navigate('GameScreen', { roster: this.state.roster})}
        />
        <Button
          title="Layout Test"
          onPress={() => this.props.navigation.navigate('LayoutScreen', { roster: this.state.roster})}
        />
        <Button
          title="Roster Test"
          onPress={() => this.props.navigation.navigate('RosterScreen', { roster: this.state.roster})}
        />
      </View>
    );
 
  }
}

const AppNavigator = createStackNavigator({
    HomeScreen: Home,
    GameScreen: Game,
    LayoutScreen: LayoutTest,
    RosterScreen: RosterView,
    },
    {
        initialRouteName: "HomeScreen"
    }
);

export default createAppContainer(AppNavigator);

