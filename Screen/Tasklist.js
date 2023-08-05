import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tasklist = ({ tasks, completedTask, removeTask }) => {
    const navigation = useNavigation();
    const [selectedTask, setSelectedTask] = useState(null);
    const renderItem = ({ item }) => (
        <View style={styles.taskItemBox}>
            <TouchableOpacity style={styles.taskItem} onPress={() => setSelectedTask(item)}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );
    const handleCompleteTask = () => {
        if (selectedTask) {
            // Call the onCompleteTask function with the selected task's id
            // completedTask(selectedTask)
            const newTask = {
                id: selectedTask.id, // Generate a unique id (You may use a better id generation method)
                title: selectedTask.title,
                description: selectedTask.description,
                deadline: selectedTask.deadline,
            };
            completedTask(newTask);
            removeTask(selectedTask.id)
            setSelectedTask(null);
            // Go back to the home screen
            navigation.navigate('Overview');
            // Reset the selectedTask state to close the popup
            // setSelectedTask(null);
        }
    };

    return (
        <View style={styles.container}>
            {tasks.length === 0 ? ( // Check if the tasks array is empty
                <Text style={styles.defaulttext}>No tasks available. Add a task by clicking the "Add Task" button.</Text>
            ) : (
                // Render the FlatList if there are tasks available
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            {/* Task Details Popup */}
            {selectedTask && <Modal visible={selectedTask !== null} animationType="slide">
                <View style={styles.popupContainer}>
                    <Text>Title: {selectedTask.title}</Text>
                    <Text>Description: {selectedTask.description}</Text>
                    <Text>Deadline: {selectedTask.deadline}</Text>
                    {/* Add other task details here
                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleCompleteTask(selectedTask)}
                        >
                            <Text style={styles.buttonText}>Completed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { }}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setSelectedTask(null)}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // backgroundColor: "red",
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
    taskItem: {
        padding: 10,
        width: "100%",
        flex: 1,
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
    defaulttext: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Tasklist;
