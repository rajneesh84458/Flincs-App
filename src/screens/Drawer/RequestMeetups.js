

// import React from 'react'
// import { View, Text } from 'react-native'

// export default function RequestMeetups() {
//     return (
//         <View>
//             <Text>RequestMeetups</Text>
//         </View>
//     )
// }



import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
  Modal,
  ClippingRectangle,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';


import LocalImages from '../../utility/localImages';
import {Auth, database} from '../../Setup';
import { vh, vw } from '../../utility/dimensions';
import Colors from '../../utility/colors';
import LinearGradient from 'react-native-linear-gradient';


const _format = 'YYYY-MM-DD';
const _today = moment(new Date().dateString).format(_format);

export default class RequestMeetups extends React.Component {
  initialState = {
    [_today]: {disabled: false},
  };

  state = {
    _markedDates: this.initialState,
    visible: false,
    modalVisible: false,
    selectedDay: null,
    loading: true,
    mydates: [],
    dataSource:[],
    SampleArray: [],
  };




  componentDidMount() {
    const mydata = database().ref('users/' + Auth().currentUser.uid).child('/meetups')
    mydata.on('value', snapshot => {
      let data = snapshot.val();
            if(data){
            let items = Object.values(data);
            this.setState({dataSource:items})
            //console.log("shdfhkshf",this.state.dataSource)
            }
            else{
            return null
            }
                });
  
  }


  


  render() {
    const arrayOfDates = this.state.dataSource.map(item => item);
   
    var customMarkedDates = {};
    arrayOfDates.map(day => {
      customMarkedDates[day.choseStartDate] = {
        selected: true,
        marked: true,
        selectedColor: '#41b6e6',
      };
    });
    
    return (
        <LinearGradient colors={['#3399FF', '#4834DF']} style={{flex: 1}}>
      <View style={styles.container}>
        
        <Calendar
          markedDates={customMarkedDates}
          markingType={'multi-dot'}
          onDayPress={()=>this.props.navigation.navigate('Meetup')}
          disabledDates={this.state.mydates}
          style={styles.calendar}
        />

        
      </View>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
    calendar: {
      
      borderRadius:10
    },
    text: {
      textAlign: 'center',
      padding: 10,
      backgroundColor: 'lightgrey',
      fontSize: 16,
    },
    container: {
      flex: 1,
      padding:10,
   
    },
    headerStyle: {
      flexDirection: 'row',
      width: vw(320),
      height: vh(70),
      backgroundColor: Colors.lightBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    closeStyle: {
      width: vw(14),
      height: vh(14),
      resizeMode: 'contain',
      tintColor: 'white',
      // fontWeight:'bold'
    },
  
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
    },
    modalView: {
      width: 300,
      height: 150,
      marginTop: 40,
      backgroundColor: 'white',
      borderRadius: 10,
  
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  
    closeStyle: {
      width: vw(18),
      height: vh(18),
      resizeMode: 'contain',
      tintColor: 'red',
      alignItems: 'flex-end',
    },
  
    ButtonStyle: {
      flexDirection: 'row',
      width: vw(180),
      height: vh(40),
      backgroundColor: Colors.lightBlue,
      justifyContent: 'space-evenly',
      alignItems: 'center',
  
      marginBottom: 15,
      borderRadius: 8,
    },
  });
  