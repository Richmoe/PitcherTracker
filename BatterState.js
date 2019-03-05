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

        //props:
        // roster = team data array
        // curBatter

        var tempRoster = this.props.roster;

        console.log(tempRoster);

        //Make sure we sort by battingOrder        
        tempRoster.sort((a,b) => a.battingOrder - b.battingOrder);

        this.state = {
          battingOrder : tempRoster,
          curBatter : this.props.curBatter
        }

    }

    batterNameAndOrder = (batterNum) => {
      
      var num = batterNum % this.state.battingOrder.length;

      return (num+1) + ". " + this.state.battingOrder[num].name;
 
    }
 
    render() {
      return (
        <Row>
            <Col size={15}>
                <Image style={styles.batImage} source={require("./baseball-bat.png")} />
            </Col>
            <Col size={50}>
                <Text style={styles.batter}>{this.batterNameAndOrder(this.state.curBatter)}</Text>
            </Col>
            <Col size={35} >
                <Row >
                    <Text style={styles.onDeck}>{this.batterNameAndOrder(this.state.curBatter + 1)}</Text>
                </Row>
                <Row>
                    <Text style={styles.onDeck}>{this.batterNameAndOrder(this.state.curBatter + 2)}</Text>
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

  