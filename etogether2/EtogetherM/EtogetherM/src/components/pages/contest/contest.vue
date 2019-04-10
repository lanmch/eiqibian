<template>
	<div class="contest">
		<div class="btn">
			<router-link to="/addcontest">
				<el-button type="primary">增加赛事</el-button>
			</router-link>
		</div>
		<div class="btn">
			<router-link to='/addScore'>
				<el-button type="primary">导入成绩excel</el-button>
			</router-link>
		</div>
		<div class="contestItem">
			<div class="itemLeft">
				<div class="title" style="margin-bottom:10px;float: left;"><h2 style="display: inline-block;margin-right: 20px;">{{specialActivity.contestName}}</h2>
				<el-switch v-model="specialSwitch" @change='specialSwitchChange' active-color="#13ce66" inactive-color="#ff4949" style='margin-right: 20px;'></el-switch>
				<router-link to='/specialManageHome'>
					<el-button type="primary" size="small">
						进入管理系统
					</el-button>
				</router-link>
				</div>
				<div class="abs" style="margin-bottom:10px;clear: both;">{{specialActivity.contestContext}}</div>
				<div class="time">
					<h4>报名时间：</h4>{{specialActivity.contestStartTime}}-{{specialActivity.contestEndTime}}</div>
				<div class="time">
					<h4>参赛时间：</h4>{{specialActivity.contestDuringTime}}</div>
			</div>
			
			<div class="itemRight">
				<div>
					<el-button type="primary" size="small" @click="specialPlan">考试计划</el-button>
				</div>
				<div>
					<el-button type="primary" size="small" @click="specialNotes">报名须知</el-button>
				</div>
			</div>
			<div class="itemLast">
				<div>
					<el-button type="warning" style="width:80px;" @click="specialModify">修改</el-button>
				</div>
			</div>
		</div>
		<div v-for="(item,index) in contestList" class="contestItem">
			<div class="itemLeft">
				<h3 class="title" style="margin-bottom:10px;">{{item.contestName}}</h3>
				<div class="abs" style="margin-bottom:10px;">{{item.contestContext}}</div>
				<div class="time">
					<h4>报名时间：</h4>{{item.contestStartTime}}-{{item.contestEndTime}}</div>
				<div class="time">
					<h4>参赛时间：</h4>{{item.contestDuringTime}}</div>
			</div>
			<div class="itemRight">
				<div>
					<el-button type="primary" size="small" @click="addPaper(index)">模拟考试</el-button>
				</div>
				<div>
					<el-button type="primary" size="small" @click="goChange(1,index)">考点分布</el-button>
				</div>
				<div>
					<el-button type="primary" size="small" @click="goChange(2,index)">考试计划</el-button>
				</div>
				<div>
					<el-button type="primary" size="small" @click="goChange(3,index)">报名须知</el-button>
				</div>
			</div>
			<div class="itemLast">
				<div>
					<el-button style="width:80px;" v-if="!item.contestPublish" type="success" @click="publishContest(index)">发布</el-button>
					<el-button style="width:80px;" v-else type="success">已发布</el-button>
				</div>
				<div>
					<el-button type="warning" style="width:80px;" @click="modifyContest(index)">修改</el-button>
				</div>
				<div>

					<el-button type="danger" style="width:80px;" @click="deleteContest(index)">删除</el-button>
				</div>
			</div>
		</div>
		<div>
			<el-pagination background layout="prev, pager, next" :total="totalPage" @current-change="changePage" :current-page='currentPage'>
			</el-pagination>
		</div>
	</div>
