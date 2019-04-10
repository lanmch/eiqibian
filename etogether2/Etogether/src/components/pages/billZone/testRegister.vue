<template>
<div class="testRegister">
	<div class="titleAll">考试报名信息表</div>
	<div class="personalInfo">
		<div class="title">一、个人信息</div>
		<div class="personalInfoUP">
			<div class="primaryInfo">
				<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="姓名" prop="userName">
						<el-input type="" v-model="ruleForm.userName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="年龄" prop="userAge">
						<el-input type="" v-model.number="ruleForm.userAge" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="userSex">
						<el-radio type="" v-model="ruleForm.userSex" label="true">男</el-radio>
						<el-radio type="" v-model="ruleForm.userSex" label="false">女</el-radio>
					</el-form-item>
				</el-form>
				<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="学校" prop="userSchool">
						<el-input type="" v-model="ruleForm.userSchool" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="年级" prop="userGrade">
						<el-input type="" v-model="ruleForm.userGrade" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="userPhone">
						<el-input type="" v-model.number="ruleForm.userPhone" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<img v-if = "this.sex == '男'" src="../../../../static/logoAll/register/boy.jpg"/>
            <img v-if = "this.sex == '女'" src="../../../../static/logoAll/register/girl.jpg"/>
		</div>
		<div class="personalInfoDOWN">
			<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="身份证号" prop="userIndentity">
					<el-input type="" v-model="ruleForm.userIndentity" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="竞赛项目" prop="contestLable">
					<el-input type="" v-model="ruleForm.contestLable" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
	<div class="identity">
		<div class="title">二、身份认证</div>
		<div class="identityDetail">
			<div style='margin-left: 5px;' class="identityDetailUP" v-if="!this.disableMem">
				<!--<el-radio v-model="ruleForm.member" @click.native.prevent='Mdisabled'>队员</el-radio>-->
				<label tabindex="0" class="el-radio" @click = 'Mdisabled'>
					<span class="el-radio__input"
						:class="{isChecked:disableCap}">
						<span class="el-radio__inner"></span>
						<input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="团队">
					</span>
					<span class="el-radio__label" style="margin-right:-50px ;">队员<!----></span>
				</label>
				<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item prop="teamNameMem">
						<el-input v-model='ruleForm.teamNameMem' placeholder='请输入队伍名称' autocomplete="off"  :disabled="this.disableMem" />
						<!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_5000&sec=1540119004162&di=d5f623f5058ff65c2c04b8fca05ef5e4&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F64%2F72%2F27K58PICFYV_1024.jpg"/>-->
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div style='margin-left: 5px;' class="identityDetailDOWN" v-if='!this.disableCap'>
				<div class="identityDetailDOWN1" style="margin-right:10px;margin-top: 12px;">
					<!--<el-radio v-model="ruleForm.cap" label="团队" @click.native.prevent='Cdisabled'>团队</el-radio>-->
					<label tabindex="0" class="el-radio" @click = 'Cdisabled'>
						<span  class="el-radio__input"
							:class="{isChecked:disableMem}">
							<span class="el-radio__inner">
							</span>
							<input  type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="团队">
						</span>
						<span class="el-radio__label" >团队<!---->
						</span>
					</label>
				</div>
				<div class="identityDetailDOWN1">
					<div style="height:35px;margin-bottom: 30px;">
						<el-form :label-position="labelPosition" style="margin-left: -60px;" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
							<el-form-item prop="teamName">
								<el-input placeholder='请输入队伍名称' :disabled='this.disableCap' v-model="ruleForm.teamName" /></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="identityDetailDOWN11" style="margin-left: -40px;">
						<div style="height:35px;line-height: 40px;color: #606266;">指导教师&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
						<div class="identityDetailDOWN111">
							<!--<span>姓名&nbsp;&nbsp;&nbsp;&nbsp;<input v-model="teacherName"/></span>
							<span>邮箱&nbsp;&nbsp;&nbsp;&nbsp;<input v-model="teacherEmail"/></span>
							<span>联系电话&nbsp;&nbsp;&nbsp;&nbsp;<input style="width:150px;" v-model="teacherPhone"/></span>-->
							<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
								<el-form-item label="姓名" prop="teacherName">
									<el-input :disabled='this.disableCap' type="" v-model="ruleForm.teacherName" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="邮箱" prop="teacherEmail">
									<el-input :disabled='this.disableCap' type="" v-model="ruleForm.teacherEmail" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="电话" prop="teacherPhone">
									<el-input :disabled='this.disableCap' type="" v-model.number="ruleForm.teacherPhone" autocomplete="off"></el-input>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="buttonBottom">
		<el-button type='primary' style="background-color:#00b7ee" @click="submitForm()">立即报名</el-button>
	</div>
