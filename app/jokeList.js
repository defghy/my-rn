import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import cloneDeep from 'lodash/cloneDeep';

const fetchJoke = ({curPage = 1, pageSize = 20}) => {
  let formData = new FormData();
  let d = new Date();
  formData.append("showapi_test_draft", "false");
  formData.append("pointId", "559f34726e36dfb2bc933a63");
  formData.append("pointCode", "1");
  formData.append("showapi_appid", "56597");
  formData.append("showapi_sign", "92510d431058460d8c92faed4efe2d98");
  formData.append("showapi_timestamp", `${d.toJSON().split(/[T\.]/)[0].split('-').join('')}${d.toTimeString().split(' ')[0].split(':').join('')}`);
  formData.append("page", curPage);
  formData.append("maxResult", pageSize);

  return fetch('https://route.showapi.com/341-1', {
    method: 'POST',
    body:formData,
  }).then(response => {
    if(response.ok) {
      return response.json();
    }
  }).then((json) => {
    if(json.showapi_res_code == 0) {
      let data = json.showapi_res_body || {};
      let allPages = data.allPages;
      let allNum = data.allNum;
      let jokes = data.contentlist.map((joke, index) => {
        let content = joke.text.replace(/\<br\s?\/\>/ig, '');
        return {
          title: joke.title,
          type: joke.type,
          content: content,
          timestamp: joke.ct,
          key: curPage+''+index,
          collapse: content.length>60? true: false
        };
      });

      return jokes;
    }

    return [];
  });
};

class JokeList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '笑话',
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name="md-pricetags" size={25} color={tintColor} />
    // )
  });

  constructor(props) {
    super(props)
    this.state = {
      jokes: [],
      curPage: 1,
      pageSize: 20
    }
  }

  componentWillMount() {

    fetchJoke({
      curPage: this.state.curPage,
      pageSize: this.state.pageSize})
    .then((jokes) => {
      this.setState({
        jokes: jokes
      });
    });
  }

  fetchNextPage() {
    this.setState({
      curPage: ++this.state.curPage
    });

    fetchJoke({
      curPage: this.state.curPage,
      pageSize: this.state.pageSize})
    .then((jokes) => {
      debugger;
    });
  }

  expandItem(item, index) {
    const tempData = cloneDeep(this.state.jokes);
    tempData[index].collapse = false;
    this.setState({
      jokes: tempData
    });
  }

  filterItem(item) {
    if(item.collapse) {
      return item.content.substring(0, 60)+ '...';
    } else {
      return item.content;
    }

  }

  renderJokeItem(item, index) {

    if(index == this.state.jokes.length - 1) {
      return (
        <View>
          <View style={styles.joke_item_wrapper}>
            <Text style={styles.joke_item_title}>{item.title}</Text>
            <Text style={styles.joke_item_content}>{this.filterItem(item)} <Text style={styles.joke_item_expand}  onPress={() => this.expandItem(item, index)}>详细展开</Text></Text>
          </View>
          <TouchableHighlight style={styles.fetch_more}
            onPress={this.fetchNextPage}>
            <Text style={{
              fontSize: 20,
              color: '#999'
            }}>点击加载更多</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.joke_item_wrapper}>
          <Text style={styles.joke_item_title}>{item.title}</Text>
          <Text style={styles.joke_item_content}>{this.filterItem(item)} <Text style={styles.joke_item_expand}  onPress={() => this.expandItem(item, index)}>详细展开</Text></Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.flat_view}>
        <FlatList
          data={this.state.jokes}
          renderItem={({item, index}) => this.renderJokeItem(item, index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flat_view: {
    backgroundColor: '#F5F5F5',
    height: '100%'
  },
  joke_item_wrapper: {
    backgroundColor: '#fff',
    marginBottom: 6,
    padding: 10
  },
  joke_item_title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  joke_item_content: {
    fontSize: 16
  },
  joke_item_expand: {
    color: '#0084ff'
  },
  fetch_more: {
    height: 60,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
});

export default JokeList;