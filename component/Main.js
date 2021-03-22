import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, useColorScheme } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { connect } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainScreen from '../screens/MainScreen'
import SignUpScreen from '../screens/SignUpScreen'
import SignInScreen from '../screens/SignInScreen'
import SplashScreen from '../screens/SplashScreen'


import { API, graphqlOperation } from 'aws-amplify'
// import { createTodo } from '../graphql/mutations'
// import { listTodos } from '../graphql/queries'
import Confirmation from '../screens/Confimation'
import ForgotPassword from '../screens/ForgotPassword'

const Stack = createStackNavigator()

const Main = (props) => {

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)'
    }
  }

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)'
    }
  }

  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? MyDarkTheme : DefaultTheme} >
        <>
          <Stack.Navigator initialRouteName='splashScreen' >
            <Stack.Screen name="splashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name='confirmation' component={Confirmation} options={{ headerShown: false }} />
            <Stack.Screen name="signin" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name='forgot' component={ForgotPassword} options={{ headerShown: false }} />
          </Stack.Navigator>
        </>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default connect()(Main)