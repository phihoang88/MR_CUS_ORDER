/*

yarn add react-navigation
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add react-native-screens
yarn add react-native-safe-area-context
yarn add @react-navigation/bottom-tabs
*/
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackRouter } from 'react-navigation'

import {
    HomeScreen,
    MealScreen,
    ReceiptScreen,
    OrderListScreen
} from '../screens'
import { requestUserPermission, NotificationListener, GetFCMToken } from '../lib/pushnotification_helper'

const Stack = createNativeStackNavigator()

const Navigatior = (props) => {

    //set up notication
    useEffect(() => {
        requestUserPermission()
        GetFCMToken()
        NotificationListener()
    }, [])

    return <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            <Stack.Screen name={'MealScreen'} component={MealScreen} />
            <Stack.Screen name={'ReceiptScreen'} component={ReceiptScreen} />
            <Stack.Screen name={'OrderListScreen'} component={OrderListScreen} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigatior