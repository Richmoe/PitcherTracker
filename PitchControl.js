
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button,
  TouchableOpacity,
} from 'react-native';


export default class PitchControl extends Component {


  onStrike = () => {
    
    this.props.clickHandler("strike");
  };

  onBall = () => {

    this.props.clickHandler("ball");
  };

  onFoul = () => {

    this.props.clickHandler("foul");
  };

  onHit = () => {
    this.props.clickHandler("hit");
  };

  render() {

    return (

        <View style={styles.pitchTrack}>
          <View style={ styles.buttonRow } >
            <TouchableOpacity onPress={this.onStrike} >
              <Text style = {styles.button}>Strike</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onBall} >
              <Text style = {styles.button}>Ball</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.onFoul} >
              <Text style = {styles.button}>Foul</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.onHit} >
              <Text style = {styles.button}>HBP</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.buttonRow } >
            <TouchableOpacity  onPress={this.onHit} >
              <Text style = {styles.button}>Single</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.onHit} >
              <Text style = {styles.button}>Double</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.onHit} >
              <Text style = {styles.button}>Triple</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.onHit} >
              <Text style = {styles.button}>Home Run</Text>
            </TouchableOpacity>
          </View>
        </View>

    );
  }
}

const styles = StyleSheet.create({

  pitchTrack: {
    flex: 3,
    justifyContent :'center',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
  },

});
