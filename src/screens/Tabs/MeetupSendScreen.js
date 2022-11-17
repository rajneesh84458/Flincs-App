import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,Image,Share
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
import {Auth, database} from '../../Setup';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LocalImages from '../../utility/localImages';

export default function MeetupSendScreen() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyText, setEmptyText] = useState(null);

  useEffect(() => {
    try {
      fetchMeetup();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchMeetup = async () => {
    const mydata = await database()
      .ref('users/' + Auth().currentUser.uid)
      .child('/meetups');
    return mydata.on('value', snapshot => {
      let data = snapshot.val();
      if (data) {
        let items = Object.values(data);
        setLoading(false);
        setDataSource(items);
      } else {
        //return null;
        setLoading(true);
        setEmptyText('You ,ve not made any Meetups yet');
      }
    });
  };

  const renderMeetup = item => {
    return (
      <View
        style={{
          width: width * 0.9,
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
        <View style={{flex: 1, padding: 5}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight:'bold',
              color:'#ff6768',
              padding: 10,
            }}>
            {item.title}
          </Text>
          <Text style={styles.text}>{item.contactName}</Text>

          <Text style={styles.text}>
            {new Date(item.choseStartDate).toDateString()}
          </Text>
          <Text style={styles.text}>{item.chosetime}</Text>
          <Text style={[styles.text, {fontSize: 12, marginTop: 10}]}>
            {item.description}
          </Text>
          <TouchableOpacity onPress={()=>myCustomShare(item)} style={styles.menuStyle}>
          <Image source={LocalImages.SHARE} style={styles.iconStyle} />
          {/* <Text style={styles.iconText}> Share the App </Text> */}
        </TouchableOpacity>
        </View>
      </View>
    );
  };


 const  myCustomShare = async (item) => {
  
  

    
   try {
     const result = await Share.share({
       
       message: `Hey,  ${item.contactName}  would like you join flincs \n https://flincsapplicationv1.page.link/rniX`, 
   
     });
 
     if (result.action === Share.sharedAction) {
       if (result.activityType) {
         // shared with activity type of result.activityType
       } else {
         // shared
       }
     } else if (result.action === Share.dismissedAction) {
       // dismissed
     }
   } catch (error) {
     alert(error.message);
   }
 
 }
  return (
    <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
    
        {loading ? (
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 20,}}>{emptyText}</Text>
          </View>
        ) : (
          <FlatList
            data={dataSource}
            renderItem={({item}) => renderMeetup(item)}
            keyExtractor={(item, index) => item.Id}
          />
        )}
    
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    
    letterSpacing: 0.2,
  },
  text: {
   
    marginBottom: 5,
    fontSize: 15,
  },
  menuStyle: {
    alignItems:'flex-end'
  },
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    margin: 5,
    tintColor:'#3399FF'

  },
});
