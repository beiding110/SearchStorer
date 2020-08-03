# 搜索条件缓存工具库 search-storer

## 适用场景

使用该工具，解决如“搜索后点击进入详情页，再返回搜索页面，导致条件丢失”的前端ajax请求无状态的问题；

## 原理

以当前页面路径为索引，将传入的数据存储在sessionStorage中；

存储键格式：`search-session-页面路径`

## 使用方法

### 实例化

```JS

var ss = new SearchStorer();

var ss = new SearchStorer({
	header: 'search-session-rename-'
});

```

### 保存当前页面搜索条件

通常为点击搜索按钮、或点击翻页按钮时触发

调用 `$set` 方法，保存变量或元素选择器；

```JS

ss.$set({
	name: {
		el: '#name'
	},
	age: {
		el: '#age'
	},
	page: 1
})

```

### 调取前一次数据记录

调用 `$get` 方法，获取session中的对应数据；


```JS

var last = ss.$get();

```