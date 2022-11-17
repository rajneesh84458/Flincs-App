// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

// export default class Settings extends Component {

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
//   }
//     componentWillUnmount() {
//       OneSignal.removeEventListener('received', this.onReceived);
//       OneSignal.removeEventListener('opened', this.onOpened);
//       OneSignal.removeEventListener('ids', this.onIds);
//     }

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

//   componentDidMount(){
//     this.sendNotification('My Name is Rajneesh kumar')
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
//           contents: { en: data }
//         })
//       };
//       fetch(endpoint, params).then(res => console.log("myresponse =======>",res));
//     };

//   render() {
//     return (
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//         <Text> Notification</Text>
//       </View>
//     )
//   }
// }




// import React, { Component } from 'react';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules
// import { Text, View } from 'react-native'
// export default class Settings extends Component {

// constructor(properties) {
//   super(properties);
//   //Remove this method to stop OneSignal Debugging 
//   OneSignal.setLogLevel(6, 0);
  
//   // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
//   OneSignal.init("5a33cd61-312e-4b64-8940-752ab44781e1");
//   OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
//   // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
//   //OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

//    OneSignal.addEventListener('received', this.onReceived);
//    OneSignal.addEventListener('opened', this.onOpened);
//    OneSignal.addEventListener('ids', this.onIds);
// }
//   componentWillUnmount() {
//     OneSignal.removeEventListener('received', this.onReceived);
//     OneSignal.removeEventListener('opened', this.onOpened);
//     OneSignal.removeEventListener('ids', this.onIds);
//   }

//   onReceived(notification) {
//     console.log("Notification received: ", notification);
//     alert(notification)
//   }

//   onOpened(openResult) {
//     console.log('Message: ', openResult.notification.payload.body);
//     console.log('Data: ', openResult.notification.payload.additionalData);
//     console.log('isActive: ', openResult.notification.isAppInFocus);
//     console.log('openResult: ', openResult);
//   }

//   onIds(device) {
//     console.log('Device info: ', device);
//   }




//    sendNotification = () => {
//     let headers = {
//       "Content-Type": "application/json; charset=utf-8",
//       Authorization: "Basic ZjBiZGY0ZTktNzM5YS00MWRjLThhNGYtZjQ4NTg0OTI5ZWI4 "
//     };
  
//     let endpoint = "https://onesignal.com/api/v1/notifications";
  
//     let params = {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify({
//         app_id: "5a33cd61-312e-4b64-8940-752ab44781e1",
//         included_segments: ['Subscribed Users'],
//         contents: { en: "Hello meetups..."},
//         ///msg:msgValue
//       })
//     };
//     fetch(endpoint, params).then(res => console.log("myresponse =======>",res.body));
//   };

//   componentDidMount(){
//     this.sendNotification()
//     console.log("sdhffhgskjfhskjfhskjfsdhkjfshkffjsjfsd")
//   }


// render() {
//       return (
//         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//           <Text> Notificationssss</Text>
//         </View>
//       )
//     }
//   }




// import {Item} from 'native-base';
// import React, {Component} from 'react';
// import {Text, View} from 'react-native';

// import {SwipeListView} from 'react-native-swipe-list-view';

// export default class Settings extends Component {
//   state = {
//     data: [],
//   };

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => res.json())
//       .then(result => {
//         this.setState({data: result});
//       });
//   }

//   render() {
//     return (
//       <View>
//         <SwipeListView
//           data={this.state.data}
//           renderItem={({item}) => {
//             return (
//               <View style={{margin: 10, backgroundColor: '#ccc', padding: 10}}>
//                 <Text>{item.name}</Text>
//               </View>
//             );
//           }}
//           renderHiddenItem={({item, index}) => (
//             <View style={{margin: 10, backgroundColor: '#ccc', padding: 10}}>
//               <Text>{item.name}</Text>
//             </View>
//           )}
//           rightOpenValue={75}
//         />
//       </View>
//     );
//   }
// }


// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import { messaging } from '../../Setup';

