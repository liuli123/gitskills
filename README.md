## 如何运行

### 首次运行

* 首先，需要先安装好node.js
* 用git clone一份代码
* 在项目目录下执行`npm install`，安装依赖的库

### 日常运行

* 在项目根目录下执行`gulp`
* 用浏览器打开 http://localhost:3000
* 修改源代码并保存后浏览器会自动刷新


## 目录结构

* css、js、图片文件放到`public`目录下的相应目录，引用时使用相对地址：

     /css/*
     /js/*
     /img/*

* HTML文件放到`views`目录下，扩展名必须为`handlebars`
* JS代码放到`routes`目录下

## 如何添加一个新页面

假设要添加一个名为`order`的页面:

1. 在`views`目录下创建一个名为`order.handlebars`文件，注意扩展名必须为`handlebars`。如果此页面需要在<head>里添加内容，则在最上方添加：

```
{{#section 'head'}}
   这里是要添加到<head>里的内容
{{/section}}
```

2. 在`routes`目录下创建一个名为`order.js`的文件，内容同`index.js`，把`index`换成`order`，并修改title的值

3. 修改`app.js`

```javascript

     // 在前面引用order.js文件：
     var orders = require('./routes/order');

     // 在404方法之前添加一条URL：
     app.use('/orders', orders);
```

4. 用浏览器访问新地址：

     http://localhost:3000/orders

## 常见问题

Q：样式加载不成功？
A：加载public目录下的文件的正确路径是 `/css/*.css` ，而不是 `css/*.css`

Q：报404错误？
A：按照上面的说明逐项检查文件名和变量名是否正确
