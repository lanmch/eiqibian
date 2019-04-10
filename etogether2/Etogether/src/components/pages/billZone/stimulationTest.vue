<template>
    <div class="test">
		<div class="oneType">单选</div>
		<one-chose @chooseOne='chooseOne' v-for='(item,index) in oneChoiceQuestion' :onePro="item" :index="index"></one-chose>
		<div class="twoType">多选</div>
		<many-chose @chooseMulti='chooseMulti' v-for="(item,index) in twoChoiceQuestion" :length='twoProLen' :twoPro="item" :index="index"></many-chose>
		<div class="proType">编程题</div>
		<div style="padding:0 55px;">
		<program-chose @codeAns='getCodeAns' v-for="(item,index) in programQuestion" :length='proProLen' :proPro="item" :index="index"></program-chose></div>
        <div class="submitBTN"><el-button @click="submitPaper" style="width:200px;" type = 'primary'>提交试卷</el-button></div>
        <!-- <router-link to="/stimulationTestResult"></router-link> -->
		<div class="leaveTime">
            <div class="leaveTimeName">剩余时间</div>
            <div class="leaveTimetime">
                <div>{{hour}}</div>:<div>{{min}}</div>:<div>{{seconds}}</div>
            </div>
        </div>
    </div>
</template>
<script>
	var alltime
	import programingTool from '../onProgramming/programTool'
	import Element from 'element-ui'
	import axios from 'axios'
	import oneChose from './problem/oneChose.vue'
	import manyChose from './problem/manyChose.vue'
	import programChose from './problem/programChose.vue'
	var oneChooseAns = [];
	var multiChooseAns = [];
	var codeChooseAns = [];
	var resultScore = 0;
	var t
	export default {
		name: 'stimulationTest',
		data() {
			return {
				isOneActive: true,
				proOneDetailList: [
					'int', 'float', 'char', 'double'
				],
				nOne: -1,
				twoChoiceQuestion: [],
				arrTwo: [],
				oneChoiceQuestion: [],
				programQuestion: [],
				paperId: 4,
				proAns: '',
				hour: '',
				min: '',
				seconds: '',
				twoProLen: 0,
				proProLen: 0
			}
		},
		components: {
			programingTool,
			oneChose,
			manyChose,
			programChose
		},
		methods: {
			countTime() {
				// onst end = Date.parse(new Date('2017-12-01'))
				// // 当前时间戳
				// const now = Date.parse(new Date())c
				// 相差的毫秒数
				var msec = alltime
				alltime = alltime - 1000
					// 计算时分秒数
					// let day = parseInt(msec / 1000 / 60 / 60 / 24)
				this.hour = parseInt(msec / 1000 / 60 / 60 % 24)
				this.min = parseInt(msec / 1000 / 60 % 60)
				this.seconds = parseInt(msec / 1000 % 60)
					// 个位数前补零
				this.hour = this.hour > 9 ? this.hour : '0' + this.hour
				this.min = this.min > 9 ? this.min : '0' + this.min
				this.seconds = this.seconds > 9 ? this.seconds : '0' + this.seconds
					// 控制台打印
				// 一秒后递归
				 t = setTimeout(this.countTime, 1000)
				if (this.seconds == '00' && this.min == '00' && this.hour == '00') {
					//					alert('时间到！')
					this.$alert('时间到！', '提示消息', {
						confirmButtonText: '确定',
					});
					clearTimeout(t)
				}
			},
			submitPaper() {
				var oneChoiceQuestion = [];
				var multiChoiceQuestion = []
				var codeQuestion = []
				for (let i = 0; i < oneChooseAns.length; i++) {
					let ansOne = {};
					ansOne.questionId = this.oneChoiceQuestion[i].questionId
					let arrOne = []
					arrOne.push(oneChooseAns[i])
					ansOne.answer = [oneChooseAns[i]]
					oneChoiceQuestion.push(ansOne)
				}
				//单选OK
				for (let i = 0; i < multiChooseAns.length; i++) {
					let ansMulti = {};
					ansMulti.questionId = this.twoChoiceQuestion[i].questionId
					let arrMulti = []
					for (var j = 0; j < multiChooseAns[i].length; j++) {
						arrMulti.push(multiChooseAns[i][j])
					}
					ansMulti.answer = arrMulti
					multiChoiceQuestion.push(ansMulti)
				}
				//多选结束
				for (let i = 0; i < codeChooseAns.length; i++) {
					let ansCode = {};
					ansCode.questionId = this.programQuestion[i].questionId
					let arrPro = []
					arrPro.push(codeChooseAns[i])
					ansCode.answer = arrPro
					codeQuestion.push(ansCode)
				}
				var dataAA = {
					paperId: this.$route.params.contestPaperId,
					yourAns: {
						oneChoiceQuestion: oneChoiceQuestion,
						multipleChoiceQuestion: multiChoiceQuestion,
						programmingQuestion: codeQuestion
					}
				}
				axios.post(this.GLOBAL.urlHead + '/exam/checkPaper', {
					paperId: this.$route.params.contestPaperId,
					yourAns: {
						oneChoiceQuestion: oneChoiceQuestion,
						multipleChoiceQuestion: multiChoiceQuestion,
						programmingQuestion: codeQuestion
					}
				}).then(res => {
					clearTimeout(t)
					resultScore = res.data.data.score;
					// alert('最终分数为：'+resultScore);
					this.$router.push({
						name: 'stimulationTestResult',
						params: {
							score: resultScore
						}
					})
				})
			},
			chooseOne(oneChooseData) {
				oneChooseAns[oneChooseData.index] = oneChooseData.answer
			},
			chooseMulti(multiChooseData) {
				multiChooseAns[multiChooseData.index] = multiChooseData.answer;
			},
			getCodeAns(codeAns) {
				codeChooseAns[codeAns.index] = codeAns.proAns
			}
		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			this.countTime()
			axios.get(this.GLOBAL.urlHead + '/exam/getPaper', {
					params: {
						paperId: this.$route.params.contestPaperId
					}
				})
				.then(res => {
					console.log(res)
					alltime = 60
					alltime = alltime * 60 * 1000
					this.oneChoiceQuestion = res.data.data.paperSnapshot.oneChoiceQuestion
					this.twoChoiceQuestion = res.data.data.paperSnapshot.multipleChoiceQuestion
					this.programQuestion = res.data.data.paperSnapshot.programmingQuestion
					
					this.twoProLen = res.data.data.paperSnapshot.oneChoiceQuestion.length
					this.proProLen = res.data.data.paperSnapshot.oneChoiceQuestion.length + res.data.data.paperSnapshot.multipleChoiceQuestion.length
				})
		}
	}
