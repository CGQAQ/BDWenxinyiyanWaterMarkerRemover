// 请配合 https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii 插件或任何能在html加载前修改html的插件使用

// 干掉控制台打开限制
window.setInterval = function() {
    console.log("hhhh")
}

// 干掉 shadowdom closed
// https://stackoverflow.com/a/54954525
Element.prototype._attachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function () {
    console.log('attachShadow');
    return this._attachShadow( { mode: "open" } );
};


// load 之后马上3s干掉水印
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const it = document.body.querySelector("div[style^=\"point\"]")
        // console.log("it", it)
        const its = it.shadowRoot.querySelectorAll("div")
        // console.log("its", its)
        its.forEach(it => it.remove())
    }, 3000)

})

// 劫持 resize 和 visibilitychange 事件监听
const __________addEventListener = window.addEventListener;
window.addEventListener = function() {
    if (arguments[0] === "resize" || arguments[0] === "visibilitychange") {
        console.log("nice try");
    }
    else {
        Reflect.apply(__________addEventListener, window, [...arguments]);
    }
}

// 每次检测到 dom 变动，延迟一秒干掉水印
const ___________O = MutationObserver || WebKitMutationObserver;
const ___________x = new ___________O(function() {
    setTimeout(() => {
        const it = document.body.querySelector("div[style^=\"point\"]")
        // console.log("it", it)
        const its = it.shadowRoot.querySelectorAll("div")
        console.log("OB", its.length)
        its.forEach(it => it.remove())
    }, 1000)
});

___________x.observe(document, {
    attributes: !0,
    childList: !0,
    characterData: !0,
    subtree: !0
})
___________x.connect()

document.addEventListener("DOMSubtreeModified", () => {
    setTimeout(() => {
        const it = document.body.querySelector("div[style^=\"point\"]")
        // console.log("it", it)
        const its = it.shadowRoot.querySelectorAll("div")
        console.log("DSM", its.length)
        its.forEach(it => it.remove())
    }, 1000)
})
