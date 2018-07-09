/**
 * @ProjectName: wurenche
 * @FileName: config.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2018-06-28 09:25
 */

let url ={
    baseUrl : 'http://10.226.75.45:8080/',
    timeFormat:timeFormat
}

function add0(m){return m<10?'0'+m:m }
//时间戳转化成时间格式
function timeFormat(timestamp){
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    if(!timestamp){
        return ''
    }
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
}


export default {
    install:function (vm) {
        vm.prototype.$url = url
    }
}