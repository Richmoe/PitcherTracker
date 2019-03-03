import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Picker} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default class RosterView extends Component {

//Props should be "roster"
  constructor(props){
      console.log("Construct RosterView");

      super(props);
      this.state= {
          selectedIndex: 0, 
          roster: this.props.navigation.getParam("roster", []),
          formatRow: this.props.navigation.getParam("formatRow", [80,10,10]),
          extraData: this.props.navigation.getParam("extraData", [
            {hits: 1, pitches: 1}, 
            {hits: 2, pitches: 2},       
            {hits: 3, pitches: 3},     
            {hits: 4, pitches: 4},     
            {hits: 5, pitches: 5},     
            {hits: 6, pitches: 6},     
            {hits: 7, pitches: 7},     
            {hits: 8, pitches: 8},     
            {hits: 9, pitches: 9},     
            {hits: 10, pitches: 10},     
            {hits: 11, pitches: 11},     
            {hits: 12, pitches: 12},     
          ]),
          callBack: this.props.navigation.getParam("callBack", null)
      };

      console.log("roster passed in param is " + this.props.navigation.getParam("roster", []));

  }

    selectedPlayer  (ix){
      console.log("At OnPress with " + ix);
      if (this.state.callBack) {
        this.state.callBack(ix);
        this.props.navigation.goBack();

      } else {
          console.log("No callback");
      }

  }


    makeRow = ix => {
        var maxKeys = Object.keys(this.state.extraData[0]).length;
        console.log("MaxKeys: " + maxKeys);
        var tempRow = [];

        //Add Name
        //console.log("this.state.callBack: " + this.state.callBack);
        if (this.state.callBack != null) {
            tempRow = [...tempRow, 
                <Col key={0} size={this.state.formatRow[0]}>
                    <TouchableOpacity onPress={() => this.selectedPlayer(ix)}>
                        <Text style={styles.rowText}>{this.state.roster[ix].name}</Text>
                    </TouchableOpacity>
                </Col>];
        } else {
            tempRow = [...tempRow, 
                <Col key={0} size={this.state.formatRow[0]}>
                   <Text style={styles.rowText}>{this.state.roster[ix].name}</Text>
                </Col>];            
        }


        for (var i = 0; i < maxKeys; i++)
        {
            var key = Object.keys(this.state.extraData[0])[i];
            tempRow = [...tempRow, <Col key={i+1} size={this.state.formatRow[i+1]}><Text style={styles.rowText}>{this.state.extraData[ix][key]}</Text></Col>];
        }
        return tempRow;
    };

    makeHeader = () => {
        var maxKeys = Object.keys(this.state.extraData[0]).length;

        var tempRow = [];

        //Add Name
        tempRow = [<Col key={0} size={this.state.formatRow[0]}><Text style={styles.headerText}>Name</Text></Col>];

        for (var i = 0; i < maxKeys; i++)
        {
            var key = Object.keys(this.state.extraData[0])[i];

            tempRow = [...tempRow, <Col key={i+1} size={this.state.formatRow[i+1]}><Text style={styles.headerText}>{key}</Text></Col>];
        }

        return tempRow;
    };

     
  render() {

    //Create rows:
    var fullRows = this.state.roster.map( (item,ix) => <Row key={ix}>{this.makeRow(ix)}</Row>);
        
    return (
        <Grid>
            <Row key={99}>{this.makeHeader()}</Row>
            {fullRows}
       </Grid>
    );
    
  }
}


const styles = StyleSheet.create({
    rowText: {
        fontSize: 32,
        textAlign: 'left',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        borderColor: 'black',
        borderBottomWidth: 2
        
    }


});


/*


/*

            {this.state.roster.map( (item,ix) => <Row key={ix}><Text>{item.name} </Text></Row>)}
 

{this.state.roster.forEach( (ix) => {
    return (<Row><Text>{ix.name}</Text></Row>)
})}

{this.data.map((item,ix) => {
    return (<Row><Text>{item}</Text></Row>)
  })}

  var testIndexing = ix => {
        var maxKeys = Object.keys(this.state.extraData[0]).length;

        var tempRow = [];
        
        //Add Name
        tempRow = [...tempRow, <Col width={this.formatRow[0]}><Text>{this.state.roster[ix].name}</Text></Col>];

        for (var i = 0; i < maxKeys; i++)
        {
            var key = Object.keys(this.state.extraData[0])[i];

            console.log(key + ", " + this.state.extraData[ix][key]);
            tempRow = [...tempRow, <Col width={this.formatRow[i+1]}><Text>{this.state.extraData[ix][key]}</Text></Col>];
        }

        console.log("Temprow: " + tempRow);
        return tempRow;
    };

    //Create rows:
    var fullRows = this.state.roster.map( (item,ix) => <Row key={ix}>{testIndexing(ix)}</Row>);
    fullRows2 = [];
    for (var i = 0; i < this.state.roster.length; i++)
    {
        fullRows2.push(<Row key={i}><Col size={2}><Text>{this.state.roster[i].name} </Text></Col></Row>)
    }

    testIndexing(5);
    console.log("Num of keys: " + Object.keys(this.state.roster[0]).length);
    console.log("MakeRow: " + makeRow(1));
    console.log(fullRows2);
    for (var prop in this.state.extraData[0])
    {
        console.log(prop, this.state.extraData[0][prop]);
    };
    */