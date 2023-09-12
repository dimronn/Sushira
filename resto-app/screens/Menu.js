import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { itemFetchAsyncSuccess } from "../store/actions/actionCreator"
import { FlatList, StyleSheet, View } from "react-native"




export default function Menu({ }) { 
  
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state) => { 
    return state.items
  })
  const search = ""

  useEffect(() => {
    dispatch(itemFetchAsyncSuccess(search))
  }, [])

  // console.log(items.items[0].name)
  return (
    
      <View style={ styles.container}>
        
    <FlatList
        data={items}
        renderItem={({item}) => 
          (<Text style={ styles.item}>{item.name}</Text>)
        }
        keyExtractor={item => item.id}
        
      />
      </View>
    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "hotpink",
    fontSize: 24,
    marginHorizontal: 10,
  }
});