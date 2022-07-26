import messaging from '@react-native-firebase/messaging';
import AsynStorage from '@react-native-async-storage/async-storage'

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        
    }
}

export async function GetFCMToken() {
    let fcmtoken = await AsynStorage.getItem("fcmtoken")
    if (!fcmtoken) {
        try {
            let fcmtoken = await messaging().getToken()
            if (fcmtoken) {
                await AsynStorage.setItem("fcmtoken", fcmtoken)
            }
            else {

            }
        }
        catch (error) {
            console.log(error, "error in fcmtoken")
        }
    }
}

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                
            }
        })

    messaging().onMessage(async remoteMessage => {
        
    })
}