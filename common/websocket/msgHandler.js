module.exports = function (msg, page, callback) { // page -> index page
  var app = getApp();

   console.log("ex " + msg);
  msg = JSON.parse(msg);
  // var type = msg.data && msg.data.type ||
  //   msg.errMsg && msg.errMsg.type;
  
  if (typeof callback === "function")
    callback(msg);

  // if (type === 'dig') {  
  //   if (msg.errCode == 0) {
  //     var result = msg.data.answer,
  //       x = msg.data.x,
  //       y = msg.data.y;
  //     if (result < 0) {  
  //       app.decreaseCount();
  //       var leftGolds = page.data.leftGolds,
  //         score = page.data.score;
  //       if (msg.data.isMe) {
  //         score++;
  //       }
  //       page.setData({
  //         leftGolds: --leftGolds,
  //         score: score
  //       });
  //     }

  //     page.setData({
  //       ['mimeMap[' + y + '][' + x + ']']: result,
  //     });
  //   }
  // }
  // else if (type === 'create') {  
  //   if (msg.errCode == 0) {
  //     var mimeMap = msg.data.map;
  //     app.updateMap(mimeMap);          
  //     app.setCount(msg.data.count);    
  //     page.setData({
  //       mimeMap: mimeMap,
  //       leftGolds: msg.data.count     
  //     });
  //   }
  //   else {
  //     wx.navigateBack();
  //   }
  // }
  // else if (type === 'over') {  
  //   if (msg.errCode == 0) {
  //     app.setMyScore(msg.data.score);
  //     wx.navigateTo({
  //       url: '../gameover/gameover'
  //     });
  //   }
  // }

}
