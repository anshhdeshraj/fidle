import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { BlurView } from 'expo-blur';
import axios from "axios";
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const image = {
  uri: "https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=564&q=80",
};

const NODE_URL = 'http://192.168.1.4:5500';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginStatus, setLoginStatus] = useState("LOGIN");
  const [showPassword, setShowPassword] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState('Show Password');

  
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        if(token !== null) {
          navigation.navigate('Dashboard');
          
      }
      } catch(e) {
        navigation.navigate('Login')
      }
    }
    getToken();
  },[]);


  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setLoginStatus('LOGIN');
    } else {
      setEmailError("");
      setLoginStatus('LOGIN');

    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoginStatus('LOGIN');
    } else {
      setPasswordError("");
      setLoginStatus('LOGIN');
    }

    if (emailRegex.test(email) && password.length >= 8) {
      setLoginStatus('LOGGING IN...')
      const user = {
        email : email,
        password :password
      };
      const postCredentials = async () =>{
        try{
          await axios.post(`${NODE_URL}/login`, user)
          .then(res=>{
         const data = res.data.msg;
         const success = res.data.success
         const token = uuid.v4();
            const typeOfError = res.data.type;
            if(typeOfError == 'email'){
              setEmailError(data);
              setLoginStatus('LOGIN');
            }else if (typeOfError == 'password'){
              setPasswordError(data);
              setLoginStatus('LOGIN');
            }
            if (success == 'true'){
              const storeData = async (authToken) => {
                try {
                  await AsyncStorage.setItem('authToken', authToken.toString())
                  await AsyncStorage.setItem('user', email.toString())
                } catch (e) {
                  //
                }
              }
              storeData(token);
              navigation.navigate('Dashboard');
              setLoginStatus('LOGIN');
            }else{
              navigation.navigate('Login')
            }
        })
          
        }catch(error){
          console.log(error)
        }
      }
      postCredentials();
    }

  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <ScrollView style={{ height: Dimensions.get("screen").height }}>
            <SafeAreaView>
              <KeyboardAwareScrollView
              >
                <Image
                  style={{ height: 300, width: 300 }}
                  source={require("../assets/logo.png")}
                />
                                <BlurView intensity={80} style={styles.textField} tint="dark">
                <TextInput
                style={styles.inputText}
                  placeholderTextColor="#c2c0c0"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  />
                  </BlurView>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
                <BlurView intensity={80} style={styles.textField}
                tint="dark"
                >
                <TextInput
                style={styles.inputText}
                  placeholder="Password"
                  placeholderTextColor="#c2c0c0"
                  secureTextEntry={showPassword}
                  value={password}
                  onChangeText={setPassword}
                  />
                  </BlurView>
                  <TouchableOpacity onPress={() => {
                    if(showPassword == false) {
                      setShowPassword(true);
                      setPasswordVisible('Show Password');
                    }
                    else{
                      setShowPassword(false);
                      setPasswordVisible('Hide Password');
                    }
                  }}><Text style={styles.passwordHideText}>{passwordVisible}</Text></TouchableOpacity>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <TouchableOpacity
                  onPress={handleLogin}
                  style={styles.loginButton}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 18, textAlign: "center", fontWeight:700 }}
                  >
                    {loginStatus}
                  </Text>
                </TouchableOpacity>
                <View style={styles.loginView}>
                  <Text style={{ color: "#fff", marginRight: 4 }}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={{ color: "#fff", textDecorationLine: "underline" }}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </SafeAreaView>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: "100%",
  },
  image: {
    height: Dimensions.get("screen").height,
    width: "100%",
    resizeMode: "cover",
    alignItems: "center",
    marginBottom: -20,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  textField: {
    marginBottom: 5,
    padding: 10,
    marginTop:20,
  },
  inputText:{
    color: "#fff",
    fontSize: 18,
    borderRadius:20
  },

  loginView: {
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
  },
  loginButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 0,
    padding: 5,
    marginTop: 30,
  },
  passwordHideText:{
    textAlign:'right',
    color:'#fff',
    textDecorationLine:'underline'
  }
});
