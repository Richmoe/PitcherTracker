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

import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import GameState from './GameState.js';

const OUTOFFSET=8;

export default class HitView extends Component {

    fieldX;
    fieldY;
    fieldWidth;
    fieldHeight;
    baseRunners = [];
    runnerAtBase = [];
    runnerNames = [];
    resetBaseRunners = [];


    constructor(props){
        console.log("Construct HitView");
  

        super(props);
        //props should be baserunner array
        this.baseRunners = [0,1,-1,3];
        this.runnerNames = ['HT', 'R1', 'R2', 'R3'];
        this.runnerAtBase = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
        this.resetBaseRunners = [...this.baseRunners];

        //put runners at their bases:
        for (var i = 0;i < this.baseRunners.length; i++) {
          if (this.baseRunners[i] >= 0) this.runnerAtBase[i] = i;
        }
        console.log(this.runnerAtBase);

        this.state = { menuOpen: false,
          selectedPosition: -1
        };
       
    }

    onLayout = (event) => {
        this.fieldX = Math.floor(event.nativeEvent.layout.x);
        this.fieldY = Math.floor(event.nativeEvent.layout.y);
        this.fieldWidth = Math.floor(event.nativeEvent.layout.width);
        this.fieldHeight = Math.floor(event.nativeEvent.layout.height);
        console.log(`Field Dims: ${this.fieldWidth} x ${this.fieldHeight} at ${this.fieldX},${this.fieldY}`);
    }

    componentWillUnmount() {
      console.log("UNMOUNTT!");
      //This is where I update gamestate:

    }

    resetRunners = () => {

 
      this.baseRunners = [...this.resetBaseRunners];
      this.runnerAtBase = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
      //put runners at their bases:
      for (var i = 0;i < this.baseRunners.length; i++) {
        if (this.baseRunners[i] >= 0) this.runnerAtBase[i] = i;
      }

      this.setState( { selectedPosition: -1});
      
    }
   
    advanceRunner = (ix) => {
      console.log("Advance " + ix);
      console.log(this.runnerAtBase);
      if (this.runnerAtBase[(ix)] != -1) {
        this.advanceRunner(ix+1);
      }
        
      this.runnerAtBase[(ix)] = this.runnerAtBase[ix-1];
      this.runnerAtBase[ix-1] = -1;
      
    }

    resolveRunners = (startingPos, endPos) => {

      //TODO Ugly refactor later
      console.log(`resolving pos ${startingPos} moving to ${endPos}`);
      var advance = (endPos - startingPos);
      var playerIX = this.runnerAtBase[startingPos];

      if (endPos > 4)
      {
        //OUT!
        console.log("Out " + playerIX);
        console.log(this.runnerAtBase);
        //insert at end of list and shift the other run positions:
        for (var i = OUTOFFSET;i < this.runnerAtBase.length;i++)
        {
          if (this.runnerAtBase[i] == -1 || this.runnerAtBase[i] == playerIX)
          {
            this.runnerAtBase[startingPos] = -1;
            this.runnerAtBase[i] = playerIX;

            break;
          }
        }
        console.log("Aft");
        console.log(this.runnerAtBase);

      } else { 
        if (startingPos > endPos)
        {
          //move from out to run
          console.log("Run " + playerIX);
          console.log(this.runnerAtBase);
          //insert at end of list and shift the other run positions:
          for (var i = 4;i < this.runnerAtBase.length;i++)
          {
            if (this.runnerAtBase[i] == -1 || this.runnerAtBase[i] == playerIX)
            {
              this.runnerAtBase[startingPos] = -1;
              this.runnerAtBase[i] = playerIX;
  
              break;
            }
          }
          console.log("Aft");
          console.log(this.runnerAtBase);


        } else {
          //Advance all base runners
          while (advance > 0) {
            this.advanceRunner(startingPos+1);
            --advance;
            ++startingPos;
          }
        }
      }

      this.setState( {
        menuOpen: !this.state.menuOpen,
        selectedPosition: -1
      });

    }

    onPress = (position) => {
      console.log("Menu open, selected position: " + position);
      this.setState( 
        {menuOpen: !this.state.menuOpen,
        selectedPosition: position });

    }

    onMenuSelect = (value) => {
      console.log("menu select " + this.state.selectedPosition + ", Value: " + value);
      this.resolveRunners(this.state.selectedPosition, value);
    }

