import React from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, ToastAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ButtonGroup } from 'react-native-elements';
import { createUser, updateUser } from '../graphql/mutations';
import { getUser, listUsers } from '../graphql/queries';

const SignUpScreen = (props) => {

    const navigation = useNavigation()

    const [data, setData] = React.useState({
        category: 'reseller',
        index: 0,
        email: '',
        password: '',
        phone_number: '',
        confirm_password: '',
        referalEmail: '',
        check_textInputChange: false,
        check_ReferalEmailChange: false,
        check_EmailChange: false,
        check_PhoneChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    })

    async function signUp() {
        try {
            if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(data.email)) {
                await Auth.signUp({
                    username: data.email,
                    password: data.password,
                    attributes: {
                        email: data.email,          // optional
                        phone_number: data.phone_number,   // optional - E.164 number convention
                        // other custom attributes
                        'custom:category': data.category
                    }
                })
                    .then(async (user) => {
                        if (data.category === 'elite') {
                            const user = { username: data.email, email: data.email, phone_number: data.phone_number, category: data.category }
                            const newEliteUser = await API.graphql(graphqlOperation(createUser, { input: user }))
                            console.log(newEliteUser)
                        }
                        else if (data.category === 'reseller') {
                            console.log('reseller')
                            const eliteUserData = await API.graphql(graphqlOperation(listUsers, { filter: { email: { contains: data.referalEmail } } }))
                            const eliteUser = eliteUserData.data.listUsers.items
                            console.log('eliteUser:', JSON.stringify(eliteUser))
                            const newResellerUser = { username: data.email, email: data.email, phone_number: data.phone_number, category: data.category, elliteId: eliteUser[0].id }
                            const resellerUser = await API.graphql(graphqlOperation(createUser, { input: newResellerUser }))
                            // const updatedEliteUser = await API.graphql(graphqlOperation(updateUser, { input: { id: eliteUser.id, resellers: [...eliteUser.resellers, newResellerUser] } }))
                            console.log('createdResellerUser', resellerUser.data)
                        }
                        navigation.dispatch(StackActions.push('confirmation', { username: user.user.getUsername(), userEmail: data.email }))
                        console.log(user, user.user.getUsername())
                    })
            }
            else {
                ToastAndroid.showWithGravity('Email or phone Number is not correct!', ToastAndroid.LONG, ToastAndroid.CENTER)
            }
        } catch (error) {
            console.log('error signing up:', error);
            ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
        }
    }

    const updateIndex = (selectedIndex) => {
        setData({ ...data, category: selectedIndex === 0 ? 'reseller' : 'elite', index: selectedIndex })
    }

    const handleReferalEmailAddress = (val) => {
        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(val)) {
            setData({
                ...data,
                referalEmail: val,
                check_ReferalEmailChange: true
            });
        } else {
            setData({
                ...data,
                referalEmail: val,
                check_ReferalEmailChange: false
            });
        }
    }

    const handleEmailAddress = (val) => {
        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(val)) {
            setData({
                ...data,
                email: val,
                check_EmailChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_EmailChange: false
            });
        }
    }

    const handlePhoneNumber = (val) => {
        if (val.length < 10) {
            setData({
                ...data,
                phone_number: '+92'.concat(val),
                check_PhoneChange: false
            });
        } else {
            setData({
                ...data,
                phone_number: '+92'.concat(val),
                check_PhoneChange: true
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer} >
                <ScrollView>
                    <Text style={styles.text_footer}>Category</Text>
                    <View style={styles.action}>
                        <ButtonGroup selectedButtonStyle={{ backgroundColor: '#F99B4E' }} textStyle={{ fontSize: 16 }}
                            containerStyle={{ width: '100%' }}
                            onPress={updateIndex}
                            selectedIndex={data.index}
                            buttons={['Reseller', 'Elite']}
                        />
                    </View>

                    {data.index === 0 &&
                        <Animatable.View animation='fadeIn' easing='ease-in-out' >
                            <Text style={{ marginTop: 20 }}>Optional</Text>
                            <Text style={styles.text_footer}>Your Elite Referal Email</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="envelope-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Elite's Email"
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handleReferalEmailAddress(val)}
                                />
                                {data.check_ReferalEmailChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                            </View>
                        </Animatable.View>}


                    <Text style={[styles.text_footer, {
                        marginTop: 20
                    }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleEmailAddress(val)}
                        />
                        {data.check_EmailChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 20
                    }]}>Phone Number</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="phone"
                            color="#05375a"
                            size={20}
                        />
                        <Text
                            style={{ flex: .1, marginTop: Platform.OS === 'ios' ? 0 : -12, paddingLeft: 10, color: '#05375a', paddingVertical: 15 }}>+92</Text>
                        <TextInput
                            placeholder="Your Phone"
                            textContentType='telephoneNumber'
                            keyboardType='phone-pad'
                            maxLength={10}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePhoneNumber(val)}
                        />
                        {data.check_PhoneChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 20
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={signUp}
                        >
                            <LinearGradient
                                colors={['#F99B4E', '#F99B4E']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.dispatch(StackActions.replace('signin', { userEmail: null, username: null }))}
                            style={[styles.signIn, {
                                borderColor: '#F99B4E',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#F99B4E'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F99B4E'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 5 : 7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});