import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  PermissionsAndroid,
  Dimensions,
  LayoutAnimation,
  KeyboardAvoidingView,
  SafeAreaView,
  
  Button,Modal
} from 'react-native';

import Contacts from 'react-native-contacts';
import {vw, vh} from '../../utility/dimensions';
import RadioForm from 'react-native-simple-radio-button';
import {Container, Tab, Tabs, TabHeading} from 'native-base';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import LocalImages from '../../utility/localImages';

import Colors from '../../utility/colors';

import LinearGradient from 'react-native-linear-gradient';

import {LogOutUser} from '../../network';
import {clearAsyncStorage} from '../../asyncStorage';

import SendSMS from 'react-native-sms';
import { Auth, database,dynamicLinks } from '../../Setup';





const {width, height} = Dimensions.get('window');

export default class MeetupScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      Id:'',
      title: '',
      modalVisible: false,
      isDateVisible: false,
      isTimeVisible: false,
      choseStartDate: '',
      contactModal: false,
      contactName: '',
      description: '',
      num: '',
      fakeContact: [],
      dataSource: [],
      users: [],
      text: 'Invite',
      search: '',
      contacts: null,
      filterContacts: null,
      data: [{label: 'Pick Time', value: 0}, {label: 'Whole Day', value: 1}],
      permissionModal: true,
      filterList:[],
      fetchFilterData:[],
      loading:true,
      emptyText:null,
      backgroundColor:null
    };
  }



  toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // Contact Modal
  setcontactModal = visible => {
    this.setState({contactModal: visible});
  };

  // Lifecycle of Contacts

  // date picker
  handleDatePicker = date => {
    this.setState({
      isDateVisible: false,
      choseStartDate: moment(date).format('YYYY-MM-DD'),
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDateVisible: false,
    });
  };

  showDatePicker = () => {
    this.setState({
      isDateVisible: true,
    });
  };

  //time Picker
  handleTimePicker = time => {
    this.setState({
      isTimeVisible: false,
      chosetime: moment(time).format('h: mm a'),
    });
  };

  hideTimePicker = () => {
    this.setState({
      isTimeVisible: false,
    });
  };

  showTimePicker = () => {
    this.setState({
      isTimeVisible: true,
    });
  };
  // clear the text through functions

  clearTitle = e => {
    if (e === this.state.title) {
    }

    this.setState({title: ''});
  };

  handleBackPress() {
    Alert.alert(
      'Meetup',
      'Are you sure want to cancel your meet-up ?',
      [
        {
          text: 'Yes',
          onPress: () => this.handleCancel(),

          style: 'cancel',
        },
        {text: 'No'},
      ],
      // {cancelable: false},
    );
  }
  // logout function
  handleCancel() {
    this.props.navigation.navigate('Dashboard');
  }

  logout = () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            this.props.navigation.replace('Login');
          })
          .catch(err => console.log(err));
      })
      .catch(err => alert(err));
  };

  

 async saveData() {
   
    const {
      Id,
      title,
      choseStartDate,
      chosetime,
      contactName,
      description,
   
    } = this.state;

    if (
      !this.state.title ||
      !this.state.choseStartDate ||
      !this.state.chosetime
    ) {
      alert('please filled details');
      return false;
    } else {
      this.setState({
        modalVisible: true,
      });
      setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 2000);

    //  submitUser(Id, title, choseStartDate, chosetime, contactName, description,num)
    //    .then(result => {
    //      console.log('meetup result ===>', result);

    //      this.props.navigation.navigate('Meetup');

    //       this.setState({
    //         Id: null,
    //         title: '',
    //         choseStartDate: '',
    //         chosetime: '',
    //         contactName: '',
    //         description: '',
    //         num: '',
    //         expanded: false,
    //       });
    //     })
    //    .catch(err => console.log(err));
    try {
      
      const mydata = await database().ref(`users/${Auth().currentUser.uid}/meetups`);
      mydata.push({
        Id:database()
        .ref()
        .push().key, title, choseStartDate, chosetime, contactName, description,
              })
     this.props.navigation.navigate('Meetup');
               this.setState({
            Id: '',
            title: '',
            choseStartDate: '',
            chosetime: '',
            contactName: '',
            description: '',
            num: '',
            expanded: false,
          });
        
    } catch (error) {
      
    }
          
               
    

    }
  
  }

  initiateSMS = item => {
    const url = `Hey ${item.givenName} ${
      item.familyName
    }  \n https://flincsapplicationv1.page.link/rniX`;
    SendSMS.send(
      {
        // Message body
        body: url,
        // `Hey
        // would like you to join flincs!  + ${url}`,
        // Recipients Number
        recipients: [item.phoneNumbers[0].number],
        // An array of types
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  };
  showAlert = item => {
    this.initiateSMS(item);

    //console.log('mytitme', item);
  };

  
  getValue = item => {
    this.setState({contactName: item.name});
    this.setcontactModal(false);
  };
//



 fetchPeople = async () => {
     try {
      const mydata = await database().ref('users/' + Auth().currentUser.uid).child('peopleFlincs/');
       mydata.on('value',snapshot =>{

        let data = snapshot.val();
        if (data) {
          let items = Object.values(data);
          this.setState({dataSource:items})
          this.setState({loading:false})
          console.log("getting data==>",this.state.dataSource)
        } else {
          return this.setState({emptyText:'Add People on Flincs'});
          //setEmptyText('You ,ve not made any Meetups yet');
          
        }
            
       })
     } catch (error) {
        console.log(error)
     }
   
  }

 renderFilterList = (item) => (
  <TouchableOpacity style={styles.divider}
     onPress = {()=>this.newFilterList(item)}>
    <Text style={{flex:1,padding:10,fontWeight:'bold'}}>{item.name}</Text>
  </TouchableOpacity>
)






 newContactList = async(item) =>{
     try {
       
      this.state.filterList.push({name:item.givenName});
     this.setState({filterList:this.state.filterList})
      const mydata = await database().ref('users/' + Auth().currentUser.uid).child('peopleFlincs/');
      mydata.push({
        onflincs: item.givenName,
      })

     } catch (error) {
       console.log(error)
      
     }

      
}



 newFilterList = (item) =>{
  this.setState({contactName: item.onflincs});
    this.setcontactModal(false);

      
}




 renderContactList = (item) => (
     

      <View style={{flex: 1, margin: 10}}>
   <View style={styles.divider}>
     <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Text>{`${item.givenName} ${
        item.familyName
      }`}</Text>
    </View>

    <TouchableOpacity
      style={styles.heading}
      onPress = {()=>this.newContactList(item)}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
        }}>
        Add +
      </Text>
    </TouchableOpacity>
  </View>
</View>

    
)


 renderFilterList = (item) => (
     <TouchableOpacity style={{flex:1,backgroundColor:'#cccc',marginBottom:5,padding:10}}
        onPress = {()=>this.newFilterList(item)}>
       <Text>{item.onflincs}</Text>
     </TouchableOpacity>
)






 async componentDidMount() {
      this.shareLinkHandle();
      this.fetchPeople()
  if (Platform.OS === 'ios') {
    Contacts.getAll((err, contacts) => {
      contacts.sort(
        (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      try {
        if (err) {
          throw err;
        }
      } catch (e) {
        alert('please allow contacts permission from  device setting');
      }
      // contacts returned
      this.setState({contacts});
    });
  } else if (Platform.OS === 'android') {
   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        contacts.sort(
                  (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
        if (err === 'denied') {
          // error
        } else {
          // contacts returned in Array
          this.setState({contacts});
        }
      });
    });
  }
}


  search = text => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      Contacts.getAll((err, contacts) => {
              contacts.sort(
                (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
              );
              //console.log('contacts -> ', contacts);
              if (err === 'denied') {
                alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
              } else {
                this.setState({contacts});
                //console.log('contacts', contacts);
              }
            });
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({contacts});
        //console.log('contacts', contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({contacts});
        //console.log('contacts', contacts);
      });
    }
  };

  renderList = item => {
    return (
      <TouchableOpacity
        onPress={() => this.getValue(item)}
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#ecf0f1',
          padding: 10,
          marginBottom: 5,
          marginTop: 10,
        }}>
        <Text style={{fontWeight: 'bold', color: '#3399FF'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  shareLinkHandle = async () => {
    try {
      const initialLink = await dynamicLinks().getInitialLink();
      console.log('initialLink', initialLink);

      if (initialLink.url !== null) {
        if (initialLink.url === 'https://flincsapplicationv1.page.link/rniX') {
          return alert(initialLink);
        }
      }
    } catch (error) {}
  };



  render() {
    const {
      choseStartDate,
      contactModal,
      chosetime,
      contactName,
   
    } = this.state;
    
      return (
        <ScrollView contentContainerStyle={{width, height}}>
          <LinearGradient colors={['#3399FF', '#4834DF']} style={{flex: 1}}>
            <View
              style={{
                height: 70,
                flexDirection: 'row',

                paddingTop: 35,
                paddingHorizontal: 5,
              }}>
              <TouchableOpacity onPress={() => this.handleBackPress()}>
                <Image
                  source={LocalImages.BACKARROW}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: 'black',
                   
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  paddingHorizontal: 20,
                  fontWeight: 'bold',
                  marginTop: 2,
                }}>
                Create Meetup
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{
                width,
                height,
                backgroundColor: Colors.white,
                margin: 8,
              }}>
              <View style={styles.rowStyle}>
                <Image
                  source={LocalImages.BOOK}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    tintColor: '#3399FF',
                  }}
                />
                <TextInput
                  maxLength={30}
                  placeholder="Add Title"
                  placeholderTextColor="#ccc"
                  style={{fontSize: 15, width: vw(200), height: 50}}
                  underlineColorAndroid={'transparent'}
                  value={this.state.title}
                  onChangeText={title => this.setState({title})}
                  keyboardType="default"
                />
                <TouchableOpacity onPress={this.clearTitle}>
                  <Image
                    source={LocalImages.CLOSE}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: 'contain',
                      tintColor: '#3399FF',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{height: height * 0.09}}>
                <View
                  style={{
                    marginHorizontal: 10,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.4,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setcontactModal(true)}
                    style={{
                      padding: 20,

                      flexDirection: 'row',
                    }}>
                    <Image
                      source={LocalImages.PROFILE}
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        tintColor: '#3399FF',
                      }}
                    />
                    <Text
                      style={{
                        color: '#ccc',
                        fontSize: 16,
                        paddingHorizontal: 28,
                      }}>
                      {contactName ? (
                        <Text style={{color: '#000'}}>{contactName}</Text>
                      ) : (
                        'Tap on Contacts'
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={contactModal}
                  onRequestClose={() => {
                    this.setcontactModal(false);
                  }}>
                  <View style={styles.centeredViewContact}>
                    <View style={styles.modalViewContact}>
                      <Text
                        onPress={() => {
                          this.setcontactModal(false);
                        }}
                        style={{
                          textAlign: 'right',
                          fontSize: 20,
                          color: 'red',
                          fontWeight: 'bold',
                          paddingVertical: 20,
                        }}>
                        X
                      </Text>

                      <Container style={{flex: 1,}}>
                        <Tabs>
                          <Tab
                            heading={
                              <TabHeading style={{backgroundColor: 'white'}}>
                                <Text
                                  style={{color: '#000', fontWeight: 'bold'}}>
                                  People on Flincs
                                </Text>
                              </TabHeading>
                            }>


                  {this.state.loading ? (
                            <View style={{justifyContents:'center',marginTop: 30}}>
                              {/* <Image source ={require('../../assets/images/empty.png')} style ={{width:60,height:60,tintColor:'#3399FF',alignSelf:'center'}}/> */}
                              <Text style={{fontSize:17,textAlign:'center',color:"#ccc",letterSpacing:1}}>{this.state.emptyText}</Text>
                            </View>
                          ) : (
                            <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.dataSource}
                            renderItem={({item}) => this.renderFilterList(item)}
                            keyExtractor={(item, index) => index}
                            style={{padding:10}}
                          />
                          )}
                    
                          </Tab>
                          <Tab
                            heading={
                              <TabHeading style={{backgroundColor: 'white'}}>
                                <Text
                                  style={{color: '#000', fontWeight: 'bold'}}>
                                  Add Contacts
                                </Text>
                              </TabHeading>
                            }>
                            <SafeAreaView style={styles.container}>
                              <View style={styles.container}>
                                <TextInput
                                  onChangeText={this.search}
                                  placeholder="Search"
                                  style={styles.searchStyle}
                                />
                                <FlatList
                                  showsVerticalScrollIndicator={false}
                                  data={this.state.contacts}
                                  renderItem={({item}) => this.renderContactList(item)}
                                  keyExtractor={item => item.recordID}
                                />
                              </View>
                            </SafeAreaView>
                          </Tab>
                        </Tabs>
                      </Container>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.dividerStyle}>
                <RadioForm
                  style={{
                    justifyContent: 'space-around',
                    margin: vh(20),
                    width: vw(280),
                  }}
                  radio_props={this.state.data}
                  initial={0}
                  formHorizontal={true}
                  labelColor={'#000'}
                  buttonColor={'#3399FF'}
                  buttonSize={10}
                  labelStyle={{fontSize: 15, color: '#000'}}
                  buttonWrapStyle={{marginLeft: 60}}
                  //buttonOuterColor ={Colors.black}
                  // buttonInnerColor ="red"
                  selectedButtonColor={'#3399FF'}
                  onPress={value => {
                    this.setState({value: value});
                  }}
                />
              </View>
              <View style={{flex: 0.2}}>
                <TouchableOpacity
                  onPress={this.showTimePicker}
                  style={styles.rowStyle}>
                  <Image
                    source={LocalImages.CLOCk}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      tintColor: '#3399FF',
                    }}
                  />
                  <Text
                    style={{width: vw(240), fontSize: 15, color: Colors.black}}>
                    {chosetime ? chosetime : 'Pick Time'}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={this.state.isTimeVisible}
                  onConfirm={this.handleTimePicker}
                  onCancel={this.hideTimePicker}
                  mode={'time'}
                  is24Hour={true}
                />
              </View>

              <TouchableOpacity
                onPress={this.showDatePicker}
                style={styles.rowStyle}>
                <Image
                  source={LocalImages.CALENDER}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#3399FF',
                  }}
                />
                <Text
                  style={{width: vw(240), fontSize: 15, color: Colors.black}}>
                  {choseStartDate ? choseStartDate : 'Pick Date'}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={this.state.isDateVisible}
                onConfirm={this.handleDatePicker}
                onCancel={this.hideDatePicker}
                minimumDate={new Date()}
                mode={'date'}
                is24Hour={true}
              />

              <View
                style={{
                  width: width * 0.93,
                  height: 80,
                  backgroundColor: '#F4F5F6',
                  padding: 5,
                  marginHorizontal: 15,
                }}>
                <TextInput
                  placeholder="Write your description..."
                  multiline
                  numberOfLines={3}
                  underlineColorAndroid={'transparent'}
                  value={this.state.description}
                  onChangeText={description => this.setState({description})}
                  keyboardType="default"
                  autoFocus={true}
                  style={{width: 300, marginHorizontal: 5}}
                />
              </View>
              {/* </View> */}
              {/* </View> */}

              {/* <View style={{flex: 0.2, padding: 10}} /> */}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.saveData()}
                  style={{
                    width: vw(120),
                    height: vh(60),
                    backgroundColor: '#3399FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: vh(10),
                    marginBottom: 5,
                    borderRadius: 8,
                  }}>
                  <Text style={{fontSize: 16, color: Colors.white}}>
                    LET'S MEET
                  </Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setcontactModal(false);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Image
                        source={LocalImages.TICK}
                        style={{width: 45, height: 45, resizeMode: 'contain'}}
                      />
                      <Text style={{paddingTop: 5}}>
                        {' '}
                        Meetup Created Successfully
                      </Text>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </LinearGradient>
        </ScrollView>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
  },

  heading: {
    margin: 15,
    backgroundColor: '#43BE31',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    //height:50,
    marginHorizontal: 0,
    padding: 10,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  searchStyle: {
    height: 40,
    paddingLeft: 15,
    marginVertical: 20,
    borderRadius: 5,
    width: 350,

    backgroundColor: '#f4f5f6',
  },
  divider: {
    flex: 1,
    //height:200,
    flexDirection: 'row',
    //padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ecf0f1',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: vh(60),
    alignItems: 'center',
    padding: 15,
    margin: 10,
  },
  dividerStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    height: vh(60),
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 30,

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  centeredViewContact: {
    flex: 1,
  },
  modalViewContact: {
    flex: 1,

    backgroundColor: '#fff',
    // borderRadius: 10,
    padding: 30,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  btnTextHolder: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
    //marginHorizontal: 18,
    padding: 10,
  },
  iconStyle: {
    width: 16,
    height: 16,
    tintColor: '#3399FF',
  },
  Btn: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heading: {
    margin: 15,
    backgroundColor: '#43BE31',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    //height:50,
    marginHorizontal: 0,
    padding: 10,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },
});






















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
//   FlatList,PermissionsAndroid
// } from 'react-native';
// import Contacts from 'react-native-contacts';

// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment from 'moment';
// import LocalImages from '../../utility/localImages';
// import {vw, vh} from '../../utility/dimensions';
// import Colors from '../../utility/colors';
// import RadioForm from 'react-native-simple-radio-button';

// import LinearGradient from 'react-native-linear-gradient';

// //import Avatar from '../../component/Avatar';
// import { LogOutUser } from '../../network';
// import { clearAsyncStorage } from '../../asyncStorage';
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
//       data: [{label: 'Pick Time', value: 0}, {label: 'Whole Day', value: 1}],
//       id: 1,
//       title: '',
//      // description: '',
//       modalVisible: false,
//       isVisible: false,
//       choseStartDate: '',
//       choseEndDate:'',
//       chosetime: '',
//       contactModal: false,
//       contacts: null,
//       num: '',
//     };
//   }

//   // Contact Modal
//   setcontactModal = visible => {
//     this.setState({contactModal: visible});
//   };

//   setCount() {
//     this.setState({id: id + 1});
//   }
//   // Lifecycle of Contacts
//   componentDidMount() {
//     if (Platform.OS === 'ios') {
//       Contacts.getAll((err, contacts) => {
//         try {
//           if (err) {
//             throw err;
//           }
//         } catch (e) {
//           alert('please allow contacts permission from  device setting');
//         }
//         // contacts returned
//         this.setState({contacts});
//       });
//     } else if (Platform.OS === 'android') {
//       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//         title: 'Contacts',
//         message: 'This app would like to view your contacts.',
//       }).then(() => {
//         Contacts.getAll((err, contacts) => {
//           if (err === 'denied') {
//             // error
//           } else {
//             // contacts returned in Array
//             this.setState({contacts});
//           }
//         });
//       });
//     }
//   }

