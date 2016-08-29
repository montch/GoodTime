/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import renderIf from 'render-if'
import React, { Component } from 'react';
var Carousel = require('react-native-carousel');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Picker,
  ListView,
  Image,
} from 'react-native'
 


class Project extends Component {
   constructor(){
    super();
    this.state ={
      status:false,
      time_total: 0,
      timer: 1,
      activity: "No activity set"
    }
   }

    setTotalTime(){
      let timer = this.state.timer.value ? this.state.timer.value : this.state.timer
      this.setState({
         time_total:  parseInt(timer) + parseInt(this.state.time_total)
      });
    } 
  
    setTimer(val) {
       this.setState({
         timer: val
      });
    }

    render() {
      return (
        <View>
          <RNCarousel/>
          <View style={styles.container}>
            <TotalTime  time_total={this.state.time_total} />
            <TimePicker timer={this.state.timer} setTotalTime={this.setTotalTime} setTimer={(val)=>this.setTimer(val)}/>
            <AddButton time_total={this.state.time_total} setTotalTime={()=>this.setTotalTime()} />
          </View>
       </View>
      )
    }
}



class RNCarousel extends Component {
  constructor(){
    super();
  }  
  
  render() {
    return (
      <Carousel width={375} animate={false} onPageChange={()=>{console.log('page changed')}} >
        <CarouselImage text="One" /> 
        <CarouselImage text="Two" /> 
        <CarouselImage text="Three" /> 
      </Carousel>
    )
  }
} 

class CarouselImage extends Component {
  constructor(){
    super();
  }  
  
  getCorrectImage(txt) {
    switch (txt) {
      case 'One': return require('./images/1.png');
      case 'Two': return require('./images/2.png');
      case 'Three': return require('./images/3.png'); 
    }
  }
  
  render() {
     return (
      <View style={styles.car}>
        <Image style={styles.car_img} source={ this.getCorrectImage(this.props.text)} />
        <Text>{this.props.text}</Text>
      </View>
      )
  }
}



class TotalTime extends Component {
 constructor(){
    super();
 }  
  render() {
    return (
      <Text style={styles.total_time} >    {this.props.time_total}  </Text>
    )
  }
}


class AddButton extends Component {
  constructor(){
    super();
  }  

 setNativeProps(nativeProps) {
  this._root.setNativeProps(nativeProps);
 }

 addTime(){
  this.props.setTotalTime()
 }

 render() {
   return (
     <View ref={component => this._root = component} {...this.props} >
       <TouchableHighlight onPress={()=>this.addTime()}>
          <Text> Add Time </Text>
        </TouchableHighlight>
     </View>
   )
 }
}


class TimePicker extends Component {
 constructor(){
  super();
    this.state ={
     timer: 1
    }
 }  
  render() {
    return (
      <Picker 
        style={styles.picker}
        selectedValue= { this.state.timer }
        onValueChange={(value) => {
          this.setState({timer: value});
          this.props.setTimer({value});
        }}>
         <Picker.Item label={'1'} value={'1'} />
         <Picker.Item label={'2'} value={'2'} />
         <Picker.Item label={'3'} value={'3'} />
         <Picker.Item label={'5'} value={'5'} />
         <Picker.Item label={'8'} value={'8'} />
         <Picker.Item label={'13'} value={'13'} />
         <Picker.Item label={'21'} value={'21'} />
         <Picker.Item label={'34'} value={'34'} />
         <Picker.Item label={'55'} value={'55'} />
      </Picker>
    )
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   car: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
  },
  car_img: {
    width: 200,
    height: 200
  },
  text_display: {
    height: 30, 
    marginTop: 10,
  },
  total_time: {
    fontSize: 60,
    textAlign: 'center',
    margin: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text_input: {
    height: 30, 
    width: 200,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)"
  },
  picker: {
      width: 100,
  }
});

AppRegistry.registerComponent('Project', () => Project);
