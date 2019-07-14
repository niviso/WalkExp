import React from "react";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import SwiperContainer from '../../components/SwiperContainer';
import textStyles from "../../main-components/styling/text.scss";



export default class RegisterView extends React.Component {
  render(){
    const test = (<Text style={textStyles.textGray}>Test</Text>)
    return(
      <View style={{height: '100%',width:'100%'}}>
      <SwiperContainer slides={[test,test]} />
      </View>
    )
  }

}
