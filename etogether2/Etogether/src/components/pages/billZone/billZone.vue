<template>
	<div>
		<slideShow></slideShow>
		<div class="billZone">
			<div v-for="(item,index) in billZone" class="billZone-item">
				<h3>{{item.contestName}}<img v-if="item.fire" class="fire" src="../../../../static/logoAll/billZone/fire.png"/></h3>
				<div class="billZone-article">{{item.contestContext}}</div>
				<div class="billZone-Time">
					<img src="../../../../static/logoAll/billZone/registTime.png" />
					<span class="time-title">报名时间</span>
					<span class="time-content">{{item.contestStartTime}}-{{item.contestEndTime}}</span>
				</div>
				<div class="billZone-Time">
					<img src="../../../../static/logoAll/billZone/rank.png" />
					<span class="time-title">比赛时间</span>
					<span class="time-content">{{item.contestDuringTime}}</span>
				</div>

				<h4 class="billZone-signup-title" @click="gotoBM(index)">考试报名</h4>
				<div class="billZone-signup">
					<tr>
						<td @click="practiceTest(index)">
							模拟考试
						</td>
						<td @click="getAddress(index)" style="border-right:none">
							考点分布
						</td>
					</tr>
					<tr>
						<td @click="getPlan(index)" style="border-radius: 0 0 0 10px ">
							考试计划
						</td>
						<td @click="getNotes(index)" style="border-right:none;border-radius: 0 0 10px 0;">
							报名须知
						</td>
					</tr>
				</div>
			</div>
			<!--新活动专区-->
			<div v-if="specialSwitch" class="billZone-item">
				<h3>全国中小学电脑制作活动<img v-if="" class="fire" src="../../../../static/logoAll/billZone/fire.png"/></h3>
				<div class="billZone-article">青少年编程技术等级评测由中国国际科技促进会青少年人工智能教育教育普及工作委员会主办、国家教育信息化产业技术创新战略联盟组织的青少年编程技术等级一期评测将于2019年3月16日举行。等级考试为一级至四级，其中一级考试为8-18岁未参加过得学生报名。二级、三级、四级由通过前一阶段评测的学生报名。</div>
				<div class="billZone-Time">
					<img src="../../../../static/logoAll/billZone/registTime.png" />
					<span class="time-title">报名时间</span>
					<span class="time-content">{{specialBillZone.contestStartTime}}-{{specialBillZone.contestEndTime}}</span>
				</div>
				<div class="billZone-Time">
					<img src="../../../../static/logoAll/billZone/rank.png" />
					<span class="time-title">比赛时间</span>
					<span class="time-content">{{specialBillZone.contestDuringTime}}</span>
				</div>

				<h4 class="billZone-signup-title" @click="gotoBM2()">考试报名</h4>
				<div class="billZone-signup">
					<tr>
						<td @click="getPlan2()" style="border-radius: 0 0 0 10px;padding: 20px;">
							考试计划
						</td>
						<td @click="getNotes2()" style="border-right:none;border-radius: 0 0 10px 0;padding: 20px;">
							报名须知
						</td>
					</tr>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import slideShow from '../../common/slideShow'
	import axios from 'axios'
	var specialUrl = 'http://148.70.213.160/web/'
	var specialUrlMan = 'http://148.70.213.160/manage/'
	export default {
		name: 'billZone',
		data() {
			return {
				billZone: [],
				specialBillZone:{},
				specialSwitch: false
			}
		},
		components: {
			slideShow
		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			axios.get(specialUrlMan + 'switch/state')
						.then(res => {
							this.specialSwitch = res.data.data;
						}),
			axios.get(this.GLOBAL.urlHead + '/contest/getContestList', {
					params: {
						pageNum: 1
					}
				})
				.then(res => {
					this.billZone = res.data.data;
					for(var i in this.billZone) {
					if (this.billZone[i].contestId == 100) {
						this.specialBillZone = this.billZone[i]
					}
				}
				}) 
		},
		methods: {
			practiceTest(index) {
				this.$router.push({
					name: 'stimulationTest',
					params: {
						contestPaperId: this.billZone[index].contestPaperId
					}
				})
			},
			getAddress(index) {
				this.$router.push({
					name: 'articleDetails',
					params: {
						articleId: this.billZone[index].contestAddressId
					}
				})
			},
			getPlan(index) {
				this.$router.push({
					name: 'articleDetails',
					params: {
						articleId: this.billZone[index].contestPlanId
					}
				})
			},
			getNotes(index) {
				this.$router.push({
					name: 'articleDetails',
					params: {
						articleId: this.billZone[index].contestNotesId
					}
				})
			},
			gotoBM(index) {
				if(localStorage.getItem('ifLogin') == 'true') {
					this.GLOBAL.ifLogin = true
				} else {
					this.GLOBAL.ifLogin = false
				}
				if(this.GLOBAL.ifLogin) {

					this.$router.push({
						name: 'testRegister',
						params: {
							contestId: this.billZone[index].contestId
						}
					})
				} else {
					this.$router.push('/login')
				}
			},
			getPlan2() {
				this.$router.push({
					name: 'articleDetails',
					params: {
						articleId: this.specialBillZone.contestPlanId
					}
				})
			},
			getNotes2() {
				this.$router.push({
					name: 'articleDetails',
					params: {
						articleId: this.specialBillZone.contestNotesId
					}
				})
			},
			gotoBM2() {
				if(localStorage.getItem('ifLogin') == 'true') {
					this.GLOBAL.ifLogin = true
				} else {
					this.GLOBAL.ifLogin = false
				}
				if(this.GLOBAL.ifLogin) {

					this.$router.push({
						name: 'specialRegist',
						params: {
//							contestId: this.billZone[index].contestId
						}
					})
				} else {
					this.$router.push('/login')
				}
			}
		}
	}
