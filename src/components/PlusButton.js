import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#F00',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
    padding: 10,
  },
  label: {
    backgroundColor: defaults.color.main,
  },
  plus: {
    backgroundColor: defaults.color.mainLight,
  },
});

const ValueShow = props => (
  <View style={styles.container}>
    <TouchableNativeFeedback>
      <View style={styles.buttonContainer}>
        <Text style={[styles.text, styles.label]}>{props.label}</Text>
        <Text style={[styles.text, styles.plus]}>+</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
);

ValueShow.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ValueShow;
