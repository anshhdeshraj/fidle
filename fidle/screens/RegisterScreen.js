import { Dimensions, StyleSheet,Text, View , ImageBackground, TextInput, SafeAreaView, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, StatusBar, } from 'react-native';
import React from 'react';
import { useState } from 'react';
const image = { uri: 'https://images.unsplash.com/photo-1663517769012-ef0422b99924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80' };


export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState();
    const [country, setCountry] = useState('');
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [year, setYear] = useState();
    const [passwordError, setPasswordError] = useState('');
    const [buttonStatus, setbuttonStatus] = useState('REGISTER')

    const handleLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError('');
        }
    
        if (password.length < 8) {
          setPasswordError('Password must be at least 8 characters');
        } else {
          setPasswordError('');
        }
    
        if (emailRegex.test(email) && password.length >= 8) {
            
            setbuttonStatus('CREATING ACCOUNT');
            navigation.navigate('Login')
            
        }
      };
  
      
  return (
    <>
      <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <ScrollView style={{height:Dimensions.get('screen').height}}>
        <SafeAreaView>
          <Image style={{height:300, width:300}} source={require('../assets/logo.png')}  />
          <KeyboardAvoidingView>
          <TextInput style={{color:'#fff', fontSize:18, marginBottom:5, borderBottomColor:'#fff', borderBottomWidth:1, padding:8,}} placeholderTextColor="grey" placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          />
           {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
         
          <TextInput style={{color:'#fff', fontSize:18, borderBottomColor:'#fff', borderBottomWidth:1, padding:8, marginTop:30}} placeholder='Password' placeholderTextColor="grey" secureTextEntry
          value={password}
          onChangeText={setPassword}
          />
           {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

           <TextInput style={{color:'#fff', fontSize:18, marginTop:30, borderBottomColor:'#fff', borderBottomWidth:1, padding:8,}} placeholderTextColor="grey" placeholder='Phone Number'
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          keyboardType="phone-pad"
          />
<View style={styles.datePicker}>

<TextInput style={{color:'#fff', fontSize:18, marginTop:30, borderBottomColor:'#fff', borderBottomWidth:1, padding:8, minWidth:40, textAlign:'center'}} placeholderTextColor="grey" placeholder='Day'
          value={day}
          onChangeText={setDay}
          autoCapitalize="none"
          keyboardType="phone-pad"
          />

<TextInput style={{color:'#fff', fontSize:18, marginTop:30, borderBottomColor:'#fff', borderBottomWidth:1, padding:8,minWidth:90, textAlign:'center'}} placeholderTextColor="grey" placeholder='Month'
          value={month}
          onChangeText={setMonth}
          autoCapitalize="none"
          keyboardType="phone-pad"
          />

<TextInput style={{color:'#fff', fontSize:18, marginTop:30, borderBottomColor:'#fff', borderBottomWidth:1, padding:8, minWidth:90, textAlign:'center'}} placeholderTextColor="grey" placeholder='Year'
          value={year}
          onChangeText={setYear}
          autoCapitalize="none"
          keyboardType="phone-pad"
          />
          </View>




          <TouchableOpacity onPress={handleLogin} style={{borderColor:'#fff', borderWidth:1, borderRadius:0, padding:8, marginTop:50}}><Text style={{color:'#fff', fontSize:18, textAlign:'center' }}>{buttonStatus}</Text></TouchableOpacity>
          <View style={{color:'#fff', display:'flex', flexDirection:'row', marginTop:50, justifyContent:'center'}}>
            <Text style={{color:'#fff', marginRight:4,}}>Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')} ><Text style={{color:'#fff', textDecorationLine:'underline'}}>Login</Text></TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
        </ScrollView>
      </ImageBackground>
      </View>
      </>
  )
}

const styles = StyleSheet.create({
    container: {
     height:Dimensions.get('screen').height,
     width:'100%',
    },
    image: {
      height:Dimensions.get('screen').height + 200,
      width:'100%',
      resizeMode: 'cover',
      alignItems:'center'
    },
    errorText: {
      color: '#f00',
      marginTop: 5,
    },
    datePicker:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    dob_fields:{
        minWidth:90
    }
  });