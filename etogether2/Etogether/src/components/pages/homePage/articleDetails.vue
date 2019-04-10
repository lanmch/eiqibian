<template>
    <div class="downloadContent box-shadow">
        <h2>{{title}}</h2>
        <div class="downTitleSe">
	        <div class="downTime">
	        	<img src="../../../../static/logoAll/billZone/registTime.png"/>
	        	<span>发布时间：{{downTime}}</span>
	        </div>
	        <div class="downBrowse">
	        	<img src="../../../../static/logoAll/billZone/browse.png"/>
	        	<span>浏览量：{{downBrowse}}</span>
	        </div>
	    </div>
	    
	    <div class="downArticle" v-html="article.replace(/<br\s*\/?>/gi,'<br /><blockquote />')">
        </div>
        <div class="downloadZone">
			<div v-if='!ifLogin' v-show='ifHaveFile' class="btn"><el-button style="background-color:#00b7ee"  type='primary' @click="gotoLogin">点击下载</el-button></div>
			<div v-else v-show='ifHaveFile' class="btn"><a :href = 'downUrl'target='_blank' @click="filePlus" download="fileName"><el-button style="background-color:#00b7ee"  type='primary'>点击下载</el-button></a></div>
			<div class="downBottom">
				<div @click="toLast" v-if = 'show1'>
				<img src="../../../../static/logoAll/billZone/lastPage.png"/>
					<span>上一篇：{{lastTitle}}</span>
				</div>
				<div @click="toNext" v-if = 'show2'>
					<img src="../../../../static/logoAll/billZone/nextPage.png"/>
					<span>下一篇：{{nextTitle}}</span>
				</div>
			</div> 	
        </div>
    </div>
