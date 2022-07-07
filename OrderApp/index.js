/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigator from './navigation/Navigator'

import PushNotification from 'react-native-push-notification'

PushNotification.configure({
    onNotification:function(notification){
        //console.log("Notification:", notification)
    },

    requestPermissions:true
})

AppRegistry.registerComponent(appName, () => Navigator);
