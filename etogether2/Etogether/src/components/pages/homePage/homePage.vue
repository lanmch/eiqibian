<template>
<div class='all' style='width:1300px'>
	<!-- <img v-show="ifShowmas" id='mascotR' class='mascotL' src='../../../../static/logoAll/mascot/1.png'/> -->
	<!-- <img v-show="ifShowmas" id='mascotR' class='mascotR' src='../../../../static/logoAll/mascot/2.png'/> -->
	<slide-show class="slide"></slide-show>
	
<div class="homePage" id="homePage">	
	
	<!-- <img class="mascotL" src='../../../../static/logoAll/mascot/1.png'/> -->
	
	
	<div class="homePage-eventNotice  box-shadow">
		<div class="hp-title">
			<div class="hp-title-notice">
				<img src="../../../../static/logoAll/homePage/painter.png" />
				<span>文件通知</span>
			</div>
			<div class="hp-title-more">
				<div>
					<router-link to='/downloadCenter'>查看全部通知
						<img src="../../../../static/logoAll/homePage/more-arrow.png" />
					</router-link>
				</div>
			</div>
		</div>
		<ul class="noticeDetail">
			<li v-for="(item, index) in noticeList" >
				
					<div class="noticeDetailDiv1" style="display:inline-block;width:700px;">{{index+1}}.{{item.articleTitle}}</div>
				
				<div style="display:inline-block;" class="noticeTime">发布时间：{{item.articlePublishTime}}</div>
				<!-- <a :href='item.fileUrl' download="fileName"> -->
					<div class="homeDownload" @click="articleDetail(index)">查看详情</div>
				<!-- </a> -->
			</li>
		</ul>
	</div>

	<div class="homePage-reCourse">
			<div class="hp-title" style="border-radius:10px">
				<div class="hp-title-notice">
					<img src="../../../../static/logoAll/homePage/clock.png" />
					<span>推荐课程</span>
				</div>
				<div class="hp-title-more">
					<router-link to='/courseCenter'>
						<div style="display:inline-block;">查看全部课程
							<img src="../../../../static/logoAll/homePage/more-arrow.png" />
						</div>
					</router-link>
				</div>
			</div>
			<ul class="recommonCourse">
				<li v-for="(item,index) in recommonList" class="box-shadow" @click="goCourseDetail(index)">
					<img :src="item.courseImg" />
					<div class="course-item">
						<div class="recommonName">{{item.courseTitle}}</div>
						<div class="course-item-re">
							
							<div class="recommonTime">发布时间：{{item.coursePublishTime}}</div>
							<div class="recommonNum">{{item.courseViewsNum}}人已学</div>
						</div>
					</div>
				</li>
			</ul>
		</div>

	<div class="homePage-interact box-shadow box-radius">
		<span class="hp-title">
                <div class="hp-title-notice">
					<img src="../../../../static/logoAll/homePage/each.png" />
					<span>师生互动</span>
	</div>
	</span>
	<el-carousel :autoplay='false'>
		<el-carousel-item class="interactDetail" v-for='(item,index) in interraction' style='background-color: none;'>
			<img :src="interraction[index].resultUrl" />
			<div class="interactDetail-abstract">
				<div class="interactDetail-title">
					<br/>{{interraction[index].resultTitle}}</div>
				<!--<div class="interactDetail-detail" v-html="interraction[index].resultInfo.replace(/\r?\n/g, '<br /><blockquote />')"></div>-->
			<div class="interactDetail-detail" v-html="interraction[index].resultInfo.replace(/<br\s*\/?>/gi,'<br /><blockquote />')"></div>
			
			</div>
		</el-carousel-item>
	</el-carousel>
</div>
	</div>
	
