/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import renderIf from 'render-if'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Picker,
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
      // View
        // TotalTime
        //ActivityToggle
        //TimePicker
        //AddButton
    return (
      <View>
        <TimePicker timer={this.state.timer} setTotalTime={this.setTotalTime} setTimer={(val)=>this.setTimer(val)}/>
        <AddButton time_total={this.state.time_total} setTotalTime={()=>this.setTotalTime()} />
        <TotalTime  time_total={this.state.time_total} />
        <ActivityToggle activity={this.state.activity}  status={this.state.status} setTotalTime={this.setTotalTime} />
     
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
        <Text >    {this.props.time_total}  </Text>
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
            <Text> Add </Text>
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
      ) }
  }
  
  class ActivityToggle extends Component {
   constructor(){
    super();
      this.state ={
       status: false, //this.props.status,
       activity: 'No activity selected' //this.props.activity
      }
  }   
    
    
  toggleStatus(){
    this.setState({
      status:!this.state.status
    });
  }
  
 
    
    render() {
    return (
    
     <View style={styles.container}>
       {renderIf(this.state.status)(
        <View style={styles.container}>
          <TextInput
            style={styles.text_input}
            placeholder={ this.state.activity }
            placeholderTextColor={"rgba(198,198,204,1)"}
            onChangeText={(activity) => { this.setState({activity:  activity} ) }}
            onFocus={() => { this.setState({activity: ''})} }
            onSubmitEditing={() => {this.setState({activity: ''})}}
            value={(this.state && this.state.activity) || ''}
  
          />
          <TouchableHighlight onPress={()=>this.toggleStatus()}>
            <Text> Set </Text>
          </TouchableHighlight>
        </View>
       )}
        {renderIf(!this.state.status)(
          <TouchableHighlight onPress={()=>this.toggleStatus()}>
            <Text> { this.state.activity } </Text>
          </TouchableHighlight>
        )}
      </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text_input: {
    height: 30, 
    width: 100,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)"
  },
  picker: {
      width: 100,
  }
});

AppRegistry.registerComponent('Project', () => Project);
