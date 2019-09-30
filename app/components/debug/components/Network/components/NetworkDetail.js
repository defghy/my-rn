import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';

class NetworkDetail extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      detail: null,
    };
  }

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  open = ({ detail }) => {
    this.setState({ visible: true, detail });
  }

  close = () => {
    this.setState({ visible: false });
  }

  renderHeader = ({ title, headers = [] }) => {
    if (!headers.length) {
      headers.push({ name: 'Empty', value: '' });
    }
    return (
      <View>
        <Text style={bstyles.headerTitle}>{title}</Text>
        <View style={bstyles.headerBody}>
          { headers.map(h => (
            <View style={bstyles.headerItem} key={h.name}>
              <Text style={bstyles.headerName}>{h.name}</Text>
              <Text style={bstyles.headerValue}>{h.value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  renderBody = ({ title, body }) => {
    body = body || 'Empty';
    return (
      <View>
        <Text style={bstyles.bodyTitle}>{title}</Text>
        <Text style={bstyles.bodyText}>{body}</Text>
      </View>
    );
  };

  render () {
    const { detail, visible } = this.state;

    if (!detail || !visible) {
      return null;
    }

    const { rnRequest } = detail;
    const { urlObj } = rnRequest;

    const formatHeaders = headers =>
      Object.keys(headers).map(name => ({ name, value: headers[name] }));

    return (
      <View style={styles.wrapper}>
        <View style={styles.panel}>
          <TouchableHighlight
            onPress={this.close}
            style={styles.close}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Icon name="closecircle" style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.body}>
          <View style={bstyles.urlWrapper}>
            <Text style={bstyles.url}>{urlObj.href}</Text>
          </View>
          {this.renderHeader({
            title: 'Request Headers',
            headers: formatHeaders(rnRequest.reqHeaders),
          })}
          {this.renderHeader({
            title: 'Response Headers',
            headers: formatHeaders(rnRequest.resHeaders),
          })}
          {this.renderBody({
            title: 'Request Body',
            body: rnRequest.data && rnRequest.data.replace(/\\/ig, ''),
          })}
          {this.renderBody({
            title: 'Response Body',
            body: rnRequest.resTxt && rnRequest.resTxt.replace(/\\/ig, ''),
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '100%',
    position: 'absolute', left: 0, top: 0,
    backgroundColor: 'rgb(248, 249, 250)',
  },
  panel: {
    height: '20rem',
    paddingHorizontal: '10rem',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
    borderColor: '#eceffe', borderBottomWidth: 1,
  },
  close: {
    width: '20rem',
  },
  closeIcon: {
    fontSize: '14rem',
  },
  body: {
    flex: 1,
  },
});

const bstyles = EStyleSheet.create({
  urlWrapper: {
    backgroundColor: '#fff',
    marginBottom: '5rem', padding: '10rem',
  },
  url: {
    fontSize: '16rem', color: '#263238',
  },
  headerTitle: {
    paddingVertical: '5rem', paddingHorizontal: '10rem',
    color: '#fff', backgroundColor: 'rgb(33, 150, 243)',
  },
  headerBody: {
    backgroundColor: '#fff',
  },
  headerItem: {
    paddingVertical: '5rem', paddingHorizontal: '10rem',
    flexDirection: 'row', alignItems: 'flex-start',
  },
  headerName: {
    flexShrink: 0, width: '150rem', fontSize: '12rem',
  },
  headerValue: {
    flex: 1, fontSize: '12rem',
  },
  bodyTitle: {
    paddingVertical: '5rem', paddingHorizontal: '10rem',
    color: '#fff', backgroundColor: '#f76a24',
    fontSize: '12rem',
  },
  bodyText: {
    paddingVertical: '5rem', paddingHorizontal: '10rem',
    fontSize: '12rem',
  },
});

export default NetworkDetail;
