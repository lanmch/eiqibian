console.log<template>
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
	    
	    <div class="downArticle">
	        	{{article}}
        </div>
        
       	<a :href = 'downUrl' download="fileName"><el-button type='primary'>点击下载</el-button></a>
    </div>
</template>
<script>
	import Element from 'element-ui'
	import axios from 'axios'
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
				articleId: 3,
				downUrl: '',
				fileName: '',
				show1: true,
				show2: true
			}
		},
		methods: {
			toLast: function() {
				if (this.articleId > 2) {
					this.articleId--
					this.show2 = true
				}else {
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
							this.fileName = res.data.data.file.fileName
					})
			},
			toNext: function() {
				if (this.articleId < 5) {
					this.articleId++
					this.show1 = true
				}else {
					this.show2 = false
				}
					axios.get(this.GLOBAL.urlHead + '/client/article/getArticleDetails', {
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
		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中.......',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			axios.get(this.GLOBAL.urlHead + '/client/article/getArticleDetails', {
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
		}
	}
</script>
<style scoped>
	.downloadContent {
		padding: 0 20px;
		border: 1px solid #6699FF;
		padding: 50px;
		margin-top: 15px;
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