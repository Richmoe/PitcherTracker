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

import PitchControl from './PitchControl.js';
import GameState from './GameState.js';
import PitcherPicker from './PitcherPicker.js';


export default class Game extends Component {

    constructor(props) {
        console.log("Setting up Game");
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
            pitchCounts: new Array(gameRoster.length).fill(0)
        }
        this.pitch = this.pitch.bind(this);

        //create 2d array for scores
        var scoreInit = new Array(5).fill(0);
        this.state.score.push(scoreInit);
        this.state.score.push(scoreInit);

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

    updatePitchCount = () => {

      //Copy existing pitchCount array
      let tempPitchCount = [...this.state.pitchCounts];
      tempPitchCount[this.state.currentPitcher] += 1;
      this.setState( {pitchCounts: tempPitchCount});
    };


    hit(player, pitcher, loc){};

    out(player, pitcher, outType){};

    base(player, pitcher, baseType) {};

    pitch = (pitchType) => {
        console.log("BEFORE: Pitch was " + pitchType + " s: " + this.state.strikes + ", b: " + this.state.balls + ", o: " + this.state.outs);
        //TODO are we on offense?
        this.updatePitchCount();

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

    onPitcherChange = (newPitcherId) => {
        console.log("Got Pitcher change " + newPitcherId);
        this.setState({currentPitcher: newPitcherId} );
    };



    render() {
      console.log("Is batting is " + this.isBatting());    
      return (
        <View style={styles.container}>
        { !this.isBatting() && 
            <View style={ {flexDirection: 'row'}}>
              <PitcherPicker style={styles.pitcherpicker} roster= {this.state.roster} onPitcherChange={this.onPitcherChange} pitchCounts={this.state.pitchCounts}/>
              <Text style={styles.welcome}>Pitch Count: {this.state.pitchCounts[this.state.currentPitcher]} </Text>
            </View>
          }
          <PitchControl style={styles.pitchcontrol} clickHandler = {this.pitch} />
          { false && <ImageBackground
            source={require('./baseballDiamond1.jpg')} 
            style={{width: "50%", height: "50%"}}
          />}
          <GameState style={styles.gamestate}
            balls = {this.state.balls}
            strikes = {this.state.strikes}
            outs = {this.state.outs}
            inning = {this.state.inning}
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
        flex: .5,
        backgroundColor: 'yellow',
    },
    gamestate: {
        flex: 3,
        backgroundColor: 'green',
    }
  });
  