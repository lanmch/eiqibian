<template>
	<div class="programTitleChoose">
		<router-link to='/onprogramming'>
			<el-button type="primary" style="background-color:#00b7ee"  icon='el-icon-upload2'>收起</el-button>
		</router-link>
		<div class="onPro-head-grade">
			<div class="grade-title">
				<img src="../../../../static/logoAll/onProgramming/picker.png" />
				<span>筛选方式</span>
			</div>
			<ul class="grade-picker">
				<li>全部</li>
				<li>初级</li>
				<li>中级</li>
				<li>高级</li>
			</ul>
			<ul class="grade-content">
				<li>全部</li>
				<li>python</li>
			</ul>
		</div>
		<div class="onPro-head-title">
			<div class="onPro-head-a-h">
				<img src="../../../../static/logoAll/onProgramming/ProgramAnalysis.png" />
				<span class="analysis-title">题目内容</span>
			</div>
			<ul class="title-content">
				<slide-choose></slide-choose>
			</ul>
		</div>
	</div>
</template>
<script>
	import Element from 'element-ui'
	import axios from 'axios'
	import slideChoose from '../../pages/onProgramming/slideChoose'
	export default {
		name: 'chooseProgram',
		components: {
			slideChoose
		},
		data() {
			return {
				show: false
			}
		},
		created() {

		}
	}
</script>

<style scoped>
	li {
		list-style: none;
	}
	
	a:first-child {
		float: left;
		margin-left: 20px;
	}
	
	.grade-title {
		float: left;
		margin-left: 25px;
	}
	
	.grade-title img {
		width: 24px;
		height: 24px;
		position: relative;
		top: 4px;
	}
	
	.grade-title span {
		display: inline-block;
		font-family: "microsoft yahei";
		font-size: 18px;
		width: 80px;
		margin-right: 45px;
	}
	
	.grade-picker {
		float: left;
	}
	
	.grade-picker li {
		width: 90px;
		float: left;
		padding-right: 30px;
		line-height: 35px;
		font-size: 18px;
	}
	
	.onPro-head-grade li:hover {
		color: #0090ff;
		cursor: pointer;
	}
	
	.grade-content {
		float: left;
		margin-left: 287px;
		clear: both;
	}
	
	.grade-content li {
		width: 90px;
		float: left;
		padding-right: 30px;
		line-height: 35px;
		font-size: 18px;
	}
	
	.onPro-head-a-h {
		clear: both;
		font-size: 18px;
		margin-left: 134px;
		float: left;
	}
	
	.onPro-head-a-h img {
		width: 24px;
		height: 24px;
		position: relative;
		top: 4px;
	}
	.title-content {
		width: 800px;
		height: 100px;
		background-color: #E3E3E3;
		float: left;
		margin: 10px 0px 14px 52px;
	}
</style>