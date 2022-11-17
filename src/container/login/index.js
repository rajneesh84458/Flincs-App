import React, {useContext, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,Dimensions
} from 'react-native';
('react-native-keyboard-aware-scroll-view');

import {InputField, RoundCornerButton, Logo} from '../../component';
import {globalStyle, color, appStyle} from '../../utility';
import {Store} from '../../context/store';
import {LOADING_START, LOADING_STOP} from '../../context/actions/type';
import {setAsyncStorage, keys} from '../../asyncStorage';

import {setUniqueValue, keyboardVerticalOffset} from '../../utility/constants';
import {LoginRequest} from '../../network';
import { ScrollView } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window')
export default ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  const [hidePassword, setHidePass] = useState(true);
  const [logo, toggleLogo] = useState(true);
  const {email, password} = credential;

  const setInitialState = () => {
    setCredential({email: '', password: ''});
  };
  // * HANDLE ON CHANGE
  const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
  };

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  //   * ON LOGIN PRESS
  const onLoginPress = () => {
    Keyboard.dismiss();
    if (!email) {
      alert('Email is required');
      return true
    } 
    else if(!validateEmail(email)){
      alert("Please enter valid email")
    }
    else if (!password) {
      alert('Password is required');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then(res => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert('User does not exist with this email ');
            return res;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          setInitialState();
          navigation.navigate('Dashboard');
        })
        .catch(err => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };
  // * ON INPUT FOCUS

  const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };
  // * ON INPUT BLUR

  const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  };

  const setPasswordVisibility = () => {
    setHidePass(!hidePassword);
  };

  return (
    // <KeyboardAvoidingView
    //   keyboardVerticalOffset={keyboardVerticalOffset}
    //   behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    //   style={[globalStyle.flex1]}>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ImageBackground style={{width,height}} source ={require('../../assets/images/rainfall1.gif')}>
    <ScrollView contentContainerStyle={{width,height}}>

   
       
        
         
          <View style={[globalStyle.flex5, globalStyle.sectionCentered]}>
            <InputField
              placeholder="Enter email"
              value={email}
              onChangeText={text => handleOnChange('email', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
              autoCaptailize="none"
              keyboardShouldPersistTaps='handled'

            />

    
            <View style={styles.textBoxContainer}>
              <TextInput
                placeholder="Enter Password"
                underlineColorAndroid="transparent"
                secureTextEntry={hidePassword}
                value={password}
                autoCaptailize ="none"
                onChangeText={text => handleOnChange('password', text)}
                style={styles.textBox}
                keyboardShouldPersistTaps='handled'
                
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touachableButton}
                onPress={() => setPasswordVisibility()}>
                <Image
                  source={
                    hidePassword
                      ? require('../../assets/images/hide.png')
                      : require('../../assets/images/eye.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
            <Text onPress ={()=>navigation.replace('forgot')} style={[styles.textBoxContainer,{color:'white',fontSize:17,textAlign:'right',right:17}]}>Forgot Password ?</Text>

           
            <RoundCornerButton title="Login" onPress={() => onLoginPress()} />
            <RoundCornerButton
              title="SignUp"
              onPress={() => {
                setInitialState();
                navigation.navigate('SignUp');
              }}
            />

          </View>
      
       
      
        </ScrollView>
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 10,
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textBox: {
    paddingLeft: 16,
    backgroundColor: 'white',
    width: '90%',
    color: "#005792",
    height: appStyle.fieldHeight,
    alignSelf: 'center',
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,

  },
  touachableButton: {
    position: 'absolute',
    right: 22,
    height: 25,
    width: 25,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});
