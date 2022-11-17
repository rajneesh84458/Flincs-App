



import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'


export default class LoadingScreen extends Component {


   async componentDidMount(){
         const checkuser = await AsyncStorage.getItem('token')
           if(checkuser){

                    this.props.navigation.navigate('home')
                    console.log("loading token",checkuser)
           }
           else{
            this.props.navigation.navigate('Login')
           }
         
        // getAsyncStorage(keys.uuid)
        // .then((uuid) => {
        //   if (uuid) {
        //     console.log("myuser",uuid)
        //     this.props.navigation.replace('home');
        //   } else {
        //     this.props.navigation.replace('Login');
        //   }
        // })
        // .catch((err) => {
        //   console.log(err);
        //   navigation.replace('Login');
        // });

           
    }


    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color ="green"/>
            </View>
        )
    }
}



//import React, { Component } from 'react'
// import { Button, Text, View } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

// export default class Reminder extends Component {

//   constructor(props) {
//     super(props);
//     //Remove this method to stop OneSignal Debugging 
//     OneSignal.setLogLevel(6, 0);
    
//     // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
//     OneSignal.init("5a33cd61-312e-4b64-8940-752ab44781e1", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
//     OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    
//     // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
//     // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
  
//      OneSignal.addEventListener('received', this.onReceived);
//      OneSignal.addEventListener('opened', this.onOpened);
//      OneSignal.addEventListener('ids', this.onIds);
//      this.state ={
//        messages:''
//      }
//   }
//     // componentWillUnmount() {
//     //   OneSignal.removeEventListener('received', this.onReceived);
//     //   OneSignal.removeEventListener('opened', this.onOpened);
//     //   OneSignal.removeEventListener('ids', this.onIds);
//     // }
  
//     onReceived(notification) {
//       alert("Notification received: ", notification.payload);
//     }
  
//     onOpened(openResult) {
//       alert('Message: ', openResult.notification.payload.body);
//       console.log("Mesasage",openResult.notification.payload.body)
//       alert('Data: ', openResult.notification.payload.additionalData);
//       console.log('Data: ', openResult.notification.payload.additionalData)
//       alert('isActive: ', openResult.notification.isAppInFocus);
//       console.log('isActive: ', openResult.notification.isAppInFocus)
//       alert('openResult: ', openResult);
//       console.log('openResult: ', openResult)
//     }
  
//     onIds(device) {
//       console.log('Device info: ', device);
//     }

//     pushData=()=>{
//     this.sendNotification(this.state.messages)
//   }

//     sendNotification = data => {
//       let headers = {
//         "Content-Type": "application/json; charset=utf-8",
//         Authorization: "Basic ZjBiZGY0ZTktNzM5YS00MWRjLThhNGYtZjQ4NTg0OTI5ZWI4 "
//       };
    
//       let endpoint = "https://onesignal.com/api/v1/notifications";
    
//       let params = {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//           app_id: "5a33cd61-312e-4b64-8940-752ab44781e1",
//           included_segments: ["All"],
//           contents: { en: data },
//           msg:this.state.messages
//         })
//       };
//       fetch(endpoint, params).then(res => console.log("myresponse =======>",res));
//     };
  
//   render() {
//     return (
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//         <Text> Notification</Text>
//         <TextInput 
//               style={{backgroundColor:'#ccc',width:300,height:50}}
//               value={this.state.messages}
//               onChangeText={(text)=>this.setState({messages:text})}
//                 />
//                 <Button title ="Click" onPress={this.pushData}/>
//       </View>
//     )
//   }
// }





