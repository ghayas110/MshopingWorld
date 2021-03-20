import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from "./SplashScreen";
import { Button } from "react-native-elements";
import { StackActions, useNavigation } from "@react-navigation/native";

const MainScreen = (props) => {

    const navigation = useNavigation()
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/ss.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <View style={styles.footer}>
                <Button title='Sign Up' type='outline' raised buttonStyle={{borderRadius: 50}} containerStyle={{margin: 20}} 
                titleStyle={{fontWeight: "bold"}} onPress={() => navigation.dispatch(StackActions.push('signup')) } />
                <Button title='Sign In' type='outline' raised buttonStyle={{borderRadius: 50}} containerStyle={{margin: 20}} 
                titleStyle={{fontWeight: "bold"}} onPress={() => navigation.dispatch(StackActions.push('signin', {userEmail: null, username: null})) } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F99B4E'
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 30,
    },
    logo: {
        width: 300,
        height: 300

    },
    title: {
        color: "#080808",
        fontSize: 30,
        fontWeight: "bold"
    },
    stitle: {
        color: "#8C8686",
        marginTop: 5,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default connect()(MainScreen)