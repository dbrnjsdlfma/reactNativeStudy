import React , { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button,
Image, TouchableHighlight } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { setsEqual } from "chart.js/dist/helpers/helpers.core";

function SettingScreen({ navigation }) {
    const [userInfo, setUserInfo ] = useState(null)
    const [isSigningIn, setIsSigningIn] = useState(false)

    const googleSigninConfigure = () => {
        GoogleSignin.configure({
            webClientId: '142901713953-crom520kbm1vh4vpnep31b9hiqbkaj35.apps.googleusercontent.com' ,
        })
    }
    const signOutWithGoogle = async () => {
        try {
            await GoogleSignin.signOut()
            setUserInfo(null)
            navigation.navigate('Landing')
        } catch (error) {
            console.error('failed to logout, error : ' , error)
        }
    }
    // async function onGoogleButtonPress() {
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog : true })

    //     const { idToken } = await GoogleSignin.signIn();
    //     console.log("구글 토큰 : " , idToken)

    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    //     return auth().signInWithCredential(googleCredential)
    // }
    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser()
        setUserInfo(currentUser)
    }
    useEffect( () => {
        googleSigninConfigure()
        getCurrentUser()
    } , [])
    return (
        <SafeAreaView style={styles.block}>
            <StatusBar backgroundColor='#a8c8ffff'></StatusBar>
            <View>
                {userInfo && userInfo.user && 
                    (<View style={styles.profileInfo}>
                        <View>
                            <Image source={{uri: userInfo.user.photo}} style={styles.profileImg}/>
                        </View>
                        <View style={styles.profileText}>
                            <Text style={[styles.info, {fontWeight : 'bold' , fontSize : 20}]}>사용자 이름 - {userInfo.user.name}</Text>
                            <Text style={styles.info}>사용자 이메일 - {userInfo.user.email}</Text>
                            {/* <Text style={styles.info}>사용자 아이디 - {userInfo.user.id}</Text> */}
                        </View>
                    </View>)}
            </View>
            <TouchableHighlight onPress={signOutWithGoogle} style={styles.logoutBtnWrapper}>
                <View style={[styles.logoutBtn , {backgroundColor: "#a8c8ffff"}]}>
                    <Text style={styles.logoutBtnText}>구글 로그아웃</Text>
                </View>
            </TouchableHighlight>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    block : {
        flex : 1 ,
        justifyContent : 'flex-start' ,
    } , 
    profileInfo : {
        marginHorizontal : 'auto' ,
        flexDirection : 'row' ,
        alignItems : 'center' , 
        justifyContent : 'center' ,
        padding : 20 ,
        backgroundColor : '#eee' ,
    } ,
    profileText : {
        // backgroundColor : '#eee' ,
        borderRadius : 10 , 
        padding : 20 ,
    } ,
    info : {
        fontSize : 15 , 
        fontWeight : 'bold' ,
    } ,
    profileImg : {
        width : 50 ,
        height : 50 ,
        borderRadius : 25 ,
        marginLeft : 'auto' ,
        marginRight : 'auto' ,
    } ,
    logoutBtnWrapper : {
        flexDirection : 'row' ,
        position : 'absolute' ,
        bottom : 0 ,
    } ,
    logoutBtn : {
        flex : 1 ,
        height : 35 ,
        justifyContent : 'center' ,
        alignItems : 'center' , 
        overflow : "hidden" , 
    } ,
    logoutBtnText : {
        color : '#fff' ,
        letterSpacing : 3 ,
        fontWeight : 'bold' ,
        fontSize : 15 ,
        textAlign : 'center' ,
    }
})
export default SettingScreen