</script>
<style scoped>
	.billZone .billZone-signup-title:hover {
		background-color: #8aedfe;
		cursor: pointer;
		color: #FFFFFF;
	}
	
	a {
		text-decoration: none;
		color: #000000;
	}
	
	.billZone {
		padding: 0px 20px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.billZone-item {
		padding: 30px 30px;
		width: 43%;
		border: 2px solid rgb(181, 225, 255);
		margin: 20px 0;
		border-radius: 10px;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
	}
	
	.billZone-item h3 {
		font-family: "微软雅黑";
		font-size: 25px;
		color: #0066ff;
		margin-bottom: 18px;
	}
	
	.billZone-item .fire {
		width: 26px;
		position: relative;
		top: 4px;
	}
	
	.billZone-article {
		font-family: "微软雅黑";
		font-size: 17px;
		color: #333333;
		margin-bottom: 10px;
		text-indent: 2em;
	}
	
	.billZone-Time {
		margin-bottom: 10px;
	}
	
	.billZone-Time img {
		width: 23px;
		position: relative;
		top: 5px;
	}
	
	.billZone .time-title {
		font-family: "微软雅黑";
		font-size: 18px;
		color: #000000;
		margin-right: 10px;
	}
	
	.billZone .time-content {
		font-family: "微软雅黑";
		font-size: 18px;
		color: #333333;
	}
	
	.billZone .billZone-signup-title {
		border: 1px solid rgb(181, 225, 255);
		width: 100%;
		padding: 10px 0px;
		text-align: center;
		font-family: "微软雅黑";
		font-size: 19px;
		color: #333333;
		font-weight: normal;
		border-radius: 10px 10px 0 0;
	}
	
	.billZone .billZone-signup {
		border: 1px solid rgb(181, 225, 255);
		border-top: none;
		border-bottom: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.billZone-signup td {
		display: inline-block;
		color: #333333;
		width: 228px;
		height: 46px;
		border-bottom: 1px solid rgb(181, 225, 255);
		border-right: 1px solid rgb(181, 225, 255);
		line-height: 46px;
		text-align: center;
	}
	
	.billZone-signup tr {
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		text-align: center;
		align-items: center;
	}
	
	.billZone-signup tr td {
		height: 100%;
	}
	
	.estd {
		height: 100%;
		border-radius: 0 0 10px 10px;
	}
	
	.billZone-signup tr td:hover {
		background-color: #8aedfe;
		cursor: pointer;
		color: #FFFFFF;
	}
	
	.billZone-signup {
		border-radius: 0 0 10px 10px;
	}
	
	.billZone-signup td {
		width: 50%;
		font-size: 19px;
		color: #333333;
		font-family: "微软雅黑";
	}
	
	.billZone-signup a:hover {
		background-color: #8aedfe;
		cursor: pointer;
	}
	
	.billZone-signup td:hover a {
		color: #FFFFFF;
	}
</style>