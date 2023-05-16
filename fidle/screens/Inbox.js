import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const banner = {uri : 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}


const Inbox = ({navigation}) => {
  return (
    <>
    <ImageBackground style={styles.banner} source={banner}>
    <Text style={styles.headerText}>Inbox</Text>
    </ImageBackground>
    <View style={styles.navBar}>
        <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={styles.navButton}>
            <Feather name="home" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Explore')} style={styles.navButton}>
            <Feather name="compass" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddPost')} style={styles.navButton}>
            <Feather name="plus-circle" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Inbox')} style={styles.navButton}>
            <Feather name="bell" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={styles.navButton}>
            <Icon name="user" size={32} color="white" />
        </TouchableOpacity>
    </View>
    
    </>
  )
}

const styles = StyleSheet.create({
    logoutText:{
        color:'red',
        textAlign:'center',
        padding:10,
        fontSize:20 
    },
    logoutButton:{
        backgroundColor:'#ffc8c4',
        display:'flex',
        width:200,
        margin:50
    },
    navBar:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        borderTopColor: "grey",
        borderTopWidth: 0.6,
        width:'100%',
        margin:0,
        backgroundColor:'black',
        paddingBottom:1
    },
    navButton:{
        paddingHorizontal:25,
        paddingVertical:20
    },
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
    }
})

export default Inbox