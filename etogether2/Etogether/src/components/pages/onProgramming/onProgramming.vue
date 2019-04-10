<template>
	<div>
	<slideShow></slideShow>
	<div class="onProgramming" >
		<div class="onPro-head" v-if = 'show'>
			<a  @click = 'clickShow'><el-button type="primary" style="background-color:#00b7ee;border: none;"  icon='el-icon-download'>选择题目</el-button></a>
			<div class="onPro-head-content">
				<div class="onPro-head-grade">
					<img src="../../../../static/logoAll/onProgramming/level.png"/>
					<span class="grade-title">
						{{titleContent.level}}
					</span>
					<span class="grade-content">
						{{titleContent.title}}
					</span>
				</div>
				<div class="onPro-head-analysis">
					<div class="onPro-head-a-h">
					<img src="../../../../static/logoAll/onProgramming/ProgramAnalysis.png"/>
					<span class="analysis-title">程序分析</span>
					</div>
					<span class="analysis-content">{{titleContent.analysis}}</span>
				</div>
			</div>
		</div>
		
		<div class="programTitleChoose" v-if = 'off'>
			<a @click = 'clickShow'><el-button type="primary" style="background-color:#00b7ee;border: none;" icon='el-icon-upload2'>收起</el-button></a>
			<div class="onPro-head-content">
				<div class="onPro-head-grade">
					<div class="grade-title">
						<img src="../../../../static/logoAll/onProgramming/picker.png" />
						<span>筛选方式</span>
					</div>
					<ul class="grade-picker">
						<li @click = 'all1' :class="{onColor:filterByLabel == 0}">全部</li>
						<li @click = 's' :class="{onColor:filterByLabel == 1}">初级</li>
						<li @click = 'm' :class="{onColor:filterByLabel == 2}">中级</li>
						<li @click = 'l' :class="{onColor:filterByLabel == 3}">高级</li>
					</ul>
					<ul class="grade-content">
						<li @click = 'all2' :class="{onColor:filterByLanguage == 0}">全部</li>
						<li @click = 'p' :class="{onColor:filterByLanguage == 1}">python</li>
					</ul>
				</div>
				<div class="onPro-head-title">
					<div class="onPro-head-a-h">
						<img src="../../../../static/logoAll/onProgramming/ProgramAnalysis.png" />
						<span class="analysis-title">题目内容</span>
					</div>
					<ul class="title-content">
						<div class="slideShow2">
						  <div class="block">
						    <el-carousel trigger="click" height="100px"  :autoplay = 'false' @change="changePage">
						      <el-carousel-item v-for='items in proTotal'>
						      	<ul class="slideShow2Ul">
						      		<li v-for="(item,index) in slideShows" @click = 'getContent(index)'> 
						      			{{item.questionLabel}}：{{item.questionTitle}}
						      		</li>
						      	</ul>
						      </el-carousel-item>
						    </el-carousel>
						  </div>
					  	</div>
					</ul>
				</div>
			</div>
		</div>
		<program-tool></program-tool>
	</div>
	</div>
</template>
<script>
	import Element from 'element-ui'
	import axios from 'axios'
	import programTool from '../onProgramming/programTool.vue'
	import chooseProgram from '../onProgramming/chooseProgram.vue'
	import slideShow from '../../common/slideShow'
//	import slideChoose from '../../pages/onProgramming/slideChoose'
	export default {
		name: 'onProgramming',
		components: {
			programTool,
			slideShow,
			chooseProgram,
//			slideChoose
		},
		data() {
			return {
				show: true,
				off: false,
				titleContent: {
					level: '',
					title: '',
					analysis: ''
				},
				
				color: 0,
				slideShows: [],
				proTotal: 0,
				filterByLanguage: 0,
				filterByLabel: 0,
				pageNum: 1
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
		},
		methods: {
			getContent(index) {
				this.show = !this.show,
				this.off = !this.off,
				this.titleContent.analysis = this.slideShows[index].questionLanguage
				this.titleContent.title = this.slideShows[index].questionTitle
				this.titleContent.level = this.slideShows[index].questionLabel
				axios.get(this.GLOBAL.urlHead + '/program/getQuestion',{
					params:{
						questionId: this.slideShows[index].questionId 
					}
				}).then(res=>{
					this.titleContent.analysis = res.data.data.questionOption
				})
			},
			clickShow() {
				this.show = !this.show,
				this.off = !this.off
			},
			changePage(index) {
				this.pageNum = index+1
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			},
			all1(){
				this.pageNum = 1
				this.filterByLabel = 0
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			},
			all2(){
				this.pageNum = 1
				this.filterByLanguage = 0
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			},
			s(){
				this.pageNum = 1
				this.filterByLabel = 1
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			},
			m(){
				this.pageNum = 1
				this.filterByLabel = 2
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			},
			l(){
				this.pageNum = 1
				this.filterByLabel = 3
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			},
			p(){
				this.pageNum = 1
				this.filterByLanguage = 1
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
			}
		},
		created() {
			axios.get(this.GLOBAL.urlHead + '/program/getShowQuestion')
				.then(res => {
					this.titleContent.level = res.data.data.questionLabel,
						this.titleContent.analysis = res.data.data.questionOption,
						this.titleContent.title = res.data.data.questionTitle
				}),
				axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
					"pageNum": this.pageNum, //最小为1
					"filterByLanguage": this.filterByLanguage, //0：全部 1：Python(非空)
					"filterByLabel": this.filterByLabel //0: 全部 1：初级 2：中级 3：高级(非空)
				}).then(res => {
					this.slideShows = res.data.data.programList
					this.proTotal = res.data.data.totalPages
				})
		}
	}
