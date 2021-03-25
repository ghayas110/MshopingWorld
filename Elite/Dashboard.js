import React from 'react';
import { StyleSheet, Text, View, Button,Image,TouchableOpacity,ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardCustScreen from './CardCustScreen';
import Upload from './Upload';
const Dashboard = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
        <View  style={styles.container}>
          
        <View style={styles.categoryContainer}>

      
        </View>
        </View>
        <View  style={styles.container}>
          
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryBtn} onPress={()=>navigation.navigate(Upload)}>
          <View style={styles.categoryIcon}>
          <Image source={require('../assets/upload.png' ) }    size={35} style={styles.categoryIcon}/>
          </View>
          <Text style={styles.categoryBtnTxt}>Upload</Text>
          </TouchableOpacity>
       
          <TouchableOpacity style={styles.categoryBtn}onPress={()=>navigation.navigate(CardCustScreen)}>
          <View style={styles.categoryIcon}>
          <Image source={require('../assets/product.png' ) }    size={35} style={styles.categoryIcon}/>
          
          </View>
          <Text style={styles.categoryBtnTxt}>Products</Text>
          </TouchableOpacity>
          </View>
          </View>
        </ScrollView>   
    )
}

export default Dashboard

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
      fontWeight:"bold"
      
    },
    cardsWrapper: {
      marginTop: 20,
      width: '90%',
      alignSelf: 'center',
    },
    card: {
      height: 100,
      marginVertical: 10,
      flexDirection: 'row',
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
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
  })
