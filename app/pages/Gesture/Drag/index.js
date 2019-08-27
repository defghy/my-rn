import React from 'react';
import {
  View, Animated, Text, PanResponder
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';
import DragItem from './components/DragItem';

class GestureDrag extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Page>
        <Header />
        <View style={styles.page}>
          <DragItem />
        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  page: {
    flex: 1, position: 'relative'
  }
});

export default GestureDrag
