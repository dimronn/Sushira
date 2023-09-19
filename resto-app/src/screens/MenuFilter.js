import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import { Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import Header from "../components/Header";

const image = {
  uri: "https://img.cgaxis.com/2021/05/grass_with_snow_39_20_ao-708x708.jpg",
};
import { SafeAreaView } from "react-native-safe-area-context";
import CardItems from "../components/CardItems";
import { useNavigation } from "@react-navigation/native";
const GET_ITEMS_BY_CATEGORY = gql`
 query Query($categoryId: String) {
  itemByCategory(categoryId: $categoryId) {
    Ingredients {
      name
    }
    id
    imageUrl
    mongoUserId
    name
    categoryId
  }
}

`;

export default function MenuFilter({route}) {
  const id = route.params
  const navigation = useNavigation()
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  if (id) { 
  const { loading, error, data } = useQuery(GET_ITEMS_BY_CATEGORY, {
    variables: {categoryId: id.id}
  });
  console.log(loading);
  // console.log(data);
  console.log(error);

  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error) {
    return <Text>Error Fetch Data</Text>;
  }

    const item = data.itemByCategory
  console.log(item)  
  const renderItem =  <CardItems menu={item} />;


  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBG}>
        <SafeAreaView>
           <Header animHeaderValue={scrollOffsetY} />
          <View style={styles.container}>
            <Text
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={styles.title}
              >
                {item.name}
              </Text>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
            <Button
                  title="Back To Menu"
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={styles.button}
                  color={'#ffa500'}
            ></Button>
            
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
}

const styles = StyleSheet.create({
   container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    marginVertical: "auto",
  },
  container2: {
    justifyContent: "center",
    alignContent: "flex-end",
    paddingVertical: 50,
    marginVertical: "auto",
  },

  imageBG: {
    flex: 1,
    zIndex: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  title: {
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "800",
    fontSize: 40,
  },
  info: {
    textAlign: "right",
    fontStyle: "italic",
    fontWeight: "800",
    fontSize: 25,
  },
   button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
     backgroundColor: 'black',
    color:'black'
  },
});
