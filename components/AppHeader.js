import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AppHeader = props => {
    return (
        <View style={style.container}>
            <Text style={style.title}>{props.title}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container:{
        width: '100%',
        paddingTop: 50,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#457B9D',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
    }
})

export default AppHeader;