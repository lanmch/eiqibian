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
       	<div v-if='!ifLogin' v-show='ifHaveFile' class="btn"><el-button type='primary' style="background-color:#00b7ee" @click="gotoLogin">点击下载</el-button></div>
		<div v-else v-show='ifHaveFile' class="btn"><a :href = 'downUrl' target='_blank' @click="filePlus" download="fileName"><el-button style="background-color:#00b7ee"  type='primary'>点击下载</el-button></a></div>
       	<div class="downBottom">
       		<a @click="toLast" v-if = 'show1'>
       		<img src="../../../../static/logoAll/billZone/lastPage.png"/>
	        	<span>上一篇：{{lastTitle}}</span>
	       	</a>
	       	<a @click="toNext" v-if = 'show2'>
	       		<img src="../../../../static/logoAll/billZone/nextPage.png"/>
		       	<span>下一篇：{{nextTitle}}</span>
	       	</a>
       	</div> 	
        </div>
    </div>
</template>
<script>
var fileIIDD = 0
	import Element from 'element-ui'
	import axios from 'axios'
	import bus from '../../../assets/js/eventBus.js'
	var articleIdNew = 0;
	export default {
		name: 'downloadContent',
		data() {
			return {
				title: '',
				downTime: '',
				downBrowse: '',
				article: '',
				lastTitle: 'xxxxxxxxxxxxx',
				nextTitle: 'xxxxxxxxxxxxxx',
				articleId: '',
				downUrl: '',
				fileName: '',
				show1: true,
				show2: true,
				fileDownShow: '',
				ifLogin: localStorage.getItem('ifLogin'),
				ifHaveFile: false,
				articleThisId: ''
			}
		},
		methods: {
			toLast: function() {
				if (this.articleId > 2) {
					this.articleId--
						this.show2 = true
				} else {
					this.show1 = false
				}
				axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails', {
						params: {
							articleId: this.articleId
						}
					})
					.then(res => {
						this.title = res.data.data.articleTitle,
							this.downTime = res.data.data.articlePublishTime,
							this.downBrowse = res.data.data.articleViewsNum,
							this.article = res.data.data.articleContent,
							this.downUrl = res.data.data.file.fileUrl,
							this.fileName = res.data.data.file.fileName,
							this.lastTitle = res.da
					})
			},
			toNext: function() {
				if (this.articleId < 100) {
					this.articleId++
						this.show1 = true
				} else {
					this.show2 = false
				}
				axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails', {
						params: {
							articleId: this.articleId
						}
					})
					.then(res => {
						this.title = res.data.data.articleTitle,
							this.downTime = res.data.data.articlePublishTime,
							this.downBrowse = res.data.data.articleViewsNum,
							this.article = res.data.data.articleContent,
							this.downUrl = res.data.data.file.fileUrl,
							this.fileName = res.data.data.file.fileName
					})
			},
			gotoLogin(){
				this.$router.push('/login')
			},
			filePlus(){
				axios.post(this.GLOBAL.urlHead + '/file/addFileDownNum',qs.stringify(
					{
						articleId: Number(fileIIDD),
						userId: Number(localStorage.getItem('userId'))
					}
				)).then(res=>{
					
				})
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
			if (!this.$route.params.articleId) {
				this.articleThisId = this.$route.params.articleId
			} else {
				localStorage.setItem('articleThisIde', this.$route.params.articleId);
			}
			this.articleThisId = localStorage.getItem('articleThisIde')
			axios.get(this.GLOBAL.urlHead + '/article/getArticleDetails',{
				params:{
					articleId: this.articleThisId
				}
			}).then(res=>{
	
						this.title = res.data.data.articleTitle;
						this.downTime = res.data.data.articlePublishTime;
						this.downBrowse = res.data.data.articleViewsNum;
						this.article = res.data.data.articleContent;
						
						this.fileDownShow = res.data.data.file;
						if(res.data.data.file===null){
							this.downUrl = '';
							this.fileName = '';
							this.ifHaveFile = false;
						}else{
							fileIIDD = res.data.data.articleId;
							this.downUrl = res.data.data.file.fileUrl;
							this.fileName = res.data.data.file.fileName;
							this.ifHaveFile = true;
						}
			})

		}
	}
</script>
<style scoped>
	.downloadContent {
		border: 1px solid #6699FF;
		width: 1000px;
		padding: 50px 50px 100px 50px;
		margin-bottom: 10px;
		margin-top: 20px;
		min-height: 500px;
		position: relative;
		border-radius: 10px;
		min-height: 60vh;
	}
	.btn a{
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.downloadZone{
		width: 300px;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -150px;
		margin-bottom: 20px;
		
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
	
	.downBottom a {
		display: block;
		text-align: center;
	}
	.downBottom{
		display: none;
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