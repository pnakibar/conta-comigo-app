import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import defaults from './../defaults';

const DefaultIcon = props => <Icon {...props} size={24} color="#FFF" />;
export default class MyActionButton extends Component {
  render() {
    return (
      <ActionButton buttonColor={defaults.color.main} {...this.props}>
        <ActionButton.Item
          title="Nova venda"
          onPress={() => this.props.navigation.navigate('NovaVenda')}
        >
          <DefaultIcon name="cart-plus" />
        </ActionButton.Item>
        <ActionButton.Item
          title="Novo Cliente"
          onPress={() => this.props.navigation.navigate('NovoCliente')}
        >
          <DefaultIcon name="user-plus" />
        </ActionButton.Item>
        <ActionButton.Item
          title="Novo Item"
          onPress={() => this.props.navigation.navigate('NovoItem')}
        >
          <DefaultIcon name="plus" />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
