import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasklist from './Tasklist';
import Completedlist from './Completedlist';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

// const tasksData = [
//     { id: 1, title: 'Task 1' },
//     { id: 2, title: 'Task 2' },
//     { id: 3, title: 'Task 3' },
//     // Add more tasks as needed
// ];



const OverviewScreen = ({ navigation, tasks, addTask, completedTask, removeTask }) => (
    <View style={styles.container}>
        <Tasklist style={styles.TasklistsContainer} tasks={tasks} completedTask={completedTask} removeTask={removeTask} />
        {/* Add Task Button */}
        <View style={styles.addButtonContainer}>
            <TouchableOpacity
                style={styles.addbutton}
                onPress={() => navigation.navigate('AddTaskScreen', { addTask })}
            >
                <Text style={styles.addbuttontext}>Add Task</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const PendingScreen = ({ pendingTasks }) => (
    <>
        <View style={styles.container}>
            <Completedlist tasks={pendingTasks} />
        </View>

    </>
);

const CompletedScreen = ({ complictedTasks }) => (
    <View style={styles.container}>
        <Completedlist tasks={complictedTasks} />
    </View>
);

const HomeScreen = ({ navigation }) => {
    const [complictedTasks, setComplictedTasks] = useState([]);
    const [pendingTasks, setpendingTasks] = useState([]);
    const [tasks, setTasks] = useState([]); // State for tasks, initialized with the initial tasksData
    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    const completedTask = (task) => {
        setComplictedTasks((completed) => [...completed, task]);
    }

    const removeTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const filterTasks = () => {
        const currentDate = new Date();
        const pending = [];
        tasks.forEach((task) => {
            const deadlineDate = new Date(task.deadline);
            if (deadlineDate > currentDate) {
                pending.push(task);
                removeTask(task.id);
            }
        });
        setpendingTasks(pending);
    };
    useEffect(() => {
        filterTasks();
    }, [tasks])


    return (
        <>


            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#007AFF',
                    inactiveTintColor: 'gray',
                    showLabel: false,
                    style: {
                        backgroundColor: 'white',
                        borderTopWidth: 0,
                    },
                }}
            >
                <Tab.Screen
                    name="Overview"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-list" size={size} color={color} />
                        ),
                    }}
                >
                    {(props) => (
                        <OverviewScreen
                            {...props}
                            tasks={tasks}
                            addTask={addTask}
                            completedTask={completedTask}
                            removeTask={removeTask}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="Completed"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-checkmark-circle" size={size} color={color} />
                        ),
                    }}
                >
                    {(props) => <CompletedScreen {...props} complictedTasks={complictedTasks} />}
                </Tab.Screen>
                <Tab.Screen
                    name="Pending"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-hourglass" size={size} color={color} />
                        ),
                    }}
                >
                    {(props) => <PendingScreen {...props} pendingTasks={pendingTasks} />}
                </Tab.Screen>
            </Tab.Navigator>


        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b68db'
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    addbutton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#8f9096",
        borderRadius: 8,
    },
    addbuttontext: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default HomeScreen;
