/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React , { useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { 
  SafeAreaView , StyleSheet ,
  Button , View ,  Text , ActivityIndicator
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardSceen from './screens/DashBoardSceen';
import SettingScreen from './screens/SettingScreen';

import DropdownCategory from './components/DropdownCategory'

import { getCollection } from './apis/firebase';
// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App({navigation}) {
  const [ todos , setTodos ] = useState([])
  const [ loading , setLoading ] = useState(true)

  const [ caretType , setCaretType ] = useState(false)
  const [ yearCaret , setYearCaret] = useState(false)
  const [ monthCaret , setMonthCaret ] = useState(false)

  useEffect(() => {
    function onResult(querySnapshot) {
      const list = []
      querySnapshot.forEach( doc => {
        console.log(doc.data())
        list.push({
          ...doc.data(),
          id : doc.id,
        })
      })
      setTodos(list)
      setLoading(false)
    }
    function onError(error) {
      console.log(`${error} occured when reading todos`)
    }
    return getCollection('todos' , onResult, onError, null, null, null)
  }, [])

  if(loading) {
    return (
      <View style={styles.block}>
        <ActivityIndicator size='large' color="#0047AB"/>
        <Text style={styles.loadingText}>Loading....</Text>
      </View>
    )
  }
  return(
    <>
      <Tab.Navigator initialRouteName='Home' screenOptions={{tabBarActiveTintColor : 'orange'}}>
        <Tab.Screen name='Home' children={(props) => <HomeScreen {...props}
        caretType={caretType} setCaretType={setCaretType} todos={todos} loading={loading}/>} options={{
          title: '홈' ,
          tabBarIcon : ({ color , size}) => <Icon name='home' color={color} size={size}/>,
          headerTitle : (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType}/>,
          headerStyle : {
            backgroundColor : '#a8c8ffff' ,
          },
          headerTitleStyle : {
            fontWeight : 'bold' ,
            color : '#fff' ,
          },
        }}/>
        <Tab.Screen name='Calendar' children={(props) => <CalendarScreen {...props}
        yearCaret={yearCaret} setYearCaret={setYearCaret} monthCaret={monthCaret} setMonthCaret={setMonthCaret}/>} options={{
          title: '달력' ,
          tabBarIcon : ({ color , size}) => <Icon name='calendar-today' color={color} size={size}/> ,
          headerTitle : (props) => (<View style={{flexDirection : 'row'}}>
            <DropdownCategory {...props} caretType={yearCaret} setCaretType={setYearCaret} categoryTitle='Year'/>
            <DropdownCategory {...props} caretType={monthCaret} setCaretType={setMonthCaret} categoryTitle='Month'/>
          </View>),
          headerStyle : {
            backgroundColor : '#a8c8ffff' ,
          } ,
          headerTitleStyle : {
            fontWeight : 'bold' ,
            color : '#fff' ,
          }
        }}/>
        <Tab.Screen name='DashBoard' children={(props) => <DashBoardSceen todos={todos}/>} options={{
          title: '통계' ,
          tabBarIcon : ({ color , size}) => <Icon name='dashboard' color={color} size={size}/>
        }}/>
        <Tab.Screen name='Settings' children={(props) => <SettingScreen {...props}/>} options={{
          title: '설정' ,
          tabBarIcon : ({ color , size}) => <Icon name='settings' color={color} size={size}/>
        }}/>
      </Tab.Navigator>
    </>
    // <View>
    //   <Text>테스트</Text>
    // </View>
  )
}

// export default App;

const styles = StyleSheet.create({
  block : {
    flex : 1 ,
    backgroundColor : '#a8c8ffff' ,
    justifyContent : 'center' ,
    alignItems : 'center' ,
  } ,
  loadingText : {
    fontSize : 20 ,
    fontWeight : 'bold' ,
    color : '#fff' ,
    marginTop : 10 ,
    textAlign : 'center' ,
  }
})