</div>
</template>
<script>
	import axios from 'axios'
	import Element from 'element-ui'
	import {
		required,
		minLength,
		maxLength,
		sameAs
	} from 'vuelidate/lib/validators'
	export default {
		name: 'testRegister',
		data() {
			//自定义校验规则
			var checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('年龄不能为空'));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字'));
					} else {
						if (value > 50) {
							callback(new Error('仅适用于50岁以下'));
						} else {
							callback();
						}
					}
				}, 500);
			};
			//验证电话规则
			var checkTel = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空'));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						const mobile = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
						if (!mobile.test(value)) {
							callback(new Error('请输入正确格式'));
						} else {
							callback();
						}
					}
				}, 500);
			};
			//验证身份规则
			var checkId = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空'));
				}
				setTimeout(() => {
					//身份证正则表达式(15位)
					//						const isIDCard1=/^[1-9]d{7}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{3}$/;
					//						//身份证正则表达式(18位)
					//						const isIDCard2=/^[1-9]d{5}[1-9]d{3}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{4}$/;
					const mobile = /^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|30|31)\d{3}[0-9Xx]$/;
					if (!mobile.test(value)) {
						callback(new Error('请输入正确格式'));
					} else {
						callback();
					}
				}, 500);
			};
			var getTeamId = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空'));
				}
				axios.get(this.GLOBAL.urlHead + '/sign/selectTeam', {
					params: {
						teamName: this.ruleForm.teamNameMem
					}
				}).then(res => {
					setTimeout(() => {
						if (res.data.data == '不存在该队伍') {
							callback(new Error('不存在该队伍，请检查是否输入正确！'));
						} else {
							callback();
						}
					}, 500)
				})
			};
			var checkRepeti = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空'));
				}
				axios.get(this.GLOBAL.urlHead + '/sign/checkTeamName', {
					params: {
						teamName: this.ruleForm.teamName
					}
				}).then(res => {
					
					setTimeout(() => {
							if (res.data.data == '队名未被占用（或 队名被占用）') {
								callback(new Error('队名未被占用（或 队名被占用），请检查是否输入正确！'));
							} else {
								callback();
							}
						}, 500)
						//					callback();
				})
			}
			return {
				labelPosition: 'right',
				disableMem: false,
				disableCap: false,
				sex: '',
				ruleForm: {
					userId: 1,
					userName: '',
					userSex: '',
					userPhone: '',
					userSchool: '',
					contestLable: '',
					userAge: '',
					userIndentity: '',
					userGrade: '',
					contestId: '',
					teamName: '',
					teacherName: '',
					teacherEmail: '',
					teacherPhone: '',
					member: '',
					cap: '',
					teamId: 1,
					teamNameMem: ''
				},
				rules: {
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					teacherName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					userAge: [{
						validator: checkAge,
						trigger: 'blur'
					}],
					userSchool: [{
						required: true,
						message: '请输入学校',
						trigger: 'blur'
					}],
					userGrade: [{
						required: true,
						message: '请输入年级',
						trigger: 'blur'
					}],
					userPhone: [{
						validator: checkTel,
						trigger: 'blur'
					}],
					teacherPhone: [{
						validator: checkTel,
						trigger: 'blur'
					}],
					contestLable: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}],
					userIndentity: [{
						validator: checkId,
						trigger: 'blur'
					}],
					teamNameMem: [{
						validator: getTeamId,
						trigger: 'blur'
					}],
					teamName: [{
						validator: checkRepeti,
						trigger: 'blur'
					}],
					teacherEmail: [{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'blur'
					}, {
						type: 'email',
						message: '请输入正确的邮箱地址',
						trigger: ['blur', 'change']
					}]
				}
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
			axios.get(this.GLOBAL.urlHead + '/user/userContests', { //获取加入的比赛
					params: {
						userId: this.userId
					}
				}).then(res => {
					//this.contestId = res.data.data[0].contestId;
				}),
				this.GLOBAL.userId = localStorage.getItem('userId');
			axios.get(this.GLOBAL.urlHead + '/user/userDetail', {
					params: {
						userId: this.GLOBAL.userId
					}
				})
				.then(res => {
					this.sex = res.data.data.user.userSex;
				})
		},
		methods: {
			submitForm() {
				if (this.ruleForm.userSex == true || this.ruleForm.userSex == 'true') {
					this.ruleForm.userSex = '男'
				} else {
					this.ruleForm.userSex = '女'
				}
				if (this.disableCap == false) {
					var USERID = localStorage.getItem('userId')
					axios.post(this.GLOBAL.urlHead + '/sign/signLeader', {
							"userId": Number(USERID),
							"userName": this.ruleForm.userName,
							"userSex": this.ruleForm.userSex,
							"userPhone": String(this.ruleForm.userPhone),
							"userSchool": this.ruleForm.userSchool,
							"contestLable": this.ruleForm.contestLable,
							"userAge": this.ruleForm.userAge,
							"userIndentity": this.ruleForm.userIndentity,
							"userGrade": this.ruleForm.userGrade,
							"contestId": this.$route.params.contestId,
							"teamName": this.ruleForm.teamName,
							"teacherName": this.ruleForm.teacherName,
							"teacherEmail": this.ruleForm.teacherEmail,
							"teacherPhone": String(this.ruleForm.teacherPhone)
						})
						.then(res => {
							console.log(this.ruleForm.teamName)
							if (res.data.code == 100001) {
								this.$alert('报名成功！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										this.$router.go(-1);
									}
								})
							}else {
								this.$alert('报名出错！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										this.$router.go(-1);
									}
								})
							}
						})
				} else {
					var teamId;
					var USERID = localStorage.getItem('userId')
					axios.get(this.GLOBAL.urlHead + '/sign/selectTeam', {
						params: {
							teamName: this.ruleForm.teamNameMem
						}
					}).then(res=>{
						teamId = res.data.data.teamId;
						axios.post(this.GLOBAL.urlHead + '/sign/signMember', {
							"userId": Number(USERID),
							"userName": this.ruleForm.userName,
							"userSex": this.ruleForm.userSex,
							"userPhone": String(this.ruleForm.userPhone),
							"userSchool": this.ruleForm.userSchool,
							"contestLable": this.ruleForm.contestLable,
							"userAge": this.ruleForm.userAge,
							"userIndentity": this.ruleForm.userIndentity,
							"userGrade": this.ruleForm.userGrade,
							"contestId": this.$route.params.contestId,
							"teamName": this.ruleForm.teamNameMem,
							"teamId": teamId
						})
						.then(res => {
					
							if (res.data.code == 100001) {
								this.$alert('报名成功！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										this.$router.go(-1);
									}
								})
							}else {
								this.$alert('报名出错，填写信息有误！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										this.$router.go(-1);
									}
								})
							}
						})
					})
					
					
				}
			},
			checkForm: function(e) {
				if (this.name && this.age) {
					return true;
				}
				this.errors = [];
				if (!this.name) {
					this.errors.push('Name required.');
				}
				if (!this.age) {
					this.errors.push('Age required.');
				}
				e.preventDefault();
			},
			Mdisabled() {
				this.disableMem = false,
					this.disableCap = true
			},
			Cdisabled() {
				this.disableMem = true,
					this.disableCap = false
			}
		}
	}
