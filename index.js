import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { runAppConfiguration } from './app/AppConfig';
import App from './app/App';

runAppConfiguration();

AppRegistry.registerComponent(appName, () => App);
