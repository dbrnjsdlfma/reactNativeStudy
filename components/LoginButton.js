import React, { useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import * as KakaoLogin from '@react-native-seoul/kakao-login'

function LoginButton({ navigation }) {
    const googleSigninConfigure = () => {
        GoogleSignin.configure({
            webClientId : '142901713953-crom520kbm1vh4vpnep31b9hiqbkaj35.apps.googleusercontent.com' ,
        })
    }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfoFromGoogle = await GoogleSignin.signIn()

            if(userInfoFromGoogle) {
                console.log('사용자 연락처 : ' , userInfoFromGoogle.user)
                navigation.navigate('App')
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow')
                Alert.alert('user cancelled the login flow')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('sign in is in progress already')
                Alert.alert('sign in is in progress already')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated')
                Alert.alert('play services not available or outdated')
            } else {
                console.log('some other error happened')
                Alert.alert('some other error happened')
            }
        }
    }
    const KakaoIsLogin = async () => {
        await KakaoLogin.login().then((result) => {
            console.log("Login Success", JSON.stringify(result));
            // getProfile()
        }).catch((error) =>{
            console.log(`Login Fail(code:${error.code})`, error.message);
        })
    }

    // const getProfile = () => {
    //     KakaoLogins.getProfile().then((result) => {
    //         console.log("GetProfile Success", JSON.stringify(result));
    //     }).catch((error) => {
    //         console.log(`GetProfile Fail(code:${error.code})`, error.message);
    //     });
    // }

    useEffect( () => {
        googleSigninConfigure()
    }, [])

    return (
        <>
        <View style={styles.buttonWrapper}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInWithGoogle}
                disabled={false}
                style={styles.signInBtn} />
        </View>
        <View>
            <Button style={styles.signInBtn} onPress={KakaoIsLogin} title={'카카오 로그인'}>
            </Button>
        </View>
        </>
    )
}

export default LoginButton

const styles = StyleSheet.create({
    buttonWrapper : {
        position : 'absolute' ,
        left : 0 , right : 0 ,
        bottom : 100 ,
    } ,
    signInBtn : {
        marginTop : 10 ,
        marginLeft : 'auto' ,
        marginRight : 'auto' ,
    } ,
})