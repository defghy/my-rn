// 新版
const newCallback = function(srcData, targetData) {
  const { callbackFunc } = srcData.payload;
  targetData = JSON.stringify(targetData);
  const run = `
    window.${callbackFunc} && window.${callbackFunc}(${targetData});
    true;
  `;
  this.webView.injectJavaScript(run);
}

const handlers = {
  closeWebview(data) {  // 关闭浏览器
    this.props.navigation.goBack();
    // if (data && data.payload && data.payload.callbackFunc) { // 新版参数
    //   newCallback.call(this, data, params);
    // }
  }
};

// 信息处理
export const messageHandler = function(e) {
  const { nativeEvent } = e;
  if(!nativeEvent.data){
    return;
  }
  const param = JSON.parse(e.nativeEvent.data);
  const action = param.action;
  const handler = handlers[action];
  if (handler) {
    handler.call(this, param);
  }
};
