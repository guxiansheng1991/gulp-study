'use strict';

window.addEventListener('DOMContentLoaded', function (e) {
  var join = document.getElementById('join');
  var modelView = document.getElementById('check');
  var close = document.getElementById('close');
  var getCheckBtn = document.getElementById('getCheckBtn');
  var nums = document.getElementById('nums');
  var checkNum = document.getElementById('checkNumber');
  var checkNums = '';
  var phoneNumber = '';
  var myInterval = null;
  var timeLength = 60;
  var time = timeLength;
  var getFlag = true;
  var activityId = -1;
  var rootPath = '';
  if (window.location.hostname == 'localhost' || window.location.hostname.indexOf('192.168.1') != -1) {
    rootPath = '';
  } else {
    rootPath = '/h5collection/popUp';
  }
  /** 获取activityId */
  if (!window.location.search.split('&')[0]) {
    toast('缺少activityId参数');
    return;
  }
  activityId = window.location.search.split('&')[0].split('=')[1];
  /** 显示model */
  function showModel(flag) {
    if (flag) {
      modelView.style.display = 'flex';
    } else {
      modelView.style.display = 'none';
    }
  }

  /** 统计用户点击立即参与按钮人数*/
  function clickJoin() {
    var data = {
      extensionId: activityId
    };
    get('/extension/clickJoin', data, function (data) {
      console.log(data);
    });
  }

  /** 验证验证码*/
  function verify() {
    if (!phoneNumber) {
      toast('请输入手机号码');
      return;
    }
    var body = {
      "countryCode": "+86",
      "extensionId": activityId,
      "mobile": phoneNumber,
      "vcode": checkNums
    };
    post('/extension/verify', body, function (data, status, xhr) {
      if (data.code == 200) {
        window.location.href = window.location.origin + rootPath + '/dist/views/success.html';
      } else {
        checkNums = '';
        checkNum.value = '';
        toast(data.msg);
      }
    });
  }

  /** 获取活动信息 */
  function getBaseInfor() {
    get('/extension/' + activityId, null, function (data) {
      console.log(data);
    });
  }

  /** 获取验证码 */
  getCheckBtn.addEventListener('click', function (e) {
    if (!getFlag) {
      return;
    }
    phoneNumber = document.getElementById('phoneNumber').value;
    if (!phoneNumber) {
      toast('请输入手机号码');
      return;
    }
    var body = {
      "countryCode": "+86",
      "mobile": phoneNumber
    };
    post('/user/vcode/send', body, function (data, status, xhr) {
      if (data.code == 200) {
        toast(data.data);
      } else {
        toast(data.msg);
      }
      myInterval = setInterval(function () {
        if (time == 0) {
          clearInterval(myInterval);
          e.target.innerHTML = '重新获取';
          time = timeLength;
          getFlag = true;
          return;
        } else {
          getFlag = false;
          e.target.innerHTML = --time + ' s';
        }
      }, 1000);
    });
  });

  /** 输入框输入事件*/
  checkNum.addEventListener('input', function (e) {
    checkNums = e.target.value;
    if (checkNums.length >= 4) {
      e.target.blur();
      verify();
    }
  });

  /** 显示Model */
  join.addEventListener('click', function (e) {
    showModel(true);
    // 统计点击按钮人数
    clickJoin();
  });

  /** 关闭Model*/
  close.addEventListener('click', function (e) {
    showModel(false);
  });
  /** 获取基本信息 */
  getBaseInfor();
});