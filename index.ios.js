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
 
const actvities = ["Minecraft", "Dragon City", "Viva Pinata", "Xbox", "Netflix"]


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
        <View style={styles.master}>
          <RNCarousel/>
          <View style={styles.container}>
            <TotalTime  time_total={this.state.time_total} />
            <TimePicker style={styles.bottom} timer={this.state.timer} setTotalTime={this.setTotalTime} setTimer={(val)=>this.setTimer(val)}/>
            <AddButton style={styles.bottom}  time_total={this.state.time_total} setTotalTime={()=>this.setTotalTime()} />
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
        <CarouselImage text={actvities[0]} /> 
        <CarouselImage text={actvities[1]} /> 
        <CarouselImage text={actvities[2]} /> 
        <CarouselImage text={actvities[3]} /> 
        <CarouselImage text={actvities[4]} /> 
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
      case actvities[0]: return require('./images/1.png');
      case actvities[1]: return require('./images/2.png');
      case actvities[2]: return require('./images/3.png');
      case actvities[3]: return require('./images/4.png'); 
      case actvities[4]: return require('./images/5.png'); 
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
       <TouchableHighlight 
         style={styles.addButton}
         onPress={()=>this.addTime()}>
          <Text style={styles.bigPlus}>+</Text>
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
  master: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottom: {
    marginTop: 20
  },
   car: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    marginBottom: 30,
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
  },
  bigPlus: {
    fontSize: 30
  },
  addButton: {
    backgroundColor: '#00cc00',
    borderColor: '#00cc00',
    borderWidth: 1,
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 95,
    right:-150,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

AppRegistry.registerComponent('Project', () => Project);