</script>
<style scoped>
	.submitBTN {
		margin-bottom: 20px;
		text-align: center;
	}
	
	.test {
		width: 1100px;
		margin-top: 14px;
	}
	
	.BTN {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border: 2px solid #99ccff;
		border-radius: 50%;
		color: #99ccff;
		cursor: pointer;
	}
	
	.BTNchoose {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		background-color: #99ccff;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
	}
	
	.leaveTime {
		width: 240px;
		height: 100px;
		border: 2px solid #ffcc33;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		color: #ffcc33;
		position: fixed;
		top: 60px;
		right: 120px;
		z-index: 99;
		border-radius: 10px;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
	}
	
	.leaveTimeName {
		font-weight: bold;
	}
	
	.leaveTimetime {
		display: flex;
		font-size: 32px;
		
	}
	
	.leaveTimetime div {
		border: 2px solid #ffcc33;
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		margin: 0 5px;
		border-radius: 10px;
	}
	
	.oneDetail {
		margin-bottom: 20px;
	}
	
	.oneType {
		height: 22px;
		line-height: 22px;
		text-align: center;
		width: 40px;
		border: 2px solid #0099ff;
		color: #0099ff;
		font-size: 12px;
		float: left;
		border-radius: 5px;
		font-weight: bold;
	}
	
	.onePro {
		display: flex;
		flex-direction: column;
		margin-left: 55px;
	}
	
	.onePro .oneProdivOp {
		margin-bottom: 8px;
	}
	
	.onePro h4 {
		display: inline-block;
	}
	
	.oneProdiv {
		margin-bottom: 20px;
		display: inline-block;
	}
	
	.onePro span {
		display: inline-block;
		margin-left: 8px;
	}
	
	.twoDetail {
		display: flex;
		align-items: baseline;
		margin-bottom: 20px;
	}
	
	.twoType {
		height: 22px;
		line-height: 22px;
		text-align: center;
		width: 40px;
		border: 2px solid #ff99cc;
		color: #ff99cc;
		font-size: 12px;
		float: left;
		border-radius: 5px;
		font-weight: bold;
	}
	
	.twoPro {
		display: flex;
		flex-direction: column;
	}
	
	.twoPro h4 {
		display: inline-block;
	}
	
	.twoProdiv {
		margin-bottom: 8px;
	}
	
	.twoPro span {
		display: inline-block;
		margin-left: 8px;
	}
	
	.proType {
		display: inline-block;
		height: 22px;
		line-height: 22px;
		text-align: center;
		width: 40px;
		border: 2px solid #ffcc66;
		color: #ffcc66;
		font-size: 12px;
		border-radius: 5px;
		font-weight: bold;
		float: left;
	}
	
	.proDetail {
		display: flex;
	}
	
	.proDetail h4 {
		display: inline-block;
	}
	
	.el-button {
		line-height: 0.7;
	}
	
	.el-button--primary.is-plain {
		/* background-color: #fff;
    color: #99ccff;
    border-color: #99ccff; */
	}
</style>