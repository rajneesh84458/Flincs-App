import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,TouchableWithoutFeedback
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';
import { database } from '../../Setup';
const {width, height} = Dimensions.get('window');

export default class MeetupReceiveScreen extends React.Component {
  state = {
    dataSource: [],
   
  };

  componentDidMount() {
    
  
      const mydata = database().ref('meetups/');
      mydata.on('value', datasnap => {
        if(datasnap.val()){
          this.setState({dataSource: Object.values(datasnap.val())});
        }
       
     
      });}




  render() {
  

    return (
      <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
        <ScrollView contentContainerStyle ={ styles.container  }>
           
        
          {this.state.dataSource.map(item => {
            return (
              
                <View
                style={{
                  width: '90%',
                  margin: 10,
                  backgroundColor: '#ffff',

                  borderRadius: 10,
                  padding: 5,
                  shadowColor: '#ccc',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 5,
                  shadowOpacity: 0.2,
                }}>
                
               
                <View style={{flex:1,padding:10}}>
                    {/* <TouchableWithoutFeedback onPress={()=>this.deleteUser(item)}>
                    <Text style={{color: 'red',fontWeight:'bold',textAlign:'right'}}></Text>
                  </TouchableWithoutFeedback> */}
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.text}>{item.num}</Text>
                
                  <Text style={styles.text}>{new Date(item.choseStartDate).toDateString()}</Text>
                  <Text style={[styles.text,{fontSize:12,}]}>{item.description}</Text>
                    </View>

                    <View  style ={{flex:1,justifyContent:'space-around',paddingHorizontal:10,alignItems:'flex-end',}}>
                    {/* <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('Chat With friends')
                    }>
                    <Text style={{color: 'green',marginVertical:10,fontWeight:'bold'}}>Confirm</Text>
                  </TouchableWithoutFeedback> */}
                 
             
                
                  
                </View>
              </View>
             
            );
          })}
          
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
 
    alignItems:'center',
    justifyContent:'center',
    
  },
  textStyle: {
    
    fontWeight:'bold',
    letterSpacing:0.2
  },
  text:{
    marginBottom:5,
    fontSize:15,
    left:1

  }
  
})
