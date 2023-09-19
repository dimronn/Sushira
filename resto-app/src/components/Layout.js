import React from 'react';
import { ImageBackground, StyleSheet,  View} from 'react-native';

const image = {uri:'https://img.cgaxis.com/2021/05/grass_with_snow_39_20_ao-708x708.jpg'};

const Layout = () => (
  
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    </ImageBackground>
  
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    zIndex: 0,
    width: '100%',
    height: '100%',
    position:'absolute'
  },
});

export default Layout;