// export default class Settings extends Component {




//   componentDidMount(){
//     this.requestUserPermission()
//   }

//   requestUserPermission= async()=> {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     )
//   }
// }






// import React, { Fragment,Component } from 'react';

// import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList} from 'react-native';

// import PushNotification from "react-native-push-notification";
// import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
// // Dummy data for list, we'll replace this with data received from push
// let pushData = [
//   {
//     title: "First push",
//     message: "First push message"
//   },
//   {
//     title: "Second push",
//     message: "Second push message"
//   }
// ]

// _renderItem = ({ item }) => (
//   <View key={item.title}>
//     <Text style={styles.title}>{item.title}</Text>
//     <Text style={styles.message}>{item.message}</Text>
//   </View>
// );

// const Settings = () => {
//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           <View style={styles.listHeader}>
//             <Text>Push Notifications</Text>
//           </View>
//           <View style={styles.body}>
//             <FlatList
//               data={pushData}
//               renderItem={(item ) => _renderItem(item)}
//               keyExtractor={(item ) => item.title}
//             />
//             {/* <LearnMoreLinks /> */}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//       <PushController/>
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {backgroundColor: Colors.lighter,},
//   listHeader:{ backgroundColor: '#eee', color: "#222", height: 44, padding: 12},
//   title:{fontSize: 18, fontWeight: 'bold', paddingTop: 10},
//   message:{ fontSize: 14, paddingBottom: 15, borderBottomColor: "#ccc", borderBottomWidth: 1},
//   engine: { position: 'absolute', right: 0,},
//   body: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 10, },
//   sectionContainer: { marginTop: 32, paddingHorizontal: 24, },
//   sectionTitle: { fontSize: 24, fontWeight: '600', color: Colors.black},
//   sectionDescription: { marginTop: 8, fontSize: 18, fontWeight: '400', color: Colors.dark,},
//   highlight: { fontWeight: '700'},
//   footer: { color: Colors.dark, fontSize: 12, fontWeight: '600', padding: 4, paddingRight: 12, textAlign: 'right',},
// });

// export default Settings;








// class PushController extends Component{
//   componentDidMount(){
//       PushNotification.configure({
//           // (optional) Called when Token is generated (iOS and Android)
//           onRegister: function(token) {
//             console.log("TOKEN:", token);
//           },
        
//           // (required) Called when a remote or local notification is opened or received
//           onNotification: function(notification) {
//             console.log("NOTIFICATION:", notification);
        
//             // process the notification here
        
//             // required on iOS only 
//             notification.finish(PushNotificationIOS.FetchResult.NoData);
//           },
//           // Android only
//           senderID: "852494159031",
//           // iOS only
//           permissions: {
//             alert: true,
//             badge: true,
//             sound: true
//           },
//           popInitialNotification: true,
//           requestPermissions: true
//         });
//   }

//   render(){
//       return null;
//   }
// }




// import AsyncStorage from '@react-native-community/async-storage';
// import React, {Component} from 'react';
// import {View,Text} from 'react-native'
// import { messaging } from '../../Setup';


// export default class Settings extends Component {

// async componentDidMount() {
//   this.checkPermission();
// }

//   //1
// async checkPermission() {
//   const enabled = await messaging().hasPermission();
//   if (enabled) {
//       this.getToken();
//   } else {
//       this.requestPermission();
//   }
// }

//   //3
// async getToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if (!fcmToken) {
//       fcmToken = await messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
// }

//   //2
// async requestPermission() {
//   try {
//       await messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//   }
// }

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>Welcome to React Native!</Text>
//       </View>
//     );
//   }
// }







