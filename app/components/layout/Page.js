import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import { STATUS_BAR_HEIGHT } from 'MYRN/app/utils/global';

class Page extends React.Component {
  static defaultProps = {
    statusBarBackgroundColor: '#fff' // 默认选中
  };

  state = {

  };

  componentDidMount() {

  }

  render() {
    const { children, statusBarBackgroundColor } = this.props;
    return (
      <SafeAreaView>
        <View style={[
          styles.statusBar, {backgroundColor: statusBarBackgroundColor}
        ]}></View>
        <View style={styles.page}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT, width: '100%',
    position: 'absolute', left: 0, top: 0
  },
  page: {
    flexDirection: 'column', height: '100%',
    backgroundColor: '#f5f5f5',
  }
});


export default Page;