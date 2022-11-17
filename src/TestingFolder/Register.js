// import AsyncStorage from '@react-native-community/async-storage'
// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
// import { firebase } from '../Setup'

// export default class LoginScreen extends Component {
//     state={
//         name:"",
//         password:'',
//         conPassword:''
//     }

//     onRegister=async ()=>{
//     firebase.database().ref('users')
//         .push({
//            name:this.state.name,
//            password:this.state.password
//         })
//         //  const my =  await AsyncStorage.setItem('token',mydata.key)
//         //     console.log("Register token",my)
      
//         this.props.navigation.navigate('home',)
//     }


//     render() {
//         return (
//             <View style={{flex:1,justifyContent: 'center',alignItems:'center',backgroundColor:'#fff'}}>
//                 <TextInput
//                   placeholder ="Name"
//                    value={this.state.name}
//                    onChangeText={(text)=>this.setState({name:text})}
//                    style={{width:300,height:50,backgroundColor:'#ddd',paddingHorizontal:10}}
//                 />
//                 <TextInput
//                   placeholder ="Password"
//                    value={this.state.password}
//                    onChangeText={(text)=>this.setState({password:text})}
//                    style={{width:300,height:50,backgroundColor:'#ddd',marginVertical:10,paddingHorizontal:10}}
//                 />
//                 <TextInput
//                   placeholder ="Confirm Password"
//                    value={this.state.password}
//                    onChangeText={(text)=>this.setState({conPassword:text})}
//                    style={{width:300,height:50,backgroundColor:'#ddd',marginVertical:10,paddingHorizontal:10}}
//                 />
//                 <Text onPress ={this.onRegister}> Register </Text>
//             </View>
//         )
//     }
// }


















// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Modal,
//   TouchableWithoutFeedback,
//   FlatList,
//   PermissionsAndroid,UIManager,LayoutAnimation, KeyboardAvoidingView
// } from 'react-native';
// import Contacts from 'react-native-contacts';

// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment, {relativeTimeRounding} from 'moment';
// import LocalImages from '../../utility/localImages';
// import {vw, vh} from '../../utility/dimensions';
// import Colors from '../../utility/colors';
// import RadioForm from 'react-native-simple-radio-button';

// import LinearGradient from 'react-native-linear-gradient';

// import {LogOutUser} from '../../network';
// import {clearAsyncStorage} from '../../asyncStorage';
// import {submitUser} from '../../ApiServices';
// import SendSMS from 'react-native-sms';
// import { database } from '../../Setup';

// const getAvatarInitials = textString => {
//   if (!textString) return '';
//   const text = textString.trim();
//   const textSplit = text.split(' ');
//   if (textSplit.length <= 1) return text.charAt(0);
//   const initials =
//     textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
//   return initials;
// };

// export default class MeetupScreen extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       // data: [{label: 'Pick Time', value: 0}, {label: 'Whole Day', value: 1}],
//       Id: null,
//       title: '',
//       modalVisible: false,
//       isDateVisible: false,
//       isTimeVisible: false,
//       choseStartDate: '',
//       contactModal: false,
//       contacts: null,
//       contactName: '',
//       description: '',
//       num: '',
//       fakeContact: [],
//       SelectedFakeContactList: [],
//       dataSource: [],
//       users:[]
     
//     };
//   }

//   // Contact Modal
//   setcontactModal = visible => {
//     this.setState({contactModal: visible});
//   };

//   // Lifecycle of Contacts

