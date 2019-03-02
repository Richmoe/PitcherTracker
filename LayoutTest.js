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
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class LayoutTest extends Component {

 
    render() {
      return (
        <Grid style={styles.container}>
          <Row size={10}>
            <Col size={4}><Text style={styles.welcome}>Pitcher Name</Text></Col>
            <Col size={2} >
                <Row >
                    <Col>
                        <Text style={styles.pitchdata}>Balls:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.pitchdata}>0</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.pitchdata}>Strikes:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.pitchdata}>0</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.totaldata}>Total:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.totaldata}>0</Text>
                    </Col>                   
                </Row>
            </Col>
          </Row>

          <Row size={10}>
            <Col style={styles.container}>
                <TouchableOpacity><Text style={styles.buttonish}>Strike</Text></TouchableOpacity>
            </Col>
            <Col style={styles.container}><Text style={styles.buttonish}>Ball</Text></Col>
            <Col style={styles.container}><Text style={styles.buttonish}>Foul</Text></Col>
            <Col style={styles.container}><Text style={styles.buttonish}>HBP</Text></Col>
            <Col style={styles.container}><Text style={styles.buttonish}>Hit</Text></Col>
          </Row>
          <Row size={60}></Row>

          <Row size={20} style={styles.gamestate}>
          <Grid>
            <Row size={33} style={{backgroundColor: 'yellow'}}>
                <Col size={50} style={{backgroundColor: 'cyan'}}><Text>Top of the 1st</Text></Col>
                <Col size={25} style={{backgroundColor: 'black'}}><Text>0 Outs</Text></Col>
                <Col size={25} style={{backgroundColor: 'while'}}><Text>1-1</Text></Col>
                </Row>
                <Row size={67}>
                    <Grid>
                        <Row><Col size={20}><Text>Testing1</Text></Col>
                            <Col size={10}><Text>1</Text></Col>
                            <Col size={10}><Text>2</Text></Col>
                            <Col size={10}><Text>3</Text></Col>
                            <Col size={10}><Text>4</Text></Col>
                            <Col size={10}><Text>5</Text></Col>

                            <Col size={10}><Text></Text></Col>
                            <Col size={10}><Text>R</Text></Col>
                            <Col size={10}><Text>H</Text></Col>                            
                        
                        </Row>    
                        <Row><Text>Testing2</Text></Row>
                    </Grid>   
                </Row>   
            </Grid>
          </Row>

        </Grid>
      );
   
    }
  }

  const styles = StyleSheet.create({
    container: {

        margin: 5,

    },
    buttonish: {
        backgroundColor: 'cyan',
        justifyContent: 'center',
        //width: '100%',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 28,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
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
  