import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, ImageBackground, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import OctIcons from '@expo/vector-icons/Octicons'
import { BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Haptics from 'expo-haptics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkbox from 'expo-checkbox';

const NODE_URL = `http://192.168.1.4:5500`;
const navbarIconSize = 28;
const checkBoxColor = '#4630EB';
const banner = {uri : 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
const profileIcon = {uri : 'https://images.unsplash.com/photo-1678811116814-26372fcfef1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'}

axios.defaults.timeout = 0;

const Dashboard = ({navigation}) => {

    const [posts, setPosts] = useState([]);
    const [likeButtonColor, setLikeButtonColor] = useState('white');
    const [likeButtonShape, setLikeButtonShape] = useState('heart');
    const [commentBoxVisibility, setCommentBoxVisibility] = useState('none');
    const [postToComment, setPostToComment] = useState('');
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isChecboxChecked, setIsCheckboxChecked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState('none')
    
    async function logout(){
         AsyncStorage.clear();
         navigation.navigate('Login');
    }

    const fetchPosts = async () => {
        console.log('REQUEST INITIATED')
        const API_KEY_SECRET = '373ftnn5123-anshdeshraj-yd1tfnn5123'
        await axios.post(`${NODE_URL}/posts`)
        .then(res => {
            setPosts(res.data)
            console.log('REQUEST MADE TO THE SERVER')
        })
        .catch(err => console.log('UNSUCCESSFULL' , ' ' , err))
    }

    useEffect(() => {
        const preventUndo = async () => {
            const handleBackButton = () => true;
            BackHandler.addEventListener("hardwareBackPress", handleBackButton);
            return () => {
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    handleBackButton
                    );
                };
            }
      preventUndo();
    }, []);

    useFocusEffect(
        React.useCallback(  () => {
            fetchPosts();
        }, [])
        );
        
        //LIKING POST LOGIC
        async function likePost(postID){ 
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // console.log('REQUEST MADE')
           const userEmail = await AsyncStorage.getItem('user');
           const postToLike = {
            postID : postID,
            email : userEmail            
           };
            await axios.post(`${NODE_URL}/likepost`, postToLike)
            .then(res => {
                //
            })
      }

      async function commentOnPost(postID){
          setCommentBoxVisibility('flex')
          setPostToComment(postID);
          await axios.post(`${NODE_URL}/fetchcomments`, {postID : postID})
          .then(res => {
              setComments(res.data.comments)
            })
        }
        
        async function bookmarkPost(postID){
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        
        async function postComment(){
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const userEmail = await AsyncStorage.getItem('user');
        const commentObj = {
            commentedBy : userEmail,
            commentBody : commentText,
            postID : postToComment,
        };
        await axios.post(`${NODE_URL}/postcomment`, commentObj)
        .then(res => {
            setCommentText('')
            commentOnPost(postToComment);
        })
      }
    
  return (
    <>
    
    <StatusBar hidden={false} style="auto" />
    
    <ImageBackground style={styles.banner} source={banner}>
    <Text style={styles.headerText}>Latest Feed</Text>
    </ImageBackground>
            <ScrollView style={{height:'100%', backgroundColor:'#0d0d0d'}}>
        <SafeAreaView>
    <View style={{height:'100%', display:'flex', flexDirection:'column-reverse'}}>
     {posts.map((post) => (
            <View key={post._id} style={styles.postContainer}>
                <View style={styles.postMenuContainer}>
                <TouchableOpacity><Feather name='menu' size={28} color='grey'/></TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    <Image source={profileIcon} style={styles.postCreatorProfileIcon} />
                    <View style={styles.userIdentificationContainer}>
                        <Text style={styles.postCreatorName}>{post.firstName} {post.lastName}</Text>
                        <Text style={styles.postCreatorUsername}>@anshdeshraj</Text>
                    </View>
                </View>
                <Text style={styles.postTitle}>{post.postText}</Text>
                <Text style={styles.createdOn}>{post.createdOn}</Text>
                <View style={styles.interactableIconsContainer}>
                    <View styele={styles.touchablesContainer}>
                    <TouchableOpacity onPress={() => {
                        likePost(post._id);
                    }}><OctIcons name={likeButtonShape} size={25} color={likeButtonColor}/></TouchableOpacity>
                    <Text style={{color:'white', textAlign:'center', paddingVertical:7, fontWeight:700}}>{post.likes.length}</Text>
                    </View>
                    <View styele={styles.touchablesContainer}>
                    <TouchableOpacity onPress={() => {
                        commentOnPost(post._id);
                    }}><OctIcons name='comment' size={25} color='white'/></TouchableOpacity>
                    <Text style={{color:'white', textAlign:'center', paddingVertical:7, fontWeight:700}}>{post.comments.length}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        bookmarkPost(post._id);
                    }}><OctIcons name='bookmark' size={25} color='white'/></TouchableOpacity>
                </View>
            </View>
     ))}
    </View>
        </SafeAreaView>

</ScrollView>
<View style={{
    width:'100%',
    minHeight:Dimensions.get('screen').height * 0.8,
    backgroundColor:'black',
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    display:commentBoxVisibility,
}}>
        <View style={styles.commentHeaderContainer}>
        <TouchableOpacity onPress={()=>{
            setCommentBoxVisibility('none');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setCommentText('');
            fetchPosts();
        }}><Icon name="close" size={28} color="white"/></TouchableOpacity>
        <Text style={styles.commentHeader}>Comments<Text style={{color:'#fff', fontWeight:400, fontSize:18}}> ⋅ {comments.length}</Text></Text>
        </View>

            {/* <KeyboardAwareScrollView> */}
        <View style={styles.createCommentContainer}>
            <TextInput onChangeText={setCommentText} value={commentText} multiline={true} style={styles.commentInputField} placeholder='Your comment' placeholderTextColor={'grey'} />
            <TouchableOpacity onPress={() => {
                postComment();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }} style={styles.commentSendButton}><Feather name="send" size={20} color="white" /></TouchableOpacity>
        </View>
            {/* </KeyboardAwareScrollView> */}
            <ScrollView style={styles.commentBox}>
            {comments.map(comment => (
                <View style={styles.commentSubBox} key={comment._id}>
                    <View>
                        <Image source={profileIcon} style={styles.postCreatorProfileIcon} />
                    </View>
                    <View>
                    <TouchableOpacity><Text style={styles.commentedBy}>{comment.firstName} {comment.lastName}<Text style={{color:'grey', fontSize:13}}> ⋅ {comment.createdOn}</Text> </Text></TouchableOpacity>
                    <Text style={styles.commentBody}>{comment.commentBody}</Text>
                    <View style={styles.commentSharebalesBox}>
                            <TouchableOpacity onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }} style={styles.commentSharebales}><OctIcons size={15} color="grey" name='heart'/></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }} style={styles.commentSharebales}><OctIcons size={15} color="grey" name='reply'/></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setIsModalVisible('flex')
                            }} style={styles.commentSharebales}><OctIcons size={15} color="grey" name='report'/></TouchableOpacity>
                    </View>
                    </View>
                </View>
            ))}
            </ScrollView>
            <View style={{height:100, backgroundColor:'transparent'}}></View>
    </View>
    <View style={[styles.modalContainer, {display:isModalVisible}]}>
        <View style={styles.modalHeaderBox}><Text style={styles.modalHeader}>Report</Text></View>
            <View style={styles.reportOptionsBox}>
                <View style={styles.reportOptionSubBox}>
                    <View style={styles.checkBoxOption}>
                    <Checkbox style={styles.checkbox} color={isChecboxChecked ? checkBoxColor : undefined} value={isChecboxChecked} onValueChange={setIsCheckboxChecked} />
                    <Text style={styles.checkBoxLabel}>Hate speech towards someone else</Text>
                    </View>
                    <View style={styles.checkBoxOption}>
                    <Checkbox style={styles.checkbox} color={isChecboxChecked ? checkBoxColor : undefined} value={isChecboxChecked} onValueChange={setIsCheckboxChecked} />
                    <Text style={styles.checkBoxLabel}>Hate speech towards me</Text>
                    </View>
                    <View style={styles.checkBoxOption}>
                    <Checkbox style={styles.checkbox} color={isChecboxChecked ? checkBoxColor : undefined} value={isChecboxChecked} onValueChange={setIsCheckboxChecked} />
                    <Text style={styles.checkBoxLabel}>Racist Comment</Text>
                    </View>
                    <View style={styles.checkBoxOption}>
                    <Checkbox style={styles.checkbox} color={isChecboxChecked ? checkBoxColor : undefined} value={isChecboxChecked} onValueChange={setIsCheckboxChecked} />
                    <Text style={styles.checkBoxLabel}>Sexual Comment</Text>
                    </View>
                </View>
            </View>
                <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', margin:40, borderTopColor:'#1c1c1c', borderTopWidth:1}}>
                    <TouchableOpacity onPress={() => setIsModalVisible('none')}>
                    <Text style={{color:'red', fontWeight:700, marginTop:10, fontSize:18}}>Cancel</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity>
                    <Text style={{color:'white', fontWeight:700, fontSize:18, marginTop:10}}>Submit</Text>
                    </TouchableOpacity>
                </View>
    </View>

