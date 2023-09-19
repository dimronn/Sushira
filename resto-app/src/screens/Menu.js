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
  TouchableHighlight,
  
} from "react-native";

import Header from "../components/Header";
const image = {
  uri: "https://img.cgaxis.com/2021/05/grass_with_snow_39_20_ao-708x708.jpg",
};
import { SafeAreaView } from "react-native-safe-area-context";
import CardItems from "../components/CardItems";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
const GET_ITEMS = gql`
  query Items {
    items {
      Category {
        name
      }
      Ingredients {
        name
      }
      id
      name
      imageUrl
      mongoUserId
    }
    categories {
      name
      id
    }
  }
`;

export default function Menu({}) {
  const navigation = useNavigation();
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const { loading, error, data } = useQuery(GET_ITEMS);

  console.log(loading);
  // console.log(data);
  console.log(error);

  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error) {
    return <Text>Error Fetch Data</Text>;
  }

  const item = data.items;
  const categories = data.categories;
  console.log(categories);

  const renderItem = ({ item }) => <CardItems menu={item} />;

  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBG}>
        <SafeAreaView>
          <View>
            <FlatList
              data={item}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              ListHeaderComponent={
                <>
                  <Header animHeaderValue={scrollOffsetY} />
                  <Text
                    adjustsFontSizeToFit={true}
                    allowFontScaling={true}
                    style={styles.title}
                  >
                    All Menu
                  </Text>
                </>
              }
              ListFooterComponent={
                <>
                  <View style={{ flex: 1, marginTop: 50 }}>
                    <Text
                      adjustsFontSizeToFit={true}
                      allowFontScaling={true}
                      style={styles.title}
                    >
                      Categories
                    </Text>
                    {categories.map((e, index) => {
                      return (
                        <TouchableOpacity underlayColor={"#ffd700"}
                          style={{
                            justifyContent: 'center', flex:1, margin:5}}>
                          <Button
                            color={'#ffa500'}
                            key={index}
                            title={e.name}
                            onPress={() => {
                              navigation.push("MenuFilter", { id: e.id });
                            }}
                          >
                            {e.name}
                          </Button>
                        </TouchableOpacity>
                      );
                    })}
                    <Footer  />
                  </View>
                </>
              }
            />
          </View>

        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBG: {
    flex: 1,
    zIndex: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  title: {
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "800",
    fontSize: 50,
  },
  filter: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 30,
  },
});
