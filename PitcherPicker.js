import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Picker} from 'react-native';
//import Picker from 'react-native-simple-modal-picker';


export default class PitcherPicker extends Component {

  constructor(props){
      console.log("Construct pitcherpicker");

      super(props);
      this.state= {
          selectedIndex: 0
      }

      this.data = [];
  }

  changePitcher = (it, ix) => {
    this.setState({selectedIndex: ix });
    this.props.onPitcherChange(ix);
  } 
      
  render() {

    //Create a flat array of names from the roster
    if (this.data.length == 0)
    { 
        for (var i = 0; i < this.props.roster.length; i++)
        {
            this.data.push(this.props.roster[i].name);
        }
    }
    
    
    return (
      <Picker 
        selectedValue={this.state.selectedIndex}
        onValueChange={(itemValue, itemIndex) => this.changePitcher(itemValue, itemIndex)}
        style={[styles.container]}
        mode="dropdown"
      >
        {this.data.map((item,ix) => {
          return (<Picker.Item label={item} value={ix} key={ix}  />)
        })}
      </Picker>
    );
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 20,
  },
});
