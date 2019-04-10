<template>
	<div class="personalInfo">
		<div class="personalContent">
			<div class="personLeft">
				<div class="headZone">
					<img src="../../../../static/logoAll/register/all.png" />
					<div style="font-weight: bold;">{{userName}}</div>
				</div>
				<ul>
					<li @click="tabSwich(index)" v-for="(item,index) in liItems" :class="{tabShow: index===curId}">
						<img :src="item.liIcon" />{{item.liName}}
					</li>
				</ul>
			</div>
			<div class="personRight">
				<div class="contentHide" style="display:block;">
					<div class="personRight1">
						<div class="personDetail">
							<div class="personDetailLeft">
								<div><span style="font-size: 15px;color: #333;">用户名：</span>{{name}}</div>
								<div><span style="font-size: 15px;color: #333;">手机号：</span>{{phoneNum}}</div>
								<div><span style="font-size: 15px;color: #333;">邮箱：</span>{{mail}}</div>
								<div><span style="font-size: 15px;color: #333;">学校：</span>{{school}}</div>
								<div><span style="font-size: 15px;color: #333;">兴趣课程：</span>{{course}}</div>
							</div>
							<img style='border-radius: 10px;' v-if="this.sex == '男'" src="../../../../static/logoAll/register/boy.jpg" />
							<img style='border-radius: 10px;' v-if="this.sex == '女'" src="../../../../static/logoAll/register/girl.jpg" />
						</div>
					</div>
				</div>
				<div class="contentHide">
					<div class="personRight2">
						<div v-show='ifJoin' v-if = '!ifNotice' class="ifJoin">该用户暂未参加任何比赛</div>
						<div v-if="ifNotice" v-show = "!ifHave" class="proNotice">
							<div class="proNotice-notice">
								<span>尊敬的老师，您有{{taskNum}}个待处理的作品 !</span>
							</div>
							<div class="proNotice-more">
								<div>
									<router-link to='/review'>立即前往 >
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="ifHave" class="proNotice">
							<div class="proNotice-notice">
								<span>{{judgeNotice}}!</span>
							</div>
							<!--<div class="proNotice-more">
								<div>
									<router-link to='/review'>立即前往 >
									</router-link>
								</div>
							</div>-->
						</div>
						<div v-for="item in contestAll" class="personRightContest">
							<div class="contestDetail">
								<span class="contestTitle">{{item.contestName}}</span>
								<div class="contestAbs">{{item.contestContext}}</div>
								<div><span class="timeTitle">比赛时间：</span><span class="contestTime">{{item.contestDuringTime}}</span></div>
							</div>
							<div class="contestRight checkBill">
								<router-link to='/billzone'>查看详情</router-link>
							</div>
							<!-- <div class="contestRight">
							<ul>
								<li>模拟考试</li>
								<li>考试分布</li>
								<li>考试计划</li>
								<li style="border-bottom: 1px solid #0099ff;">报名须知</li>
							</ul>
						</div> -->
						</div>
						<el-pagination background layout="pager" :total="pageAllContest"></el-pagination>
					</div>
				</div>
				<div class="contentHide">
					<div class="personalRight3">
						<div class="personalRight3Details">
							<div v-show="ifCollect">该用户没有任何收藏</div>
							<ul>
								<li v-for="(item,index) in courseList" @click='gotoCourse(index)'>
									<img class="coursePic" :src="item.courseImg" />
									<div class="courseDetail">
										<div><span class="courseName">{{item.courseTitle}}</span>
											<!--<img src="../../../../static/logoAll/personalInfon/delete.png" />-->
										</div>
										<div><span class="courseTime">发布时间：{{item.coursePublishTime}}</span><span class="courseNum" style="color: #555;">{{item.courseViewsNum}}人已学</span></div>
									</div>
								</li>
							</ul>
							<el-pagination @current-change='nextpage' background layout="pager" :total="pageAllCourse"></el-pagination>
						</div>
					</div>
				</div>
				<div class="contentHide">
					<div class="personalRight4">
						<div v-show='ifDownload' style="display: flex;align-items: center;justify-content: center;">该用户没有任何下载</div>
						<div class="personalRight4Details">

							<ul>
								<li v-for="(item,index) in downloadList">
									<span class="liAbs">{{index+1}}.{{item.articleTitle}}</span>
									<span style="font-size:12px;color:#666666">发布时间:{{item.articlePublishTime}}</span>
									<span class="reLoad" style="font-size:12px;" @click="articleDetail(index)">查看详情</span>
								</li>
							</ul>
							<el-pagination background layout="pager" :current-page='currentPage' @current-change='currentChange2' :total="pageAllDownload"></el-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var pageNow = 1
	var specialUrl = 'http://148.70.213.160/web'
	import axios from 'axios'
	import {
		Pagination
	} from 'element-ui'
	export default {
		name: 'personalInfo',
		data() {
			return {
				curId: 0,
				liItems: [{
					liIcon: '../../../../static/logoAll/personalInfon/personinfo1.png',
					liName: '个人信息'
				}, {
					liIcon: '../../../../static/logoAll/personalInfon/contest0.png',
					liName: '我的赛事'
				}, {
					liIcon: '../../../../static/logoAll/personalInfon/collection0.png',
					liName: '我的收藏'
				}, {
					liIcon: '../../../../static/logoAll/personalInfon/download0.png',
					liName: '我的下载'
				}],
				userHead: '',
				userName: '',
				name: '',
				phoneNum: '',
				mail: '',
				school: '',
				course: '',
				photo: '',
				sex: '',
				contestAll: [],
				pageAllContest: 10, // 页码总数如果是10页 这个total要是10的10倍
				courseList: [],
				pageAllCourse: 10,
				downloadList: [],
				pageAllDownload: 10,
				ifJoin: false,
				ifCollect: false,
				ifDownload: false,
				currentPage: 1,
				ifNotice: true,
				judgeName: '',
				taskNum: '',
				judgeNotice: '',
				ifHave: false
			}
		},
		mounted() {
			var that = this;
			this.GLOBAL.userId = localStorage.getItem('userId');
			axios.get(this.GLOBAL.urlHead + '/user/userDetail', {
					params: {
						userId: this.GLOBAL.userId
					}
				})
				.then(res => {
					// this.userHead = res.data.headURL;
					//          console.log(res)
					that.userName = res.data.data.user.userRealname;
					that.name = res.data.data.user.userNickname;
					that.phoneNum = res.data.data.user.userPhone;
					that.mail = res.data.data.user.userEmail;
					that.school = res.data.data.user.userSchool;
					that.course = res.data.data.user.userInterestCourse;
					that.sex = res.data.data.user.userSex;
					axios.get(specialUrl + '/user/task/notDoneTaskNum/' + Number(that.phoneNum))
						.then(res => {
							this.ifNotice = res.data.result;
							if (res.data.code == 100001) {
								this.taskNum = res.data.data;
							}
							if (res.data.data == 0) {
								this.ifHave = true
								this.judgeNotice = '暂时没有需要处理的信息'
							}
						})
				})
		},
		methods: {
			articleDetail(index) {
				this.$router.push({
					name: 'downloadContent',
					params: {
						articleId: this.downloadList[index].articleId
					}
				})
			},
			nextpage(index) {
				axios.post(this.GLOBAL.urlHead + '/user/userCourse', {
						userId: this.GLOBAL.userId,
						currentPage: index,
						pageSize: 6
					})
					.then(res => {
						//              	console.log(res)
						if (res.data.data == null) {
							this.ifCollect = true;
							this.pageAllCourse = 0
						} else {
							this.courseList = res.data.data.courseList;
							this.pageAllCourse = res.data.data.pages * 10;
							for (var i in this.courseList) {
								this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
							}
							this.ifCollect = false;
						}
					})
			},
			tabSwich(index) {
				this.curId = index;
				var tabContent = document.querySelectorAll('.contentHide');
				var tabLen = tabContent.length;
				for (var i = 0; i < tabLen; i++) {
					tabContent[i].style.display = 'none';
				};
				tabContent[index].style.display = 'block';
				//改变icon
				this.liItems[0].liIcon = '../../../../static/logoAll/personalInfon/personinfo0.png';
				this.liItems[1].liIcon = '../../../../static/logoAll/personalInfon/contest0.png';
				this.liItems[2].liIcon = '../../../../static/logoAll/personalInfon/collection0.png';
				this.liItems[3].liIcon = '../../../../static/logoAll/personalInfon/download0.png';
				if (index == 0) {
					this.liItems[index].liIcon = '../../../../static/logoAll/personalInfon/personinfo1.png';
				} else if (index == 1) {
					this.liItems[index].liIcon = '../../../../static/logoAll/personalInfon/contest1.png';
					axios.get(this.GLOBAL.urlHead + '/user/userContests', {
							params: {
								userId: this.GLOBAL.userId
							}
						})
						.then(res => {
							if (res.data.data == null) {
								this.ifJoin = true
								this.pageAllContest = 0;
							} else {
								this.contestAll = res.data.data.joinedContests
								this.ifJoin = false
							}
						});
				} else if (index == 2) {
					this.liItems[index].liIcon = '../../../../static/logoAll/personalInfon/collection1.png';
					axios.post(this.GLOBAL.urlHead + '/user/userCourse', {
							userId: this.GLOBAL.userId,
							currentPage: 1,
							pageSize: 6
						})
						.then(res => {
							if (res.data.data == null) {
								this.ifCollect = true;
								this.pageAllCourse = 0
							} else {
								this.courseList = res.data.data.courseList;
								this.pageAllCourse = res.data.data.pages * 10;
								for (var i in this.courseList) {
									this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
								}
								this.ifCollect = false;
							}
						})
				} else {
					this.liItems[index].liIcon = '../../../../static/logoAll/personalInfon/download1.png';
					axios.post(this.GLOBAL.urlHead + '/user/queryDown', {
							userId: Number(this.GLOBAL.userId),
							currentPage: pageNow,
							pageSize: 5
						})
						.then(res => {
							this.currentPage = pageNow
							if (res.data.data == null) {
								this.ifDownload = true
								this.pageAllDownload = 0
							} else {
								this.downloadList = res.data.data.articleVOList;
								this.pageAllDownload = res.data.data.pages * 10;
								for (var i in this.downloadList) {
									this.downloadList[i].file.filePublishTime = this.formatTime(this.downloadList[i].file.filePublishTime)
								}
							}
						})
				};
			},
			currentChange2(index) {
				pageNow = index
				axios.post(this.GLOBAL.urlHead + '/user/queryDown', {
						userId: this.GLOBAL.userId,
						currentPage: pageNow,
						pageSize: 5
					})
					.then(res => {
						this.currentPage = pageNow
						if (res.data.data == null) {
							this.ifDownload = true
							this.pageAllDownload = 0
						} else {
							this.downloadList = res.data.data.articleVOList;
							this.pageAllDownload = res.data.data.pages * 10;
							for (var i in this.downloadList) {
								this.downloadList[i].file.filePublishTime = this.formatTime(this.downloadList[i].file.filePublishTime)
							}
						}
					})
			},
			gotoCourse(index) {
				this.$router.push({
					name: 'courseDetail',
					params: {
						courseId: this.courseList[index].courseId
					}
				})
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
			// testBackChange(index){
			//     var backColor = document.querySelectorAll('.contestRight ul li');
			//     for(var i = 0; i < backColor.length; i++){
			//         backColor[i].style.backgroundColor = '#fff';
			//         backColor[i].style.color = '#000';
			//     };
			//     backColor[index].style.backgroundColor = '#0099ff';
			//     backColor[index].style.color = '#fff';
			// },
			// hideBack(){
			//     var backColor = document.querySelectorAll('.contestRight ul li');
			//     for(var i = 0; i < backColor.length; i++){
			//         backColor[i].style.backgroundColor = '#fff';
			//         backColor[i].style.color = '#000';
			//     };
			// }
		}
	}
</script>
<style scoped>
	* {
		font-family: "microsoft yahei";
	}
	
	.personalInfo {
		width: 1100px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 14px;
	}
	
	.personalContent {
		width: 1100px;
		height: 600px;
		display: flex;
	}
	
	.personLeft {
		width: 25%;
		background-color: #8aedfe;
	}
	
	.personRight {
		width: 75%;
		background-color: #eeeeee;
	}
	
	.personLeft ul {
		list-style: none;
		height: 32%;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	
	.personLeft ul li {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20%;
		width: 100%;
		font-size: 15px;
		cursor: pointer;
	}
	
	.personLeft ul li img {
		height: 24px;
		margin-right: 5px;
	}
	
	.headZone {
		height: 32%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding-top: 20px;
	}
	
	.headZone img {
		height: 50%;
		border-radius: 50%;
		background-color: white;
	}
	
	.headZone div {
		font-size: 20px;
	}
	
	.tabShow {
		background-color: #ffffff;
	}
	
	.contentHide {
		display: none;
	}
	
	.reLoad {
		color: #000 !important;
		cursor: pointer;
	}
	
	.reLoad:hover {
		color: #ffb566 !important;
	}
	
	.personalRight4Details ul li:hover {
		color: #ffb566;
		border: 2px solid #ffb566;
		border-radius: 10px;
	}
	
	.personalRight4Details {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 90%;
		/*padding: 0;*/
	}
	
	.personalRight4Details ul {
		width: 100%;
		border-radius: 10px;
	}
	
	.liAbs {
		width: 60%;
		display: inline-block;
	}
	
	.personalRight4 ul li {
		padding: 8px 30px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.personalRight4 ul {
		list-style: none;
		background-color: #FEFEFE;
	}
	
	.personalRight4 div {
		display: flex;
		flex-direction: column;
		align-self: center;
		/*    height: 100%;*/
	}
	
	.personalRight4 {
		width: 91%;
		padding: 50px 35px;
		height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.courseName {
		font-size: 16px;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.courseTime {
		font-size: 12px;
		color: #999;
	}
	
	.courseNum {
		font-size: 12px;
		color: #000;
	}
	
	.courseDetail div {
		padding: 4px 10px 3px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.courseDetail img {
		height: 26px;
	}
	
	.courseDetail {
		display: flex;
		flex-direction: column;
	}
	
	.coursePic {
		width: 100%;
		height: 74%;
		border-radius: 10px 10px 0 0;
	}
	
	.personalRight3Details ul li {
		width: 32%;
		margin: 0 0.5%;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		height: 48%;
		background-color: #fefefe;
		border-radius: 10px;
	}
	
	.personalRight3Details ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		height: 88%;
		width: 100%;
	}
	
	.personalRight3Details {
		width: 85%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.personalRight3 {
		width: 100%;
		height: 520px;
		padding: 40px 0;
		display: flex;
		justify-content: center;
	}
	
	.contestRight ul li {
		padding: 10px 20px;
		border: 1px solid #0099ff;
		font-size: 14px;
		border-bottom: none;
		width: 50%;
		text-align: center;
		cursor: pointer;
	}
	
	.contestRight ul {
		list-style: none;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}
	
	.contestRight {
		width: 30%;
		text-align: right;
		height: 100%;
		padding: 10px 0;
	}
	
	.checkBill:hover {
		color: #0099ff;
		font-weight: bold;
	}
	
	.contestTime {
		font-size: 14px;
		color: #666;
	}
	
	.timeTitle {
		font-size: 16px;
		color: #333;
	}
	
	.contestAbs {
		font-size: 12px;
		color: #666;
	}
	
	.contestTitle {
		font-size: 20px;
		color: #333;
	}
	
	.contestDetail {
		width: 70%;
		padding: 15px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.personRightContest {
		border-radius: 10px;
		width: 80%;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		padding: 0 40px;
		background-color: #fff;
		display: flex;
		align-items: center;
		min-height: 150px;
	}
	
	.contestRight ul li:hover {
		background-color: #0099ff;
		color: #fff;
	}
	
	.personRight2 {
		width: 100%;
		height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50px 0;
		justify-content: space-around;
	}
	
	.personRight2 .proNotice {
		width: 80%;
		height: 60px;
		margin-top: 100px;
		line-height: 60px;
		font-size: 14px;
		position: relative;
		border-radius: 10px;
		border: 2px solid rgb(190, 222, 245);
		background-color: white;
	}
	
	.proNotice .proNotice-notice {
		position: absolute;
		left: 20px;
	}
	
	.proNotice .proNotice-more {
		position: absolute;
		right: 20px;
	}
	
	.proNotice .proNotice-more a:hover {
		color: rgb(0, 197, 242);
	}
	
	.personRight1 {
		width: 100%;
		height: 230px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.personDetail {
		width: 80%;
		height: 80%;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40px;
		background-color: #fefefe;
		border-radius: 10px;
	}
	
	.personDetailLeft {
		display: flex;
		flex-direction: column;
	}
	
	.personDetailLeft div {
		font-size: 14px;
		padding: 3px 0;
		color: #666;
		padding: 5px 0;
	}
	
	.personDetail img {
		height: 140px;
	}
	
	.ifJoin {
		position: absolute;
		top: 100px;
	}
</style>