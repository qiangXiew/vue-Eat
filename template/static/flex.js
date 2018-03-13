/**
 * Created by eluga on 2017/6/4.
 */
var status = 1;

(function(){getWindow()}())
window.onresize = function(){getWindow()}

/* get浏览器宽度 */
function getWindow(){
  (function(){
    var basic = window.innerWidth/ 7.5;
    if (status){status = 0; setTimeout('status = 1',500); return document.querySelector("html").style.fontSize = basic.toFixed(2)+'px'}
    
    return
  }())
}

