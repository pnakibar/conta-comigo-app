import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import defaults from './../defaults';

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: defaults.color.grey,
  },
  labelContainer: {
    alignContent: 'flex-start',
  },
  label: {
    color: defaults.color.grey,
  },
  valueContainer: {
    alignContent: 'flex-end',
  },
  value: {
    color: defaults.color.main,
  },
});

const Line = ({ label, value, onTouch }) => (
  <View style={styles.lineContainer} onTouch={() => onTouch(label)}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const SalesList = props => (
  <View>
    {props.data.map(line => <Line onTouch={props.onTouch} {...line} />)}
  </View>
);

SalesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  onTouch: PropTypes.func.isRequired,
};

SalesList.defaults = {
  data: [],
};

export default SalesList;
