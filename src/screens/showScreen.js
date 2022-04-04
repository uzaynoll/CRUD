import React, {useContext, useLayoutEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Context } from '../context/NoteContext';
import { AntDesign } from '@expo/vector-icons';

const ShowScreen = ({route,navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => <TouchableOpacity onPress={ () => navigation.navigate("Edit", {id: route.params.id})}><AntDesign name='edit' size={30} /></TouchableOpacity>
    });
      }, [navigation]);
    const { state } = useContext(Context);
    const id = route.params.id;
    const Note = state.find(
        Note => Note.id === id);
    return <View>
        <Text>Title: {Note.title}</Text>
        <Text>Content: {Note.content}</Text>
    </View>
};

const styles = StyleSheet.create({});

export default ShowScreen; 