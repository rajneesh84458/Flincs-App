


import React, { Fragment } from "react";

import NavContainer from './src/screens/navigation/NavContainer'
import Loader from "./src/component/loader";
import { StoreProvider } from "./src/context/store";
import { StatusBar } from "react-native";
 
 const App = () => {
   return (
    <StoreProvider>
    <StatusBar barStyle="light-content" />
    <NavContainer />
    <Loader />
  </StoreProvider>
   )
 }
 
 export default App
 

 





















// import React,{useState,useEffect} from "react";
// import { View, Text, Image,TouchableOpacity } from "react-native";
// import { Card, CardItem } from "native-base";
// import { deviceWidth } from "../../utility/styleHelper/appStyle";
// // import { uuid } from "../../utility/constants";
// import styles from "./styles";
// import { color } from "../../utility";

// import { Auth } from "../../network/config/setup";


// const ChatBox = ({ userId, msg, img, onImgTap,createdAt}) => {
 
//   let isCurrentUser = userId ===Auth().currentUser.uid ? true : false;
//       console.log("userid==>",userId)
//       // console.log("currentId==>",currentId)




//   return (


//     <Card
//       transparent
//       style={{
//         maxWidth: deviceWidth / 2 + 10,
//         alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
//       }}>
//       <View
//         style={[
//           styles.chatContainer,
//           isCurrentUser && {
//             borderTopLeftRadius: 20,
//           borderTopRightRadius: 0,
//           // backgroundColor: color.DARK_GRAY,
//           },
//         ]}>
//         {img ? (
//           <CardItem cardBody>
//             <View style={{height: 220, width: deviceWidth / 2,backgroundColor:'#fff'}}>
//                 <TouchableOpacity onPress={onImgTap}>
//               <Image
//                 source={{uri: img}}
//                 resizeMode="cover"
//                 style={{height: 200, width: deviceWidth / 2}}
//               />
//             </TouchableOpacity>
//             <Text style={{fontSize:10,color:'#000',textAlign:'right'}}>{createdAt}</Text>
//             </View>
//           </CardItem>
//         ) : (
//           <TouchableOpacity onPress={()=>deleteUser(userId)}
//           style={[styles.chatTxt, isCurrentUser && {color: color.WHITE}]}>
//             <Text style={{ color:'#fff',fontFamily:'Lato-Bold'}}>{msg}</Text>
//             <Text style={{fontSize:10,color:'#000',textAlign:'right'}}>{createdAt}</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </Card>
//   );
// };

// export default ChatBox;
