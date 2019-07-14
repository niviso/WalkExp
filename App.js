import Expo from "expo";
import React from "react";
import { View } from "react-native";
import textStyles from "./main-components/styling/text.scss";
import DATA from './data.js';
import RegisterView from './views/RegisterView/index';
import DefaultView from './views/DefaultView/index';

export default class App extends React.Component {
  state = {
    view: 'Register'
  };

  render() {

    return (
      <View>
      {this.state.view === 'default' &&(
        <DefaultView/>
      )}
      {this.state.view === 'Register' &&(
      <RegisterView/>
    )}

      </View>
    );
  }
}