</template>
<script>
	var specialUrl = 'http://148.70.213.160/manage/'
	import axios from 'axios'
	axios.defaults.withCredentials = true
	var pageNow = 1
	export default {
		inject: ['reload'],
		data() {
			return {
				specialSwitch: '',
				contestList: [],
				totalPage: 10,
				currentPage: 1,
				ifPublish: false,
				specialActivity: {
					contestName:'全国中小学电脑制作活动',
					contestContext:'全国中小学电脑制作活动全国中小学电脑制作活动全国中小学电脑制作活动全国中小学电脑制作活动',
					contestStartTime:'2019.04.07',
					contestEndTime:'2019.04.09',
					contestDuringTime:'2019.04.10',
					contestId:100,
				}
			}
		},
		methods: {
			specialSwitchChange() {
//				alert(111)
				console.log(this.specialSwitch)
				if(this.specialSwitch) {
					axios.put(specialUrl + 'switch/open')
					.then(res => {
						console.log(res.data.result)
					})
				} else {
					axios.put(specialUrl + 'switch/close')
					.then(res => {
						console.log(res.data.result)
					})
				}
				
			},
			addPaper(index) {
				if(this.contestList[index].contestPaperId == 0) {
					this.$router.push({
						name: 'addPaper',
						params: {
							contestId: this.contestList[index].contestId
						}
					})
				} else {
					this.$alert('该比赛已添加试卷', '提示', {
						callback: action => {

						}
					})
				}

			},
			changePage(index) {
				pageNow = index;
				this.reload();
			},
			specialModify() { //新活动修改页面
				this.$router.push({
					name: 'modifyContest',
					params: {
						contestId: this.specialActivity.contestId,
						contestTitle: this.specialActivity.contestName,
						contestAbs: this.specialActivity.contestContext,
						contestStartTime: this.specialActivity.contestStartTime,
						contestEndTime: this.specialActivity.contestEndTime,
						contestTime: this.specialActivity.contestDuringTime
					}
				})
			},
			modifyContest(index) {
				console.log(this.contestList[index].contestId)
				this.$router.push({
					name: 'modifyContest',
					params: {
						contestId: this.contestList[index].contestId,
						contestTitle: this.contestList[index].contestName,
						contestAbs: this.contestList[index].contestContext,
						contestStartTime: this.contestList[index].contestStartTime,
						contestEndTime: this.contestList[index].contestEndTime,
						contestTime: this.contestList[index].contestDuringTime
					}
				})
			},
			goChange(a, index) {
				var theArticleId;
				if(a == 1) {
					theArticleId = this.contestList[index].contestAddressId
				} else if(a == 2) {
					theArticleId = this.contestList[index].contestPlanId
				} else {
					theArticleId = this.contestList[index].contestNotesId
				}
				console.log(this.contestList[index].contestId)
//				alert(theArticleId)
				this.$router.push({
					name: 'addContestDetail',
					params: {
						articleType: a,
						contestId: this.contestList[index].contestId,
						aricleId: theArticleId
					}
				})
			},
			specialPlan() {
				this.$router.push({
					name: 'addContestDetail',
					params: {
						articleType: 2,
						contestId: 100,
						aricleId: 101 //contestPlanId
					}
				})
			},
			specialNotes() {
				this.$router.push({
					name: 'addContestDetail',
					params: {
						articleType: 3,
						contestId: 100,
						aricleId: 102 //contestNotesId
					}
				})
			},
			publishContest(index) {
				if(this.contestList[index].contestAddressId == 0) {
					this.$alert('请添加考点分布相关信息', '提示', {
						callback: action => {

						}
					})
				} else if(this.contestList[index].contestNotesId == 0) {
					this.$alert('请添加报名须知相关信息', '提示', {
						callback: action => {

						}
					})
				} else if(this.contestList[index].contestPlanId == 0) {
					this.$alert('请添加考试计划相关信息', '提示', {
						callback: action => {

						}
					})
				} else {
					axios.post(this.GLOBAL.urlHead + '/manage/contest/publish', this.$qs.stringify({
						contestId: this.contestList[index].contestId
					})).then(res => {

						if(res.data.code == 100001) {
							this.$alert('发布成功！', '提示', {
								callback: action => {
									this.reload()
								}
							})
						}
					})
				}

			},
			deleteContest(index) {

				axios.post(this.GLOBAL.urlHead + '/manage/contest/deleteContest',
					this.$qs.stringify({
						contestId: this.contestList[index].contestId
					})
				).then(res => {

					if(res.data.code == 100001) {
						this.$alert('删除成功！', '提示', {
							callback: action => {
								this.reload()
							}
						})
					}
				})
			}
		},
		mounted() {
			axios.get(this.GLOBAL.urlHead + '/manage/contest/getContestListForManager', {
				params: {
					pageNum: pageNow
				}
			}).then(res => {
				this.contestList = res.data.data.contestList;
				this.totalPage = res.data.data.totalPages * 10;
				this.currentPage = pageNow;
			})
//			,
//			axios.get('').then(res => {
//				this.specialActivity = res.data.specialActivity;
//			})
		}
	}
</script>
<style scoped>
	.contestItem {
		-moz-box-shadow: 0 0 10px #888;
		-webkit-box-shadow: 0 0 10px #888;
		box-shadow: 0 0 10px #888;
	}
	
	.contest {
		padding: 20px 100px;
	}
	
	.btn {
		float: left;
		text-align: left;
		margin-bottom: 20px;
		margin-right: 40px;
	}
	
	.contestItem {
		clear: both;
		padding: 20px 50px;
		display: flex;
		margin-bottom: 20px;
	}
	
	.itemLeft {
		text-align: left;
		width: 70%;
	}
	
	.itemRight {
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
	}
	
	.itemLast {
		width: 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.itemRight div {
		margin-bottom: 5px;
	}
	
	.title {
		margin-bottom: 5px;
	}
	
	.abs {
		margin-bottom: 5px;
	}
	
	.time h4 {
		display: inline-block;
		margin-bottom: 5px;
	}
</style>