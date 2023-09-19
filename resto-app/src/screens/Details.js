import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  ActivityIndicator,
  Image,
  View,
  Button,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";


const image = {
  uri: "https://img.cgaxis.com/2021/05/grass_with_snow_39_20_ao-708x708.jpg",
};
const GET_ITEMS_BY_ID = gql`
  query Query($itemByIdId: ID) {
    itemById(id: $itemByIdId) {
      Category {
        name
      }
      Ingredients {
        name
      }
      id
      imageUrl
      mongoUserId
      name
    }
  }
`;
export default function Details({ route }) {
  const navigation = useNavigation();
  const id = route.params.id;
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { loading, error, data } = useQuery(GET_ITEMS_BY_ID, {
    variables: { itemByIdId: id },
  });

  console.log(loading);
  console.log(data);
  console.log(error);

  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error) {
    return <Text>Error Fetch Data</Text>;
  }

  const item = data.itemById;

  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBG}>
        <SafeAreaView>
          <Header animHeaderValue={scrollOffsetY} />

          <ScrollView>
            <View style={styles.container}>
              <Text
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={styles.title}
              >
                {item.name}
              </Text>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={styles.info}
              >
                Category: {item.Category.name}
              </Text>
              {item.Ingredients.map((e, index) => {
                return (
                  <Text
                    key={index}
                    adjustsFontSizeToFit={true}
                    allowFontScaling={true}
                    style={styles.info}
                  >
                    {e.name}
                  </Text>
                );
              })}
              <View style={ {margin:50} }>
                <Button
                  title="Back To Menu"
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={styles.button}
                  color={'#ffa500'}
                ></Button>

              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
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
    fontSize: 50,
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
