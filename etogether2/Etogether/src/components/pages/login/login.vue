<template>
	<div class="whole">
    <div class="login">
        <div class="scoreInquiry-title">E启编账号登录</div>
            <div class="scoreInquiry-content">
                <div :class="{ scoreInquiryInput:whichBorder1,'scoreInquiry-input-dark':!whichBorder1}">
                    <!--<img src="../../../../static/logoAll/login/idnum.png" />-->
                    <input @click="changeBorder1" type="text" placeholder="账号" v-model="account"/>
                </div>
                <div :class="{ scoreInquiryInput:whichBorder2,'scoreInquiry-input-dark':!whichBorder2}">
                    <!--<img src="../../../../static/logoAll/login/passwd.png" />-->
                    <input @click="changeBorder2" @keyup.13="loginOK" type="password" placeholder="密码" v-model="passwd"/>
                </div>
                <!-- <router-link to="/"><div class="button" @click="loginOK">点击进入</div></router-link> -->
                <div class="button" @click="loginOK">点击进入</div>
                <!--<div class="registerNew">
                    <div class="forget">忘记密码？</div>
                    <router-link to="/register"><div class="regisNow">立即注册</div></router-link>
                </div>-->
            </div>
    </div>
    
    </div>
</template>
<script>
	import axios from 'axios';
	//!important
	axios.defaults.withCredentials = true
	import { MessageBox } from 'element-ui';
	let publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvcoUn7sNSA7MSCl5OuytofiL5bnPkY5x52qmLKy6tsAgG0qMByAtnXhEahwHSldyGhNL5CHzhCRsJ1vpSVM3whURH8BQ8INyHTwiLKfvpgHk2BZuXDZQcyT+vpsWeewYDY9UFJvC+VzdBvqYOYvc5ZHJ7WMKwv0G1kXd+Rw2UcwIDAQAB-----END PUBLIC KEY-----'
	export default {
		name: 'login',
		data() {
			return {
				whichBorder1: true,
				whichBorder2: true,
				account: '',
				passwd: ''
			}
		},
		mounted() {
			this.account = '';
			this.passwd = '';
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
			loginOK() {
				var that = this;
				//边框css改变
				that.whichBorder2 = true;
				that.whichBorder1 = true;
				//登录
				var userType = '' //注册的时候请设置昵称长度一定不能是11位
				if (this.account.length == 11) {
					userType = 'phone'
				} else {
					userType = 'nickname'
				}
				let url = this.GLOBAL.urlHead + '/user/login'
				var jse = new JSEncrypt() // 新建JSEncrypt对象
				jse.setPublicKey(publicKey) // 设置公钥
				var rsaAcd = jse.encrypt(String(this.account)); // 对账户进行加密
				var rsaPsd = jse.encrypt(String(this.passwd)); // 对密码进行加密
				var rsaUserType = jse.encrypt(String(userType));// 对类型进行加密
				axios.post(url, {
//						account: rsaAcd,
//						password: rsaPsd,
//						type: rsaUserType
						account: this.account,
						password: this.passwd,
						type: userType
					})
					.then(res => {
						console.log(res)
						if (res.data.code == 100001) {
							this.GLOBAL.userId = res.data.data.userId;
							localStorage.setItem('account', this.account);
							localStorage.setItem('passwd', this.passwd);
							localStorage.setItem('userType', userType);
							localStorage.setItem('userId', res.data.data.userId);
							this.GLOBAL.ifLogin = true;
							localStorage.setItem('ifLogin', this.GLOBAL.ifLogin);
							//                  alert('登录成功！');
							this.$alert('登录成功！', '登录消息', {
								confirmButtonText: '确定',
								callback: action => {
						           that.$router.replace('/');
								   that.$router.go(0);
						        }
							});
						} else if (res.data.code == 200007) {
							//                  alert('账号密码有误！请重新输入')
							this.$alert('账号密码有误！请重新输入', '登录消息', {
								confirmButtonText: '确定',
							});
						} else if (res.data.code == 400004) {
							//                  alert('请输入账号密码！')
							this.$alert('请输入账号密码！', '登录消息', {
								confirmButtonText: '确定',
							});
						} else {
							//                  alert(res.data.msg)
							this.$alert(res.data.msg, '登录消息', {
								confirmButtonText: '确定',
							});
						}
					})
			},
		}
	}
</script>
<style scoped>
	* {
		font-family: "microsoft yahei";
	}
	
	.whole {
		margin-top: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 600px;
	}
	
	.forget {
		font-size: 14px;
		color: #25ccff;
	}
	
	.regisNow {
		font-size: 14px;
		color: #999;
	}
	
	.registerNew {
		width: 320px;
		display: flex;
		justify-content: space-between;
	}
	
	.login {
		border-radius: 10px;
		width: 400px;
		margin: 0 auto;
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		background-color: #00b7ee;
		align-items: center;
		height: 320px;
	}
	
	.scoreInquiry-title {
		height: 60px;
		font-size: 24px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}
	
	.scoreInquiry-content {
		height: 246px;
		background-color: #fff;
		border-radius: 3px;
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
		border: 2px solid #8aedfe;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		width: 270px;
		border-radius: 5px;
	}
	
	.scoreInquiry-input-dark {
		border: 2px solid #0099ff;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		width: 270px;
		border-radius: 5px;
	}
	
	.scoreInquiry-content img {
		background-color: #99ccff;
		border-radius: 50%;
		width: 36px;
	}
	
	.login input {
		width: 300px;
		height: 30px;
		border: none;
		margin-left: 10px;
		outline: none;
	}
	
	.login .button {
		height: 44px;
		background: -webkit-linear-gradient(#00b7ee, #00f2fe);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#00b7ee, #00f2fe);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#00b7ee, #00f2fe);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(#00b7ee, #00f2fe);
		/* 标准的语法 */
		border-radius: 5px;
		width: 200px;
		text-align: center;
		color: #fff;
		line-height: 44px;
		font-size: 18px;
		text-decoration: none;
		cursor: pointer;
	}
	
	a:-webkit-any-link {
		text-decoration: none;
	}
</style>