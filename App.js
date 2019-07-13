import Expo from "expo";
import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import styles from "./App.scss";
import textStyles from "./main-components/styling/text.scss";

import DATA from './data.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class App extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    const currentExp = this.state.currentStepCount;
    const expToLevel = 1000;
    const MAX_POINTS = 100;
    return (
      <SafeAreaView style={styles.container}>
      <Text style={[textStyles.h2,textStyles.marginBottomSmall]}>Experience</Text>
        <AnimatedCircularProgress
          size={200}
          width={3}
          duration={2000}
          backgroundWidth={2}
          fill={this.state.currentStepCount + 10}
          tintColor="black"
          backgroundColor="rgba(0,0,0,0.2)"
        >
          {currentExp => <Text style={textStyles.h1}>{Math.round((MAX_POINTS * currentExp) / 100)}</Text>}
        </AnimatedCircularProgress>

        <View style={[textStyles.marginTopSmall,textStyles.flexContainer]}>
        <Text>
          Total steps today:&nbsp;
        </Text>
        <Text style={textStyles.textPrimary}>
         {this.state.pastStepCount}
         </Text>
        </View>
      </SafeAreaView>
    );
  }
}
