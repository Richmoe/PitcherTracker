import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default class LayoutTest extends Component {

 
    render() {
      return (
        <View style={styles.container}>
          <View style={ {flexDirection: 'row', flex: .5}}>
            <Text style={styles.pitcherpicker}>Hello</Text>
            <Text style={styles.welcome}>Pitch Count: 100 </Text>
          </View>
          {true && <View style={styles.pitchcontrol} />}
          <View style={{flex: 3}}>
          { false && <ImageBackground
            source={require('./baseballDiamond1.jpg')} 
            style={{flex: 1}}
          />}
          </View>
          <View style={styles.gamestate}

          />
        </View>
      );
   
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',

    },
    welcome: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    pitcherpicker: {
        flex: 1,
        backgroundColor: 'red',
    },
    pitchcontrol: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    gamestate: {
        flex: 2,
        backgroundColor: 'green',
    }
  });
  