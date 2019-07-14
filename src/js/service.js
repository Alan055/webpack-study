/*
* 这里是http请求，写得相对简单，但是很实用
 */
import Vue from 'vue'

let rootPath='/api';//根路径

function get(context,url,params) {
	return context.$http({
		url:rootPath+url,
		params:params,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		method:'get'
	})
}
//post方法
async function post(context,url,obj) {
 let result = await context.$http({
    url: rootPath + url,
    body: obj,
    method: 'post'
  })
  return result.data
}

// getDefault
function getDefault(context,url,params) {
	return context.$http({
		url:url,
		params:params,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		method:'get'
	})
}

// postDefault
function postDefault(context,url,obj) {
	return context.$http({
		url:url,
		body:obj,
		method:'post'
	})
}


export default {
	get,
	post,
	getDefault,
	postDefault,
}
