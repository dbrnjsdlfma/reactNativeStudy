import React, { useEffect, useState, useRef } from "react";
import { View , Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native'
import moment from "moment";
import { updateData } from '../apis/firebase'

let lastTap = null

function TodoItem({ id, title, category, isDone, createdAt, removeTodo }) {
    console.log("할일 생성시각: " , title , createdAt)
    const [ doubleTabbed, setDoubleTabbed ] = useState(false)
    const [ text, setText ] = useState("")
    const inputRef = useRef(null)

    const handleDoubleTab = (e) => {
        console.log(inputRef.current)
        setDoubleTabbed(!doubleTabbed)
        setText(title)
    }

    const ishandleDoubleTap = () => {
        const now = Date.now()
        const delay = 300
        if(lastTap && (now - lastTap) < delay) {
            return true
        } else {
            lastTap = now
            return false
        }
    }

    const handleTap = () => {
        updateData('todos' , id, {
            isDone: !isDone
        })
    }

    const handlePress = (e) => {
        if(ishandleDoubleTap()) {
            handleDoubleTab()
            console.log("더블 탭")
            handleTap()
        } else {
            handleTap()
            console.log("------ 탭 ------")
        }
    }

    const handleBlur = (e) => {
        e.stopPropagation()
        console.log("블러")
        setDoubleTabbed(!doubleTabbed)
        Keyboard.dismiss()
        updateData('todos' , id, {
            title : text.trim()
        })
    }

    const handleRemove = (e) => {
        e.stopPropagation()
        removeTodo(id, title)
    }

    const handleChange = (text) => {
        setText(text)
    }
    const hideKeyboard = (e) => {
        Keyboard.dismiss()
    }
    useEffect( () => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    })
    return (
        <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleRemove}> 
            <View style={styles.item}>
                <View style={[styles.circle, {backgroundColor : (isDone && !doubleTabbed) ? '#26a69a' : 'white'}]}/>
                <View style={styles.titleMargin} onTouchStart={(e) => {e.stopPropagation()}}>
                    {doubleTabbed ?
                        (
                            <TouchableWithoutFeedback>
                                <TextInput
                                    value={text}
                                    onBlur={handleBlur}
                                    ref={inputRef}
                                    onChangeText={handleChange}
                                />
                            </TouchableWithoutFeedback>
                        ) :
                        <Text style={[styles.title, 
                            {textDecorationLine : (isDone && !doubleTabbed ) ? 'line-through' : 'none'}]}>{title}</Text>
                    }
                </View>
                <View>
                    <Text>{category} ({isDone ? "종료" : "진행중"})</Text>
                    <Text style={styles.dateText}>{createdAt && moment(createdAt.toDate()).format('YY-MM-DD hh:mm:ss')}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    item : {
        flexDirection : 'row' ,
        alignItems: 'flex-start' ,
        paddingLeft: 10 ,
        paddingVertical : 10 ,
    } ,
    circle : {
        width : 20 ,
        height : 20 ,
        borderRadius : 10 ,
        borderColor : '#26a69a' ,
        borderWidth : 1 ,
        marginHorizontal : 10 ,
        marginVertical : 6 ,
    },
    titleMargin : {
        marginRight : 10
    } , 
    title : {
        fontWeight : 'bold' ,
        fontSize : 20 ,
    } , 
    dateText : {
        fontSize : 12
    }
})
export default React.memo(TodoItem)