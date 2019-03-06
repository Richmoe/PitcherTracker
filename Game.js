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

import PitchControl from './PitchControl.js';
import GameState from './GameState.js';
import PitchState from './PitchState.js';
import BatterState from './BatterState.js';
import PlayerStats from './PlayerStats.js';
import FieldView from './FieldView.js';

export default class Game extends Component {

    constructor(props) {
        console.log("Setting up Game ");
        super(props);

        const url = require('./baseballDiamond1.jpg');
        const image = Image.resolveAssetSource(url);
        console.log(image);



        //game roster contains batting order & starting field position
        var gameRoster = this.props.navigation.getParam("roster", []);

        //Create teamStats:
        teamStats = [];
        for (var i = 0;i<gameRoster.length;i++)
        {
          teamStats.push(new PlayerStats(gameRoster[i].name, gameRoster[i].battingOrder, gameRoster[i].fieldingPos));
          //Store of current pitcher IX
          if (gameRoster[i].fieldingPos == 0)
          {
            console.log("starting pitcher is ix " + i);
            curPitcher = i;
          }
        }

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
            currentPitcher: curPitcher,
            teamData: teamStats

        }
        this.pitch = this.pitch.bind(this);

        //create 2d array for scores
        var scoreInit = new Array(5).fill(0);
        this.state.score.push(scoreInit);
        this.state.score.push(scoreInit);
    }

    inningNumber = () => { return Math.floor(this.state.inning / 2) + 1};

    
    isBatting = () =>  ((this.state.inning % 2) && this.state.isHome);

    getName (id) {
        return this.state.teamData[id].name;
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

    updatePitcherStats = (pitchType) => {

      //We can't reassign an array element directly, so we have to copy existing pitchCount array
      let tempTeamData = [...this.state.teamData];

      if (['strike','foul','hit'].indexOf(pitchType) >= 0) {
        tempTeamData[this.state.currentPitcher].pitcherStats.strikes += 1;
      } else if (['ball','hbp'].indexOf(pitchType) >= 0) {
        tempTeamData[this.state.currentPitcher].pitcherStats.balls += 1;
      } else {
        console.log("Invalid PitchType: " + pitchType);
      };

      this.setState( {teamData: tempTeamData});
    }


    hit(player, pitcher, loc){};

    out(player, pitcher, outType){};

    base(player, pitcher, baseType) {};

    pitch = (pitchType) => {
        //Update total pitch count if we're not at bat
        if (!this.isBatting())  this.updatePitcherStats(pitchType);

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
      for (var i = 0;i < this.state.teamData.length;i++) {
        tempExtraData.push({Pitches: (this.state.teamData[i].pitcherStats.balls + this.state.teamData[i].pitcherStats.strikes)});
      }
      console.log(tempExtraData);

      this.props.navigation.navigate('RosterScreen', { roster: this.state.teamData, extraData: tempExtraData, formatRow: [80, 20], callBack: this.onPitcherChange});
    };

    setPlayerPosition = (playerIx, fieldPos) => {
        var temp = [...this.state.teamData];
        temp[playerIx].positionByInning[this.inningNumber() - 1] = fieldPos;
    };

    onPitcherChange = (newPitcherId) => {
      console.log("Got Pitcher change " + newPitcherId);

      if (newPitcherId == this.state.currentPitcher) {
        console.log("No change in pitcher!");
        return;
      }


      //baseline is to swap with other position:
      var fieldPos = this.state.teamData[newPitcherId].positionByInning[this.inningNumber() - 1];
      console.log("old position was " + fieldPos);

      //set old pitcher to that position:
      this.setPlayerPosition(this.state.currentPitcher, fieldPos);

      //set up new pitcher

      this.setPlayerPosition(newPitcherId, 0);
      this.setState ( { currentPitcher : newPitcherId } );
      console.log(this.state.teamData);
    }


    render() {
      console.log("Is batting is " + this.isBatting());    
      return (
        <Grid style={styles.container}>

          <Row size={10}>
            {!this.isBatting() ? 
              <PitchState onPitcherChange = {this.onPitcherClick} currentPitcher = {this.state.teamData[this.state.currentPitcher]} />
              :
              <BatterState roster={this.state.teamData} curBatter= {0}/>
            }
          </Row>

          <Row size={5}>

          </Row>
          <Row size={10}>


          <PitchControl style={styles.pitchcontrol} clickHandler = {this.pitch} />
          </Row>

          <Row size={55}>
            { true && <FieldView />}
          </Row>
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',

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
