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
      time_total: 100,
      timer: 1,
      activity: "No activity set"
    }
   }

  
  
    onUpdate(val){
      console.log('in onUpdate');
      console.log(val);
      this.setState({
          time_total: val
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
        <TimePicker timer={this.state.timer} onUpdate={this.onUpdate} />
        <AddButton time_total={this.state.time_total} onUpdate={(val)=>this.onUpdate(val)} />
        <TotalTime txt_up={this.txt_up} time_total={this.state.time_total} />
        <ActivityToggle activity={this.state.activity}  status={this.state.status} onUpdate={this.onUpdate} />
     
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
        <Text >    WOOP {this.props.time_total}  </Text>
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
      console.log('addin time'); 
      console.log(this.props.time_total);
      this.props.onUpdate(6969)
      
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
       timer: 99 
      }
   }  
    render() {
    return (
      <Picker 
        style={{
          width: 100,
        }}
        selectedValue= { this.state.timer }
        onValueChange={(value) => {
          this.setState({timer: value});
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
       activity: 'wut' //this.props.activity
      }
  }   
    
    
  toggleStatus(){
    this.setState({
      status:!this.state.status
    });
     console.log('toggle button handler: '+ this.state.status);
  }
  
    
    render() {
    return (
    
     <View style={styles.container}>
       {renderIf(this.state.status)(
        <View style={styles.container}>
          <TextInput
            style={{
              height: 30, 
              width: 100,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.5)",
            }}
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
});

AppRegistry.registerComponent('Project', () => Project);