//   async componentDidMount() {
//      this.checkData()
//     if (Platform.OS === 'android') {
//       try {
//         const andoidContactPermission = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//           {
//             title: 'Contacts',
//             message: ' This app would like to see your contacts',
//           },
//         );
//         if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
//           Contacts.getAll((err, contacts) => {
//             this.setState({fakeContact: contacts});
//             contacts.sort(
//               (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
//             );
//             //console.log('rajneesh contact else', this.state.contacts);
//           });
//         } else {
//           console.log('Contacts permission denied');
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     } else if (Platform.OS === 'ios') {
//       this.getList();
//     }
//   }

//   getList = () => {
//     Contacts.getAll((err, contacts) => {
//       if (err === 'denied') {
//         console.log('cannot access');
//       } else {
//         contacts.sort(
//           (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
//         );
//         this.setState({fakeContact: contacts});
//         //console.log('rajneesh contact', this.state.contacts);
//       }
//     });
//   };

//   // date picker
//   handleDatePicker = date => {
//     this.setState({
//       isDateVisible: false,
//       choseStartDate: moment(date).format('MMM D Y'),
//     });
//   };

//   hideDatePicker = () => {
//     this.setState({
//       isDateVisible: false,
//     });
//   };

//   showDatePicker = () => {
//     this.setState({
//       isDateVisible: true,
//     });
//   };

//   //time Picker
//   handleTimePicker = time => {
//     this.setState({
//       isTimeVisible: false,
//       chosetime: moment(time).format('h: mm a'),
//     });
//   };

//   hideTimePicker = () => {
//     this.setState({
//       isTimeVisible: false,
//     });
//   };

//   showTimePicker = () => {
//     this.setState({
//       isTimeVisible: true,
//     });
//   };
//   // clear the text through functions

//   clearTitle = e => {
//     if (e === this.state.title) {
//     }

//     this.setState({title: ''});
//   };

//   handleBackPress() {
//     Alert.alert(
//       'Meetup',
//       'Are you sure want to cancel your meet-up ?',
//       [
//         {
//           text: 'Yes',
//           onPress: () => this.handleCancel(),

//           style: 'cancel',
//         },
//         {text: 'No'},
//       ],
//       // {cancelable: false},
//     );
//   }
//   // logout function
//   handleCancel() {
//     this.props.navigation.navigate('Dashboard');
//   }

//   logout = () => {
//     LogOutUser()
//       .then(() => {
//         clearAsyncStorage()
//           .then(() => {
//             this.props.navigation.replace('Login');
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => alert(err));
//   };

//   // save data into the firebase databse

//   saveData() {
//     const {
//       Id,
//       title,
//       choseStartDate,
//       chosetime,
//       contactName,
//       description,
//     } = this.state;
//     if (
//       !this.state.title ||
//       !this.state.choseStartDate ||
//       !this.state.chosetime
//     ) {
//       alert('please filled details');
//       return false;
//     } else {
//       this.setState({
//         modalVisible: true,
//       });
//       setTimeout(() => {
//         this.setState({
//           modalVisible: false,
//         });
//       }, 2000);

//       submitUser(Id, title, choseStartDate, chosetime, contactName, description)
//         .then(result => {
//           this.props.navigation.navigate('Meetup');
//           this.setState({
//             Id: null,
//             title: '',
//             choseStartDate: '',
//             chosetime: '',
//             contactName: '',
//             description: '',
//             num: '',
//             expanded: false,
//           });
//         })
//         .catch(err => console.log(err));
//     }
//   }

//   press = hey => {
//     this.state.fakeContact.map(item => {
//       if (item.recordID === hey.recordID) {
//         item.check = !item.check;
//         if (item.check === true) {
//           this.state.SelectedFakeContactList.push(item);
//           console.log('selected:' + item.givenName);
//         } else if (item.check === false) {
//           const i = this.state.SelectedFakeContactList.indexOf(item);
//           if (1 != -1) {
//             this.state.SelectedFakeContactList.splice(i, 1);
//             console.log('unselect:' + item.givenName);
//             return this.state.SelectedFakeContactList;
//           }
//         }
//       }
//     });
//     this.setState({fakeContact: this.state.fakeContact});
//   };

//   _showSelectedContact() {
//     return this.state.SelectedFakeContactList.length;
//   }


//   changeLayout = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
//     this.setState({expanded: !this.state.expanded});
//   };


