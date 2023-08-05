import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

const Completedlist = ({ tasks }) => {
    const renderItem = ({ item }) => (
        <View style={styles.taskItemBox}>
            <TouchableOpacity style={styles.taskItem}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    return (

        <View style={styles.container}>
            {tasks.length === 0 ? ( // Check if the tasks array is empty
                <Text>No tasks available.</Text>
            ) : (
                // Render the FlatList if there are tasks available
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    taskItem: {
        padding: 10,
        // borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    taskItemBox: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Completedlist;
