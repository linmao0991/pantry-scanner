import React, {useState, useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeader from './components/AppHeader';
import TabMenu from './components/TabMenu';
import DisplayItems from './components/DisplayItems';
import AddItem from './components/AddItem';
import RecoverItem from './components/RecoverItems'

export default function App() {
  const [activeTab, setActiveTab] = useState('Items')
  const [items , setNewItems] = useState(['Picke','Burger Bun', 'Tomato', 'Lettuce', 'Cheese', 'Burger Patty'])

  const switchTabMenu = () =>{
    switch (activeTab){
      case 'Items':
        return(
          <DisplayItems 
            items = {items}
          />
        )
      case 'Add':
        return(
          <AddItem />
        ) 
      case 'Recover':
        return(
          <RecoverItem />
        )
      default:
        return(
          null
        )
    }
  }
  return (
    <View>
      <AppHeader title="Bag of Holding" />
      <TabMenu 
        selectTab = {setActiveTab}
      />
      {switchTabMenu()}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
})