//    initiateSMS = item => {
//     SendSMS.send(
//       {
//         // Message body
//         body: `Hey ${item.givenName} ${
//           item.familyName
//         } would like you to join flincs! http://flincsapplication.com`,
//         // Recipients Number
//         recipients: [item.phoneNumbers[0].number],
//         // An array of types
//         // "completed" response when using android
//         successTypes: ['sent', 'queued'],
//       },
//       (completed, cancelled, error) => {
//         if (completed) {
//           console.log('SMS Sent Completed');
//         } else if (cancelled) {
//           console.log('SMS Sent Cancelled');
//         } else if (error) {
//           console.log('Some error occured');
//         }
//       },
//     );
//   };
//    showAlert = item => {
//     this.initiateSMS(item);
//     console.log('mytitme', item);
//   }



//   checkData = async () => {
//     const mydata = await database().ref('users');

//     mydata.on('value', datasnap => {
//       if (datasnap.val()) {
//         this.setState({users: Object.values(datasnap.val())});
//       }
//     });
//   };

//   getValue = (item)=>{
//      this.setState({contactName:item.name,})
//      this.setState({
//       modalVisible: true,
//     });
//     alert(this.state.contactName)
//   }
//   renderList = item => {
//     return (
//       <TouchableOpacity onPress ={()=>this.getValue(item)}
//        style={{flex:1,backgroundColor:'#96ceb4',padding:10,marginBottom:5,marginTop:10}}>
//         <Text>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   };
//   render() {
//     const {choseStartDate, contactModal, chosetime, contactName} = this.state;

//     return (
//       <LinearGradient colors={['#3399FF', '#4834DF']} style={{flex: 1}}>
//        <KeyboardAvoidingView  
//          behavior={Platform.OS == "ios" ? "padding" : 0} 
//          style={styles.container}>
//         <View
//           style={{
//              height:70,
//             flexDirection: 'row',
          
//             paddingTop: 35,
//             paddingHorizontal: 5,
//           }}>
//           <TouchableOpacity onPress={() => this.handleBackPress()}>
//             <Image
//               source={LocalImages.BACKARROW}
//               style={{
//                 width: 20,
//                 height: 20,
//                 resizeMode: 'contain',
//                 tintColor: 'black',
//                 fontWeight: 'bold',
//                 marginLeft: 10,
//                 marginTop:13
//               }}
//             />
//           </TouchableOpacity>

//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 20,
//               paddingHorizontal: 20,
//               fontWeight: 'bold',
//               paddingTop:10
//             }}>
//             Create Meetup
//           </Text>
//         </View>

//         <ScrollView
//           style={{
//             flex: 1,
//             backgroundColor: Colors.white,
//             margin: 8,
//           }}>
//           <View style={styles.rowStyle}>
//             <Image
//               source={LocalImages.BOOK}
//               style={{
//                 width: 20,
//                 height: 20,
//                 resizeMode: 'cover',
//                 tintColor: '#3399FF',
//               }}
//             />
//             <TextInput
//               maxLength={30}
//               placeholder="Add Title"
//               placeholderTextColor="#000"
//               style={{fontSize: 15, width: vw(200), height: 50}}
//               underlineColorAndroid={'transparent'}
//               value={this.state.title}
//               onChangeText={title => this.setState({title})}
//               keyboardType="default"
//             />
//             <TouchableOpacity onPress={this.clearTitle}>
//               <Image
//                 source={LocalImages.CLOSE}
//                 style={{
//                   width: 15,
//                   height: 15,
//                   resizeMode: 'contain',
//                   tintColor: '#3399FF',
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{flex: 0.2}}>
//             <View
//               style={{
//                 marginHorizontal: 10,
//                 borderBottomColor: 'grey',
//                 borderBottomWidth: 0.4,
//               }}>
//               <TouchableOpacity
//                 onPress={() => this.setcontactModal(true)}
//                 style={{
//                   padding: 20,

//                   flexDirection: 'row',
//                 }}>
//                 <Image
//                   source={LocalImages.PROFILE}
//                   style={{
//                     width: 20,
//                     height: 20,
//                     resizeMode: 'contain',
//                     tintColor: '#3399FF',
//                   }}
//                 />
//                 <Text
//                   style={{
//                     color: Colors.black,
//                     fontSize: 16,
//                     paddingHorizontal: 25,
//                   }}>
//                   {contactName ? contactName : 'Tap on Contacts'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <Modal
//               animationType="slide"
//               transparent={false}
//               visible={contactModal}
//               onRequestClose={() => {
//                 this.setcontactModal(false);
//               }}>
            
