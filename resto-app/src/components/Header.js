import * as React from 'react';
import { Image, Text, StyleSheet, Animated, View } from 'react-native';


const Header_Max_Height = 100;
const Header_Min_Height = 70;
const Header_Max_Padding = 30
const Header_Min_Padding = 15


export default function Header({animHeaderValue}) {
  const animateHeaderHeight =  animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height , Header_Min_Height],
    extrapolate: 'clamp'
  })

  const animateHeaderPadding =  animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Padding - Header_Min_Padding],
    outputRange: [Header_Max_Padding , Header_Min_Padding],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View 
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
            backgroundColor: 'darkorange',
            paddingVertical: animateHeaderPadding,
            
          }
        
        ]}
    >
      <View style={ styles.headerContent  }>
      <Image style={styles.image} source={{ uri: 'https://www.nicepng.com/png/full/307-3078997_some-things-on-the-horizon-for-sushi-sushi.png' }} />
        <Text style={styles.textHeader}>Sushira</Text>
     
       
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'right',      
    marginVertical: 'auto',
  },
  image: {
    width: 40,
    height: 40,
    marginVertical:'auto'

  },
  textHeader: {
    margin:10,
     color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical:'auto'

  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 'auto',
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal:15
    
  }
});


