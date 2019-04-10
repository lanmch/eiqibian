<template>
	<div class="all">
		<slide-show></slide-show>    	
	    <div class="scoreInquiry" v-if = 'show'>
	            <div class="scoreInquiry-title">E启编官方成绩查询</div>
	            <div class="scoreInquiry-content">
	                <div :class="{ scoreInquiryInput:whichBorder1,'scoreInquiry-input-dark':!whichBorder1}">
	                    <!--<img src="../../../../static/logoAll/scoreInquiry/name.png" />-->
	                    <input v-model='myname' @click="changeBorder1" type="text" placeholder="姓名"/>
	                </div>
	                <div :class="{ scoreInquiryInput:whichBorder2,'scoreInquiry-input-dark':!whichBorder2}">
	                    <!--<img src="../../../../static/logoAll/scoreInquiry/identity.png" />-->
	                    <input v-model='id' @click="changeBorder2" type="text" placeholder="身份证号码"/>
	                </div>
	                <div class="button" @click="inquiryScore">查询成绩</div>
	            </div> 
	    </div>
	    
	    <div class="scoreResult" v-if = '!show'>
	    	<ul>
		        <li v-for = 'item in scoreResult' class="resultContent box-shadow">
		        	<!--<img :src="item.headPic" alt="加载失败"/>-->
		        	<img src="../../../../static/logoAll/register/all.png"/>
		        	<ul>
			            <li><span>姓名：</span>{{item.userRealName}}</li>
			            <li><span>赛事名称：</span>{{item.contestName}}</li>	            
						<li><span>学校：</span>{{item.school}}</li>	  
			            <li><span>赛事时间：</span>{{item.contestTime}}</li>
			           	<li><span>身份证：</span>{{item.userIdentity}}</li> 
			           	<li><span>赛事成绩：</span>{{item.score}}</li>
			        </ul>
		        </li>
	    	</ul>
	    </div>
	</div>
</template>
<script>
	import slideShow from '../../common/slideShow'
	import axios from 'axios'
	export default {
		name: 'scoreInquiry',
		data() {
			return {
				show: true,
				myname: '',
				whichBorder1: '',
				whichBorder2: '',
				id: '',
				scoreResult: [],
				visible: false
			}
		},
		components: {
			slideShow
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
			changeBorder1() {
				var that = this;
				that.whichBorder1 = false;
				that.whichBorder2 = true;
			},
			changeBorder2() {
				var that = this;
				that.whichBorder2 = false;
				that.whichBorder1 = true;
			},
			inquiryScore() {
				axios.post(this.GLOBAL.urlHead + '/user/queryGrade', {
						userName: this.myname,
						userIdentity: this.id
					})
					.then(res => {
						if (res.data.code == 100001) {
							this.show = !this.show
							this.scoreResult = res.data.data.gradeList;
						} else {
							this.$alert('输入错误或用户未参加考试', '查询错误', {
					          confirmButtonText: '确定',
//					          callback: action => {
//					          }
					        });
						}
					})
			}
		}
	}
</script>
<style scoped>
*{
	font-family: "microsoft yahei"
}
.all{
	min-height: 65vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
	.scoreInquiry {
		width: 400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		background-color: #8aedfe;
		
		align-items: center;
		height: 300px;
		margin-bottom: 20px;
		border-radius: 10px;
	}
	
	.scoreInquiry-title {
		height: 60px;
		font-weight: bold;
		font-size: 18px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}
	
	.scoreInquiry-content {
		height: 200px;
		background-color: #fff;
		border-radius: 0 0 3px 3px;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		padding: 20px 0;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
	}
	
	.scoreInquiryInput {
		border: 1px solid #8aedfe;
		height: 50px;
		padding: 0 5px;
		display: flex;
		align-items: center;
		width: 280px;
		border-radius: 5px;
	}
	
	.scoreInquiry-input-dark {
		border: 1px solid #0099ff;
		height: 50px;
		padding: 0 5px;
		display: flex;
		align-items: center;
			width: 280px;
	border-radius: 5px;
	}
	
	.scoreInquiry-content img {
		
		border-radius: 50%;
		width: 36px;
	}
	
	.scoreInquiry input {
		width: 300px;
		height: 30px;
		border: none;
		margin-left: 10px;
		outline: none;
	}
	
	.scoreInquiry .button {
		height: 44px;
		/*background: -webkit-linear-gradient(#00b7ee, #00f2fe);
		background: -o-linear-gradient(#00b7ee, #00f2fe); 
		background: -moz-linear-gradient(#00b7ee, #00f2fe);
		background: linear-gradient(#00b7ee, #00f2fe); */
		background-color:  #8aedfe;
		border-radius: 5px;
		
		width: 250px;
		text-align: center;
		color: #fff;
		line-height: 44px;
		font-size: 18px;
		text-decoration: none;
	}
	
	a:-webkit-any-link {
		text-decoration: none;
	}
	
	.box-shadow {
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
	}
	
	.scoreResult {}
	
	.scoreResult .resultContent {
		width: 80%;
		height: 200px;
		margin: 50px auto;
		border: 1px solid #25CCFF;
		border-radius: 10px;
	}
	
	.resultContent img {
		width: 120px;
		/*height: 150px;*/
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
	
	.resultContent li:nth-child(even) {
		float: left;
		font-size: 16px;
		color: #666666;
		margin-bottom: 30px;
		width: 340px;
	}
	.resultContent li:nth-child(odd) {
		float: left;
		font-size: 16px;
		color: #666666;
		margin-bottom: 30px;
		width: 280px;
	}
</style>