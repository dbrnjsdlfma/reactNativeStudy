import React, { useState ,useEffect} from 'react' 
import { SafeAreaView, View, Text, StyleSheet, 
    StatusBar, ScrollView, Dimensions, ImageBackground } from 'react-native'
import LandingPage from '../components/LandingPage'
import landingData from '../data/landingData'
import LoginButton from '../components/LoginButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

function LandingScreen({navigation}) {
    const { width, height} = Dimensions.get('window')
    const [currentPageIndex , setCurrentPageIndex] = useState(0)
    console.log('페이지 번호 : ', currentPageIndex)
    const setCurrentPage = (e) => {
        const { x } = e.nativeEvent.contentOffset
        console.log("스크롤 위치: ", x, "화면너비: ", width)
        const nextPageIndex = Math.ceil(x / width)
        console.log(nextPageIndex)
        if(nextPageIndex !== currentPageIndex) {
            setCurrentPageIndex(nextPageIndex)
        }
    }
    const getUserInfo = async () => await GoogleSignin.getCurrentUser()
    useEffect( () => {
        const user = getUserInfo()
        if(user) {
            navigation.navigate('App')
        }
    },[])
    return (
        <>
            <StatusBar hidden></StatusBar>
            <SafeAreaView style={styles.block}>
                <ScrollView
                    style={{flex : 1}}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={setCurrentPage}>
                        {landingData.map( (page, index) => (
                            <LandingPage 
                                width={width}
                                height={height}
                                {...page}
                                key={index}/>
                        ))}
                        {/* <View style={{width , height}}>
                            <ImageBackground source={require('../assets/imgs/UABackground.jpg')} style={{width, height}}>
                                <View style={[styles.textContent, { width, height }]}>
                                    <Text style={styles.title}>시간관리</Text>
                                    <Text style={styles.description}>오늘 하루 시간이 너무 빨리 지나갔나요?</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{width , height}}>
                            <ImageBackground source={require('../assets/imgs/TreeAndSun.jpg')} style={{width, height}}>
                                <View style={[styles.textContent, { width, height }]}>
                                    <Text style={styles.title}>히스토리관리</Text>
                                    <Text style={styles.description}>과거에 무엇을 했는지 기억하시나요?</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{width , height}}>
                            <ImageBackground source={require('../assets/imgs/new-york.jpg')} style={{width, height}}>
                                <View style={[styles.textContent, { width, height }]}>
                                    <Text style={styles.title}>Todo List</Text>
                                    <Text style={styles.description}>그럼 오늘부터 Todo List 앱을 사용해보시는건 어떨까요?</Text>
                                </View>
                            </ImageBackground>
                        </View> */}
                    </ScrollView>
                    <View style={styles.scrollIndicatorWrapper}>
                        {Array(3).fill(0).map((_ , index) => (
                            <View key={index} style={[styles.scrollIndicator , 
                                { opacity :  currentPageIndex === index ? 1 : 0.3}]}></View>
                        ))}
                    </View>
                    <LoginButton navigation={navigation}/>
            </SafeAreaView>
        </>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    block : {
        flex : 1 ,
    } ,
    // textContent :{
    //     justifyContent : 'flex-start' ,
    //     alignItems : 'center' ,
    //     padding : 85 ,
    // } ,
    // title : {
    //     fontSize : 35 ,
    //     fontWeight : 'bold' ,
    //     color : '#fff' ,
    // } ,
    // description : {
    //     fontSize : 20 ,
    //     fontWeight : 'bold' ,
    //     marginTop : 10 ,
    //     color : '#fff' ,
    //     textAlign : 'center' ,
    // } ,
    scrollIndicatorWrapper : {
        position : 'absolute' ,
        left : 0 , right : 0 ,
        bottom : 50 ,
        flexDirection : 'row' ,
        justifyContent : 'center' ,
        alignItems : 'center' ,
    } , 
    scrollIndicator : {
        height : 10 ,
        width : 10 ,
        borderRadius : 10 / 2 ,
        backgroundColor : '#aaa' ,
        marginLeft : 10 , 
    }
})