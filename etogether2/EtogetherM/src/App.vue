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
	import axios from 'axios'
	axios.defaults.withCredentials = true
	import headTab from '../src/components/common/head'
	import bottom from '../src/components/common/bottom'
	export default {
		name: 'App',
		components: {
			headTab,
			bottom
		},
		data() {
			return {
				minHeight: 0,
				isRouterAlive: true
			}
		},
		provide() {
			return {
				reload: this.reload
			}
		},
		mounted() {
			this.minHeight = document.documentElement.clientHeight - 118; //133
			var that = this;
			window.onresize = function() {
				that.minHeight = document.documentElement.clientHeight - 118;
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				})
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	* {
		margin: 0;
		padding: 0;
	}
	
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}
	.companyAdd .el-form {
    float: left;
    width: 40%;
    padding: 15px;
}
	.companyAdd .el-input {
		height: 25px;
		width: 100%;
	}
	.companyAdd .el-input__inner {
		height: 25px;
		width: 150px;
	}
	.companyAdd .el-form-item {
    margin-bottom: 10px;
}

.scoreSearch .el-form {
    float: left;
    padding-top: 15px;
    padding-right: 15px;
}

.scoreSearch .el-input__inner {
		width: 150px;
	}
	
	.scorePick .el-input__inner {
		width: 150px;
	}
</style>