    renderBaserunners = () =>
    {
      runnerJSX = [];
      for (let i = 0;i < this.runnerAtBase.length;i++)
      {
        var baseRunnerIx = this.runnerAtBase[i];
        if (baseRunnerIx >= 0)
        {

          if (i >= OUTOFFSET) /*out*/ stylesColor = {     backgroundColor: 'red'}
          else if (i >= 4) /*run*/ stylesColor = {     backgroundColor: '#00CC00'}
          else /*default*/ stylesColor = {     backgroundColor: 'yellow'};

          runnerJSX = [...runnerJSX,
              <TouchableOpacity key={i} style = {[styles.circleButton, stylesColor, stylesPos[i]]} onPress = {() => this.onPress(i)}> 
                  <Text style ={styles.buttonText}>{this.runnerNames[this.runnerAtBase[i]]}</Text>
              </TouchableOpacity >
          ];
        }
      }
      return runnerJSX;
    }


    renderMenuOptions = () => {
      console.log(`render menu ${this.state.selectedPosition}`);
      if (this.state.selectedPosition == 0)
      { 
        return (
          <View >
            <MenuOption text='Single' value={1}/>
            <MenuOption text='Double' value={2} />
            <MenuOption text='Triple' value={3} />
            <MenuOption text='Home Run' value={4} />
            <MenuOption text='Out' value={5} />                  
          </View>
        );
      } else {
        menuJSX = [];
        if (this.state.selectedPosition < 2) menuJSX.push(<MenuOption key={1} text="1st" value={1} />);  
        if (this.state.selectedPosition < 3) menuJSX.push(<MenuOption key={2} text="2nd" value={2} />);
        if (this.state.selectedPosition < 4) menuJSX.push(<MenuOption key={3} text="3rd" value={3} />);
        menuJSX.push(<MenuOption key={4} text="Run" value={4} />);
        menuJSX.push(<MenuOption key={5} text="Out" value={5} />);

        return (<View>{menuJSX}</View>);
      }
    }

    render() {
        console.log("Rendering with pos " + this.state.selectedPosition);

         return (
          <MenuProvider>
            <View style={styles.container} onLayout = {(event) => this.onLayout(event)} >

              <ImageBackground  source={require('./baseballDiamond1.jpg')} style={styles.image} resizeMode='contain'>

                {this.renderBaserunners()}
               
                <Menu opened={this.state.menuOpen} onSelect={(value) => this.onMenuSelect(value)}>
                  <MenuTrigger customStyles={trigStyles} disabled={true}/>
                  <MenuOptions customStyles={optionStyles}>
                    <MenuOption disabled={true}><Text style={{fontSize: 28, fontWeight: 'bold'}}>{this.runnerNames[this.runnerAtBase[this.state.selectedPosition]]}</Text></MenuOption>
                    {this.renderMenuOptions()}
                  </MenuOptions>
                </Menu>
                <TouchableOpacity style = {styles.resetButton} onPress = {() => this.resetRunners()}> 
                  <Text style ={styles.buttonText}>Reset</Text>
              </TouchableOpacity >
              </ImageBackground>
            </View>
            <View style={{flex: .25}}>
              <GameState />
            </View>

          </MenuProvider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  circleButton: {
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    width: 60,
    height: 60,
    borderWidth: 4,
    borderRadius: 64,
  },
  resetButton: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    width: 100,
    height: 60,
    borderWidth: 4,
    borderRadius: 64,
    left: 463,
    top: 600,
  },
  image: {
      //flex:1,
    width: '100%', 
    height: '100%',
  },
  buttonText: {
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,  
  }
});


const stylesPos = [
  {
    //Home:
    position: 'absolute',
    left: 272,
    top: 530
  },
    {
    //1st:
    position: 'absolute',
    left: 463,
    top: 322,
  },
  {
    //2nd:
    position: 'absolute',
    left: 272,
    top: 137,
  },
  {
    //3rd:
    position: 'absolute',
    left: 272- 190,
    top: 322
  },
  {
    //Run 0:
    position: 'absolute',
    left: 180,
    top: 600
  },
  {
    //Run 1:
    position: 'absolute',
    left: 120,
    top: 600,
  },
  {
    //Run 2:
    position: 'absolute',
    left: 60,
    top: 600,
  },
  {
    //Run 3:
    position: 'absolute',
    left: 0,
    top: 600,
  },
  {
    //Out 1:
    position: 'absolute',
    left: 0,
    top: 540,
  },
  {
    //Out 2:
    position: 'absolute',
    left: 60,
    top: 540,
  },
  {
    //Out 3:
    position: 'absolute',
    left: 120,
    top: 540,
  },
];

const trigStyles = {
  triggerText: {
fontSize: 40,
  },
  triggerOuterWrapper: {
    left:200,
    top:200,
    position: 'absolute'
  }
};

const optionStyles = {
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionText: {
    color: 'black',
    fontSize: 22,
  },
};

