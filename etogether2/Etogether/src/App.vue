<template>
	<div id="app">
		<head-tab></head-tab>
		<div :style="{minHeight: minHeight + 'px'} " class="wholePage">
			<router-view v-if="isRouterAlive" />
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import headTab from '../src/components/common/headTab'
	import slideShow from '../src/components/common/slideShow'
	import bottom from '../src/components/common/bottom'
	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				minHeight: 0,
				isRouterAlive: true
			}
		},
		mounted() {
			this.minHeight = document.documentElement.clientHeight - 133;
			var that = this;
			window.onresize = function() {
				that.minHeight = document.documentElement.clientHeight - 133;
			}
		},
		components: {
			headTab,
			slideShow,
			bottom
		},
		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	a {
		cursor: pointer;
		text-decoration: none;
		color: #000000;
	}
	
	button {
		cursor: pointer;
	}
	
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}
	
	.wholePage {
		/* box-sizing: border-box;
  padding: 0 160px; */
		width: 1100px;
		margin: 0 auto;
	}
	
	.slideShow .el-carousel {
		border-radius: 10px;
		overflow: hidden;
	}
	
	.slideShow .el-carousel__arrow {
		border-radius: 0;
		height: 66px;
	}
	
	.slideShow .el-carousel__arrow:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.slideShow .el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}
	
	.element::-webkit-scrollbar {
		width: 0px
	}
	
	.test .el-radio__inner {
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
	
	.testRegister .el-form {
		float: left;
		/*margin-left: -30px;*/
	}
	
	.testRegister .el-input__inner {
		height: 25px;
		width: 150px;
	}
	
	.testRegister .personalInfoDOWN .el-input__inner {
		height: 25px;
		width: 100%;
	}
	
	.testRegister .el-input {
		line-height: 30px;
	}
	
	.testRegister .identityDetail .el-input {
		width: 150px;
	}
	
	.testRegister .personalInfoDOWN .el-input {
		width: 60%;
	}
	
	.testRegister .el-form-item {
		margin-bottom: 16px;
		height: 30px;
	}
	
	.testRegister .el-form-item__label {
		width: 80px!important;
		padding-right: 8px;
	}
	
	.testRegister .el-input__icon {
		line-height: 30px;
	}
	
	.testRegister .el-form-item__content {
		margin-left: 80px!important;
	}
	
	.testRegister .el-form-item__error {
		padding-top: 0;
		font-size: 8px;
	}
	
	.specialRegist .basicalInfo .el-form {
		float: left;
		width: 40%;
		padding: 15px;
	}
	
	.specialRegist .basicalInfo .el-input {
		height: 32px;
		width: 100%;
	}
	
	.specialRegist .basicalInfo .el-input__inner {
		height: 32px;
		width: 150px;
	}
	
	.specialRegist .basicalInfo .el-form-item {
		margin-bottom: 10px;
	}
	
	.specialRegist .teacherInfo .el-form {
		float: left;
		width: 40%;
		padding: 15px;
	}
	
	.specialRegist .teacherInfo .el-input {
		height: 25px;
		width: 100%;
	}
	
	.specialRegist .teacherInfo .el-input__inner {
		height: 25px;
		width: 150px;
	}
	
	.specialRegist .teacherInfo .el-form-item {
		margin-bottom: 10px;
	}
	
	.specialRegist .produInfo .el-form {
		float: left;
		width: 40%;
		padding: 15px;
	}
	
	.specialRegist .produInfo .el-input {
		height: 25px;
		width: 100%;
	}
	
	.specialRegist .produInfo .el-input__inner {
		height: 25px;
		width: 150px;
	}
	
	.specialRegist .produInfo .el-form-item {
		margin-bottom: 10px;
	}
	
	.specialRegist .el-form-item__label {
		text-align: left;
	}
	.isChecked .el-radio__inner {
		border-color: #409EFF;
		background: #409EFF;
	}
	
	.el-radio__input.isChecked .el-radio__inner::after {
		transform: translate(-50%, -50%) scale(1);
	}
	
	.el-pager li {
		width: 45px;
		height: 45px;
		font-size: 16px;
		line-height: 45px;
		font-weight: lighter;
		border: 1px solid silver;
		border-radius: 5px !important;
		background-color: #fff;
	}
	
	.el-pager li.active+li {
		border-left: 1px solid silver;
		background-color: #00b7ee;
	}
	
	.el-pager li.active {
		border: none;
	}
	
	.el-pagination.is-background .btn-next,
	.el-pagination.is-background .btn-prev,
	.el-pagination.is-background .el-pager li {
		background-color: #fff;
	}
	
	.onProDetail .ace-clouds {
		border-radius: 10px;
		margin-right: 20px;
		padding-top: 10px;
	}
	
	.onProDetail .ace_gutter {
		background: none!important;
	}
	
	.onProgramming .el-carousel__indicator {
		display: none;
	}
	
	.onProDetail .ace_line {
		/*height:25px!important;*/
	}
	
	.onProDetail .ace_active-line {
		/*height:25px!important;*/
	}
	
	.onProDetail .ace_gutter-cell {
		/*height:23px!important;*/
	}
	
	.onProDetail .ace_gutter-active-line {
		/*height:25px!important;*/
	}
	
	.homePage .el-carousel__container {
		height: 325px;
	}
	
	.homePage .el-carousel__indicator {
		display: none;
	}
</style>