import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
export default class GameState extends Component {

    getInning = () => {
        if (this.props.inning % 2 == 0) {
            return ("Top of " + (Math.trunc(this.props.inning / 2) + 1));
        } else {
            return ("Bot of " + (Math.trunc(this.props.inning / 2) + 1));
        }
    }

    render() {
        return (
             <View style= { styles.statusStyle } >
                <View style= {styles.statusRow2} >
                    <Text style = { [styles.elementStyle, styles.L]}>{this.getInning()}</Text>
                    <Text style = { [styles.elementStyle, styles.C]}>Outs: {this.props.outs}</Text>  
                    <Text style = { [styles.elementStyle, styles.R]}>{this.props.balls} - {this.props.strikes}</Text>
                </View>
                <View style= {styles.statusRow} >
                    <Text style = { styles.teamName}>Reed Wright</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
               </View>
               <View style= {styles.statusRow} >
                    <Text style = { styles.teamName}>The Enemy</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
                    <Text style = {styles.inningScore}>0</Text>
               </View>
           </View>
        );
    }
};


const styles = StyleSheet.create({

    statusStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2,
    },
    statusRow: {
        flex: 1,
        flexDirection: 'row',
    },
    statusRow2: {
        flex: 2,
        flexDirection: 'row',
    },    teamName: {
        flex: 6,  
        fontSize: 22,
    },
    inningScore: {
        flex: 1,
        borderColor: 'blue',
        borderWidth: 1,
        fontSize: 22,
        textAlign: 'center',
    },
    elementStyle: {
        flex: 1,
        fontSize: 36,
    },
    R: {
       textAlign: "right" 
    },
    C: {
        textAlign: 'center'
    },
    L: {
        textAlign: 'left'
    },
});
    

    
