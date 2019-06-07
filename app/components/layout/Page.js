import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

class Page extends React.Component {
  state = {

  };

  componentDidMount() {

  }

  render() {
    const { children } = this.props;
    return (
      <SafeAreaView style={styles.page}>
        {children}
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  page: {
    flexDirection: 'column', height: '100%',
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight
  }
});


export default Page;