<template>
<div class="downloadCenter">
	<slideShow></slideShow>
	
	<div class="screenHead ">
		<div class="headLeft"><img src="../../../../static/logoAll/downloadCenter/picker-w.png" />
			<div>筛选方式</div>
			<ul>
				<li @click = 'all' :class="{onColor:filterByTime == 0}">全部</li>
				<li @click = 'week' :class="{onColor:filterByTime == 1}">一周内</li>
				<li @click = 'month' :class="{onColor:filterByTime == 2}">一个月内</li>
				<li @click = 'months' :class="{onColor:filterByTime == 3}">三个月内</li>
			</ul>
		</div>
		<div class="headRight"><input placeholder="搜索内容" v-model = 'filterKey'/>
			<img src="../../../../static/logoAll/downloadCenter/search-w.png" @click = 'fileSearch' />
		</div>
	</div>
	<ul class="downloadList">
		<li v-for='(item,index) in downloadList'>
			
				<div class="downloadListDiv1" style="display:inline-block;width:700px;">{{index+1}}.{{item.articleTitle}}</div>
			
			<div class="downloadTime">发布时间：{{item.articlePublishTime}}</div>
			<!-- <a :href='item.fileUrl' download="fileName"> -->
				<div class="downloadBut" @click="articleDetail(index)">查看详情</div>
			<!-- </a> -->
		</li>
		
	</ul>
	<div class="ppp">
	<el-pagination class="pageSelect" background layout="pager" :total="pageAll" :current-page='currentPage' @current-change='currentChange'></el-pagination>
	</div>
		
	</div>
	</div>
</template>
<script>
	var itemNow = 0;
	import {
		Pagination
	} from 'element-ui'
	import slideShow from '../../common/slideShow'
	import axios from 'axios'
	import bus from '../../../assets/js/eventBus.js'
	export default {
		name: 'downloadCenter',
		inject: ['reload'],
		data() {
			return {
				pageAll: 10,
				downloadList: [],
				filterKey: '',
				filterByTime: 0,
				currentPage: 0
			}
		},
		components: {
			slideShow,
			Pagination
		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中.......',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			this.filterByTime = itemNow;
			axios.post(this.GLOBAL.urlHead + '/article/getArticleList', {
				pageNum: 1,
				filterByTime: this.filterByTime,
				filterByLabel: 0,
				filterKey: ''
			}).then(res => {
				
				this.downloadList = res.data.data.articleList;
				this.pageAll = res.data.data.totalPages * 10;
			})
		},
		methods: {
			currentChange(index) {
				axios.post(this.GLOBAL.urlHead + '/article/getArticleList', {
					pageNum: index,
					filterByTime: this.filterByTime,
					filterByLabel: 0,
					filterKey: ''
				}).then(res => {
					this.pageAll = res.data.data.totalPages;
					this.downloadList = res.data.data.articleList;
					this.pageAll = res.data.data.totalPages * 10
				})
			},
			articleDetail(index) {
				this.$router.push({
					name: 'downloadContent',
					params: {
						articleId: this.downloadList[index].articleId
					}
				})
			},
			getArticleId(index) {
				axios.post(this.GLOBAL.urlHead + '/article/getArticleList', {
					pageNum: 1,
					filterByTime: 0,
					filterByLabel: 0,
					filterKey: ''
				}).then(res => {
					bus.$emit('articleId', res.data.data.articleList[index].articleId);
				})
			},
			fileSearch() {
				axios.post(this.GLOBAL.urlHead + '/article/getArticleList', {
					pageNum: 1,
					filterByTime: 0,
					filterByLabel: 0,
					filterKey: this.filterKey
				}).then(res => {
					this.pageAll = res.data.data.totalPages * 10;
					this.downloadList = res.data.data.articleList
				})
			},
			all() {
				// this.filterByTime = 0
				// axios.post(this.GLOBAL.urlHead + '/client/article/getArticleList', {
				// 	pageNum: 1,
				// 	filterByTime: 0,
				// 	filterByLabel: 0,
				// 	filterKey: this.filterKey
				// }).then(res => {
				// 	this.pageAll = res.data.data.totalPages * 10;
				// 	this.downloadList = res.data.data.articleList;
				// 	itemNow = 0;
				// })
				itemNow = 0;
				this.reload();
			},
			week() {
				// this.filterByTime = 1   
				// axios.post(this.GLOBAL.urlHead + '/client/article/getArticleList', {
				// 	pageNum: 1,
				// 	filterByTime: 1,
				// 	filterByLabel: 0,
				// 	filterKey: this.filterKey
				// }).then(res => {
				// 	this.pageAll = res.data.data.totalPages * 10;
				// 	this.downloadList = res.data.data.articleList;
				// 	itemNow = 1;
				// 	this.reload()
				// })
				itemNow = 1;
				this.reload()
			},
			month() {
				// this.filterByTime = 2
				// axios.post(this.GLOBAL.urlHead + '/client/article/getArticleList', {
				// 	pageNum: 1,
				// 	filterByTime: 2,
				// 	filterByLabel: 0,
				// 	filterKey: this.filterKey
				// }).then(res => {
				// 	this.pageAll = res.data.data.totalPages * 10;
				// 	this.downloadList = res.data.data.articleList;
				// 	itemNow = 2;
				// })
				itemNow = 2;
				this.reload()
			},
			months() {
				// this.filterByTime = 3
				// axios.post(this.GLOBAL.urlHead + '/client/article/getArticleList', {
				// 	pageNum: 1,
				// 	filterByTime: 3,
				// 	filterByLabel: 0,
				// 	filterKey: this.filterKey
				// }).then(res => {
				// 	console.log(res)
				// 	this.pageAll = res.data.data.totalPages * 10;
				// 	this.downloadList = res.data.data.articleList;
				// 	itemNow = 3;
				// })
				itemNow = 3;
				this.reload()
			},
		}
	}
