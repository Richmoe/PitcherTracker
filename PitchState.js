import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class PitchState extends Component {
    constructor(props) {

        super(props);
        console.log("Cur Pitcher: " + this.props.pitcherStats[0]);
    }
 
    render() {
      return (
          <Row size={1} style={styles.container}>
            <TouchableOpacity onPress={() => this.props.onPitcherChange()}>       
                <Col size={4}><Text style={styles.welcome}>{this.props.roster[this.props.pitcherStats[0].pitcherIx].name}</Text></Col>
            </TouchableOpacity>   
            <Col size={2} >
                <Row >
                    <Col>
                        <Text style={styles.pitchdata}>Balls:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.pitchdata}>{this.props.pitcherStats[0].ballCount}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.pitchdata}>Strikes:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.pitchdata}>{this.props.pitcherStats[0].strikeCount}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.totaldata}>Total:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.totaldata}>{(this.props.pitcherStats[0].ballCount + this.props.pitcherStats[0].strikeCount)}</Text>
                    </Col>                   
                </Row>
            </Col>
          </Row>
      );
   
    }
  }

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

  