//   // calender functions
//   handlePicker = datetime => {
//     this.setState({
//       isVisible: false,
//       choseStartDate: moment(datetime).format('MMM D Y'),
//       chosetime:moment(datetime).format('h: mm a')
//     });
//   };

//   hidePicker = () => {
//     this.setState({
//       isVisible: false,
//     });
//   };

//   showPicker = () => {
//     this.setState({
//       isVisible: true,
//     });
//   };
//   // clear the text through functions

//   clearTitle = e => {
//     if (e === this.state.title) {
//     }

//     this.setState({title: ''});
//   };
//   // clearDescription = e => {
//   //   if (e === this.state.description) {
//   //   }

//   //   this.setState({description: ''});
//   // };

//   //  logout through back button

//   handleBackPress() {
//     Alert.alert(
//       'Meetup',
//       'Are you sure want to cancel meet-up ?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => {this.handleCancel()},
//           style: 'cancel',
//         },
//         {text: 'Logout', onPress: () => this.logout()},
//       ],
//       {cancelable: false},
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
//     if (
//       !this.state.title ||
//       // !this.state.description ||
//       !this.state.choseStartDate
//     ) {
//       alert('please filled details');
//     } else {
//       this.setState({
//         modalVisible: true,
//         id: this.state.id + 1,
//       });
//       setTimeout(() => {
//         this.setState({
//           modalVisible: false,
//         });
//       }, 2000);