</script>
<style scoped>

	* {
		font-family: "microsoft yahei";
	}
	
	.downloadCenter .onColor {
		color: #fff;
	}
	
	.pageSelect {
		text-align: center;
		margin-top: 30px;
		margin-bottom: 30px;
		
	}
	
	.downloadCenter ul {
		list-style: none;
	}
	
	.screenHead {
		display: flex;
		width: 1060px;
		background-color: #8aedfe;
		align-items: center;
		justify-content: space-between;
		height: 50px;
		padding: 0 20px;
		margin-top: 10px;
		border-radius: 10px 10px 0 0;
	}
	
	.screenHead img {
		height: 23px;
	}
	
	.screenHead ul {
		display: flex;
		margin-left: 15px;
	}
	
	.screenHead ul li {
		margin-left: 50px;
		font-size: 14px;
	}
	
	.headLeft {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	
	.headLeft img {
		margin-right: 5px;
	}
	
	.headRight {
		display: flex;
		align-self: center;
		align-items: center;
	}
	
	.headRight input {
		margin-right: 10px;
		border: none;
		border-radius: 5px;
		padding: 0 5px;
		outline: none;
		height: 32px;
	}
	
	.downloadList {
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		width: 1100px;
		
		border-radius:0 0 10px 10px ;
		padding: 20px 0 ;
	}
	.all{
		border-radius: 10px;
	}
	.downloadList li {
		height: 45px;
		line-height: 45px;
		padding: 5px 45px;
		display: flex;
		justify-content: space-between;
	}
		
	.downloadList li:hover {
		border: 3px solid #ffb566;
		border-radius: 10px;
		padding: 5px 45px;
		height: 45px;
		line-height: 45px;
	}
	
	.downloadList li:hover .downloadListDiv1 {
		font-weight: bold;
		color: #ffb566;
	}
	
	.downloadAbs {
		width: 70%;
		font-size: 14px;
		cursor: pointer;
	}
	
	.downloadAbs:hover {
		color: #0066cc;
	}
	
	.downloadBut:hover {
		color: #ffb566;
	}
	
	.downloadTime {
		font-size: 12px;
		color: #888;
	}
	
	.downloadBut {
		font-size: 12px;
		cursor: pointer;
	}
</style>