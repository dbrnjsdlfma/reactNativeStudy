import React, {useState} from "react";
import {
    View,
    Text, 
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Keyboard,
} from 'react-native'

function TodoInsert({ onInsertTodo , todoText, setTodoText, 
    warning, setWarning, disabled }) {
    const onPress = () => {
        const trimedText = todoText.trim()
        onInsertTodo(trimedText)
    }
    const handleChange = (text) => {
        if(/\n/.test(text)) {
            onPress()
        } else {
            setTodoText(text)
            setWarning(false)
        }
    }
    const hideKeyboard = () => {
        Keyboard.dismiss()
    }
    console.log(todoText)

    return (
        <View style={styles.container}>
            <TextInput
                editable={!disabled}
                selectTextOnFocus={!disabled}
                placeholder = {disabled ? "X 할일을 작성할 수 없습니다" : '할일을 작성해주세요!'}
                placeholderTextColor={disabled ? "red" : '#a8c8ffff' }
                selectionColor = {'#d6e3ffff'}
                style={[styles.input, {color : warning ? 'red' : '#a8c8ffff'}]}
                value = {disabled ? "" : todoText}
                blurOnSubmit={false}
                onChangeText = {handleChange}
                returnKeyType="done"
                maxLength={50}
                autoCorrect={false}
                onSubmitEditing = {hideKeyboard}
                />
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.7}
                onPress={onPress}>
                    <View style={[styles.button, { backgroundColor : disabled ? "red" : "#a8c8ffff"}]}>
                        <Text style={styles.buttonText}>추가</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        height : 70 ,
        paddingLeft : 10 ,
        borderColor : 'transparent' ,
        borderTopWidth : 3 ,
        flexDirection : 'row' ,
        alignItems : 'center' ,
        justifyContent : 'space-between' ,
        backgroundColor : '#fff' ,
    } ,
    input : {
        color : '#a8c8ffff' ,
        fontSize : 20 ,
        paddingVertical : 20 ,
        flex : 1
    } ,
    button: {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      },
      buttonText: {
        color: '#fff',
        letterSpacing: 3,
        fontWeight: 'bold',
        fontSize: 15
      }
})
export default TodoInsert