//       const mydata = database().ref('meetups');
//       mydata.push({
//         id: this.state.id,
//         title: this.state.title,
//         num: this.state.num,
//         // description: this.state.description,
//         choseStartDate: this.state.choseStartDate,
//         choseEndDate: this.state.choseEndDate,
//         time: Date.now(),
//       });
//       this.props.navigation.navigate('Meetup');
//     }
//     this.setState({
//       title: '',
//       description: '',
//       choseStartDate: '',
//       time: '',
//       num: '',
//     });
//   }

//   render() {
//     const {choseStartDate, contactModal} = this.state;

//     return (
//       <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
//         <View
//           style={{
//             flex: 0.1,
//             flexDirection: 'row',
//             alignItems: 'flex-end',
//             padding: 10,
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
//               }}
//             />
//           </TouchableOpacity>

//           <Text
//             style={{
//               color: 'black',
//               fontSize: 20,
//               paddingHorizontal: 20,
//               fontWeight: 'bold',
//             }}>
//             Create Meetup
//           </Text>
//         </View>
//         {/* <KeyboardAwareScrollView
//         style={{backgroundColor:Colors.GRADIENT_PRIMARY}}
//         resetScrollToCoords={{x: 0, y: 0}}
//         contentContainerStyle={styles.container}
//         scrollEnabled={true}> */}
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
//                 tintColor: Colors.lightBlue,
//               }}
//             />
//             <TextInput
//               maxLength={30}
//               placeholder="Add Title"
//               placeholderTextColor="#000"
//               style={{fontSize: 15, width: vw(200), height: 50}}
//               underlineColorAndroid={'transparent'}
//               autoCapitalize="none"
//               value={this.state.title}
//               onChangeText={title => this.setState({title})}
//             />
//             <TouchableOpacity onPress={this.clearTitle}>
//               <Image
//                 source={LocalImages.CLOSE}
//                 style={{
//                   width: 15,
//                   height: 15,
//                   resizeMode: 'contain',
//                   tintColor: Colors.lightBlue,
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{flex: 0.2}}>
//             {/* <ProfileScreen/> */}

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
//                     tintColor: Colors.lightBlue,
//                   }}
//                 />
//                 <Text
//                   style={{
//                     color: Colors.black,
//                     fontSize: 16,
//                     paddingHorizontal: 25,
//                   }}>
//                   {this.state.num ? this.state.num : 'Tap on Contacts'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={contactModal}
//               onRequestClose={() => {
//                 Alert.alert('Modal has been closed.');
//               }}>
//               <View style={styles.centeredViewContact}>
//                 <View style={styles.modalViewContact}>
//                   <TouchableWithoutFeedback
//                     onPress={() => {
//                       this.setcontactModal(!contactModal);
//                     }}>
//                     <Image
//                       source={LocalImages.CLOSE}
//                       style={{
//                         width: 15,
//                         height: 15,
//                         position: 'absolute',
//                         right: 30,
//                         top: 15,
//                         tintColor: 'red',
//                       }}
//                     />
//                   </TouchableWithoutFeedback>
//                   <Text style={styles.modalTextContact}>Add People on Flincs</Text>
//                   <View
//                     style={{
//                       width: '100%',
//                       height: 1,
//                       borderBottomColor: 'white',
//                       borderBottomWidth: 1,
//                     }}
//                   />

