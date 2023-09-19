import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ImageBackground } from "react-native"


const CardItems = ({ menu }) => {
const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => { 
        navigation.push('Details',{id:menu.id})
      }}
    >
      <Image
        source={{ uri: menu.imageUrl }}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width:200,
    height: 200,
    marginVertical: 20,
    paddingHorizontal:30
    
  }
})

export default CardItems