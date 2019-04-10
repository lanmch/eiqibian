<template>
	<!-- hello world -->							   		 
	<div class="LoginIdentity">
		<div class="title">
			<div class="identity">
				<div class="loginNum obvious">
					1
				</div>
				<span>身份认证</span>
			</div>
			<div class="info">
				<div class="loginNum Dim">
					2
				</div>
				<span>完善信息</span>
			</div>
		</div>
	<div class="content">
		<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="姓名" prop="name">
				<el-input type="" v-model="ruleForm.name" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="性别" prop="sex">
				<el-radio type="" v-model="ruleForm.sex" label="男">男</el-radio>
				<el-radio type="" v-model="ruleForm.sex" label="女">女</el-radio>
			</el-form-item>
			
			<el-form-item label="电话" prop="tel">
				<el-input type="" v-model.number="ruleForm.tel" autocomplete="off"></el-input>
				<el-button v-show="show" style='background-color:#ffcc33;border:none;' type="warning" size="small" autocomplete="off" @click="getTelCode">获取验证码</el-button>
				<el-button v-show="show1" class="count" type="info" size="small" autocomplete="off" disabled>{{count}}s后获取</el-button>
				<el-button v-show="show2" class="count" type="info" size="small" autocomplete="off" disabled>获取验证码</el-button>
			</el-form-item>
			
			<el-form-item label="验证码" prop="code">
				<el-input type="" v-model="ruleForm.code" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass"  autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass"  autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="用户名" prop="userName">
				<el-input type="" v-model="ruleForm.userName" @blur="checkNickname" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label='出生日期' prop="birth">
        		<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.birth"></el-date-picker>
     		</el-form-item>
			
			<el-form-item label='邮箱' prop="email">
        		<el-input type="" placeholder="" v-model="ruleForm.email"></el-input>
     		</el-form-item>
		</el-form>
	</div>
	
		<div class="chooseId">
			<span ><el-button style="background-color:#00b7ee;border: none;" type="primary" @click="submitForm('stu')">我是学生</el-button></span>
			<span ><el-button style="background-color:#00b7ee;border: none;" type="primary" @click="submitForm('tea')">我是教师</el-button></span>
		</div>
		
	</div>
</template>

<script>
	import Element from 'element-ui'
	import axios from 'axios'
	import bus from '../../../assets/js/eventBus.js'
	import secret from '../../../assets/js/secret.js'
	var rigisterErr = false; // 注册信息无误
//	var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB-----END PUBLIC KEY-----'
		// 从后台获取公钥，这里省略，直接赋值
//	var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLX0AbjikcI61q2XfkFK6XR4TraRc1nbjF7tPqMj28eyGvZY/PxWvkql/on37wk5+gX66u1Ia9ln4gB8qE60w/1ifqfgYiKGnowguxcBPwIDREnTS5aUEr15s+xWMHgoPCqOSPgtcaEp3m/D5+7y8CfOf1q7hjI3kSBaxRl7F92QIDAQAB-----END PUBLIC KEY-----'
	var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvcoUn7sNSA7MSCl5OuytofiL5bnPkY5x52qmLKy6tsAgG0qMByAtnXhEahwHSldyGhNL5CHzhCRsJ1vpSVM3whURH8BQ8INyHTwiLKfvpgHk2BZuXDZQcyT+vpsWeewYDY9UFJvC+VzdBvqYOYvc5ZHJ7WMKwv0G1kXd+Rw2UcwIDAQAB-----END PUBLIC KEY-----'
