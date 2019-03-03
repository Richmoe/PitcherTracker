import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class BatterState extends Component {
    constructor(props) {
        console.log("BatterState!");
        super(props);

    }
 
    render() {
      return (
        <Row>
            <Col size={15}>
                <Image style={styles.batImage} source={require("./baseball-bat.png")} />
            </Col>
            <Col size={50}>
                <Text style={styles.batter}>AT BAT (#)</Text>
            </Col>
            <Col size={35} >
                <Row >
                    <Text style={styles.onDeck}>On Deck (#)</Text>
                </Row>
                <Row>
                    <Text style={styles.onDeck}>On Deck (#)</Text>
                </Row>
            </Col>
        </Row>
      );
   
    }
  }

  const styles = StyleSheet.create({
    batImage: {
        marginTop: 20, 
        marginLeft: 5, 
        width: 75, 
        height: 75,
    },
    batter: {
      fontSize: 32,
      textAlign: 'left',
      textAlignVertical: 'center',
      margin: 10,
      height: '100%',
    },
    onDeck: {
        fontSize: 24,
    },
  });

  