</template>
<script>
import qs from 'qs'
var fileIIDD = 0
	import Element from 'element-ui'
	import axios from 'axios'
	import bus from '../../../assets/js/eventBus.js'
	var articleIdNew = 0;
	var nextId, lastId = 0;
	var listAll = [];
	var indexThis = 0;
	export default {
		name: 'articleDetails',
		inject: ['reload'],
		data() {
			return {
				title: '',
				downTime: '',
				downBrowse: '',
				article: '',
				lastTitle: '',
				nextTitle: '',
				articleId: '',
				downUrl: '',
				fileName: '',
				show1: true,
				show2: true,
				ifHaveFile: false,
				showAll: false,
				articleThisId: '',
				ifLogin: this.GLOBAL.ifLogin
			}
		},
		methods: {
			filePlus(){
				axios.post(this.GLOBAL.urlHead + '/file/addFileDownNum',qs.stringify(
					{
						articleId: Number(fileIIDD),
						userId: Number(localStorage.getItem('userId'))
					}
				)).then(res=>{
					console.log('请求addfile了')
					console.log(res)
				})
			},
			gotoLogin() {
				this.$router.push('/login')
			},
			toLast: function() {
				this.reload();
			},
			toNext: function() {
				this.reload()
			},
		},
		mounted() {
			
			
			
			const loading = this.$loading({
				lock: true,
				text: '加载中.......',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			if (this.ifLogin == 'false') {
				this.ifLogin = false
			} else {
				this.ifLogin = true
			}
			var that = this;
			if (lastId) {
				axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails', {
					params: {
						articleId: lastId
					}
				}).then(res => {
					lastId = 0;
					that.title = res.data.data.articleTitle;
					that.downTime = res.data.data.articlePublishTime;
					that.downBrowse = res.data.data.articleViewsNum;
					that.article = res.data.data.articleContent;
					if (res.data.data.file === null) {
						that.downUrl = '';
						that.fileName = '';
						that.ifHaveFile = false
					} else {
						that.downUrl = res.data.data.file.fileUrl;
						that.fileName = res.data.data.file.fileName;
						that.ifHaveFile = true
					}
				})
			} else if (nextId) {
				axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails', {
					params: {
						articleId: nextId
					}
				}).then(res => {
					nextId = 0;
					that.title = res.data.data.articleTitle;
					that.downTime = res.data.data.articlePublishTime;
					that.downBrowse = res.data.data.articleViewsNum;
					that.article = res.data.data.articleContent;
					if (res.data.data.file === null) {
						that.downUrl = '';
						that.fileName = '';
						that.ifHaveFile = false
					} else {
						that.downUrl = res.data.data.file.fileUrl;
						that.fileName = res.data.data.file.fileName;
						that.ifHaveFile = true
					}
				})
			}
			if (!this.$route.params.articleId){
				this.articleThisId = this.$route.params.articleId
			}else {
				localStorage.setItem('articleThisIdeee',this.$route.params.articleId);
			}
			this.articleThisId = localStorage.getItem('articleThisIdeee')
			axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails', {
					params: {
						articleId: this.articleThisId
					}
				}).then(res => {
		
					this.title = res.data.data.articleTitle;
					this.downTime = res.data.data.articlePublishTime;
					this.downBrowse = res.data.data.articleViewsNum;
					this.article = res.data.data.articleContent;
					if (res.data.data.file === null) {
						this.downUrl = '';
						this.fileName = '';
						this.ifHaveFile = false;
					} else {
						fileIIDD = res.data.data.articleId;
						this.downUrl = res.data.data.file.fileUrl;
						this.fileName = res.data.data.file.fileName;
						this.ifHaveFile = true;
					}
				})
				// var articleThisId = busdata.noticeList[busdata.thisIndex].articleId;
				// listAll = busdata.noticeList;
				// indexThis = this.index;
				// axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails', {
				// 		params: {
				// 			articleId: articleThisId
				// 		}
				// 	})
				// 	.then(res => {
				// 		console.log(res)
				// 		that.title = res.data.data.articleTitle;
				// 		that.downTime = res.data.data.articlePublishTime;
				// 		that.downBrowse = res.data.data.articleViewsNum;
				// 		that.article = res.data.data.articleContent;
				// 		if(res.data.data.file===null){
				// 			that.downUrl = '';
				// 			that.fileName = '';
				// 			that.ifHaveFile = false;
				// 		}else{
				// 			that.downUrl = res.data.data.file.fileUrl;
				// 			that.fileName = res.data.data.file.fileName;
				// 			that.ifHaveFile = true;
				// 			console.log(res.data.data.file.fileUrl)
				// 		}
				// 	})
				// if(busdata.thisIndex==0){
				// 	that.show1 = false;
				// 	axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails',{
				// 		params: {
				// 				articleId: busdata.noticeList[busdata.thisIndex+1].articleId
				// 		}
				// 	}).then(res=>{
				// 			that.nextTitle = res.data.data.articleTitle;
				// 			nextId = res.data.data.articleId
				// 		})
				// }else if(busdata.thisIndex==busdata.noticeList.length-1){
				// 	that.show2 = false;
				// 	axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails',{
				// 		params: {
				// 				articleId: busdata.noticeList[busdata.thisIndex-1].articleId
				// 		}
				// 	}).then(res=>{
				// 			that.lastTitle = res.data.data.articleTitle
				// 			that.lastId = res.data.data.articleId
				// 		})
				// }else{
				// 	that.show2 = true;
				// 	that.show1 = true;
				// 	axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails',{
				// 		params: {
				// 				articleId: busdata.noticeList[busdata.thisIndex-1].articleId
				// 		}
				// 	}).then(res=>{
				// 			that.lastTitle = res.data.data.articleTitle;
				// 			lastId = res.data.data.articleId;
				// 		})
				// 	axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails',{
				// 		params: {
				// 				articleId: busdata.noticeList[busdata.thisIndex+1].articleId
				// 		}
				// 	}).then(res=>{
				// 			that.nextTitle = res.data.data.articleTitle;
				// 			nextId = res.data.data.articleId;
				// 		})
				// }
		}
		
	}
</script>
<style scoped>
	a:hover {
		text-decoration: underline;
	}
	
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.downloadZone {
		width: 300px;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -150px;
		margin-bottom: 20px;
	}
	
	.downloadZone a {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.downloadContent {
		position: relative;
		padding: 0 20px;
		border: 1px solid #6699FF;
		width: 1000px;
		padding: 50px 50px 100px 50px;
		margin-bottom: 10px;
		margin-top: 20px;
		min-height: 60vh;
		border-radius: 10px;
	}
	
	.downloadContent ul {
		list-style: none;
		width: 80%;
	}
	
	.downTitleSe {
		display: flex;
		justify-content: space-between;
	}
	
	.downTitleSe {
		margin: 15px 0;
	}
	
	.downloadContent img {
		width: 22px;
		position: relative;
		top: 6px;
	}
	
	.downloadContent span {
		font-size: 14px;
		color: #999;
	}
	
	.downArticle {
		color: #333333;
		font-size: 14px;
		text-indent: 2em;
		line-height: 23px;
		word-break: break-all;

	}
	
	.downloadContent .el-button {
		display: inline-block;
		margin: 20px 45%;
		/*		margin-left: 300px;*/
	}
	
	.downBottom {
		display: none;
	}
	
	.downBottom div {
		display: block;
		text-align: center;
	}
	
	.downBottom img {
		width: 26px;
	}
	
	.downBottom span {
		font-size: 20px;
		color: #333333;
	}
	
	.box-shadow {
		-webkit-box-shadow: 0 0 10px #888;
		box-shadow: 0 0 10px #888;
	}
</style>