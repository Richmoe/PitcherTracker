
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text, 
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

export default class FieldView extends Component {

    fieldX;
    fieldY;
    fieldWidth;
    fieldHeight;

    constructor(props){
        console.log("Construct FieldView");
  
        super(props);
        //props should be current baserunner array where 0 elem = batter


    }

    onLayout = (event) => {
        this.fieldX = Math.floor(event.nativeEvent.layout.x);
        this.fieldY = Math.floor(event.nativeEvent.layout.y);
        this.fieldWidth = Math.floor(event.nativeEvent.layout.width);
        this.fieldHeight = Math.floor(event.nativeEvent.layout.height);
        console.log(`Field Dims: ${this.fieldWidth} x ${this.fieldHeight} at ${this.fieldX},${this.fieldY}`);
    }


    renderBaserunners = () =>
    {
        runnerJSX = [];
        for (var i = 1;i < this.props.baseRunners.length;i++)
        {
            if (this.props.baseRunners[i] > 0)
            {

                runnerJSX = [...runnerJSX,
                    <TouchableOpacity key={i}> 
                        <Text style = {[styles.circleButton, stylesPos[i-1]]}>X</Text>
                    </TouchableOpacity >
                ];

            }
        }

        return runnerJSX;
    }




    render() {
        return (

            <Grid style={styles.container}> 
            <Row onLayout = {(event) => this.onLayout(event)}>
                <ImageBackground  source={require('./baseballDiamond1.jpg')} style={styles.image}>

                    {this.renderBaserunners()}

                </ImageBackground>
            </Row>
            </Grid>

        );
    }
}


const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'center' 

  },
  circleButton: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    borderStyle: 'solid',
    borderColor: 'red',
    width: 55,
    height: 50,
    borderWidth: 2,
    borderRadius: 64,
  },
  image: {
    //flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  }
});

const stylesPos = [
    {
    //1st:
    position: 'absolute',
    left: 412 - 71,
    top: 220,
  },
  {
    //2nd:
    position: 'absolute',
    left: 276 - 71,
    top: 80,
  },
  {
    //3rd:
    position: 'absolute',
    left: 130 - 71,
    top: 220
  },
  {
    //Home:
    position: 'absolute',
    left: 276-71,
    top: 370
  },
  {
    //Run 1:
    position: 'absolute',
    left: -50,
    top: 400,
  },
  {
    //Run 2:
    position: 'absolute',
    left: 10,
    top: 400,
  },
  {
    //Run 3:
    position: 'absolute',
    left: 70,
    top: 400,
  }
];
