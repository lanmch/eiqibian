<template>
    <div class="scoreResult">
    	<ul>
	        <li v-for = 'item in scoreResult' class="resultContent box-shadow">
	        	<img :src="item.headPic" alt="加载失败"/>
	        	<ul>
		            <li><span>姓名：</span>{{item.name}}</li>
		            <li><span>赛事名称：</span>{{item.eventName}}</li>	            
					<li><span>学校：</span>{{item.school}}</li>	  
		            <li><span>赛事时间：</span>{{item.eventTime}}</li>
		           	<li><span>身份证：</span>{{item.id}}</li> 
		           	<li><span>赛事成绩：</span>{{item.score}}</li>
		        </ul>
	        </li>
    	</ul>
    </div>
</template>
<script>
	import Element from 'element-ui'
	import axios from 'axios'
//	import bus from '../../common/eventBus.js'
	export default {
		name: 'scoreResult',
		data() {
			return {
				scoreResult: []
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
		created() {
			axios.get('http://rap2api.taobao.org/app/mock/94633/second')
				.then(res => {
					this.scoreResult = res.data.scoreResult;
				}),
				bus.$on('increment', function(msg) {
					//获取$emit方法传递的第二个参数
					alert(msg);
					
				})
		}
	}
</script>
<style scoped>
	.box-shadow {
		-moz-box-shadow: 0 5px 15px gray;
		-webkit-box-shadow: 0 5px 15px gray;
		box-shadow: 0 6px 10px gray;
	}
	
	.scoreResult {}
	
	.scoreResult .resultContent {
		width: 80%;
		height: 200px;
		margin: 50px auto;
		border: 1px solid #25CCFF;
	}
	
	.resultContent img {
		width: 120px;
		height: 150px;
		float: left;
		margin: 25px 40px 20px 40px;
	}
	
	.resultContent ul {
		margin: 35px 50px 40px 0;
		height: 150px;
	}
	
	.resultContent span {
		font-size: 18px;
		color: #333333;
		display: inline-block;
		width: 100px;
	}
	
	.resultContent li {
		float: left;
		font-size: 16px;
		color: #666666;
		margin-bottom: 30px;
		width: 310px;
	}
</style>