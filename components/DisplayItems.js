import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DisplayItems = props => {
    return(
        <View style={style.container}>
            {props.items.map((item, index) => <Text key={index}>{item}</Text>)}
        </View>
    )
}

const style=StyleSheet.create({
    container:{
        padding: 5,
    }
})

export default DisplayItems