</script>
<style scoped>
	.testRegister .buttonBottom {
		width: 100px;
		margin: 0 auto;
	}
	
	* {
		font-family: "microsoft yahei";
	}
	
	input {
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		padding: 0 15px;
	}
	
	.error {
		border-color: #f56c6c;
	}
	
	.message {
		color: #f56c6c;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		/*position: absolute;*/
		top: 100%;
		left: 0;
	}
	
	.form-group {
		display: inline-block;
	}
	
	.titleAll {
		text-align: center;
		margin-bottom: 30px;
		font-size: 24px;
		color: #0099ff;
	}
	
	.title {
		font-size: 18px;
		margin-bottom: 5px;
	}
	
	.testRegister {
		border: 1px solid #00ccff;
		width: 600px;
		padding: 30px 50px;
		margin: 0 auto;
		margin-top: 15px;
		margin-bottom: 15px;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		border-radius: 10px;
	}
	
	.personalInfoUP {
		display: flex;
		justify-content: space-between;
	}
	
	.personalInfoUP img {
		height: 120px;
		border-radius: 10px;
	}
	
	.primaryInfo {
		display: flex;
		flex-wrap: wrap;
		width: 80%;
		align-items: center;
		justify-content: space-between;
		margin-left: -30px;
		margin-bottom: 10px;
	}
	
	.personalInfoDOWN {
		display: flex;
		flex-direction: column;
		height: 80px;
		justify-content: space-around;
		margin-left: -2px;
	}
	
	.primaryInfo span input {
		border: 1px solid #d2d2d2;
		height: 24px;
		width: 160px;
	}
	/*.personalInfoDOWN span input {
		border: 1px solid #d2d2d2;
		height: 24px;
		width: 240px;
	}*/
	
	.identity {
		margin-top: 10px;
	}
	
	.identityDetail {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.identityDetailUP {
		display: flex;
		align-items: center;
		height: 50px;
		margin-bottom: 20px;
	}
	
	.identityDetailUP input {
		margin-left: 10px;
		height: 24px;
		border: 1px solid #d2d2d2;
	}
	
	.identityDetailUP img {
		height: 20px;
	}
	
	.identityDetailDOWN {
		display: flex;
	}
	
	.identityDetailDOWN1 {
		display: flex;
		flex-direction: column;
	}
	
	.identityDetailDOWN11 {
		display: flex;
	}
	
	.identityDetailDOWN111 {
		display: flex;
		flex-direction: column;
		margin-left: -35px;
	}
	
	.identityDetailDOWN111 span {
		display: inline-block;
		height: 35px;
	}
	
	.identityDetailDOWN1 input {
		width: 180px;
		height: 24px;
		border: 1px solid #d2d2d2;
	}
	
	.button {
		background-color: #0099ff;
		color: #fff;
		font-size: 18px;
		text-align: center;
		width: 150px;
		height: 35px;
		line-height: 35px;
		margin: 0 auto;
		margin-top: 20px;
	}
</style>