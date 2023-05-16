import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import React, {useState} from "react";
import Icon from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';




const AXIOS_URL = 'http://192.168.1.4:5500';



const userAvatar = {uri:'https://images.unsplash.com/photo-1678664882171-891c036c5f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'}

const Profile = ({ navigation }) => {

    const [userEmail, setUserEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gradient, setGradient] = useState('#0d0d0d');
    const [followers, setFollowers] = useState(127);
    const [following, setFollowing] = useState(69)

    useFocusEffect(
        React.useCallback( () => {
            const getUser = async () => {
                const email = await AsyncStorage.getItem('user');
                const userData = {email : email, avatar : userAvatar}
                await axios.post(`${AXIOS_URL}/user`, userData)
                .then(response => {
                  setUserEmail(response.data.user.email);
                  setFirstName(response.data.user.firstName);
                    setLastName(response.data.user.lastName);
                    const color_1 = response.data.gradient.vibrant[0];
                    setGradient(`${color_1}`);
                    // console.log(response.data.gradient)
                    
                  })
                    .catch(err => console.log(err))
                  }    
            getUser();
        }, [])
      );

  return (


    <>
    <View style={styles.BannerContainer}>
     
      <LinearGradient  colors={[gradient, '#0d0d0d']} style={styles.banner}>
      <TouchableOpacity onPress={()=> {alert('Change Profile Photo')}}>
        <View style={styles.avatarShadow}>
        <Image source={userAvatar} style={styles.avatarImage} />
        </View>
      </TouchableOpacity>
        <Text style={styles.userNameText}>{firstName} {lastName}</Text>
        <Text style={{fontSize:15, color:'grey', padding:8}}>@anshdeshraj</Text>
      </LinearGradient>
    </View>
    <ScrollView style={styles.profileContainer}>
     <View style={styles.influenceContainer}>
        <View style={styles.followContainer}>
          <Text style={styles.influenceText}>{followers}</Text>
          <Text style={styles.influenceHeaders}>followers</Text>
        </View>
        <View style={styles.followContainer}>
        <Text style={styles.influenceText}>{following}</Text>
        <Text style={styles.influenceHeaders}>following</Text>
        </View>
     </View>
    </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.navButton}
        >
          <Feather name="home" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Explore")}
          style={styles.navButton}
        >
          <Feather name="compass" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPost")}
          style={styles.navButton}
        >
          <Feather name="plus-circle" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Inbox")}
          style={styles.navButton}
        >
          <Feather name="bell" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.navButton}
        >
          <Icon name="user" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoutText: {
    color: "red",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: "#ffc8c4",
    display: "flex",
    width: 200,
    margin: 50,
  },
  navBar: {
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
    backgroundColor:'#0000',
    paddingBottom:1
  },
  navButton: {
    paddingHorizontal: 17,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 900,
    marginHorizontal: 40,
  },
  banner:{
    height: (Dimensions.get("screen").height)*.45,
    width: "100%",
    resizeMode: "cover",
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  avatarShadow:{
      shadowColor: '#202020',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 5,
  },
  profileContainer:{
    height:Dimensions.get("screen").height,
    paddingTop:30,
    paddingHorizontal:50,
    backgroundColor:'#0d0d0d',
  },
  avatarImage:{
    resizeMode: "cover",
    height:200,
    width:200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,    
    borderRadius:12,
  },
  BannerContainer:{
    color:'#fff',
  },
  userNameText:{
    color:'white',
    textAlign:'center',
    fontSize:35,
    fontWeight:900,
    shadowColor:'#1f1f1f',
    shadowOpacity:1,
    shadowOffset:{height:0, width:0},
    position:'absolute',
    bottom:10
  },
  influenceContainer:{
    display:'flex',
    justifyContent:'space-around',
    flexDirection:'row'
  },
  influenceText:{
    color:'white',
    fontSize:25,
    fontWeight:900,
    textAlign:'center',
    padding:10
  },
  followContainer:{
    display:'flex',
    flexDirection:'column',
  },
  influenceHeaders:{
    color:'white',
    fontSize:15,
    textAlign:'center'
  }
});

export default Profile;


