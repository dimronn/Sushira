import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,

} from "react-native";
import Header from "../components/Header";
import { useRef } from "react";
import CarouselCards from "../components/CarouselCards";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";


const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

const image = {
  uri: "https://img.cgaxis.com/2021/05/grass_with_snow_39_20_ao-708x708.jpg",
};

export default function Home() {
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
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
            <CarouselCards />
            <Text
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={styles.title}
            >
              OFFERS
            </Text>
            <Image
              source={{
                uri: "https://foto.kontan.co.id/oluNBSS4KyK1IVTLf_mcf7uJrAw=/smart/filters:format(webp)/2023/01/16/670988553p.jpg",
              }}
              style={styles.image}
            />

            <Text
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={styles.title}
            >
              Our Menu
            </Text>
            <TouchableOpacity
              onPress={() => { 
                navigation.push('MenuMain')
              }}>
            <Image
              source={{
                uri: "https://static.wixstatic.com/media/a73f49_4c6cf9102945499081f6f9b96ee988fa~mv2.jpg/v1/crop/x_1152,y_0,w_5887,h_5464/fill/w_422,h_390,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/OsakaPlatterTray%5BHeroShot%5D_JPG.jpg",
              }}
              style={styles.image}
            />

            </TouchableOpacity>

             <Text
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={styles.title}
            >
              Delivery
            </Text>

              <TouchableOpacity
              onPress={() => { 
                navigation.push('Delivery')
              }}>
            <Image
              source={{
                uri: "https://www.flyingcolour.net/wp-content/uploads/2021/03/Delivery-Service-Business-in-Dubai.jpg",
              }}
              style={styles.image}
            />

            </TouchableOpacity>
            <Footer/>
            
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
