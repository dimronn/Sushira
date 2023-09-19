import { useNavigation } from "@react-navigation/native";
import { Dimensions, TouchableOpacity } from "react-native";

export default function ItemsCard({ items }) { 
  const navigation = useNavigation()
  const { width } = Dimensions.get("window")
  
  return (
    <TouchableOpacity
      onPress={() => { 
        console.log('pindah ke detail')
        navigation.push("Detail")
      }}
    >

    </TouchableOpacity>
  )
}