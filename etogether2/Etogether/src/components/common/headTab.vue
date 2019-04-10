<template>
    <div class="headTab">
        <div class="headTabAll">
            <!-- <div class="siteName"> -->
                <img class="logo" src='../../../static/logoAll/common/LOGO.png'/>
            <!-- </div> -->
            <ul class="tabMainItem">
                <router-link to="/"><li>首页</li></router-link>
                <router-link to="/billZone"><li>赛事专区</li></router-link>
                <router-link to="/scoreInquiry"><li>成绩查询</li></router-link>
                <router-link to="/onProgramming"><li>在线编程</li></router-link>
                <router-link to="/courseCenter"><li>课程中心</li></router-link>
                <router-link to="/downloadCenter"><li>下载中心</li></router-link>
            </ul>            
            <ul class="rANDl" v-if="!ifLogin">
                <router-link to="/register"><img src="../../../static/logoAll/common/regist.png"/><li>注册</li></router-link>
                <router-link to="/login"><img src="../../../static/logoAll/common/login.png"/><li>登录</li></router-link>
            </ul>
            <div class="hiUser" v-else><router-link to="/personalInfo"><span>Hi {{userName}}!</span></router-link><span class="zhuxiao" @click="cancel">注销</span></div>
            <!-- <div class="hiUser" v-else><router-link to="/personalInfo">Hi nicerWu</router-link></div> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import bus from '../../assets/js/eventBus.js'
export default {
    name: 'headTab',
    data() {
        return{
            ifLogin: JSON.parse(localStorage.getItem('ifLogin')),
            userName: ''
        }
    },
    mounted(){
        var that = this;
        
        that.ifLogin = JSON.parse(localStorage.getItem('ifLogin'));
        
        if(that.ifLogin){
        	let account = localStorage.getItem('account');
			let passwd = localStorage.getItem('passwd');
			let userType = localStorage.getItem('userType')
        	axios.post(this.GLOBAL.urlHead + '/user/login',{
        		account: account,
				password: passwd,
				type: userType
        	}).then(res=>{
        		axios.get(this.GLOBAL.urlHead+'/user/userDetail',{
	                params:{
	                    userId: localStorage.getItem('userId')
	                }
	            }).then(res=>{

	                that.userName = res.data.data.user.userRealname
	            })
        	})
        	
            
        }
    },
    methods:{
        cancel(){
            var account = '';
            var passwd = '';
            localStorage.setItem('account',account);
            localStorage.setItem('passwd',passwd);
            this.GLOBAL.ifLogin = false;
            localStorage.setItem('ifLogin',this.GLOBAL.ifLogin);
//          alert('注销成功！');
			this.$alert('注销成功!', '注销消息', {
				confirmButtonText: '确定',
				callback: action=>{
					this.$router.replace('/');
            		this.$router.go(0);
				}
			});
        }
    }
}
</script>
<style scoped>
.zhuxiao{
    font-size: 12px;
    margin-left: 10px;
    color: #000;
    cursor: pointer;
    
}
.hiUser{
    width: 127px;
    text-align: right;
}

.hiUser span {
	color: #FFFFFF;
}
a:-webkit-any-link{
    color: #000;
    text-decoration: none;
}
.rANDl li:hover{
    color: #fff;
    font-weight: bold;
}
.rANDl li{
    font-size: 14px;
    color: white;
    padding-left: 5px;
}
.rANDl img{
    width: 18px;
    vertical-align: middle;
    margin-left: 10px;
}
ul{
    list-style: none;
}
ul li{
    display: inline-block;
}
.headTab{
	font-family: "microsoft yahei";
    height: 50px;
    width: 100%;
    line-height: 50px;
    background: -webkit-linear-gradient(#00b7ee, #00f2fe); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(#00b7ee, #00f2fe); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(#00b7ee, #00f2fe); /* Firefox 3.6 - 15 */
	background: linear-gradient(#00b7ee, #00f2fe); /* 标准的语法 */
}
.headTabAll{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    width: 1100px;
}
.logo{
    height: 100px;
    vertical-align: middle;
    margin-top: -20px;
}
.siteName{
	width: 100px;
	height: 100px;
    background: url(../../../static/logoAll/common/LOGO.png) no-repeat; 
    background-size: 100% 100%;
    position: relative; 
   	bottom: 20px;
   
}

.tabMainItem li{
    padding: 0 25px;
    height: 43px;
    line-height: 44px;
    color: white;
}
.tabMainItem li:hover{
    font-weight: bold;
    border-bottom: 5px solid rgb(0,153,255);
    color: #fff;
    font-family: "microsoft yahei";
}
</style>
