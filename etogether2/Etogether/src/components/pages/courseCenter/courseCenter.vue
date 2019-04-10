<template>
	<div class='courseCenterAll'>
		<slideShow></slideShow>
		<div class="courseCenter wholePage">
		<div class="course-orderList">
			<div class="title">
				<img class="title-img" src="../../../../static/logoAll/courseCenter/paixu.png" />
				<span>排序方式</span>
			</div>
			<ul>
				<li :class="{fontBlue:isBlue==1}" @click="chooseCourse('hotest')">最热课程<img class="fire" src="../../../../static/logoAll/courseCenter/fire.png" /></li>
				<li :class="{fontBlue:isBlue==2}" @click="chooseCourse('newest')">最新课程</li>
			</ul>

			<form class="course-form">
				<input class="search-input" v-model="courseTitle" placeholder="搜索课程">
				<div  value=" " @click="searchCourse" class="search-button" ></div>
			</form>
		</div>
		<div class="course-picker">
			<div class="title">
				<img class="title-img" src="../../../../static/logoAll/courseCenter/picker.png" />
				<span>筛选方式</span>
			</div>
			<ul class="course-picker-f">
				<li :class="{fontBlue:isBlue==3}" @click="all">全部课程</li>
				<li :class="{fontBlue:isBlue==4}" @click="pri">初级课程</li>
				<li :class="{fontBlue:isBlue==5}" @click="mid">中级课程</li>
				<li :class="{fontBlue:isBlue==6}" @click="senior">高级课程</li>
			</ul>
			<ul class="course-picker-s">
				<!-- <li :class="{fontBlue:isBlue==7}" @click="chooseCourse2(0)">全部课程</li> -->
				<li :class="{fontBlue:isBlue2==1}" @click="scratch">Scratch</li>
				<li :class="{fontBlue:isBlue2==2}" @click="python">Python</li>
				<li :class="{fontBlue:isBlue2==3}" @click="c">C++</li>
			</ul>
		</div>
		<ul class="course-list">
			
				<li v-for="(item,index) in recommonList" class="box-shadow" @click = 'getCourseId(index)'>
					<!-- <router-link to = '/courseDetail'> -->
					<img :src="item.courseImg" />
					<div class="course-item">
						<div class="recommonName">{{item.courseTitle}}</div>
						<div class="course-item-re">
							<div class="recommonTime">发布时间：{{item.coursePublishTime}}</div>
							<div class="recommonNum">{{item.courseViewsNum}}人已学</div>
						</div>
					</div>
					<!-- </router-link>	 -->
				</li>
			
		</ul>
		<div style="text-align:center;">
			<el-pagination class="pageSelect" background layout="pager" :total="pageAll"></el-pagination>
		</div>
	</div>
	</div>
	
