window.addEventListener('DOMContentLoaded', function (e) {
  var join = document.getElementById('join');
  var modelView = document.getElementById('check');
  var close = document.getElementById('close');
  var getCheckBtn = document.getElementById('getCheckBtn');
  var checkNums = '';
  var phoneNumber = '';
  var myInterval = null;
  var timeLength = 60;
  var time = timeLength;
  var activityId = 1;

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
      "extensionId": 0,
      "mobile": phoneNumber,
      "vcode": checkNums
    };
    post('/extension/verify', body, function (data, status, xhr) {
      if (data.code == 200) {
        window.location.href = window.location.origin + '/dist/views/success.html';
      } else {
        var nums = document.getElementsByClassName('num');
        checkNums = '';
        for (var i = 0; i < nums.length; i++) {
          nums[i].value = '';
        }
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
          return;
        }
        e.target.innerHTML = --time + ' s';
      }, 1000);
    });
  });

  /** 输入框输入事件*/
  window.inputChange = function (e) {
    var nums = document.getElementsByClassName('num');
    checkNums = '';
    for (var i = 0; i < nums.length; i++) {
      checkNums += '' + nums[i].value;
      if (!nums[i].value) {
        nums[i].focus();
        break;
      } else {
        // 输入验证码完成
        if (i == nums.length - 1) {
          nums[i].blur();
          verify();
        }
      }
    }
  };

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