//               <View style={styles.centeredViewContact}>
//                 <View style={styles.modalViewContact}>
//                   <Text
//                     onPress={() => {
//                       this.setcontactModal(false);
//                     }}
//                     style={{
//                       flex: 0.1,
//                       textAlign: 'right',
//                       fontSize: 20,
//                       color: 'red',
//                       fontWeight: 'bold',
//                     }}>
//                     X
//                   </Text>
//                   <Text style={{fontSize: 30, fontWeight: '700'}}>
//                     People on Flincs ....
//                   </Text>
//                   <View style={{flex: 0.7, marginBottom: 10,marginVertical:10}}>
//                   <FlatList
//                           data={this.state.users}
//                           renderItem={({item}) => this.renderList(item)}
//                         />
//                                   </View>
                
//         <Text style={{fontSize: 30, fontWeight: '700',paddingVertical:10}}>All Contacts ....</Text>
//         <View style={{flex: 1}}>
//           <FlatList
//             data={this.state.fakeContact}
//             keyExtractor={item => item.recordID}
//             //extraData={this.state}
//             showsVerticalScrollIndicator={false}
//             renderItem={({item}) => {
//               return (
//                 <View style={{flex: 1}}>
//                   <View
//                     style={{
//                       flex: 1,
//                       //height:200,
//                       flexDirection: 'row',
//                       //padding: 10,
//                       borderBottomWidth: 1,
//                       borderStyle: 'solid',
//                       borderColor: '#ecf0f1',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         alignItems: 'flex-start',
//                         justifyContent: 'center',
//                       }}>
//                       {item.check ? (
//                         <Text
//                           style={{
//                             fontWeight: '800',
//                             fontFamily: 'Heiti SC',
//                           }}>{`${item.givenName} ${item.familyName}`}</Text>
//                       ) : (
//                         <Text>{`${item.givenName} ${item.familyName}`}</Text>
//                       )}
//                     </View>
//                     <TouchableOpacity
//                       style={styles.heading}
//                       onPress={()=>this.showAlert(item)}>
//                       <Text style={{fontSize: 16, color: 'white'}}>Invite</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               );
//             }}
//           />
//         </View>
//       </View>
  
//               </View>
//             </Modal>
//           </View>
//           <TouchableOpacity
//             onPress={this.showDatePicker}
//             style={styles.rowStyle}>
//             <Image
//               source={LocalImages.CALENDER}
//               style={{
//                 width: 20,
//                 height: 20,
//                 resizeMode: 'contain',
//                 tintColor: '#3399FF',
//               }}
//             />
//             <Text style={{width: vw(240), fontSize: 15, color: Colors.black}}>
//               {choseStartDate ? choseStartDate : 'Pick Date'}
//             </Text>
//           </TouchableOpacity>

//           <DateTimePickerModal
//             isVisible={this.state.isDateVisible}
//             onConfirm={this.handleDatePicker}
//             onCancel={this.hideDatePicker}
//             minimumDate={new Date()}
//             mode={'date'}
//             is24Hour={true}
     
//           />
//           <View style={{flex: 0.2}}>
//             <TouchableOpacity
//               onPress={this.showTimePicker}
//               style={styles.rowStyle}>
//               <Image
//                 source={LocalImages.CLOCk}
//                 style={{
//                   width: 20,
//                   height: 20,
//                   resizeMode: 'contain',
//                   tintColor: '#3399FF',
//                 }}
//               />
//               <Text style={{width: vw(240), fontSize: 15, color: Colors.black}}>
//                 {chosetime ? chosetime : 'Pick Time'}
//               </Text>
//             </TouchableOpacity>

//             <DateTimePickerModal
//               isVisible={this.state.isTimeVisible}
//               onConfirm={this.handleTimePicker}
//               onCancel={this.hideTimePicker}
            
