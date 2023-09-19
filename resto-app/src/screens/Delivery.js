import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Linking,
} from "react-native";
import Header from "../components/Header";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const image = {
  uri: "https://img.cgaxis.com/2021/05/grass_with_snow_39_20_ao-708x708.jpg",
};

export default function Delivery() {
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBG}>
        <SafeAreaView>
          <Header animHeaderValue={scrollOffsetY} />
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
          >
            <Text
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={styles.title}
            >
              DELIVERY SERVICE
            </Text>
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              onPress={() => {
                Linking.openURL(
                  "https://gofood.co.id/jakarta/restaurants/brand/eb0d15b1-581d-4e5d-8f15-33c18db9bd61"
                );
              }}
            >
              <Image
                source={{
                  uri: "https://popmenucloud.com/ksmtxbod/27b6156d-2784-4ea4-86eb-d55edbb0fbfa.png",
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <Button
              title="Back To Menu"
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.button}
              color={"#ffa500"}
            ></Button>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBG: {
    flex: 1,
    zIndex: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  image: {
    width: "auto",
    height: 400,
    marginTop: 20,
    marginHorizontal: 10,
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    color: "black",
  },
});