</template>
<script>
	import {Pagination} from 'element-ui'
	import slideShow from '../../common/slideShow'
	import axios from 'axios'
	import bus from '../../../assets/js/eventBus.js'
	export default {
		name: 'courseCenter',
		components: {
			slideShow
		},
		data() {
			return {
				isBlue: 3,
				isBlue2: 0,
//				cur: 1,
				size: 9,
//				all: 12,
				msg: '',
				recommonList: [],
				pageAll: 0,
				courseTitle: '',
				courseLable: null,
				courseClass: null
			}
		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中.......',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			let url = this.GLOBAL.urlHead + '/course/home'
			axios.get(url,{
				params:{
					currentPage: 1,
					pageSize: 12
				}
			})
				.then(res => {
					this.recommonList = res.data.data.courseList
					this.pageAll = res.data.data.pages
					for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
		},
		methods:{
			
			getCourseId (index) {
				if(localStorage.getItem('ifLogin')=='false'){
					this.GLOBAL.ifLogin = false
				}else{
					this.GLOBAL.ifLogin = true
				}
				
				if(this.GLOBAL.ifLogin){
					this.$router.push({name:'courseDetail', params:{courseId:this.recommonList[index].courseId}})
				}else{
					this.$router.push('/login')
				}

				
			},
			searchCourse () {
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
					currentPage: 1,
					pageSize: 12,
					courseTitle :this.courseTitle
				}).then(res=>{
					this.recommonList = res.data.data.courseList;
					this.pageAll = res.data.data.pages;
					for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			chooseCourse(chooseItem){
				let ifHot = 0, ifNew = 0;
				if(chooseItem == 'hotest'){
					ifHot = 1;
					ifNew = 0;
					this.isBlue = 1;
				}else if(chooseItem == 'newest'){
					ifHot = 0;
					ifNew = 1;
					this.isBlue = 2;
				}else{
					ifHot = 0;
					ifNew = 0;
				}
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
					currentPage: 1,
					pageSize: 12,
					moreHot: ifHot,
					moreNew: ifNew
				}).then(res=>{
					this.recommonList = res.data.data.courseList;
					this.pageAll = res.data.data.pages;
					for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
//			chooseCourse2(index){
//				let courseLevel = index;
//				this.isBlue = index + 3;
//				if(index == 0){
//					let url = this.GLOBAL.urlHead + '/course/home'
//					axios.get(url,{
//						params:{
//							currentPage: 1,
//							pageSize: 12
//						}
//					})
//					.then(res => {
//						this.recommonList = res.data.data.courseList
//						this.pageAll = res.data.data.pages
//						for(var i in this.recommonList){
//						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
//					}
//					})
//				}else{
//					axios.post(this.GLOBAL.urlHead + '/course/filter',{
//						currentPage: 1,
//						pageSize: 12,
//						courseLable: courseLevel
//					}).then(res=>{
//						this.recommonList = res.data.data.courseList
//						this.pageAll = res.data.data.pages
//						for(var i in this.recommonList){
//						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
//					}
//					})
//				}
//				
//			},
			all(){
				this.isBlue = 3;
				this.isBlue2 = 0;
				let url = this.GLOBAL.urlHead + '/course/home'
					axios.get(url,{
						params:{
							currentPage: 1,
							pageSize: 12,
							courseLable: this.courseLable,
							courseLanguage: this.courseClass
						}
					})
					.then(res => {
						this.recommonList = res.data.data.courseList
						this.pageAll = res.data.data.pages
						for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			pri(){
				this.isBlue = 4;
				this.courseLable = 1;
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
						currentPage: 1,
						pageSize: 12,
						courseLable: this.courseLable,
						courseLanguage: this.courseClass
					}).then(res=>{
						this.recommonList = res.data.data.courseList
						this.pageAll = res.data.data.pages
						for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			mid(){
				this.isBlue = 5;
				this.courseLable = 2;
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
						currentPage: 1,
						pageSize: 12,
						courseLable: this.courseLable,
						courseLanguage: this.courseClass
					}).then(res=>{
						this.recommonList = res.data.data.courseList
						this.pageAll = res.data.data.pages
						for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			senior(){
				this.isBlue = 6;
				this.courseLable = 3;
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
						currentPage: 1,
						pageSize: 12,
						courseLable: this.courseLable,
						courseLanguage: this.courseClass
					}).then(res=>{
						this.recommonList = res.data.data.courseList
						this.pageAll = res.data.data.pages
						for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			scratch(){
				this.isBlue2 = 1;
				this.courseClass = 'scratch';
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
					currentPage: 1,
					pageSize: 12,
					courseLable: this.courseLable,
					courseLanguage: this.courseClass
				}).then(res=>{
					this.recommonList = res.data.data.courseList
					this.pageAll = res.data.data.pages
					for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			python(){
				this.isBlue2 = 2;
				this.courseClass = 'python';
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
					currentPage: 1,
					pageSize: 12,
					courseLable: this.courseLable,
					courseLanguage: this.courseClass
				}).then(res=>{
					this.recommonList = res.data.data.courseList
					this.pageAll = res.data.data.pages
					for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
			c(){
				this.isBlue2 = 3;
				this.courseClass = 'c++';
				axios.post(this.GLOBAL.urlHead + '/course/filter',{
					currentPage: 1,
					pageSize: 12,
					courseLable: this.courseLable,
					courseLanguage: this.courseClass
				}).then(res=>{
					this.recommonList = res.data.data.courseList
					this.pageAll = res.data.data.pages
					for(var i in this.recommonList){
						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
					}
				})
			},
//			chooseCourse3(index){
//				let courseClass = '';
//				this.isBlue2 = index;
//				
//				if(index == 1){
//					courseClass = 'scratch'
//				}else if(index == 2){
//					courseClass = 'python'
//				}else{
//					courseClass = 'c++'
//				};
//				axios.post(this.GLOBAL.urlHead + '/course/filter',{
//					currentPage: 1,
//					pageSize: 12,
//					courseLanguage: courseClass
//				}).then(res=>{
//					
//					this.recommonList = res.data.data.courseList
//					this.pageAll = res.data.data.pages
//					for(var i in this.recommonList){
//						this.recommonList[i].coursePublishTime = this.formatTime(this.recommonList[i].coursePublishTime)
//					}
//				})
//			},
			//时间戳转化
			add0(m){
				return m<10?'0'+ m : m
			},
			formatTime(timePoint){
				var time = new Date(timePoint);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					return y+'.'+this.add0(m)+'.'+this.add0(d);
			}
		}
	}
</script>
<style scoped>

	*{
		font-family: "microsoft yahei";
	}
	.box-shadow {
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		
	}
	.fontBlue{
		color: #0062CC;
	}
	li {
		list-style: none;
	}
	
	.course-orderList {
		/*background-color: red;*/
		padding: 12px 0px 12px 6px;
		height: 35px;
		position: relative;
	}
	
	.course-orderList .title {
		float: left;
		margin-right: 1px;
	}
	
	.course-orderList .title ul {
		float: left;
	}
	
	.course-orderList li {
		width: 90px;
		float: left;
		padding-right: 40px;
		line-height: 40px;
		font-size: 18px;
	}
	
	.course-orderList li:hover {
		color: #0090ff;;
		cursor: pointer;
	}
	
	.fire {
		width: 30px;
		position: absolute;
		top: 17px;
	}
	
	.course-form {
		border: 1px solid #00b7ee;
		border-right: none;
		position: absolute;
		right: 5px;
		height: 41px;
		border-radius: 10px 10px  10px 10px;
		display: flex;
	}
	
	.course-form .search-input {
		width: 170px;
		height: 40px;
		padding-left: 10px;
		border: none;
		outline: none;
		border-radius: 10px 0  0 10px;
		border-top:1px solid #00b7ee;
	}
	
	.course-form .search-button {
		background: url(../../../../static/logoAll/courseCenter/glass.png) no-repeat center;
		/*background-color: rgb(0,153,255);*/
		background-color: #00b7ee;
		width: 80px;
		height: 41px;
		border: none;
		outline: none;
		cursor: pointer;
		border-radius: 0 10px 10px 0;
	}
	
	.course-orderList span,
	.course-picker span {
		display: inline-block;
		font-family: "微软雅黑";
		font-size: 18px;
		width: 80px;
		margin-right: 45px;
	}
	
	.title-img {
		width: 26px;
		height: 26px;
		position: relative;
		top: 6px;
	}
	
	.course-picker {
		/*background-color: gray;*/
		margin-bottom: 20px;
		padding: 12px 0px 12px 4px;
		height: 80px;
	}
	
	.course-picker .title {
		width: 160px;
		height: 50px;
		float: left;
	}
	
	.course-picker ul {
		float: left;
	}
	
	.course-picker li:hover {
		color: #0062CC;
		cursor: pointer;
	}
	
	.course-picker-f li {
		padding-right: 40px;
		line-height: 42px;
		font-size: 18px;
	}
	
	.course-picker-s {
		margin-left: 292px;
		clear: both;
		
	}
	
	.course-picker-s li {
		padding-right: 40px;
		line-height: 40px;
		font-size: 18px;
	}
	
	.course-picker li {
		width: 90px;
		float: left;
	}
	
	.course-list {
		display: flex;
		flex-direction: row;
		width: 100%;
		/* justify-content: space-between; */
		flex-wrap: wrap;
		margin-bottom: 25px;
	}
	
	.course-list li {
		display: flex;
		flex-direction: column;
		width: 30%;
		height: 250px;
		margin-bottom: 30px;
		margin: 1% 1.5%;
		border-radius: 10px;
	}
	
	.course-list img {
		width: 100%;
		height: 185px;
		margin-top: -5px;
		border-radius: 10px  10px 0 0;
	}
	
	.recommonName {
		font-size: 20px;
		margin-bottom: 2px;
		margin-top: -4px;
	}
	
	.recommonTime {
		font-size: 12px;
		color: #999;
	}
	
	.recommonNum {
		font-size: 12px;
	}
	
	.course-item {
		display: flex;
		flex-direction: column;
		height: 80px;
		justify-content: center;
		padding: 0 15px;
	}
	
	.course-item-re {
		display: flex;
		justify-content: space-between;
	}
	
	.fenye {
		width: 600px;
		margin-bottom: 40px;
	}
	.el-pager {
		margin-bottom: 20px;
	}
	.courseCenter{
		margin-bottom: 20px;
	}
</style>