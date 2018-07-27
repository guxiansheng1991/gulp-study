function toast(text) {
  var close = (function() {
      var toastWrapper = document.createElement('div');
      toastWrapper.innerHTML = '<div style="width: 200px;height: auto;color: #ffffff;font-weight: 900;padding: 0px 10px;border-radius: 10px;display: flex;justify-content: center;align-items: center;position: fixed;left: 50%;bottom: 100px;margin-left: -100px;background: rgba(0, 0, 0, 0.7);z-index: 1000;">' +
              '<p>'  + text + '</p>' +
          '</div>';
      document.body.appendChild(toastWrapper);

      function closeToast() {
          setTimeout(function() {
              document.body.removeChild(toastWrapper);
          },2000);
      }

      return closeToast;
  })();
  close();
}

function getUrl() {
    var base = 'http://47.92.31.5:8081/innersect-api';
    var baseProduct = 'https://m.innersect.net/innersect-api';

    var hostname = window.location.hostname;
    if(hostname != 'm.innersect.net') {
        return base;
    }else {
        return baseProduct;
    }
}

function get(url, data, cb) {
    $.ajax({
        type: 'GET',
        url: getUrl() + url,
        data: data,
        success: function(data, status, xhr) {
            cb(data, status, xhr);
        },
        error: function(xhr, errorType, error) {
            toast('网络请求失败,请重试');
            console.log(xhr, errorType, error);
        }
    });
}

function post(url, data, cb) {
    $.ajax({
        type: 'POST',
        url: getUrl() + url,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data, status, xhr) {
            cb(data, status, xhr);
        },
        error: function(xhr, errorType, error) {
            toast('网络请求失败,请重试');
            console.log(xhr, errorType, error);
        }
    });
}