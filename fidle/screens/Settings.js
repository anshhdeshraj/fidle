import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather'


const Settings = ({navigation}) => {
  return (
    
    <>
    
    <View style={styles.navBar}>
        <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={styles.navButton}>
            <Feather name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Explore')} style={styles.navButton}>
            <Feather name="compass" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddPost')} style={styles.navButton}>
            <Feather name="plus-circle" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Inbox')} style={styles.navButton}>
            <Feather name="bell" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={styles.navButton}>
            <Icon name="user" size={32} color="black" />
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
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      position:'absolute',
      bottom:10,
      alignSelf:'center',
     borderTopColor:'grey',
     borderTopWidth:.6
      
  },
  navButton:{
      paddingHorizontal:20,
      paddingVertical:20
  },
  headerText:{
      fontSize:50,
      fontWeight:900,
      marginHorizontal:40
  }
})

export default Settings