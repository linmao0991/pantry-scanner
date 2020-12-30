import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableHighlight} from 'react-native';

const TabMenu = props => {
    const [activeTab, setActiveTab] = useState('Items')

    const handleActiveTab = button => {
        let style={
            width: '100%',
            alignItems: "center",
            padding: 10,
            borderStyle: 'solid',
            borderColor: '#6e6e6e',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
        }

        if(activeTab === button){
            style.backgroundColor = '#457B9D'
            style.color = 'white'
            style.fontWeight= 'bold'
        }

        return style;
    }

    const selectTab = selectedTab => {
        setActiveTab(selectedTab);
        props.selectTab(selectedTab)
    }

    return(
        <View style={style.container}>
            <TouchableHighlight style={style.touchable} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => selectTab('Items')}>
                <View style={handleActiveTab("Items")}>
                    <Text style={activeTab==='Items'? {color: 'white'}: null}>Items</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={style.touchable} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => selectTab('Add')}>
                <View style={handleActiveTab("Add")}>
                    <Text style={activeTab==='Add'? {color: 'white'}: null}>Add</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight  style={style.touchable} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => selectTab('Recover')}>
                <View style={handleActiveTab("Recover")}>
                    <Text style={activeTab==='Recover'? {color: 'white'}: null}>Recover</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const style =StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',    
        paddingHorizontal: 10,
        alignItems: 'stretch',
        borderBottomWidth: 1,
    },
    touchable: {
        width: '33%',
        alignItems: "stretch",
    }
})

export default TabMenu;