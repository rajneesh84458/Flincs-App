import React from 'react';
// import {View, Text, Image} from 'react-native';
// import {Card, CardItem} from 'native-base';
// import {deviceWidth} from '../../utility/styleHelper/appStyle';
// import {uuid} from '../../utility/constants';
// import styles from './styles';
// import {color} from '../../utility';
// import {TouchableOpacity} from 'react-native-gesture-handler';


// const ChatBox = ({userId, msg, img, onImgTap, createdAt}) => {
//   let isCurrentUser = userId === uuid ? true : false;

//   return (
//     <Card
//        transparent
//       style={{
//         //backgroundColor:'#ddd',
//         maxWidth: deviceWidth / 2 + 10,
//         alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
//       }}>
//       <View
//         style={[
         
//           isCurrentUser && {
//             // borderTopLeftRadius: 20,
//             // borderTopRightRadius: 0,
//             // backgroundColor: color.DARK_GRAY,
//             backgroundColor:'#ccc',padding:10,borderRadius:10
//           },
//         ]}>

          
//         {img ? (
//           <CardItem cardBody>
//             <TouchableOpacity onPress={onImgTap}>
//               <Image
//                 source={{uri: img}}
//                 resizeMode="cover"
//                 style={{height: 200, width: deviceWidth / 2}}
//               />
//             </TouchableOpacity>
//           </CardItem>
//         ) : (
//           //guest user messages 
//           <View     style={[styles.chatTxt, isCurrentUser && {color:'green'}]}>>
//             <Text
//               style={{color:'green'}}>
//               {msg}
              
//             </Text>
//             <Text style={{fontSize:10}}>{createdAt}</Text>
//           </View>
//         )}
//       </View>
//     </Card>
//   );
// };

// export default ChatBox;
