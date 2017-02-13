

/*
 * 该函数是返回的是指定格式的日期,是字符串类型
 * 参数:date ----日期
 * 返回值: 字符串类型的日期
 * */
function getDatetoString(date) {
    var strDate;//存储日期的字符串
    //获取年
    var year=date.getFullYear();
    //获取月
    var month=date.getMonth()+1;
    //获取日
    var day=date.getDate();
    //获取小时
    var hour=date.getHours();
    //获取分钟
    var minute=date.getMinutes()
    //获取秒
    var second=date.getSeconds();
    hour=hour<10?"0"+hour:hour;
    minute=minute<10?"0"+minute:minute;
    second=second<10?"0"+second:second;
    //拼接
    strDate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;//隐藏问题,关于变量声明的位置
    return strDate;
}

//根据id获取元素对象
function my$(id) {
    return document.getElementById(id);
}

//产生一个颜色
function getColor(color) {
    var arr=[];
    color="#";
    for(var i=0;i<6;i++) {
        arr[i]=parseInt(Math.random()*16);
        arr[i]=arr[i].toString(16);
        color+=arr[i];
    }
    return color;
}

/*
 *设置innerText属性的值
 * element-----为某个元素设置属性值
 * content-----设置的值
 * */
function setInnerText(element,content) {
    if(typeof element.textContent==="undefined"){
        //IE浏览器
        element.innerText=content;
    }else{
        element.textContent=content;
    }
}
/*
 * 获取innerText属性的值
 * element 要获取的元素
 * 返回的是该元素的innerText值
 * */
function getInnerText(element) {
    if(typeof element.textContent==="undefined"){
        //IE浏览器
        return element.innerText;
    }else{
        return element.textContent;
    }
}


//获取当前元素前一个元素
function getPreviousElement(element) {
    if(element.previousElementSibling){
        return element.previousElementSibling;
    }else{
        var ele=element.previousSibling;
        while (ele&&ele.nodeType!==1){
            ele=ele.previousSibling;
        }
        return ele;
    }
}
//获取当前元素的后一个元素
function getNextElement(element) {
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        var ele=element.nextSibling;
        while(ele&&ele.nodeType!==1){
            ele=ele.nextSibling;
        }
        return ele;
    }
}

//获取父元素中的第一个元素
function getFirstElementByParent(parent) {
    if(parent.firstElementChild){
        return parent.firstElementChild;
    }else{
        var ele=parent.firstChild;
        while (ele&&ele.nodeType!==1){
            ele=ele.nextSibling;
        }
        return ele;
    }
}
//获取父元素中的最后一个元素
function getLastElementByParent(parent) {
    if(parent.lastElementChild){
        return parent.lastElementChild;
    }else{
        var ele=parent.lastChild;
        while(ele&&ele.nodeType!==1){
            ele=ele.previousSibling;
        }
        return ele;
    }
}

//获取兄弟元素
function getsiblings(ele) {
    if(!ele)return;//判断当前的ele这个元素是否存在
    var elements=[];//定义数组的目的就是存储当前这个元素的所有的兄弟元素
    var el=ele.previousSibling;//当前元素的前一个节点
    while (el){
        if (el.nodeType===1){//元素
            elements.push(el);//加到数组中
        }
        el=el.previousSibling;
    }
    el=ele.nextSibling;
    while(el){
        if(el.nodeType===1){
            elements.push(el);
        }
        el=el.nextSibling;
    }
    return elements;
}
//    //能力检测多个浏览器为同一个对象注册多个事件
var EventTools= {
    //为对象添加注册事件
    addEventListener: function (element, eventName, listener) {
        if (element.addEventListener) {
            element.addEventListener(eventName, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, listener)
        } else {
            element["on" + eventName] = listener;
        }
    },
    //为对象移除事件
    removeEventListener: function (element, eventName, listener) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, listener, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + eventName, listener);
        } else {
            element["on" + eventName] = null;
        }
    },
    //获取参数e
    getEvent: function (e) {
        return e || window.event;
    },
    getPageX: function (e) {
        if (e.pageX) {
            return e.pageX;
        } else {
            //有的浏览器把高度设计在了文档的第一个元素中了
            //有的浏览器把高度设计在了body中了
            //document.documentElement.scrollTop;//文档的第一个元素
            //document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return e.clientX + scrollLeft;
        }
    },
    getPageY: function (e) {
        if (e.pageY) {
            return e.pageY;
        } else {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return e.clientY + scrollTop;
        }
    }

}
//这是获取卷曲宽度和高度的函数
function getScroll() {
    return {
        left:window.pageXOffset || document.body.scrollLeft ||
        document.documentElement.scrollLeft || 0,
        top:window.pageYOffset || document.body.scrollTop ||
        document.documentElement.scrollTop || 0
    };
}
//获取计算后的样式
//参数为元素和要获取的计算后的属性：left.top.width.height
function getStyle(element,attr) {
    return element.currentStyle?element.currentStyle[attr]:window.getComputedStyle(element,null)[attr]||0;
}
//获取任意元素  改变其各项位置大小属性
function animate(element,jsObj,num,fn) {
    clearInterval(element.setId);//清理计时器
    element.setId=setInterval(function () {
        var flag=true;
        for(var attr in jsObj) {
            if(attr=="opacity") {
                //获取当前透明度
                var current=getStyle(element,attr)*100;
                //获取目标透明度
                var target=jsObj[attr]*100;
                //确定步数（渐变效果）
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                //变化效果
                current+=step;
                element.style[attr]=current/100;
            }else if(attr=="zIndex") {
                element.style[attr]=jsObj[attr];
            }else {
                //获取当前位置
                var current=parseInt(getStyle(element,attr))||0;
                //获取目标位置
                var target=jsObj[attr];
                //确定步数
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                //当前的位置
                current+=step;
                element.style[attr]=current+"px";
                }
            if(current!=target) {
                flag=false;
            }
        }
        if(flag) {
            clearInterval(element.setId);
            if(fn) {
                fn();
            }
        }
    },num)
}

//function animate(element,jsObj,fn) {
//    clearInterval(element.setId);//清理计时器
//    element.setId=setInterval(function () {
//        var flag=true;
//        for(var attr in jsObj) {
//            if(attr=="opacity") {
//                //获取当前透明度
//                var current=getStyle(element,attr)*100;
//                //获取目标透明度
//                var target=jsObj[attr]*100;
//                //确定步数（渐变效果）
//                var step=(target-current)/10;
//                step=step>0?Math.ceil(step):Math.floor(step);
//                //变化效果
//                current+=step;
//                element.style[attr]=current/100;
//            }else if(attr=="zIndex") {
//                element.style[attr]=jsObj[attr];
//            }else {
//                //获取当前位置
//                var current=parseInt(getStyle(element,attr))||0;
//                //获取目标位置
//                var target=jsObj[attr];
//                //确定步数
//                var step=(target-current)/10;
//                step=step>0?Math.ceil(step):Math.floor(step);
//                //当前的位置
//                current+=step;
//                element.style[attr]=current+"px";
//            }
//            if(current!=target) {
//                flag=false;
//            }
//        }
//        if(flag) {
//            clearInterval(element.setId);
//            if(fn) {
//                fn();
//            }
//        }
//    },20)
//}