<View style={{height:100, backgroundColor:'#0d0d0d'}}></View>
    <View style={styles.navBar}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')
         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}} style={styles.navButton}>
            <Feather style={styles.navBarIcon} name="home" size={navbarIconSize} color="#006eff" />
            <Text style={[styles.navbarText, {color:'#006eff'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{navigation.navigate('Explore')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }} style={styles.navButton}>
            <Feather style={styles.navBarIcon} name="compass" size={navbarIconSize} color="white" />
            <Text style={styles.navbarText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddPost') 
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}} style={styles.navButton}>
            <Feather style={styles.navBarIcon} name="plus-circle" size={navbarIconSize} color="white" />
            <Text style={styles.navbarText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('Inbox')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }} style={styles.navButton}>
            <Feather style={styles.navBarIcon} name="bell" size={navbarIconSize} color="white" />
            <Text style={styles.navbarText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('Profile')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) }} style={styles.navButton}>
            <Icon style={styles.navBarIcon} name="user" size={navbarIconSize} color="white" />
            <Text style={styles.navbarText}>Profile</Text>
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
    paddingBottom:5,
    backgroundColor:'#0d0d0d',
    },
    navButton:{
        paddingHorizontal:17,
        marginBottom:20,
        paddingTop:15
    },
    headerText:{
        fontSize:50,
        fontWeight:900,
        marginHorizontal:20, 
        color:'#fff',
        position:'absolute',
        bottom:6,
        shadowColor:'black',
        shadowOpacity:.6,
        shadowOffset:{width:0, height:0}
    },
    banner:{
        height:Dimensions.get('screen').height*0.14,
        resizeMode:'cover'
    },
    postContainer:{
        backgroundColor:'#121212',
        marginVertical:10,
        padding:20,
        width:'90%',
        alignSelf:'center',
        borderRadius:15,
        shadowColor:'black',
        shadowOpacity:.8,
        shadowOffset:{width:0, height:0},
    },
    postTitle:{
        color:'white',
        fontSize:17,
        fontWeight:300
    },
    createdOn:{
        fontSize:9,
        color:'grey',
        paddingVertical:10
    },
    interactableIconsContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
    },
    postMenuContainer:{
        position:'absolute',
        right:0,
        padding:20
    },
    postCreatorName :{
        color:'#006eff',
        fontWeight:700,
        fontSize:20,
    },
    postCreatorProfileIcon:{
        height:50,
        width:50,
        resizeMode:'cover',
        backgroundColor:'grey',
        marginBottom:20,
        marginRight:10,
        borderRadius:8
    },
    userContainer :{ 
        display:'flex',
        flexDirection:'row',
    },
    userIdentificationContainer:{
        flex:1,
        justifyContent:'center',
    },
    postCreatorUsername: {
        paddingBottom:20,
        color:'grey',
        fontSize:12
    },
    commentContainer:{
      
    },
    commentHeader: {
        textAlign:'center',
        color:'white',
        fontSize:25,
        fontWeight:900
    },
    commentHeaderContainer :{
        display:'flex',
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        padding:20,
        width:'100%',
        borderBottomColor:'grey',
        borderBottomWidth:.5
    },
    createCommentContainer :{ 
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#0d0d0d',
        padding:20
    },
    commentInputField:{
        fontSize:15,
        color:'#f2f2f2',
       width:'92%'
    },
    commentSendButton:{
        width:'8%',
        marginLeft:10
    },
    commentWarningContainer:{
        width:'100%',
        flex: 1.5,
        alignSelf:'center'
    },
    commentBox : {
        backgroundColor:'transparent',
        width:'95%',
        position:'relative',
        height:400,
        paddingHorizontal:10,
        display:'flex',
        flexDirection:'column',
    },
    commentSubBox:{
        padding:5,
        marginTop:10,
        width:'90%',
        paddingBottom:10,
        display:'flex',
        flexDirection:'row'
    },
    commentBody:{
        fontSize:15,
        color:'white',
        marginTop:7
    },
    commentedBy :{
        fontSize:18,
        color:'#006eff'
    },
    commentSharebalesBox: {
        display:'flex',
        flexDirection:'row',
        paddingTop:15
    },
    commentSharebales :{
        marginRight:40
    },
    modalContainer :{
        height:310,
        width:300,
        backgroundColor:'#0d0d0d',
        position:'absolute',
        alignSelf:'center',
        marginTop:Dimensions.get('screen').height*.3,
        borderRadius:20,
        shadowColor:'#1c1c1c',
        shadowOpacity:.8,
        shadowOffset:{width:0, height:0}
    },
    modalHeader:{
        color:'white',
        textAlign:'center',
        padding:10,
        fontWeight:700,
        fontSize:18
    },
    modalHeaderBox:{
        borderBottomColor:'#1c1c1c',
        borderBottomWidth:1
    },
    checkBoxOption:{
        display:'flex',
        flexDirection:'row',
        marginTop:25,
        marginLeft:20
    },
    checkBoxLabel:{
        color:'grey',
        paddingHorizontal:10,
        paddingVertical:2
    },
    navbarText:{
        color:'white',
        marginTop:5,
        textAlign:'center',
        fontSize:10
    },
    navBarIcon:{
        alignSelf:'center',
        display:'flex'
    }
})

export default Dashboard;



