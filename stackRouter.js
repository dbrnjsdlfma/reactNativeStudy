import React , { useState, useEffect }from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { GoogleSignin } from '@react-native-google-signin/google-signin'

import LandingScreen from './screens/LandingScreen'
import App from './App'

const Stack = createNativeStackNavigator()

function stackRouter() {
    // const [isLoggedIn , setIsLoggedIn] = useState(null)
    // checkLoginState = async () => {
    //     const isSigningIn = await GoogleSignin.isSignedIn()
    //     setIsLoggedIn(isSigningIn)
    // }
    // useEffect( () => {
    //     checkLoginState()
    // }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Landing'
                screenOptions={{headerShown : false}}>
                    <Stack.Screen name='Landing' component={LandingScreen}/>
                    <Stack.Screen name='App' component={App}/>
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default stackRouter