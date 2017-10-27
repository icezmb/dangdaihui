/*
* @Author: zoe
* @Date:   2017-09-24 16:57:56
* @Last Modified by:   zoe
* @Last Modified time: 2017-10-27 16:07:20
*/
$(document).ready(function(){

 // Initialize app and store it to myApp variable for futher access to its methods
              var myApp = new Framework7();
               
              // We need to use custom DOM library, let's save it to $$ variable:
              var $$ = Dom7;


      var callWaiting = document.querySelector(".callWaiting");
      var someonetalk = document.querySelector(".someonetalk");
      var callStop = document.querySelector(".callStop");
      var notification = document.querySelector(".notification");

      
      // 接听电话
      $(".phoneFooter").click(function(event) {
        callWaiting.pause();
        // 显示 2.通话中
        var mainView = myApp.addView('.view-main', {domCache: true});
        mainView.router.load({pageName: 'online'});
        someonetalk.play(); 
      });
       
      
      // 挂断电话
      $(".onlineFooter").click(function(event) {
        someonetalk.pause();
        callStop.play(); 
        // 显示 3.显示有条新消息
        var mainView = myApp.addView('.view-main', {domCache: true});
        mainView.router.load({pageName: 'pagelock'});
        $.notification({
                 title: "武汉理工大学党代会",
                 text: "有事找你，快进群。",
                 time: 2000,
                 media: "<img src='images/wechat.png'>",
                 onClick: function () { 
                   	chating();
                 }
        });
        // notification.play(); 
      });

      // 点击新消息
      $(".pagelockFooter").click(function(event) {
      	  chating();
      });


      function chating(){
         // 显示 4.聊天页面
         var mainView = myApp.addView('.view-main', {domCache: true});
         mainView.router.load({pageName: 'chating'});

         function response(msg, index) {
            // if(index != 0) 
            document.getElementById('msg').play();
            myMessages.addMessage({
                text: msg,
                type: 'received',
                name: '武汉理工大学党代会',
                avatar: 'images/0000049.jpg'
            });
        }

        function request(msg) {
            myMessages.addMessage({
                text: msg,
                type: 'sent',
                name: '网友',
                avatar: 'images/wy.jpg'
            });
        }

        var myMessages = myApp.messages('.messages', {autoLayout: true});

        function send(arr, index) {
               setTimeout(function() {
                 if('request' == arr[index][1]) request(arr[index][0]);
                 else response(arr[index][0], index);
                 if(index != arr.length - 1){
                     send(arr, index + 1);
                 }else{
                    //对话结束后自动跳转至 5.朋友圈
                    // setTimeout(function () {
                    $(".messagesFooter").removeClass('hide');
                    $(".messagesFooter").click(function(event) {
                         var mainView = myApp.addView('.view-main', {domCache: true});
                         mainView.router.load({pageName: 'friendCircle'});
                         //充实朋友圈内容
                         friendzoom();
                    });
                    // }, 3000);
                 } 
               }, 3000);
        }

        function start() {
              var arr = [
                ['关心教育的网友，你好！', 'response']
                // ['哇，真的是教育部长吗？部长你好呀！', 'request'],
                // ['辞旧迎新要用新媒体！', 'response'],
                // ['哈哈，这我可得好好看看！', 'request'],
                // ['那我现在还不知道要和你说啥！', 'response']
              ];
              send(arr, 0);
        }

        start();

      }


      function friendzoom(){
        var template = $('#template').html();
 
// compile it with Template7
var compiledTemplate = Template7.compile(template);
// Now we may render our compiled template by passing required context
var context = {
  friendArr : [
    {
      fzDName: '黑龙江新闻网',
      fzDText: '为奋力走出黑龙江全面振兴发展新路子而努力奋斗！继续加油！积极进取！<img src="images/wx013.png" class="faiEmjImg">',
      // imgSrc: 'images/wx013.png',
      fzDTime: '7分钟前',
      fzDCLikeArea: ['生活报','黑龙江新闻网'],
      fzDCCArea: [
                {
                  fzDCCAreaName1: '生活报',  //回复人
                  fzDCCAreaName2: '黑龙江新闻网',  //被回复人
                  fzDCCAreaText: '一起加油！'
                },
                {
                  fzDCCAreaName1: '黑龙江新闻网',  //回复人
                  fzDCCAreaName2: '生活报',  //被回复人
                  fzDCCAreaText: '一起奋斗！'
                },
              ]
    },
    {
      fzDName: '生活报',
      fzDText: '恭喜十九大顺利召开！继续加油！积极进取！',
      // imgSrc: 'images/wx042.png',
      fzDTime: '12分钟前',
      fzDCLikeArea: ['武汉理工大学团委','人民日报'],
      fzDCCArea: [
                {
                  fzDCCAreaName1: '生活报',  //回复人
                  fzDCCAreaName2: '人民日报',  //被回复人
                  fzDCCAreaText: '哈哈！'
                },
                {
                  fzDCCAreaName1: '生活报',  //回复人
                  fzDCCAreaName2: '武汉理工大学团委',  //被回复人
                  fzDCCAreaText: '开心！'
                },
              ]
    },
  ]   
};
var html = compiledTemplate(context);
$('.fzDetail').html(html);
      }



  });
