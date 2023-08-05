import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { DatePicker } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleCancel = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };

    const handleDateChange = (event, selected) => {
        setShowDatePicker(false);
        setSelectedDate(selected);
      };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const formatDate = (date) => {
        if (!date) return ''; // Handle case when the date is null or undefined
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');;
        return `${day}-${month}-${year}`;
    };
    
    const handleConfirm = () => {
        if (title.trim()) {
            const newTask = {
                id: Date.now().toString(), // Generate a unique id (You may use a better id generation method)
                title,
                description,
                deadline: formatDate(selectedDate),
            };
            route.params?.addTask(newTask);
    
            // Go back to the previous screen
            navigation.goBack();
        };
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />

            <Text style={styles.label}>Deadline:</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={openDatePicker} style={styles.datePickerContainer}>
                    <TextInput
                        style={styles.dateInput}
                        value={formatDate(selectedDate)} // Display the selected date in the input field
                        editable={false} // Disable manual editing of the input field
                    />
                    {/* Add a calendar icon or any other icon to represent the date picker */}
                    <Text style={styles.calendarIcon}>📅</Text>
                </TouchableOpacity>

                {/* Show the date picker when `showDatePicker` is true */}
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>


            <View style={styles.buttonContainer}>
                <Button title="Add" onPress={handleConfirm} />
                <Button title="Cancel" onPress={handleCancel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deadlineText: {
        fontSize: 16,
        marginRight: 8,
        color: 'blue',
    },
});

export default AddTaskScreen;
