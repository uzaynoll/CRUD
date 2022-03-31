import React ,{ useContext } from 'react';
import {Text, View, StyleSheet,FlatList, Button } from 'react-native';
import { Context } from '../context/NoteContext';

const IndexScreen = () => {
    const {state, addNotes} = useContext(Context);

    return <View>
        <Text> Index Screen.</Text>
        <Button title='Add a new Note' onPress={addNotes} />
        <FlatList 
            data={state}
            keyExtractor={ (Note) => (Note.title)}
            renderItem = {({item}) => { return <Text>{item.title}</Text>}}
        />
    </View>
};

const styles = StyleSheet.create({});

export default IndexScreen;