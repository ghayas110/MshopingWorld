import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, HeaderBackground, HeaderTitle} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from "./HomeScreen";
import Dashboard from "./Dashboard";
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
import { View,TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-paper';
import EditProfile from './EditProfile';
import CardCustDetails from './CardCustDetails';
import CardCustScreen from './CardCustScreen';
import Upload from './Upload';
import { Auth } from 'aws-amplify';

// import CardOrderDetails from './CardOrderDetails';
// import CardOrderScreen from './CardorderScreen';
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();




const RootStack = createStackNavigator();
export default function MyTabs() {
  Auth.currentUserInfo().then((data) => {
    console.log(data.id)
  })
    return (
     
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="white"
        style={{ backgroundColor: 'white' }}
      >
        
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor:"black",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Updates',
            tabBarColor:"#009387",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }
        }
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor:"red",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
         <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarLabel: 'Explore',
            tabBarColor:"coral",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="web" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

const DashboardScreen =({navigation})=> {
    return(
   
    <DashboardStack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:"#009387",
       
       
          
        }
      }}>
      
      <DashboardStack.Screen name="Dashboard" component={Dashboard} options={{headerTitleAlign: 'center',headerTintColor:"white" } } />
      <DashboardStack.Screen 
        name="CardCustScreen"
        component={CardCustScreen}
        options={{title:" Planners",headerTitleAlign: 'center',headerTintColor:"black"}} />
          
          <DashboardStack.Screen 
        name="CardItemDetails"
        component={CardCustDetails}
        options={{ headerBackTitleVisible:false,headerTitle:false,headerTransparent:true,headerTintColor:"white",title:" Planners",headerTitleAlign: 'center',headerTintColor:"black" }
        
        }
         />
      <DashboardStack.Screen name="Upload" component={Upload} options={{headerTitleAlign: 'center',headerTintColor:"white" } } />
    </DashboardStack.Navigator>)
    }
    const HomeStackScreen =({navigation})=> {
      return(
      <HomeStack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:"white"  
        }
      }}>
        <HomeStack.Screen name="Home"  component={HomeScreen} options={{title:"EDukan",headerTitleAlign: 'center',headerTintColor:"black",headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Ionicons 
                name="ios-search"
                size={25}
                color='black'
                style={{marginTop:10}}
                onPress={() => {}}
              />
             
            </View>
          ),
          
         }}/>
      
               {/* <HomeStack.Screen 
        name="CardOrderScreen"
        component={CardOrderScreen}
        options={{title:" Planners",headerTitleAlign: 'center',headerTintColor:"black"}} />
          
          <HomeStack.Screen 
        name="CardOrderDetails"
        component={CardOrderDetails}
        options={{ headerBackTitleVisible:false,headerTitle:false,headerTransparent:true,headerTintColor:"white",title:" Planners",headerTitleAlign: 'center',headerTintColor:"black" }
        
        }
         /> */}
              {/* <HomeStack.Screen 
        name="Chatbot"
        component={Chatbot}
        options={{title:" Chatbot",headerTitleAlign: 'center',headerTintColor:"black"}} />  */}
      </HomeStack.Navigator>
      )
    }
    const ProfileStackScreen =({navigation})=> {
      return(
        <ProfileStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
            shadowColor: "#000000", // iOS
            elevation: 0, // Android
          },
          headerTintColor: '#000000',
        }}>
        <ProfileStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '',
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <MaterialCommunityIcons name="menu" color='black'  size={26} onPress={()=>navigation.openDrawer()}/>
              </View>
            ),
            headerRight: () => (
              <View style={{marginRight: 10}}>
                <MaterialCommunityIcons.Button
                  name="account-edit"
                  size={25}
                  backgroundColor='#ffff'
                  color='#000000'
                onPress={() => navigation.navigate('EditProfile')}
                />
              </View>
            ),
          }}
        />
        <ProfileStack.Screen
          name="EditProfile"
          options={{
            title: 'Edit Profile',
          }}
          component={EditProfile}
        />
      </ProfileStack.Navigator>
      )
    }