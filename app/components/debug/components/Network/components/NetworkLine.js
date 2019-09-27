import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';

function NetworkLine(props) {

  const { item, openItem } = props;
  const { rnRequest } = props.item;
  const { urlObj } = rnRequest;
  const isOdd = !(props.index % 2);
  const isError = ['4', '5'].includes((item.status + '')[0]);

  const renderPath = () => (
    <View style={{
      ...styles.commonItem,
      ...istyles.pathname
    }}>
      <Text numberOfLines={5}
        style={{
          ...styles.textCommon,
          ...(isError ? styles.textError : {})
        }}>{urlObj.lastPath || '/'}</Text>
    </View>
  );

  const renderItem = ({ value, width = 'auto', align, type, color = '#333' }) => (
    <View style={{
      ...styles.commonItem,
      ...{
        width,
        flexDirection: 'row', justifyContent: align
      }
    }}>
      <Text
        style={{
          ...styles.textCommon,
          ...{ color },
          ...(isError ? styles.textError : {})
        }}>{value}</Text>
    </View>
  );

  return (
    <TouchableHighlight
      onPress={() => openItem(item)}
      underlayColor="#f5f5f9"
    >
      <ScrollView contentContainerStyle={{
          ...(isOdd ? styles.oddLine : styles.evenLine),
          ...styles.wrapper
        }}
        horizontal={true}
      >
        {renderPath()}
        {renderItem({
          type: 'statusCode',
          value: item.status, align: 'center', width: 25
        })}
        {renderItem({
          type: 'method',
          value: rnRequest.method, align: 'center', width: 40
        })}
        {renderItem({
          type: 'mimeType',
          value: rnRequest.subType || rnRequest.type, align: 'flex-start', width: 40
        })}
        {renderItem({
          type: 'size',
          value: rnRequest.size, align: 'flex-start', width: 50
        })}
        {renderItem({
          type: 'time',
          value: rnRequest.time, align: 'flex-start', width: 50
        })}
        {renderItem({
          type: 'url',
          value: rnRequest.urlObj.href, align: 'flex-start', color: 'rgb(33, 150, 243)'
        })}
      </ScrollView>
    </TouchableHighlight>
  );
}

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row', alignItems: 'center',
    height: 40,
    paddingRight: 10
  },
  oddLine: {

  },
  evenLine: {
    backgroundColor: '#eceffe',
  },
  commonItem: {

  },
  textCommon: {
    fontSize: 12, color: '#333'
  },
  textError: {
    color: 'rgb(230, 0, 0)'
  }
});

const istyles = EStyleSheet.create({
  pathname: {
    paddingHorizontal: 10,
    width: 120,
  },
});

export default NetworkLine;
