/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigator from './navigation/Navigator'

import {HomeScreen} from './screens'
AppRegistry.registerComponent(appName, () => Navigator);
