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

import {vh, vw} from '../utility/dimensions';
import Colors from '../utility/colors';
import LocalImages from '../utility/localImages';
import {Auth, database} from '../Setup';
import Snackbar from 'react-native-snackbar';

var _today = moment().format('YYYY-MM-DD');

export default class CalendarScreen extends React.Component {
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



  onDaySelect = day => {
    const _selectedDay = moment(day.dateString).format('YYYY-MM-DD');
    this.setState({
      selectedDay: _selectedDay,
      modalVisible: true,
    });
  };

  AddItemsToArray = () => {

    this.state.SampleArray.push(this.state.selectedDay);
    database().ref(`users/${Auth().currentUser.uid}/blockdates`)
      .push({
        selectedDay: this.state.selectedDay,
      })
      .then(() => {
        Snackbar.show({
          text: 'Blocked Successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(err => {
        console.log(err);
      });

    //console.log('Kapil', this.state.SampleArray);
  };

  saveDay = () => {
    let selected = true;
    
    const {_markedDates, selectedDay} = this.state;

    if (_markedDates[selectedDay]) {
      selected = !_markedDates[selectedDay].selected;
    }

    this.setState({
      modalVisible: false,
      _markedDates,
    });
  };

  componentDidMount() {
    const mydata = database().ref('users/' + Auth().currentUser.uid).child('/blockdates')
    mydata.on('value', snapshot => {
      let data = snapshot.val();
if(data){
  let items = Object.values(data);
  this.setState({dataSource:items})
}
else{
  return null
}
      });
  
  }


  

  // deletedate = (key)=> {
  //   console.log("getkey===>",key)
  //   database()
  //     .ref('blockdates/'+key)

  //     .remove()
  //     .then(() => {
  //       Snackbar.show({
  //         text: 'deleted Successfully',
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // componentDidMount() {
  //   const mydata = database().ref('users/' + Auth().currentUser.uid);
  //   mydata.once('value', dataSnap => {
  //     this.setState({dataSource: Object.values(dataSnap.val().meetups)});
  //     //console.log(this.state.dataSource);
  //   });
  // }

  render() {
    const arrayOfDates = this.state.dataSource.map(item => item);
   
    var customMarkedDates = {};
    arrayOfDates.map(day => {
      customMarkedDates[day.selectedDay] = {
        selected: true,
        marked: true,
        selectedColor: 'red',
      };
    });
    
    return (
      <View style={styles.container}>
        <Calendar
          // markedDates={this.state._markedDates}
          markedDates={customMarkedDates}
          markingType={'multi-dot'}
          onDayPress={this.onDaySelect}
          disabledDates={this.state.mydates}
          style={styles.calendar}
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 10, top: 10}}
                  onPress={() => {
                    this.setState({modalVisible: !this.state.modalVisible});
                  }}>
                  <Image style={styles.closeStyle} source={LocalImages.CLOSE} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{position: 'absolute', right: 10, top: 10}}
                  onPress={() => {
                    this.setState({modalVisible: !this.state.modalVisible});
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    this.saveDay();
                    this.AddItemsToArray();
                  }}
                  style={[
                    styles.ButtonStyle,
                    {
                      backgroundColor: '#ddd',
                      borderColor: 'tranparent',
                      borderWidth: 0,
                      marginBottom: 10,
                    },
                  ]}>
                  <Text style={{fontSize: 15, padding: 10}}>
                    {this.state.selectedDay ? 'Block' : null}
                  </Text>
                </TouchableOpacity>
          
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

// import React,{useState,useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Button,
//   ActivityIndicator,
//   Modal,
//   ClippingRectangle,
// } from 'react-native';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import moment from 'moment';

// import {vh, vw} from '../utility/dimensions';
// import Colors from '../utility/colors';
// import LocalImages from '../utility/localImages';
// import {Auth, database} from '../Setup';

// export default function CalendarScreen({navigation}) {

//  const [_markedDates,setMarkedDates] = useState(moment(new Date().dateString).format('YYYY-MM-DD'))
//   const [visible,setVisible] = useState(false);
//   const [modalVisible,setModalVisible] = useState(false);
//   const [selectedDay,setSelectedDay] = useState([]);
//   const [dataSource,setDataSource] = useState(false);
//   const [mydates,setMydates] = useState('');
//   var [customMarkedDates,setcustomMarkedDates]= useState({})

//  const onNavigate = () => {

//         setModalVisible(false,()=>navigation.replace('CreateMeetUp'))
//       };
//    const    onNavigateGroup = () => {
//         setModalVisible(false,()=>navigation.replace('Group'))

//       }

//     const   onDaySelect = day => {
//             const _selectedDay = moment(day.dateString).format('YYYY-MM-DD');

//             setSelectedDay(_selectedDay)
//             setModalVisible(true)
//             console.log(selectedDay);
//           }

//   const saveDay = async () => {
//     const dots = [];
//     let selected = true;

//     if (_markedDates[selectedDay]) {
//       selected = !_markedDates[selectedDay].selected;
//       //  alert("Unblock date")
//     }

//     const clone = {..._markedDates};

//     clone[selectedDay] = {dots, selected, selectedColor: 'red'};

//     setModalVisible(false)
//     setMarkedDates(clone)
//   };

// useEffect(() => {

//    const mydata =database().ref('users/' + Auth().currentUser.uid)
//     mydata.once('value',dataSnap =>{

//       setDataSource(Object.values(dataSnap.val().meetups))
//       //console.log(dataSource);
//       const arrayOfDates= dataSource.map(item=>item.choseStartDate)
//       console.log("aryyya====>",arrayOfDates)
//        arrayOfDates.map((day)=>{
//          customMarkedDates[day] ={ selected: true, marked: true, selectedColor: 'green'}
//       })

//     })

// }, [])

//   return (

//     <View style={styles.container}>
//             <Calendar

//              markedDates={customMarkedDates}
//               markingType={'multi-dot'}
//               onDayPress={onDaySelect}
//               disabledDates={mydates}
//               style={styles.calendar}
//             />

//             <View style={styles.centeredView}>
//               <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                   Alert.alert('Modal has been closed.');
//                 }}>
//                 <View style={styles.centeredView}>
//                   <View style={styles.modalView}>
//                     <TouchableOpacity
//                       style={{position: 'absolute', right: 10, top: 10}}
//                       onPress={() => setModalVisible(!modalVisible)}>
//                       <Image style={styles.closeStyle} source={LocalImages.CLOSE} />
//                     </TouchableOpacity>

//                     <View
//                       style={{
//                         padding: 30,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <TouchableOpacity
//                         onPress={onNavigate}
//                         style={styles.ButtonStyle}>
//                         <Image
//                           source={LocalImages.BAG}
//                           style={{
//                             width: 16,
//                             height: 16,
//                             resizeMode: 'contain',
//                             tintColor: 'white',
//                           }}
//                         />
//                         <Text style={{fontSize: 15, color: 'white'}}>
//                           Create Meet Up
//                         </Text>
//                       </TouchableOpacity>

//                       <TouchableOpacity
//                         onPress={onNavigateGroup}
//                         style={styles.ButtonStyle}>
//                         <Image
//                           source={LocalImages.FRIEND}
//                           style={{
//                             width: 16,
//                             height: 16,
//                             resizeMode: 'contain',
//                             tintColor: 'white',
//                           }}
//                         />
//                         <Text style={{fontSize: 15, color: Colors.white}}>
//                           Create Group
//                         </Text>
//                       </TouchableOpacity>

//                       <TouchableOpacity
//                         onPress={saveDay}
//                         style={[
//                           styles.ButtonStyle,
//                           {
//                             backgroundColor: Colors.white,
//                             borderColor: Colors.black,
//                             borderWidth: 0.5,
//                             marginBottom: 10,
//                           },
//                         ]}>
//                         <Image
//                           source={LocalImages.BLOCK}
//                           style={{
//                             width: 16,
//                             height: 16,
//                             resizeMode: 'contain',
//                             tintColor: Colors.lightBlue,
//                           }}
//                         />

//                         <Text style={{fontSize: 15}}>
//                           {selectedDay ? 'Block' : 'unblock'}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </Modal>
//             </View>
//           </View>
//   )
// }

const styles = StyleSheet.create({
  calendar: {
    margin: 2,
    height: vh(440),
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  container: {
    flex: 1,
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