// import React, { useEffect } from 'react'
// import PushNotification from 'react-native-push-notification'
// const Settings = () => {
//   useEffect(() => {
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function(token) {
//         console.log('TOKEN:', token)
//       },
// // (required) Called when a remote or local notification is opened or received
//       onNotification: function(notification) {
//         console.log('REMOTE NOTIFICATION ==>', notification)
// // process the notification here
//       },
//       // Android only: GCM or FCM Sender ID
//       senderID: '852494159031',
//       popInitialNotification: true,
//       requestPermissions: true
//     })
//   }, [])
// return null
// }
// export default Settings




import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import { messaging } from '../../Setup';
export default class Settings extends Component {

async componentDidMount(){
  PushNotification.configure({
    onNotification:function(notification){
       console.log("Notification",notification)
    }
  })
}

async componentDidMount(){
  messaging().hasPermission()
  .then(enabled =>{
     if(enabled){
         console.log("user has the permission")
     }
     else{
         console.log("user doesn't have the permission")
         this.NotiPermission();
     }
  })

   let fcmToken = await AsyncStorage.getItem('fcmToken')
     console.log("fcm token form storage",fcmToken)
     if(!fcmToken){
        fcmToken = await messaging().getToken();
        if(fcmToken){
          console.log("fcmtoken from firbase:",fcmToken)
          await AsyncStorage.setItem('fcmToken',fcmToken)
        }
     }

}




async sendNotification(){
   const FIREBASE_API_KEY ="AIzaSyBi1lUgtUraRBxa0s2P5iYzS0HHIbUhaUQ";
    const message = {
         registration_ids:["cHM129L9R7GyK7vFD8XTLh:APA91bFTbmxoWd_SKkXutDnIn-9jcgD5crVxNIngXlGbxiqci72baKy-MQsGpWuBNaB0-8h4buRQzDL0SXX8Jm_GJqRpU2On3SwWslXs3T9ZQGBJ8mG-XpiIhggFA9Cz8Z24q-iARHi0"],
         notification:{
            title:"Developers",
            body:"Hello developers....",
            "vibrate":1,
            "sound":1,
            "show_in_foreground":true,
            "priority":"high",
            "content_available":true 
         }
    }

    let response = await fetch(`https://fcm.googleapis.com/fcm/send`,{
          method:"POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            "Authorization":"key=" + FIREBASE_API_KEY
        },
          body:JSON.stringify(message)
        
          
    }) 
    response = await response.json();
    console.log("notification====>",response)
}

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text> Recieve Push notification </Text>
         <Button title ="Send Notification" onPress ={()=>this.sendNotification()}/>
      </View>
    )
  }
}

// import React from 'react'
// import { View, Text } from 'react-native'

// export default function Settings() {
//   return (
//     <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
//       <Text>settings soon</Text>
//     </View>
//   )
// }


// import React, { Component } from 'react'
// import { Alert,Image } from 'react-native'

// import { Text, View,Button } from 'react-native'


// const names =[
//              {id:1,name:"kapil"},
//              {id:2,name:"Rajneesh"},
//              {id:3,name:"Ashutosh"},
//              {id:4,name:"sarla"},
//              {id:5,name:"Akansha"},
//              {id:6,name:"Rohit"},
//              {id:7,name:"Hayat"},
//              {id:8,name:"Akshay"},
//              ]
// export default class Settings extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedItem:names,
//     };
//   }

   

   

// createGroup=()=>{
//   alert('sdffsf')
// }
// selectItem=(item)=>{
//   return(
//     alert(`selected item ${item.name}`)
//   )
  
// }

//   render() {
   
//     return (
//       <View style={{flex:1,padding:10}}>

//           <View style={{flex:0.5,backgroundColor:'#f4f5f6'}}>

//           </View>

//         <Text style={{fontSize:20,color:'black',fontWeight:'bold',padding:20,textDecorationLine:'underline'}}> MyList </Text>
//         {
//           this.state.selectedItem.map(item =>(
                 
//             <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:10}}>
              
//             <Text onPress={()=>this.selectItem(item)} style={{paddingVertical:5}}>{item.name}</Text>
//             <Image source ={require('../../assets/images/tick.png')} style ={{width:30,height:30}}/>
//             </View>
           
           
           
//           ))
//         }
         
         

//         <Button title ="Create" onPress ={()=>this.createGroup()}/>  
//       </View>
//     )
//   }
// }