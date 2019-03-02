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
import { createStackNavigator, createAppContainer } from "react-navigation";

import PitchControl from './PitchControl.js';
import GameState from './GameState.js';
import PitchState from './PitchState.js';



export default class Game extends Component {

    constructor(props) {
        console.log("Setting up Game ");
        super(props);

        var gameRoster = this.props.navigation.getParam("roster", []);
        console.log(gameRoster);
 

        this.state = {
            opponentName: "Opp",
            inning: 0,
            isHome: true,
            score: [],
            maxInning: 9,
            outs: 0, 
            runs: 0,
            balls: 0,
            strikes: 0,
            roster: gameRoster,
            currentPitcher: 0, //Need to pass this in
            pitcherStats: []
        }
        this.pitch = this.pitch.bind(this);

        //create 2d array for scores
        var scoreInit = new Array(5).fill(0);
        this.state.score.push(scoreInit);
        this.state.score.push(scoreInit);

        //Create new pitcherStats entry:
        //TODO replace 0 with passed in prop
        this.state.pitcherStats.unshift({pitcherIx: 0, ballCount: 0, strikeCount: 0});
    }

    newPitcher = (pitcherIX) => {

      //skip if we already have this person as pitcher:
      if (pitcherIX == this.state.pitcherStats[0].pitcherIx) {
        console.log("Skipping!");
        return;
      }

      //Copy existing pitcher stats array:
      let tempPitcherStats = [...this.state.pitcherStats];
      let dupIX = -1;

      //Check to see if we already had this pitcher pitch some
      for (var i = 0; i < tempPitcherStats.length; i++)
      {
        if (tempPitcherStats[i].pitcherIx == pitcherIX) {
          //break out if we find it because we want the first instance
          dupIX = i;
          break;
        }
      }

      if (dupIX > 0)  {
        //Pitcher is going again so copy that record to the beginning
        tempPitcherStats.unshift(tempPitcherStats[dupIX]);
      } else {
        if (dupIX == -1) {
          //new Pitcher - prepend fresh values
          tempPitcherStats.unshift({pitcherIx: pitcherIX, ballCount: 0, strikeCount: 0});
        } else {
          //we shouldn't get here since we check at top!
          return;
        }
      }

      //Reassign:
      this.setState( {pitcherStats: tempPitcherStats});

    }

    isBatting = () =>  ((this.state.inning % 2) && this.state.isHome);

    getName (id) {
        return this.state.roster[id].name;
    }

    nextBatter() {
        this.setState( { balls : 0, strikes: 0 });
    };
    

    newInning() {
        console.log("Is batting is " + this.isBatting());
        this.setState ( {
            inning : this.state.inning + 1,
            outs: 0,
            runs: 0,
            balls: 0,
            strikes: 0
        });
    };

    scoreRun(player, pitcher, runcount = 1) //Need to figure out RBIs etc.
    {
        var newScore = this.state.score;
        newScore[this.state.inning % 2] += runcount;
        this.setState ( {
            runs : runs + runcount,
            score : newScore
        });
    };

    updatePitchCount = (pitchType) => {

      //We can't reassign an array element directly, so we have to copy existing pitchCount array
      let tempPitchCount = [...this.state.pitcherStats];

      if (['strike','foul','hit'].indexOf(pitchType) >= 0) {
        tempPitchCount[0].strikeCount += 1;
      } else if (['ball','hbp'].indexOf(pitchType) >= 0) {
        tempPitchCount[0].ballCount += 1;
      } else {
        console.log("Invalid PitchType: " + pitchType);
      };

      this.setState( {pitcherStats: tempPitchCount});
    }


    hit(player, pitcher, loc){};

    out(player, pitcher, outType){};

    base(player, pitcher, baseType) {};

    pitch = (pitchType) => {
        //Update total pitch count if we're not at bat
        if (!this.isBatting())  this.updatePitchCount(pitchType);

        curStrikeCount = this.state.strikes;
        curBallCount = this.state.balls;
        curOutCount = this.state.outs;

        if (pitchType === 'strike') {
            ++curStrikeCount ;
        } else if (pitchType === 'ball') {
            ++curBallCount;
        } else if (pitchType === 'foul') {
            if (curStrikeCount < 2) {
                ++curStrikeCount;
            }
        } else {
            console.log("error pitch type: " + pitchType);
        }

        if (curStrikeCount >= 3)
        {
            //strikeout
            this.setState( { outs: this.state.outs + 1});
            if (curOutCount >= 2){
                this.newInning();
            } else {
                this.nextBatter();
            }
        } else if (curBallCount >= 4) {
            //Walk
            this.nextBatter();

        } else {
            this.setState( {
                strikes: curStrikeCount,
                balls : curBallCount
            });
        }
    };

    onPitcherClick = () => {


      //Create Roster view data. God this is ugly
      tempExtraData = [];
      for (var i = 0;i < this.state.roster.length;i++) {
        tempExtraData.push({Pitches: 0});
      }
      console.log(tempExtraData);

      for (var i = 0;i < this.state.pitcherStats.length; i++)
      {
        tempExtraData[this.state.pitcherStats[i].pitcherIx].Pitches = (this.state.pitcherStats[i].ballCount + this.state.pitcherStats[i].strikeCount);
      }
      console.log(tempExtraData);


      this.props.navigation.navigate('RosterScreen', { roster: this.state.roster, extraData: tempExtraData, formatRow: [80, 20], callBack: this.onPitcherChange});
    };

    onPitcherChange = (newPitcherId) => {
      console.log("Got Pitcher change " + newPitcherId);
      this.newPitcher(newPitcherId);
    }


    render() {
      console.log("Is batting is " + this.isBatting());    
      return (
        <Grid style={styles.container}>

          <Row size={10}>
            {!this.isBatting() && <PitchState onPitcherChange = {this.onPitcherClick} pitcherStats={this.state.pitcherStats} roster={this.state.roster} navigation={this.props.navigation} />}
          </Row>

          <Row size={5} />
          <Row size={10}>
          <PitchControl style={styles.pitchcontrol} clickHandler = {this.pitch} />
          </Row>
          { false && <ImageBackground
            source={require('./baseballDiamond1.jpg')} 
            style={{width: "50%", height: "50%"}}
          />}
          <Row size={55}></Row>
          <Row size={20}>
          <GameState style={styles.gamestate}
            balls = {this.state.balls}
            strikes = {this.state.strikes}
            outs = {this.state.outs}
            inning = {this.state.inning}
          />
          </Row>
        </Grid>
      );
   
    }
  }

/*
  { !this.isBatting() && 
    <View style={ {flexDirection: 'row'}}>
      <Text style={styles.welcome}>{this.state.roster[this.state.currentPitcher].name}</Text>
      <Text style={styles.welcome}>Pitch Count: {this.state.pitchCounts[this.state.currentPitcher]} </Text>
    </View>
  }
  */

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',

    },
    welcome: {
      flex: 1,
      fontSize: 32,
      textAlign: 'center',
      margin: 10,
    },
    pitcherpicker: {
        flex: 1,
        backgroundColor: 'red',
    },
    pitchcontrol: {
        flex: .5,
        backgroundColor: 'yellow',
    },
    gamestate: {
        flex: 3,
        backgroundColor: 'green',
    }
  });
//  <PitcherPicker style={styles.pitcherpicker} roster= {this.state.roster} onPitcherChange={this.onPitcherChange} pitchCounts={this.state.pitchCounts}/>