</div>
</template>
<script>
	import slideShow from '../../common/slideShow'
	import axios from 'axios'
	import Element from 'element-ui'
	import bus from '../../../assets/js/eventBus.js'
	export default {
		name: 'homePage',
		data() {
			return {
				noticeList: [],
				recommonList: [],
				interraction: [],
				pageSize: '',
				currentPage: '',
				articleId: '',
				ifShowmas: true
			}
		},
		inject:['reload'],
		components: {
			slideShow
		},
		methods: {
			articleDetail(index) {
				this.$router.push({
					name: 'articleDetails',
					params: {
						articleId: this.noticeList[index].articleId
					}
				})
			},
			goCourseDetail(index) {
				if(localStorage.getItem('ifLogin')=='true'){
					this.GLOBAL.ifLogin = true
				}else{
					this.GLOBAL.ifLogin = false
				}
				if(this.GLOBAL.ifLogin){
					this.$router.push({
					name: 'courseDetail',
					params: {
						courseId: this.recommonList[index].courseId
					}
				})
				}
				else{
					this.$router.push('/login')
				}
				
			},
			//时间戳转化
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			formatTime(timePoint) {
				var time = new Date(timePoint);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				return y + '.' + this.add0(m) + '.' + this.add0(d);
			}
		},
		mounted() {

			setTimeout(function(){ this.ifShowmas=false;console.log(this.ifShowmas);this.$forceUpdate();}, 3000);
			const loading = this.$loading({
				lock: true,
				text: '加载中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			this.GLOBAL.ifLogin = localStorage.getItem('ifLogin')
			this.GLOBAL.userId = localStorage.getItem('userId');
			
			
		},
		created() {
			axios.get(this.GLOBAL.urlHead + '/article/getHomeArticle')
				.then(res => {
					this.noticeList = res.data.data;
				}),
				axios.get(this.GLOBAL.urlHead + '/result/getResultList')
				.then(res => {
					this.interraction = res.data.data;
				}),
				axios.get(this.GLOBAL.urlHead + '/course/home', {
					params: {
						currentPage: 1,
						pageSize: 4
					}
				})
				.then(res => {
					this.recommonList = res.data.data.courseList
					for (var i in this.recommonList) {
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
		}
	}
</script>
<style scoped>
	.box-radius {
		border-radius: 10px;
	}
	
	* {
		font-family: "microsoft yahei";
	}
	
	.noticeDetail li:hover {
		color: #ffb566;
		border: 3px solid #ffb566;
		border-radius: 10px;
		height: 33px;
		line-height: 33px;
	}
	
	.noticeDetail li:hover .noticeDetailDiv1 {
		font-weight: bold;
	}
	
	.homeDownload {
		display: inline-block;
		font-size: 16px;
		color: #000;
		margin-left: 70px;
		cursor: pointer;
	}
	
	.homeDownload:hover {
		color: #ffb566;
	}
	
	.noticeTime {
		font-size: 14px;
		color: #999;
	}
	
	.box-shadow {
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
	}
	
	.homePage {
		/* width: 100%; */
		width: 1100px;
		margin-bottom: 20px;
	}
	
	ul {
		list-style: none;
	}
	
	.hp-title {
		width: 100%;
		height: 60px;
		margin-bottom: 18px;
		line-height: 60px;
		background-color: #8aedfe;
		font-size: 14px;
		position: relative;
		border-radius: 10px 10px 0 0;
	}
	
	img {
		position: relative;
		top: 5px;
		width: 22px;
	}
	
	.hp-title img {
		width: 22px;
		height: 22px;
	}
	
	.hp-title-notice {
		position: absolute;
		left: 20px;
	}
	
	.hp-title-more {
		position: absolute;
		right: 20px;
	}
	
	.hp-title-more img {
		border-radius: 10px;
	}
	
	span {
		text-decoration: none;
		color: #000;
		display: inline-block;
		font-family: "微软雅黑";
		font-size: 18px;
	}
	
	.homePage-eventNotice {
		margin-bottom: 32px;
		border-radius: 10px;
	}
	
	.homePage-eventNotice ul {
		padding-bottom: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.homePage-eventNotice li {
		height: 35px;
		line-height: 35px;
		padding: 10px 0px 10px 44px;
		font-size: 16px;
		font-family: "微软雅黑";
		color: #000;
	}
	
	.homePage-eventNotice ul:hover {
		color: #0066CC;
	}
	
	.homePage-reCourse ul {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		margin-bottom: 32px;
		border-radius: 10px;
	}
	
	.recommonCourse img {
		height: 200px;
		width: 100%;
		margin-top: -5px;
		border-radius: 10px 10px 0 0;
	}
	
	.recommonCourse ul {
		display: flex;
		flex-direction: row;
		width: 100%;
		/* justify-content: space-between; */
		flex-wrap: wrap;
		margin-bottom: 25px;
	}
	
	.homePage-reCourse ul li {
		display: flex;
		flex-direction: column;
		width: 24%;
		height: 270px;
		border-radius: 10px;
	}
	
	.recommonName {
		font-size: 18px;
	}
	
	.recommonTime {
		font-size: 14px;
		color: #999;
	}
	
	.recommonNum {
		font-size: 14px;
	}
	
	.course-item {
		display: flex;
		flex-direction: column;
		height: 80px;
		justify-content: space-around;
		padding: 10px 15px;
	}
	
	.course-item-re {
		display: flex;
		justify-content: space-between;
	}
	
	.interactDetail {
		display: flex;
		height: 200px;
		padding: 30px 30px;
		margin-top: -18px;
	}
	
	.interactDetail img {
		display: inline-block;
		width: 30%;
		height: 88%;
		margin: 30px 0 0 45px;
		border-radius: 10px;
	}
	
	.interactDetail-abstract {
		display: inline-block;
		padding-left: 40px;
	}
	
	.interactDetail-title {
		font-size: 22px;
		margin-bottom: 20px;
		padding-bottom: 10px;
	}
	
	.interactDetail-detail {
		padding: 0 45px 0 0;
		text-indent: 2em;
		color: #999;
		display: block;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		/* for Opera */
		-icab-text-overflow: ellipsis;
		/* for iCab */
		-khtml-text-overflow: ellipsis;
		/* for Konqueror Safari */
		-moz-text-overflow: ellipsis;
		/* for Firefox,mozilla */
		-webkit-text-overflow: ellipsis;
		/* for Safari,Swift*/
		height: 80%;
	}
	
	.homePage .interactDetail {
		padding: 0;
		height: 300px;
	}
	.mascotL,.mascotR{
		width: 200px;
	}
	.mascotL{
		float: left;
		left: -200px;
		top: -15px;
		z-index: 99;
	}
	.mascotR{
		float: right;
		right: 0;
		top: -10px;
		z-index: 99;
	} 
	 .slide{
		/* position: relative;
		left: -200px; */
		width: 1100px !important;
	}
	
</style>