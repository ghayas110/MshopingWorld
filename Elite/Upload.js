import React, { useEffect, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, PermissionsAndroid, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from "react-native-customized-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { SliderBox } from 'react-native-image-slider-box'
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
// import { S3Image, } from 'aws-amplify-react-native'
// import { imageToBlob } from 'react-native-image-to-blob'
// import { RNS3 } from 'react-native-upload-aws-s3'
import AWS from 'aws-sdk'
import { decode, encode } from 'base64-arraybuffer'
import { read, readFile } from 'react-native-fs'
import { createProduct } from '../graphql/mutations';
import { useSelector } from 'react-redux';

export default function Upload() {

  const navigation = useNavigation()
  const { loggedInUser } = useSelector(state => state)


  const [images, setImages] = useState([])
  const [data, setData] = React.useState({
    title: '',
    description: '',
    price: '',
    category: '',
    check_titleInputChange: false,
    check_descriptionChange: false,
    check_priceChange: false,
    check_categoryChange: false,
  })
  var bs = React.createRef();
  var fall = new Animated.Value(1);

  useEffect(() => {
    requestPermission()
    console.log(images[0])
  }, [])

  async function requestPermission() {
    const req = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    if (req === PermissionsAndroid.RESULTS.GRANTED)
      console.log('permission granted')
    else
      navigation.dispatch(StackActions.pop())
  }

  const PickImageFromCamera = () => {
    // launchCamera({ mediaType: 'photo' }, (response) => {
    //   setImages(images.concat(response))
    //   // setImages([...images, response])
    //   console.log('response: ', response)
    //   console.log('images: ', images)
    // })
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // multiple: true,
      cropping: true,
      // maxSize: 4,
    }).then(response => {
      for (const i in response) {
        if (response.hasOwnProperty.call(response, i)) {
          console.log(Object.assign(response[i], { uri: response[i].path, type: response[0].mime, name: response[i].path.substr(response[i].path.lastIndexOf('/') + 1) }))
        }
      }
      console.log('response', response)
      setImages(images.concat(response))
    });
  }

  const PickImageFromLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      maxSize: 4,
      // includeBase64: true
    }).then(response => {
      for (const i in response) {
        if (response.hasOwnProperty.call(response, i)) {
          console.log(Object.assign(response[i], { uri: response[i].path, type: response[0].mime, name: response[i].path.substr(response[i].path.lastIndexOf('/') + 1) }))
        }
      }
      console.log('response', response)
      setImages(images.concat(response))
      // setImages([...images, response])

    });
    // launchImageLibrary({ mediaType: 'photo' }, (response) => {
    //   setImages([...images, response])
    //   console.log('response: ', response)
    //   console.log('images: ', images)
    // })
  }

  async function handleSubmition() {
    // if (images.length > 0) {
    // try {
    //   await Storage.get('IMG_20210305015351.jpg', { level: 'private' })
    //     .then((res) => {
    // console.log(res)
    //  })
    // } catch (err) {
    //   console.log(err)
    // }
    // }
    console.log(loggedInUser.users.id)
    if (images.length > 0) {
      try {
        console.log(data.check_descriptionChange === true, data.check_priceChange === true, data.check_titleInputChange === true)
        if (data.check_descriptionChange === true && data.check_priceChange === true && data.check_titleInputChange === true) {
          const product = { userId: loggedInUser.users.id, title: data.title, description: data.description, price: data.price }
          const newProduct = await API.graphql(graphqlOperation(createProduct, { input: product }))
          console.log(newProduct.data.createProduct.id)
          const productId = newProduct.data.createProduct.id
          const userId = loggedInUser.users.id 
          for (const i in images) {
            const base64 = await readFile(images[i].uri, 'base64')
            const arrayBuffer = decode(base64)
            await Storage.put(`${userId}/p-${productId}/${images[i].name}`, arrayBuffer, {
              level: 'private'
            })
              .then((res) => {
                console.log(res)
              })
          }
          ToastAndroid.showWithGravity('Product successfully Uploaded', ToastAndroid.LONG, ToastAndroid.CENTER)
          setTimeout(() => {
            navigation.dispatch(StackActions.pop())
          }, 100);
        }
        else {
          ToastAndroid.showWithGravity('Fill all Fields', ToastAndroid.LONG, ToastAndroid.CENTER)
        }
      } catch (err) {
        console.log('Error uploading file: ', err);
      }
    }
    else {
      ToastAndroid.showWithGravity('Insert Image/s of product', ToastAndroid.LONG, ToastAndroid.CENTER)
    }
  }

  const handleTitleChange = (val) => {
    if (val.length < 3) {
      setData({
        ...data,
        title: val,
        check_titleInputChange: false
      });
    } else {
      setData({
        ...data,
        title: val,
        check_titleInputChange: true
      });
    }
  }

  const handleCategoryChange = (val) => {
    if (val.length < 3) {
      setData({
        ...data,
        category: val,
        check_categoryChange: false
      });
    } else {
      setData({
        ...data,
        category: val,
        check_categoryChange: true
      });
    }
  }

  const handleDescriptionChange = (val) => {
    if (val.length < 15) {
      setData({
        ...data,
        description: val,
        check_descriptionChange: false
      });
    } else {
      setData({
        ...data,
        description: val,
        check_descriptionChange: true
      });
    }
  }

  const handlePriceChange = (val) => {
    if (val < 500) {
      setData({
        ...data,
        price: val,
        check_priceChange: false
      });
    } else {
      setData({
        ...data,
        price: val,
        check_priceChange: true
      });
    }
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => { PickImageFromCamera(); bs.current.snapTo(1) }}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => { PickImageFromLibrary(); bs.current.snapTo(1) }}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <ScrollView>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}>
            Upload Your Product
          </Text>
          <TouchableOpacity>
            <View
              style={{
                height: 300,
                width: '100%',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image source={{uri: images[0].path}} style={{height: 90, width: 90, zIndex: 2, borderColor: '#FF0000', borderWidth: 1}} /> */}
              {/* <Text>{JSON.stringify(images.length)}</Text> */}
              {/* <S3Image level='private' key={'Screenshot (2).png'} /> */}
              {/* <Image source={{uri: 's3://edukan436c3703ac704cc58b2993abad89983805347-dev/private/us-east-1:9b2cb261-4b2c-42c6-b318-310840069611/Screenshot (2).png'}} style={{width: 90, height: 90}} /> */}
              <SliderBox images={images}
                sliderBoxHeight={300}
                onPress={() => console.log('press')}
                onCurrentImagePressed={index => { setImages(images.filter(item => item != images[index])); console.log('images', images) }}
                resizeMode={'contain'}
                backgroundColor='#999'
                dotColor="#F99B4E"
                inactiveDotColor="#90A4AE"
                dotStyle={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  marginHorizontal: 10,
                  padding: 0,
                  margin: 0
                }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '90%', borderWidth: 1, borderColor: '#aaa', marginVertical: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => bs.current.snapTo(0)} >
            <MaterialIcon name='add-photo-alternate' size={56} color='#ccc' /><Text>Add Images</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#000'} size={20} />
          <TextInput
            placeholder="Title"
            placeholderTextColor="#666666"
            onChangeText={(val) => handleTitleChange(val)}
            style={
              styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="fa-list-alt" color={'#000'} size={20} />
          <TextInput
            placeholder="Category"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(val) => handleCategoryChange(val)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
        <MaterialIcon name='Description' size={20} color='#ccc' /><Text>Add Images</Text>
          <TextInput
            placeholder="description"
            multiline={true}
            placeholderTextColor="#666666"
            onChangeText={(val) => handleDescriptionChange(val)}
            autoCorrect={false}
            style={
              styles.textInput
            }
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="fa-money" color={'#000'} size={20} />
          <TextInput
            placeholder="Price"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(val) => handlePriceChange(val)}
            style={
              styles.textInput

            }
          />
        </View>
        {/* <View style={styles.action}>
          <FontAwesome name="globe" color={'#000'} size={20} />
          <TextInput
            placeholder="SKU"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={
              styles.textInput
            }
          />
        </View> */}
        <View style={styles.action}>
          <Icon name="balance-scale" color={'#000'} size={20} />
          <TextInput
            placeholder="Tax Status"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={
              styles.textInput

            }
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={handleSubmition}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
