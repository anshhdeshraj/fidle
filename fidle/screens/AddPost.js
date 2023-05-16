import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, ScrollView, TextInput, Alert } from 'react-native'
import React, {useEffect, useState} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const banner = {uri : 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
const NODE_URL = `http://192.168.1.4:5500`

const AddPost = ({navigation}) => {

    const [postText, setPostText] = useState('');
    const [postError, setPostError] = useState('');

    async function post() {
        const email = await AsyncStorage.getItem('user');
        const postData = {
            article: postText,
            writer: email
        }; 
        try {
            await axios.post(`${NODE_URL}/createarticle`, postData)
                .then(res => {
                    navigation.navigate('Dashboard');
                });

        } catch (error) {
            return console.log('Something went wrong in AddPost.js file', error)
        }
    }

  return (
    <>
    <ImageBackground style={styles.banner} source={banner}>
    <Text style={styles.headerText}>Add Post</Text>
    </ImageBackground>
    <ScrollView style={{height:'100%', backgroundColor:'#0d0d0d'}}>
        <Text style={styles.phraseText}>Don't think just write...</Text>
        <KeyboardAwareScrollView>
        <View style={styles.notepadContainer}>
            <TextInput
             value={postText}
             onChangeText={setPostText}
            multiline={true} style={styles.notepad} placeholder="Type Here..." placeholderTextColor={'grey'} />
            <Text style={styles.postErrorText}>{postError}</Text>
        </View>
        </KeyboardAwareScrollView>
    <View style={styles.menuContainer}>
        <TouchableOpacity onPress={post} style={styles.postButton}><Text style={styles.postText}>POST</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
             Alert.alert(
                'Discard Changes?',
                'Leaving this page will delete your draft',
                [
                  { text: 'Discard', onPress: () => navigation.navigate('Dashboard'),  style: 'destructive' },
                  {
                    text: 'Cancel',
                   
                  },
                ],
                { cancelable: false }
              );
        }} style={styles.cancelButton}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
    </View>
    </ScrollView>
    
    </>
  )
}


const styles = StyleSheet.create({
    headerText:{
        fontSize:50,
        fontWeight:900,
        marginHorizontal:20, 
        color:'#fff',
        position:'absolute',
        bottom:10,
        shadowColor:'black',
        shadowOpacity:.6,
        shadowOffset:{width:0, height:0}
    },
    banner:{
        height:Dimensions.get('screen').height*0.15,
        resizeMode:'cover'
    },
    phraseText:{
        fontSize:25,
        color:'#fff',
        paddingHorizontal:20,
        paddingVertical:40,
        fontWeight:800
    },
    notepadContainer:{},
    notepad:{
        fontSize:15,
        backgroundColor:'transparent',
        paddingHorizontal:20,
        width:'90%',
        alignSelf:'center',
        color:'white',
        height:'auto',
        marginBottom:30
    },
    postButton:{
        alignItems:'center',
        backgroundColor:'#fff',
        width:'90%',
        alignSelf:'center',
        borderRadius:5,
        paddingVertical:5,
        marginTop:20
    },
    cancelButton:{
        alignItems:'center',
        backgroundColor:'#b3090f',
        width:'90%',
        alignSelf:'center',
        borderRadius:5,
        paddingVertical:5,
        marginTop:20,
        marginBottom:50
    },
    postText:{
        color:'#0d0d0d',
        fontSize:18,
        fontWeight:700,
    },
    cancelText:{
        color:'#fff',
        fontSize:18,
        fontWeight:700,
    },
    postErrorText:{
        textAlign:'right',
        color:'red',
        fontSize:14,
        paddingVertical:2,
        width:'90%'
    }
})

export default AddPost 