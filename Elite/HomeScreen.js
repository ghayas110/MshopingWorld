import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { listUsers } from '../graphql/queries';
import CardCustScreen from './CardCustScreen';

export default function HomeScreen(props) {

  const navigation = useNavigation()
  const [resellers, setResellers] = useState([])

  useEffect(() => {
    fetchReseller()
  }, [])

  async function fetchReseller() {
    try {
      await Auth.currentAuthenticatedUser()
        .then(async (data) => {
          console.log(data.attributes.email)
          const getIdData = await API.graphql(graphqlOperation(listUsers, { filter: { email: { contains: data.attributes.email } } }))
          const getId = getIdData.data.listUsers.items
          if (getId[0] !== undefined) {
            const getResellersData = await API.graphql(graphqlOperation(listUsers, { filter: { elliteId: { contains: getId[0].id }, category: { contains: 'reseller' } } }))
            const getResellers = getResellersData.data.listUsers.items
            if (getResellers[0] !== undefined)
              setResellers(getResellers)
            else
              setResellers([])
          }
          else {
            console.log('No reseller found')
          }
        })
    } catch (err) {
      console.log('err:', err)
    }
  }

  const renderResellers = () => {
    console.log('render', resellers)
    return resellers.map((item, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => { }} >
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image source={require('../assets/usericon.png')} resizeMode="contain" style={styles.cardImg} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>
                {item.email}
              </Text>

              <Text style={styles.cardDetails}>
                {item.phone_number}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>

        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
            <View style={styles.categoryIcon}>
              <Image source={require('../assets/ana.png')} size={35} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryBtnTxt}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate(CardCustScreen)}>
            <View style={styles.categoryIcon}>
              <Image source={require('../assets/cus.png')} size={35} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryBtnTxt}>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate(CardCustScreen)}>
            <View style={styles.categoryIcon}>
              <Image source={require('../assets/order.png')} size={35} style={styles.categoryIcon} />

            </View>
            <Text style={styles.categoryBtnTxt}>Orders</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require('../assets/anal.png')} resizeMode="cover" style={{ width: 280, height: 170, alignSelf: "center" }} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>
            TOTAL REVENUE
                  </Text>

          <Text style={styles.cardDetails}>
            35500$
            </Text>

        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>
            TOTAL PROFIT
                  </Text>

          <Text style={styles.cardDetails}>
            30000$
            </Text>

        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>
            TOTAL VIEWS
                  </Text>

          <Text style={styles.cardDetails}>
            30000$
            </Text>

        </View>
        <View style={styles.cardsWrapper}>
          <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", marginTop: 20 }} >Resellers</Text>
          {renderResellers()}
        </View>


      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#40E0D0' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
    fontWeight: "bold"

  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 80,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignSelf: 'center'
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
    color: '#666',
    marginTop: 5,
  },
});