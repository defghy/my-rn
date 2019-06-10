import React from 'react';
import { View, Text, PanResponder } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from 'mobx-react';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

@inject('user')
@observer
class AjaxTest extends React.Component {

  componentDidMount = async () => {
    const { user } = this.props;
    await user.fetchUser();
  }

  render() {
    const { user: { detail } } = this.props;
    return (
      <Page>
        <Header />
        <View style={styles.body}>
          <Text>{detail && detail.userName}</Text>
        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1
  }
});

export default AjaxTest;