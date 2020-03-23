(function(){
    var jQuery=function(selector){
        return new Init(selector)
    }
    function Init(selector){
        var doms=[]
        if(typeof selector==='string'){
            // 传入一个元素
             doms = document.querySelectorAll(selector);
        }else if(selector instanceof Element){
            // 传入DOM伪数组
             doms.push(selector);
        } else if (selector instanceof NodeList || selector instanceof HTMLCollection){
            // 传入DOM对象
            doms=selector;
        } else if (selector instanceof Array){
            // 传入一个数组
            doms=selector;
        } else if (typeof selector==='function'){
            // JQ入口函数
            document.addEventListener('DOMContentLoaded',selector)
        }
        for(var i=0;i<doms.length;i++){
            this[i]=doms[i];
        }
        this.length=doms.length;
    }
    Init.prototype.each=function(fn){
        for(var i=0;i<this.length;i++){
            fn(i,this[i]);
        }
        return this;
    }
    Init.prototype.addClass=function(className){
        // 隐式迭代：遍历
        for(var i=0;i<this.length;i++){
            this[i].classList.add(className);
        }
        // 链式编程：返回调用的方法的那个对象
        return this;
    }
    Init.prototype.removeClass = function (className){
        return this.each(function(index,item){
            item.classList.remove(className);
        })
    }
    Init.prototype.toggleClass = function (className) {
        return this.each(function(index,item){
            item.classList.toggle(className);
        })
    }
    Init.prototype.hide = function () {
        return this.each(function(index,item){
            // item.setAttribute("display", "none");
            // item= getComputedStyle(item)[display];
            // item = 'none';
            item.style.display='none';
        })
    }
    Init.prototype.show = function () {
        return this.each(function(index,item){
            item.style.display = 'block';
        })
    }
    Init.prototype.toggle = function () {
         return this.each(function (index, item) {
             var bl = true;
              if(bl){
                  item.style.display = 'none';
              }else{
                  item.style.display = 'block';
              }
             bl=!bl;
         })
    }
    //css(key,value)
    Init.prototype.css = function (property, value) {
        console.log(value);
        // debugger;
       if (value === undefined) {
           if (property instanceof Object) {
               var attrNames = Object.keys(property);
               var arr = Object.values(property);
            //    console.log(attrNames);
            //    console.log(arr);
               //    // for 循环属性名
                  for (var i = 0; i < attrNames.length; i++) {
                    //   debugger;
                      if(typeof arr[i]==='number'){
                        this.each(function(index,item){
                                item.style[attrNames[i]] = arr[i]+'px';
                            
                        })
                      }else{
                          this.each(function (index, item) {
                              item.style[attrNames[i]] = arr[i];
                          })
                          
                        //   console.log(this[i])
                      }
                  }
               return this
           }else{
               let cssStyle = window.getComputedStyle(this[0]);
               return cssStyle[property];
           }
           
       } else {
           
           // 就是传递了两个实参，就是设置操作 - 把伪数组里面的所有的元素都设置
           // for(let i=0;i<this.length;i++){
           //   this[i].style[property]=value;
           // }
           this.each((index, item) => {
               console.log(item.style[property]);
               item.style[property] = value;
           });
       }
       
    }
    //eq(索引值)
    Init.prototype.eq=function(number){
          return new Init(this[number]);
    }
    // text和html和val
    Init.prototype.text = function (content){
        if(content===undefined){
            //  this.each(function (index, item) {
               return this[0].innerText;
            // })
        }else{
             this.each(function (index, item) {
              return item.innerText = content;
            })
        }
        // return this;
    }
    Init.prototype.html = function (content) {
        if (content === undefined) {
            //  this.each(function (index, item) {
               return this[0].innerHTML;
            // })
        } else {
             this.each(function (index, item) {
                item.innerHTML = content;
            })
        }
    }
    Init.prototype.val = function (content) {
        // console.log(content);
        if(!content){
            //  this.each(function(index,item){
               return this[0].value;
            // })
        }else{
             this.each(function (index, item) {
                item.value = content;
            })
            }
        }


        //children,parent,siblings
        Init.prototype.children=function(){
            return new Init(this[0].children);
        }
        Init.prototype.parent = function () {
            return new Init(this[0].parentElement);
            // console.log(this);
            // return this.parentElement;
        }
        Init.prototype.siblings = function () {  
            var that = this[0].parentElement.children;
            // that.each((index, item) => {
            //     if (item === this) {
            //         that = that.splice(index, 1);
            //     }
            // })
            // console.log(this[0]);
            for(var i=0;i<that.length;i++){
                if(that[i]===this[0]){
                    // Array.prototype.splice.call(that,i);
                    that = Array.from(that);
                     that.splice(i,1);
                    //  console.log(that);
                }
            }
            // console.dir(that);
            return new Init(that);
            
            // console.log(this.eq());
        }

        // 选择器.on('事件类型',事件委托,事件处理函数'）;
        Init.prototype.on = function (type, selector, fn) {
            if(fn===undefined){
                fn=selector;
                this.each(function(index,item){
                    item.addEventListener(type,fn);
                })
            }else{
                this.each(function (index, item){
                    item.addEventListener(type, function (event) {
                        let lists = this.querySelectorAll(selector);
                        let isExit = Array.prototype.includes.call(lists, event.target) ;//slice()
                        if(isExit){
                            fn.call(event.target);
                        }
                    })
                })
            }
            return this;
        }
        // 对象.attr(key,值)
        // 获取，修改
      Init.prototype.attr = function (attribute, value) {
          console.dir(attribute);
          if (value === undefined) {
              return this[0].getAttribute(attribute);

          } else {
              this.each((index, item) => {
                //   console.log(item.setAttribute(attribute, value))
                  item.setAttribute(attribute, value)
              })
          }
          
          
      }
      // 开关属性
      // 对象.prop(key,布尔值)
    Init.prototype.prop=function(property,value){
        if(value===undefined){
            // this.each((index, item) => {
               return item[property]
            // })
        }else{
             this.each((index, item) => {
                item[property]=value;
             })
        }
    }

    window.jQuery=window.$=jQuery;
})()