//               mode={'time'}
//               is24Hour={true}
              
//             />
//           </View>

      




// <View style={styles.btnTextHolder}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={this.changeLayout}
//             style={styles.Btn}>
//             <Text style={{color:'#ddd'}}>Add your description</Text>
//             {this.state.expanded ? (
//               <Image
//                 style={styles.iconStyle}
//                 source={require('../../assets/images/up-arrow.png')}
//               />
//             ) : (
//               <Image
//                 style={styles.iconStyle}
//                 source={require('../../assets/images/down-arrow.png')}
//               />
//             )}
//           </TouchableOpacity>
//           <View
//             style={{
             
//               height: this.state.expanded ? null : 0,
//               overflow: 'hidden',
//             }}>
//            <View
//             style={{
            
//               width: 340,
//               height: 80,
//               backgroundColor: '#F4F5F6',
//               padding: 5,
//             }}>
//             <TextInput
//             placeholder="Write your description..."
//               multiline
//               numberOfLines={3}
//               underlineColorAndroid={'transparent'}
//               value={this.state.description}
//               onChangeText={description => this.setState({description})}
//               keyboardType="default"
//                autoFocus={true}
//             />
//           </View>

//            </View>
// </View>



// <View style={{flex: 0.2, padding: 10}} />

//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <TouchableOpacity
//               onPress={() => this.saveData()}
//               style={{
//                 width: vw(120),
//                 height: vh(60),
//                 backgroundColor: '#3399FF',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: vh(10),
//                 marginBottom:5,
//                 borderRadius: 8,
//               }}>
//               <Text style={{fontSize: 16, color: Colors.white}}>
//                 LET'S MEET
//               </Text>
//             </TouchableOpacity>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={this.state.modalVisible}
//               onRequestClose={() => {
//                 Alert.alert('Modal has been closed.');
//               }}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Image
//                     source={LocalImages.TICK}
//                     style={{width: 45, height: 45, resizeMode: 'contain'}}
//                   />
//                   <Text style={{paddingTop: 5}}>
//                     {' '}
//                     Meetup Created Successfully
//                   </Text>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </ScrollView>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   rowStyle: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderBottomColor: 'grey',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     height: vh(60),
//     alignItems: 'center',
//     padding: 15,
//     margin: 10,
//   },
//   dividerStyle: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: 'grey',
//     height: vh(60),
//     marginHorizontal: 10,
//   },
//   centeredView: {
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     marginTop: 20,
//     backgroundColor: 'red',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   centeredViewContact: {
//     flex: 1,
//   },
//   modalViewContact: {
//     flex: 1,

//     backgroundColor: '#fff',
//     // borderRadius: 10,
//     padding: 35,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 2,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: '500',
//   },
//   modalTextContact: {
//     paddingTop: 25,

//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   itemContainerContact: {
//     flexDirection: 'row',
//     minHeight: 74,
//     height: 83,
//   },
//   rightSectionContainerContact: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   mainTitleContainerContact: {
//     justifyContent: 'center',
//     flex: 1,
//     borderBottomColor: '#fff',
//     borderBottomWidth: 1,
//   },
//   leftElementContainerContact: {
//     justifyContent: 'center',
//     paddingLeft: 5,
//   },
//   titleStyle: {
//     color: '#000',
//     fontSize: 14,
//     paddingHorizontal: 20,
//   },
//   containerFooter: {
//     flex: 1,
//     //backgroundColor: '#ddd',
//     padding: 5,
//   },
//   btnTextHolder: {
//     borderWidth: 1,
//     borderColor: '#fff',
//     marginBottom: 10,
//     marginHorizontal: 18,
//     padding: 10,
//   },
//   iconStyle: {
//     width: 16,
//     height: 16,
//     tintColor: '#3399FF',
//   },
//   Btn: {
//     padding: 10,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   heading: {
//     margin: 15,
//     backgroundColor: '#43BE31',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '40%',
//     //height:50,
//     marginHorizontal: 0,
//     padding: 10,
//     borderTopStartRadius: 20,
//     borderBottomEndRadius: 20,
//   },

// });