//                   <FlatList
//                     data={this.state.contacts}
//                     renderItem={({item}) => (
//                       <TouchableOpacity
//                         onPress={
//                           () =>
//                             this.setState({
//                               num: item.phoneNumbers[0].number,
//                               contactModal: false,
//                             })
//                           // this.saveNumber(item)
//                         }>
//                         <View style={styles.itemContainerContact}>
//                           <View style={styles.leftElementContainerContact}>
//                             {/* <Avatar
//                               img={
//                                 item.hasThumbnail
//                                   ? {uri: item.thumbnailPath}
//                                   : undefined
//                               }
//                               placeholder={getAvatarInitials(
//                                 `${item.givenName} ${item.familyName}`,
//                               )}
//                               width={40}
//                               height={40}
//                             /> */}
//                           </View>
//                           <View style={styles.rightSectionContainerContact}>
//                             <View style={styles.mainTitleContainerContact}>
//                               {/* {item.phoneNumbers.map(phone => (
//                             <Text style={styles.titleStyle}>
//                               {' '}
//                               {phone.number}
//                             </Text>
                            
//                           ))} */}
//                               <Text style={styles.titleStyle}>{`${
//                                 item.givenName
//                               } ${item.familyName}`}</Text>
//                             </View>
//                           </View>
//                         </View>
//                       </TouchableOpacity>
//                     )}
//                     //Setting the number of column
//                     numColumns={1}
//                     keyExtractor={(item, index) => item.phone}
//                   />
//                 </View>
//               </View>
//             </Modal>
//           </View>

