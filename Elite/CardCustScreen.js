import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { data } from '../models/data';
// import Card from '../component/Card';
import CardCustDetails from './CardCustDetails'
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { listProducts } from '../graphql/queries';
import { Card } from 'react-native-elements';
import StarRating from '../component/StarRating';

const CardCustScreen = (props) => {

  const navigation = useNavigation()
  const { loggedInUser } = useSelector(state => state)

  const [pImages, setPImages] = useState([])
  const [products, setProducts] = useState([])

  async function fetchProducts() {
    try {
      await Storage.list(`${loggedInUser.users.id}/`, { level: 'private' })
        .then((res) => {
          let list = []
          for (const i in res) {
            console.log(res[i].key, pImages.length)
            Storage.get(res[i].key, { level: 'private' })
              .then((response) => {
                list.push({uri: response})
              })
          }
          setPImages(list)
        })
      const listProductsData = await API.graphql(graphqlOperation(listProducts, { filter: { userId: { eq: loggedInUser.users.id } } }))
      const productList = listProductsData.data.listProducts.items
      setProducts(productList)
      // console.log(products, pImages.length)
    } catch (err) {
      console.log(err)
      ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.CENTER)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const renderItem = ({ item }) => {
    console.log(item.id, pImages.filter((itm) => itm.uri.substr(0, 20)), pImages.length)
    return (
      <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.push('CardCustDetails', { itemData: item })) }}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={pImages.filter(itm => { return itm.uri.includes(`${item.id}`) === true ? itm.uri : '' })[0]}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {/* <StarRating ratings={5} reviews={} /> */}
            {/* <Text>{JSON.stringify(pImages.filter(itm => { return itm.uri.includes(`${item.id}`) === true ? itm.uri : '' })[0])}</Text> */}
            <Text numberOfLines={2} style={styles.cardDetails}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
      // <Card
      // onPress={()=> {navigation.navigate('CardCustDetails' , {itemData: item})}}
      // >
      //   <
      // </Card>

    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CardCustScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});