</script>
<style scoped>
.el-carousel__indicators{
	display: none;
}
	* {
		font-family: "microsoft yahei";
	}
	
	.onProgramming {
		padding: 0px 20px;
	}
	.onProgramming .onColor {
		color: #0090ff;
	}
	.onPro-head-content {
		float: left;
		margin-left: 20px;
		margin-bottom: 30px;	
	}
	
	.onPro-head,
	.programTitleChoose {
		width: 100%;
		height: 220px;
	}
	
	.onPro-head img {
		width: 28px;
		height: 28px;
		position: relative;
		top: 7px;
	}
	
	.onPro-head a:first-child {
		float: left;
		margin-right: 10px;
	}
	/*.onProgramming button {
		font-size: 18px;
		border: none;
		color: #FFFFFF;
		background: none;
	}*/
	
	.onPro-head {
		margin-top: 40px;
	}
	
	.onPro-head .onPro-head-grade {
		float: left;
		margin-bottom: 20px;
	}
	
	.onPro-head .grade-title,
	.onPro-head .analysis-title {
		font-size: 18px;
	}
	
	.onPro-head .grade-content {
		border: 1px solid #0099ff;
		color: #0099ff;
		font-size: 16px;
		display: inline-block;
		width: 700px;
		margin-left: 57px;
		padding: 10px;
		border-radius: 5px;
	}
	
	.onPro-head .onPro-head-analysis {
		clear: both;
	}
	
	.onPro-head .onPro-head-a-h {
		float: left;
	}
	
	.onPro-head .analysis-content {
		border: 1px solid #0099ff;
		padding: 10px;
		color: #3C3C3C;
		font-size: 16px;
		display: block;
		width: 700px;
		margin-left: 26px;
		float: left;
		border-radius: 5px;
		height: 100px;
	}
	
	li {
		list-style: none;
	}
	
	.programTitleChoose .onPro-head-content {
		float: left;
		margin-left: 20px;
	}
	
	.programTitleChoose a:first-child {
		float: left;
		margin-left: 20px;
	}
	
	.programTitleChoose .grade-title {
		float: left;
	}
	
	.programTitleChoose .grade-title img {
		width: 24px;
		height: 24px;
		position: relative;
		top: 4px;
	}
	
	.programTitleChoose .grade-title span {
		display: inline-block;
		font-family: "microsoft yahei";
		font-size: 18px;
		width: 80px;
		margin-right: 45px;
	}
	
	.programTitleChoose .grade-picker {
		float: left;
	}
	
	.programTitleChoose .grade-picker li {
		width: 90px;
		float: left;
		padding-right: 30px;
		line-height: 35px;
		font-size: 18px;
	}
	
	.programTitleChoose .onPro-head-grade {
		margin-top: 5px;
	}
	
	.programTitleChoose .onPro-head-grade li:hover {
		/*color: #0090ff;*/
		cursor: pointer;
	}
	
	.programTitleChoose .grade-content {
		float: left;
		margin-left: 154px;
		clear: both;
	}
	
	.programTitleChoose .grade-content li {
		width: 90px;
		float: left;
		padding-right: 30px;
		line-height: 35px;
		font-size: 18px;
	}
	
	.programTitleChoose .onPro-head-a-h {
		clear: both;
		font-size: 18px;
		float: left;
	}
	
	.programTitleChoose .onPro-head-a-h img {
		width: 24px;
		height: 24px;
		position: relative;
		top: 4px;
	}
	
	.programTitleChoose .title-content {
		width: 700px;
		height: 100px;
		/*background-color: #E3E3E3;*/
		float: left;
		margin: 10px 0px 0 52px;
		border-radius: 5px;
	}
	
	.slideShow2 img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.slideShow2 {
		border-radius: 5px;
	}
	
	.slideShow2 ul {
		width: 80%;
		height: 100%;
		margin: 8px auto;
		border-radius: 10px;
	}
	
	.slideShow2 ul li {
		height: 38px;
		width: 94%;
		border: 1px solid #99CCFF;
		background-color: #FFFFFF;
		line-height: 38px;
		padding: 0 20px;
		font-size: 15px;
		border-radius: 5px;
	}
	
	.slideShow2Ul li:hover {
		/*color: white;*/
		cursor: pointer;
	}
	
	.slideShow2 ul li:nth-child(2n+1) {
		margin-bottom: 10px;
	}
	
	.el-carousel {
		border-radius: 5px;
	}
	
	.el-carousel__arrow {
		border-radius: 0;
		height: 66px;
	}
	
	.el-carousel__arrow:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}
	
	.el-carousel__indicator {
		display: none;
	}
</style>