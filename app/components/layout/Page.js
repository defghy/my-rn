import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Page extends React.Component {
  state = {

  };

  componentDidMount() {

  }

  render() {
    const { children } = this.props;
    return (
      <View style={styles.page}>
        {children}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  page: {
    flexDirection: 'column', height: '100%',
    backgroundColor: '#f5f5f5'
  }
});


export default Page;