//	var privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQABAoGBAIO8JwEedHlE4FBovBsT4Bl+gmhu2NxC1NlpBq3jkDSd+3RQZlLvp6IJgwo8l13lxWv8kVF3tVkzxTW1sQJjz0RYShH8vXLl94gf6mFkJbeOPP6uA0mGDG81yINwKUpE0RM6ZM9yKEeVdK3u67TkEBcC6Td5KBl8Yof3q7qxiOWhAkEA4BXEtpnfhgm37s1VjDxdIHTtWL1PihMT+SCOqp+Vv27ABVrxtDW/w2R3ZzR5ezROI2v1DVhj5wvsxPGXx6OpSQJBANetVvazS/5SQNvb+Cmjw9Rt5NilyxfX5IsSswaIojbwhZY2FVZyAlFH9K/YS2FYFyU7iIqN6IIkOxXpOcj/bV0CQQCRYM4MgWuotClmfkSgBJGOew144uj1dUch+2NTgtFOLvXZA5WICs7sXwOwKzUdH2QKSwHitJOr0+q6ItsLpDwxAkBXzvDK+/CCmIZjfMkqWsxN3nf/ZHCtQm5/2Jsem94/M+mPYHGLgltDMGKEfTEjbrPtqrFKh8ATzCBqKUwncybZAkEAmVNW1dftWWoriZZXXMvfFkTDgYvRmytoVEThhnd0J/AOhZiUAs9+kHfGKivlTE209AY6Bw8aRzuTCziSwQhhBQ==-----END RSA PRIVATE KEY-----'
//	var privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAK9yhSfuw1IDsxIKXk67K2h+Ivluc+RjnHnaqYsrLq2wCAbSowHIC2deERqHAdKV3IaE0vkIfOEJGwnW+lJUzfCFREfwFDwg3IdPCIsp++mAeTYFm5cNlBzJP6+mxZ57BgNj1QUm8L5XN0G+pg5i9zlkcntYwrC/QbWRd35HDZRzAgMBAAECgYB24to6Ef/Gvn0EV4RKQ2iJuReIAAGGHL22kKZciJlr1qHJxcfxeBXKKKLcX+mrQiOZ/71aRRciAmKRC1y6l36oQnlJVRpqIM18dfLJvZXXaAli3NAu+VaWjZf25au19JhpGXvkz8t1stW4XxoTuTSckgDskSo+1HYr9HbTgR75UQJBAN9LFTP74Xb1SjLuw5M5eldT7gvodIx44+/6wc+4Ds8+AOLnHEZyZJpkl8RSgYcIO8HUABhlfyyp0BxiMwrecxsCQQDJJVa8+QoeljLPyxVJqou4IEoizovyhApVR7F4MuOefGudq/GVUN1yBlwU9Mr0J4rx7PCqCq3h0PI181iquqGJAkB74GWk70oH+tDtLLTnim2q4O8hQBbYj4C09AJtwIjGxHktaFWxZ2kUllX0HmmphhHQ2FItNrG1D4hbFseGch6dAkEAqlfpvf21+TM/8sPM0mcRDiyiPBnpYMc7rP8bJ20JYPWDebLc05P5BZCnOMQagGxgegMryQVkPmHiTZg5FdUZ6QJBAMLjxncpvZeD2h25hbYaTs61EeHKFC28f+uDp2piOFVAoVufnwuHn7nhVBaVrgVupvl+TljsHdsQSsz6zRgBYYE=-----END RSA PRIVATE KEY-----'
	export default {
		name: 'LoginIdentity',
		data() {
			//验证电话规则
			var checkTel = (rule, value, callback) => {
								var jse = new JSEncrypt() // 新建JSEncrypt对象
								jse.setPublicKey(publicKey) // 设置公钥
								var rsaTel = jse.encrypt(String(this.ruleForm.tel)); // 对密码进行加密
//								console.log('加密后' + rsaTel)							
//								jse.setPrivateKey(privateKey)
//								var Tel = jse.decrypt(rsaTel)
//								console.log('解密后' + Tel)
					
				if (!value) {
					return callback(new Error('不能为空'));
					this.show = false;
					this.show1 = false;
					this.show2 = true;
				}
				if (!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
					this.show = false;
					this.show1 = false;
					this.show2 = true;
				} else {
					const mobile = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
					if (!mobile.test(value)) {
						callback(new Error('请输入正确格式'));
						this.show = false;
						this.show1 = false;
						this.show2 = true;
					} else {
						axios.get(this.GLOBAL.urlHead + '/user/checkPhone', {
							params: {
								phone: this.ruleForm.tel
							}
						}).then(res => {

							if (res.data.code != 100001) {
								callback(new Error(res.data.msg));
								this.show = false;
								this.show1 = false;
								this.show2 = true;
							} else {
								callback();
								this.show = true;
								this.show1 = false;
								this.show2 = false;
							}
						})
					}
				}
			};
			var checkUserName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					axios.get(this.GLOBAL.urlHead + '/user/checkNickname', {
						params: {
							nickname: this.ruleForm.userName
						}
					}).then(res => {
						if (res.data.code != 100001) {
							callback(new Error(res.data.msg));
						}
						callback();
					})
				}
			};
			//验证密码规则
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					let jse = new JSEncrypt() // 新建JSEncrypt对象
					jse.setPublicKey(publicKey) // 设置公钥
					let rsaPwd = jse.encrypt(this.ruleForm.pass); // 对密码进行加密

					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			//			alert(rsaPassWord)
			return {
				labelPosition: 'right',
				show: false,
				show1: false,
				show2: true,
				count: '',
				timer: null,
				ruleForm: {
					name: '',
					sex: '',
					tel: '',
					code: '',
					pass: '',
					checkPass: '',
					userName: '',
					birth: '',
					email: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, {
						max: 10
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
					userName: [{
						validator: checkUserName,
						trigger: 'blur'
					}, {
						max: 10
					}],
					birth: [{
						required: true,
						message: '请选择日期',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}, {
						min: 6,
						message: '至少为6个字符',
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}, {
						min: 6,
						message: '至少为6个字符',
						trigger: 'blur'
					}],
					tel: [{
						validator: checkTel,
						trigger: ['blur', 'change', 'manual']
					}],
					email: [{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'blur'
					}, {
						type: 'email',
						message: '请输入正确的邮箱地址',
						trigger: ['blur', 'change']
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				if(this.ruleForm.name == '' || this.ruleForm.sex == '' || this.ruleForm.tel == '' || this.ruleForm.code == '' || this.ruleForm.pass == '' || this.ruleForm.checkPass =='' || this.ruleForm.userName == '' || this.ruleForm.birth == '' ||this.ruleForm.email == '' ){
					this.$alert('请将注册信息补充完整', '提示', {
								confirmButtonText: '确定',
								callback: action => {
						           
						        }
							});
				}else{
					bus.$emit('userRegisterInfo', this.ruleForm);
						var regisData = this.ruleForm;
				
						if (formName == 'stu') {
							this.$router.push({
								name: 'registerStu',
								params: {
									regisData: regisData
								}
							})
						} else {
							this.$router.push({
								name: 'registerTea',
								params: {
									regisData: regisData
								}
							})
						}
				}
				
//				this.$refs[formName].validate((valid) => {
//					if (valid) {
//						bus.$emit('userRegisterInfo', this.ruleForm);
//						var regisData = this.ruleForm;
//						console.log(formName)
//						if (formName == 'stu') {
//							this.$router.push({
//								name: 'registerStu',
//								params: {
//									regisData: regisData
//								}
//							})
//						} else {
//							this.$router.push({
//								name: 'registerTea',
//								params: {
//									regisData: regisData
//								}
//							})
//						}
//					} else {
//						return false;
//					}
//				})
			},
			getTelCode() {
				if (!this.timer) {
					const TIME_COUNT = 60;
					this.count = TIME_COUNT;
					this.timer = setInterval(() => {
						if (this.count > 1 && this.count <= TIME_COUNT) {
							this.show = false;
							this.show1 = true;
							this.show2 = false;
							this.count--;
						} else {
							this.show = true;
							this.show1 = false;
							this.show2 = false;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
				axios.get(this.GLOBAL.urlHead + '/user/checkPhone', {
					params: {
						phone: this.ruleForm.tel
					}
				}).then(res => {
					if (res.data.code != 100001) {
						rigisterErr = true;
					} else {
						axios.get(this.GLOBAL.urlHead + '/user/sendSms', {
							params: {
								phone: this.ruleForm.tel
							}
						}).then(res => {
							//alert('验证码已发送，请注意查收!')
						})
					}
				})
			},
			checkNickname() {
				axios.get(this.GLOBAL.urlHead + '/user/checkNickname', {
					params: {
						nickname: this.ruleForm.userName
					}
				}).then(res => {
					if (res.data.code != 100001) {
						rigisterErr = true; // 用户名有误
					}
				})
			}
		},
		mounted() {
//			const s = document.createElement('script');
//			s.type = 'text/javascript';
//			s.src = '../../../assets/js/aes.js';
//			document.body.appendChild(s);
//			
//			var yuan = '17784450792'
//			var mi = secret.Encrypt(yuan.toString(2))
//			console.log(mi)
//			var je = secret.Decrypt('8KOsgUCGx9k+CN2/nRNPAw==')
//			console.log(je)
//			var key = CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM");
//
//		    var plaintText = 'ABCDEFGH'; // 明文
//		
//		    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
//		        mode: CryptoJS.mode.ECB,
//		        padding: CryptoJS.pad.Pkcs7
//		    });
//		
//		    console.log("加密前："+plaintText);
//		    console.log("加密后："+encryptedData);
//		
//		    encryptedData = encryptedData.ciphertext.toString();
//		
//		    var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
//		    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//		
//		    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
//		        mode: CryptoJS.mode.ECB,
//		        padding: CryptoJS.pad.Pkcs7
//		    });
//		
//		    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
//		
//		    console.log("解密后:"+decryptedStr);
//		
//		    
//		     var pwd = "PCsUFtgog9/qpqmqXsuCRQ==";
//		    //加密服务端返回的数据
//		    var decryptedData = CryptoJS.AES.decrypt(pwd, key, {
//		        mode: CryptoJS.mode.ECB,
//		        padding: CryptoJS.pad.Pkcs7
//		    });
//		    
//		    console.log("解密服务端返回的数据:"+decryptedStr);
			
		}
	}
</script>
<style scoped>
	a {
		text-decoration: none
	}
	
	li {
		list-style: none;
	}
	
	.LoginIdentity {
		margin: 0px auto;
		margin-top: 40px;
		margin-bottom: 25px;
		width: 45%;
	}
	
	.LoginIdentity .title {
		display: flex;
		justify-content: space-between;
	}
	
	.obvious {
		background-color: #00b7ee!important;
	}
	
	.Dim {
		border: 1px solid #00b7ee;
		color: #00b7ee!important;
		
	}
	
	.identity,
	.info {
		height: 55px;
	}
	
	.identity span,
	.info span {
		display: inline-block;
		font-family: "microsoft yahei";
		/*font-weight: bold;*/
		font-size: 22px;
		height: 45px;
		line-height: 45px;
		margin-left: 13px;
	}
	
	.loginNum {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		line-height: 45px;
		color: #FFFFFF;
		font-family: "microsoft yahei";
		text-align: center;
		float: left;
	}
	
	.LoginIdentity .content {
		clear: both;
		margin-left: 60px;
		margin-top: 20px;
	}
	
	.LoginIdentity .content span {
		width: 100px;
		font-family: "microsoft yahei";
		font-size: 22px;
		display: inline-block;
		vertical-align: middle;
		margin-right: 30px;
	}
	
	.LoginIdentity .content .el-input {
		display: inline-block;
		width: 60%;
	}
	
	.LoginIdentity .content .el-radio+.el-radio {
		margin-left: 60px;
	}
	
	.LoginIdentity .content li {
		margin-bottom: 20px;
	}
	
	.chooseId {
		display: flex;
		justify-content: space-between;
		margin: 0 110px;
	}
	
	.chooseId a {
		display: inline-block;
	}
</style>