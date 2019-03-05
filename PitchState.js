import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class PitchState extends Component {

 
    render() {
      return (
          <Row size={1} style={styles.container}>
            <Col size={15}>
                <Image style={{marginTop: 20, marginLeft: 5, width: 75, height: 75}} source={require("./small-baseball.png")} />
            </Col>
            <Col size={60}>
                <TouchableOpacity onPress={() => this.props.onPitcherChange()}>       
                    <Text style={styles.welcome}>{this.props.currentPitcher.name}</Text>
                </TouchableOpacity>   
            </Col>
            <Col size={25} >
                <Row >
                    <Col>
                        <Text style={styles.pitchdata}>Balls:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.pitchdata}>{this.props.currentPitcher.pitcherStats.balls}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.pitchdata}>Strikes:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.pitchdata}>{this.props.currentPitcher.pitcherStats.strikes}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.totaldata}>Total:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.totaldata}>{(this.props.currentPitcher.pitcherStats.balls + this.props.currentPitcher.pitcherStats.strikes)}</Text>
                    </Col>                   
                </Row>
            </Col>
          </Row>
      );
   
    }
  }

  /*
                      <Text style={styles.welcome}>{this.props.roster[this.props.pitcherStats[0].pitcherIx].name}</Text>



*/

  const styles = StyleSheet.create({
    container: {


    },
    welcome: {

      fontSize: 32,
      textAlign: 'left',
      textAlignVertical: 'center',
      margin: 10,
      height: '100%',
    },
    pitchdata: {
        fontSize: 24,
    },
    totaldata: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    pitcherpicker: {

        backgroundColor: 'red',
    },
    pitchcontrol: {

        backgroundColor: 'yellow',
    },
    gamestate: {
        backgroundColor: 'green',
    }
  });

  