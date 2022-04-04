import React, {useContext} from 'react'
import {Text, View, StyleSheet} from 'react-native';
import { Context } from '../context/NoteContext';


const ShowScreen = ({route}) => {
    const { state } = useContext(Context);
    const id = route.params.id;
    const Note = state.find(
        Note => Note.id === id);
    return <View>
        <Text> {Note.title}</Text>
    </View>
};

const styles = StyleSheet.create({});

export default ShowScreen; 