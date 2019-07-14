import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  container: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})

function SwipeContainer(props) {
  const {slides} = props;

    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
      {slides.map((content,index) => (
        <View style={styles.container} key={index}>
          {content}

        </View>
      ))}
      </Swiper>
    );
}

export default SwipeContainer;
