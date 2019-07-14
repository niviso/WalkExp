import Expo from "expo";
import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import styles from "./style.scss";
import textStyles from "../../main-components/styling/text.scss";
import EXP_TABLE from '../../EXP_TABLE';
import DATA from '../../data.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default class DefaultView extends React.Component {
  state = {
    totalSteps: 0,
    isPedometerAvailable: false

  }
  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  findLevel = () => {
    for(let i = 0; i!= EXP_TABLE.length;i++){
      if(EXP_TABLE[i] > this.state.totalSteps){
        this.setState({
          level: i
        });
        break;
      }
    }
  }
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState(prevState => ({
        totalSteps: prevState.totalSteps + result.steps
      }));
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
    const start = new Date(DATA.START_DATE); //Get start date from asyncStorage
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ totalSteps: result.steps });
        this.findLevel();
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
  render(){
    const currentExp = (this.state.totalSteps/EXP_TABLE[DATA.level - 1]) * 100;

    return(
      <View style={styles.container}>
      <View style={styles.StatsPanel}>
      <Text style={[textStyles.h2,textStyles.marginBottomSmall]}>Level: {this.state.level}</Text>
      </View>
        <AnimatedCircularProgress
          size={200}
          width={3}
          rotation={0}
          duration={2000}
          backgroundWidth={2}
          fill={currentExp}
          tintColor="black"
          backgroundColor={"rgba(0,0,0,0.2)"}
        >
          {currentExp => <Text style={[textStyles.h1,textStyles.textOrange]}>{Math.round(currentExp)}</Text>}
        </AnimatedCircularProgress>

        <View style={[textStyles.marginTopSmall,textStyles.flexContainer]}>
        <Text style={[textStyles.textGrayDark,textStyles.h2]}>
          Total steps:&nbsp;
        </Text>
        <Text style={[textStyles.textPrimary,textStyles.h2]}>
         {this.state.totalSteps}
         </Text>
        </View>

      </View>

    )
  }

}
