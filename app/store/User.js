import { action, observable } from 'mobx';
import { fetchUser, fetchTextConfig } from 'MYRN/app/utils/request/api/test';

export default class User {
  @observable detail = {
    userName: '测试',
    role: '超级管理员'
  };

  @action fetchUser (user) {
    fetchUser().then(user => {
      this.detail = user;
    }).catch(e => {
      // toast
      return Promise.reject(e);
    });
  };

  @action fetchTextConfig (params) {
    fetchTextConfig(params).then(res => {
      return res;
    }).catch(e => {

    });
  }
}
