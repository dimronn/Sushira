import * as React from "react";
import { Image, Text, StyleSheet,  View } from "react-native";

export default function Footer({}) {
  return (
    <View
      style={[
        styles.header,
        {
          height: 150,
          backgroundColor: "black",
          paddingVertical: 20,
        },
      ]}
    >
      <View style={styles.headerContent}>
        <Image
          style={styles.image}
          source={{
            uri: "https://www.nicepng.com/png/full/307-3078997_some-things-on-the-horizon-for-sushi-sushi.png",
          }}
        />
       
        <Text style={styles.textHeader}>© 2023 PT Sushira Makmur</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "right",
    marginVertical: "auto",
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    alignItems:"center"
  },
  textHeader: {
    margin: 10,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:70
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    marginBottom:40,
    position: "absolute",
    marginHorizontal: 15,
  },
});