//           <View style={styles.dividerStyle}>
//             <RadioForm
//               style={{
//                 justifyContent: 'space-around',
//                 margin: vh(20),
//                 width: vw(280),
//               }}
//               radio_props={this.state.data}
//               initial={0}
//               formHorizontal={true}
//               labelColor={'#000'}
//               buttonColor={Colors.lightBlue}
//               buttonSize={10}
//               labelStyle={{fontSize: 15, color: '#000'}}
//               buttonWrapStyle={{marginLeft: 60}}
//               //buttonOuterColor ={Colors.black}
//               // buttonInnerColor ="red"
//               selectedButtonColor={Colors.lightBlue}
//               onPress={value => {
//                 this.setState({value: value});
//               }}
//             />
//           </View>

//           <View style={{flex: 0.2}}>
//             <TouchableOpacity onPress={this.showPicker} style={styles.rowStyle}>
//               <Image
//                 source={LocalImages.CALENDER}
//                 style={{
//                   width: 20,
//                   height: 20,
//                   resizeMode: 'contain',
//                   tintColor: Colors.lightBlue,
//                 }}
//               />
//               <Text style={{width: vw(240), fontSize: 15, color: Colors.black}}>
//               {this.state.value  ? <Text>{choseStartDate ? this.state.choseStartDate : 'Tap on Date'} </Text>  : <Text>{this.state.chosetime ? this.state.chosetime : "Tap on Time"}</Text>}
//               </Text>
//             </TouchableOpacity>

