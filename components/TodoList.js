import React from "react";
import { FlatList, View , Text , StyleSheet } from "react-native";
import TodoItem from "./TodoItem";

function TodoList({ todos, removeTodo }) {
    return (
        <FlatList
            data={todos}
            style={styles.container}
            keyExtractor={item => item.id}
            ItemSeparatorComponent = {() => <View style={styles.line}/>}
            renderItem={({item}) => (
                <TodoItem {...item} removeTodo={removeTodo} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    line: {
        backgroundColor: '#ddd',
        height: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingVertical: 10,
    },
    titleMargin: {
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    dateText: {
        fontSize: 12
    }
})
export default TodoList