//             <DateTimePickerModal
//               isVisible={this.state.isVisible}
//               onConfirm={this.handlePicker}
//               onCancel={this.hidePicker}
//               mode={this.state.value ? 'date' : 'time'}
//               is24Hour={true}
//               //datePickerModeAndroid = {'spinner'}
//             />
//           </View>

//           <View style={{flex: 0.2, padding: 10}}>
//             {/* <DateTimePickerScreen name="Tap to end date" value ={this.state.value} /> */}
//           </View>

//           {/* <View
//             style={{
//               width: '100%',
//               height: vh(100),
//               flexDirection: 'row',
//               marginTop: 15,
//               paddingHorizontal: 10,
//               //backgroundColor:'red'
//             }}>
//             <TextInput
//               maxLength={180}
//               multiline={true}
//               placeholder="Description"
//               placeholderTextColor="#000"
//               style={{fontSize: 15, width: vw(220),height:vh(100)}}
//               underlineColorAndroid={'transparent'}
//               autoCapitalize="none"
//               value={this.state.description}
//               onChangeText={description => this.setState({description})}
//             />
//             <TouchableOpacity
//               style={{width: 15, height: 15}}
//               onPress={this.clearDescription}>
//               <Image
//                 source={LocalImages.CLOSE}
//                 style={{
//                   width: 15,
//                   height: 15,
//                   resizeMode: 'contain',
//                   tintColor: Colors.lightBlue,
//                   marginLeft: 100,
//                 }}
//               />
//             </TouchableOpacity>
//           </View> */}

//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <TouchableOpacity
//               onPress={() => this.saveData()}
//               style={{
//                 width: vw(120),
//                 height: vh(60),
//                 backgroundColor: Colors.lightBlue,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: vh(20),
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
//         {/* </KeyboardAwareScrollView> */}
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
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
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
//     marginTop: 20,
//     // backgroundColor:'red'
//   },
//   modalViewContact: {
//     flex: 1,
//     margin: 5,
//     backgroundColor: Colors.GRADIENT_MODAL,
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
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 20,
//     color: '#fff',
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
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderColor: '#515151',
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
//     color: '#fff',
//     fontSize: 20,
//     paddingHorizontal: 20,
//   },
// });
