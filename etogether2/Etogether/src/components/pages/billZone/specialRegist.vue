<template>
	<div class="specialRegist">
		<div v-if="this.ifDisplay" class="rigistSelect">
			<span class="rigistTitle">请选择比赛：</span>
			<el-select @change="racePickHandle" v-model="racePick" placeholder="请选择比赛">
				<el-option v-for="item in raceList" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<div class="buttonBottom">
				<el-button type='primary' style="background-color:#00b7ee" @click="chooseContest()">立即报名</el-button>
			</div>
		</div>

		<div v-if="!this.ifDisplay" class="rigistTable">
			<div class="titleAll">考试报名信息表</div>
			<span class="rigistTitle">请选择项目：</span>
			<el-select @change='schoolPickHandle' v-model="schoolPick" placeholder="请选择学校">
				<el-option v-for="(item,index) in schoolList" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select @change='contestPickHandle' v-model="contestPick" placeholder="请选择比赛">
				<el-option v-for="(item,index) in contestList" :key="item.value" :label="item.race_game" :value="item.race_id">
				</el-option>
			</el-select>
			<br><br>
				<el-collapse>
				<el-collapse-item title="基本信息" name="1" class='basicalInfo'>
					<div v-for='(item,index) in addRaceUserDTOList' class="teamateInfo"> 
						<!--v-for='(item,index) in basicalInfo'--> 
						<el-form :label-position="labelPosition" :model="addRaceUserDTOList[index]" status-icon ref="addRaceUserDTOList" label-width="100px" class="demo-addRaceUserDTOList">
							<el-form-item label="姓名" prop="userName">
								<el-input type="" v-model="addRaceUserDTOList[index].userName" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="userSex">
								<el-radio type="" v-model="addRaceUserDTOList[index].userSex" label="1">男</el-radio>
								<el-radio type="" v-model="addRaceUserDTOList[index].userSex" label="0">女</el-radio>
							</el-form-item>
							<el-form-item label='毕业年份' prop="birth">
								<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="addRaceUserDTOList[index].userGraduationTime"></el-date-picker>
							</el-form-item>
							<el-form-item label='邮箱' prop="userEmail">
								<el-input type="" placeholder="" v-model="addRaceUserDTOList[index].userEmail"></el-input>
							</el-form-item>
						</el-form>
						<el-form :label-position="labelPosition" :model="addRaceUserDTOList[index]" status-icon ref="addRaceUserDTOList" label-width="100px" class="demo-addRaceUserDTOList">
							<el-form-item label="身份证号" prop="userIdCard">
								<el-input type="" v-model="addRaceUserDTOList[index].userIdCard" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="所在学校" prop="userSchoolId">
								<el-select size="small"
			                               v-model="selectProv"
			                               placeholder="请选择区域"
			                               @change="getProv($event)">
			                        <el-option
			                                v-for="item in provs"
			                                :label="item.label"
			                                :value="item.value">
			                        </el-option>
			                    </el-select>
			                    <el-select size="small"
			                               v-model="addRaceUserDTOList[index].userSchoolId"
			                               placeholder="请选择学校"
			                               @change="getCity($event)">
			                        <el-option
			                                v-for="item in school"
			                                :label="item.schoolName"
			                                :value="item.schoolId">
			                        </el-option>
			                    </el-select>
							</el-form-item>
							<el-form-item label="手机号码" prop="userPhone">
								<el-input type="" v-model.number="addRaceUserDTOList[index].userPhone" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
					</div>
					
					<div class="continueAdd">
						<el-button @click='continueAdd' style=''>继续添加队员</el-button>
					</div>
				</el-collapse-item>
				
				<el-collapse-item title="指导教师信息" name="2" class='basicalInfo'>
					<div v-for='(item,index) in addRaceTeacherDTOList' class="teacherInfo"> 
						<el-form :label-position="labelPosition" :model="addRaceTeacherDTOList[index]" status-icon ref="addRaceTeacherDTOList" label-width="100px" class="demo-addRaceTeacherDTOList">
							<el-form-item label="姓名" prop="teacherName">
								<el-input type="" v-model="addRaceTeacherDTOList[index].teacherName" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="teacherSex">
								<el-radio type="" v-model="addRaceTeacherDTOList[index].teacherSex" label="1">男</el-radio>
								<el-radio type="" v-model="addRaceTeacherDTOList[index].teacherSex" label='0'>女</el-radio>
							</el-form-item>
							<el-form-item label='邮箱' prop="teacherEmail">
								<el-input type="" placeholder="" v-model="addRaceTeacherDTOList[index].teacherEmail"></el-input>
							</el-form-item>
						</el-form>
						<el-form :label-position="labelPosition" :model="addRaceTeacherDTOList[index]" status-icon ref="addRaceTeacherDTOList" label-width="100px" class="demo-addRaceTeacherDTOList">
							<el-form-item label="职务/职称" prop="teacherPost">
								<el-input type="" v-model="addRaceTeacherDTOList[index].teacherPost" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="所在单位" prop="teacherEmployer">
								<el-input type="" v-model="addRaceTeacherDTOList[index].teacherEmployer" autocomplete="off" placeholder='按单位公章填写'></el-input>
								<!--<span style="color: red;">*按单位公章填写</span>-->
							</el-form-item>
							<el-form-item label="手机号码" prop="teacherPhone">
								<el-input type="" v-model.number="addRaceTeacherDTOList[index].teacherPhone" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="continueAdd">
						<el-button @click='continueAddTea' style='width: 154px;margin：0 auto;'>继续添加指导老师</el-button>
					</div>		
				</el-collapse-item>
				
				<el-collapse-item title="作品信息" name="3" class='produInfo'>
					<el-form :label-position="labelPosition" :model="addRaceTeamDTO" status-icon ref="addRaceTeamDTO" label-width="100px" class="demo-addRaceTeamDTO">
						<el-form-item label="作品名称" prop="teamWorksName">
							<el-input type="" v-model="addRaceTeamDTO.teamWorksName" autocomplete="off"></el-input>
						</el-form-item>
						<div class="attchmentUpload">
							<span style="float: left;line-height: 30px;">附件上传：</span>
							<!--<form method="post" :action="uploadUrl" enctype="multipart/form-data">
							  <input name="token" type="hidden" :value="toking">
							  <input name="file" type="file" @change='getFileName($event)' />
							  <input type="botton" value="上传文件" @click = '' />
							</form>-->
							 <el-upload :data="myHeaders" :limit='1' :on-success="handlePreview" style="float: left;" class="upload-demo" accept="application/x-zip-compressed,application/x-rar-compressed" :action="uploadUrl">
								<el-button size="small" type="primary">点击上传作品</el-button>
								<div slot="tip" class="el-upload__tip" style="margin-left: 35px;"><a :href="nowUrl" target="_blank">附件上传须知</a></div>
							 </el-upload>
							<!--<el-upload  style="float: left;" class="upload-demo" :upload_token = 'toking' file='file' :file-list="fileList" :action="uploadUrl" multiple>
								<el-button  style="float: left;margin-left: 35px;" size="small" type="primary">点击上传</el-button>
							</el-upload>-->
						</div>
					</el-form>
				</el-collapse-item>
			</el-collapse>

			<div class="buttonBottom">
				<el-button type='primary' style="background-color:#00b7ee" @click="signUp">立即报名</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	var specialUrlWeb = 'http://148.70.213.160/web/'
	var specialUrlMan = 'http://148.70.213.160/manage/'
	import axios from 'axios'
	import Element from 'element-ui'
	import {
		required,
		minLength,
		maxLength,
		sameAs
	} from 'vuelidate/lib/validators'
	export default {
		name: 'specialRegist',
		data() {
			var contestPick1 = this.contestPick;
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
			return {
				//文件上传
				fileList: [{
					name: '',
					url: ''
				}],
//				toking: '',
				myHeaders: {Authorization: ''},
				uploadUrl: 'http://upload-z2.qiniup.com',
				nowUrl: specialUrlWeb + '/attachmentNotice/#computerPaint',
				labelPosition: 'right',
				sex: '',
				ifDisplay: true,
				addRaceUserDTOList: [{
					userName: '',
					userEmail: '',
					userIdCard: '',
					userSex: '',
					userSchoolId: '',
					userGraduationTime: '',
					userPhone: '',
					//					
				}],
				selectProv: '',
				addRaceTeacherDTOList: [{
					teacherName: '',
					teacherSex: '',
					teacherPost: '',
					teacherEmail: '',
					teacherPhone: '',
					teacherEmployer: ''
				}],
				addRaceTeamDTO: {
					teamWorksName: '',
					teamFileName: '',
					teamFileUrl: '',
					teamRaceId: ''
				},
				//				rules: {
				//					userName: [{
				//						required: true,
				//						message: '请输入姓名',
				//						trigger: 'blur'
				//					}],
				//					teacherName: [{
				//						required: true,
				//						message: '请输入姓名',
				//						trigger: 'blur'
				//					}],
				//					userAge: [{
				//						validator: checkAge,
				//						trigger: 'blur'
				//					}],
				//					userSchool: [{
				//						required: true,
				//						message: '请输入学校',
				//						trigger: 'blur'
				//					}],
				//					userGrade: [{
				//						required: true,
				//						message: '请输入年级',
				//						trigger: 'blur'
				//					}],
				//					userPhone: [{
				//						validator: checkTel,
				//						trigger: 'blur'
				//					}],
				//					teacherPhone: [{
				//						validator: checkTel,
				//						trigger: 'blur'
				//					}],
				//					contestLable: [{
				//						required: true,
				//						message: '请输入项目名称',
				//						trigger: 'blur'
				//					}],
				//					userIndentity: [{
				//						validator: checkId,
				//						trigger: 'blur'
				//					}],
				//					teacherEmail: [{
				//						required: true,
				//						message: '请输入邮箱地址',
				//						trigger: 'blur'
				//					}, {
				//						type: 'email',
				//						message: '请输入正确的邮箱地址',
				//						trigger: ['blur', 'change']
				//					}]
				//				},
				raceList: [{
					value: '0',
					label: '数字创作评比'
				}, {
					value: '1',
					label: '创客竞赛'
				}, {
					value: '2',
					label: '机器人竞赛'
				}],
				racePick: '',
				schoolList: [{
					value: '0',
					label: '小学'
				}, {
					value: '1',
					label: '初中'
				}, {
					value: '2',
					label: '高中'
				}, {
					value: '3',
					label: '中职'
				}],
				schoolPick: '',
				contestList: [],
				contestPick: '',
				provs: [{
					value: '渝北区',
					label: '渝北区'
				}, {
					value: '北碚区',
					label: '北碚区'
				}, {
					value: '南岸区',
					label: '南岸区'
				}, {
					value: '万州',
					label: '万州区'
				}, {
					value: '万盛',
					label: '万盛'
				}, {
					value: '黔江区',
					label: '黔江区'
				}, {
					value: '长寿',
					label: '长寿'
				}, {
					value: '酉阳县',
					label: '酉阳县'
				}, {
					value: '荣昌',
					label: '荣昌区'
				}, {
					value: '綦江',
					label: '綦江'
				}, {
					value: '秀山县',
					label: '秀山县'
				}, {
					value: '石柱',
					label: '石柱'
				}, {
					value: '璧山',
					label: '璧山'
				}, {
					value: '潼南',
					label: '潼南'
				}, {
					value: '渝中区',
					label: '渝中区'
				}, {
					value: '涪陵',
					label: '涪陵'
				}, {
					value: '沙坪坝区',
					label: '沙坪坝区'
				}, {
					value: '江津',
					label: '江津'
				}, {
					value: '永川区',
					label: '永川区'
				}, {
					value: '丰都',
					label: '丰都'
				}, {
					value: '梁平县',
					label: '梁平县'
				}, {
					value: '忠县',
					label: '忠县'
				}, {
					value: '彭水县',
					label: '彭水县'
				}, {
					value: '武隆县',
					label: '武隆县'
				}, {
					value: '开县',
					label: '开州'
				}, {
					value: '巴南区',
					label: '巴南区'
				}, {
					value: '巫溪县',
					label: '巫溪县'
				}, {
					value: '九龙坡区',
					label: '九龙坡区'
				}, {
					value: '云阳县',
					label: '云阳县'
				}, {
					value: '南川',
					label: '南川'
				}, {
					value: '合川',
					label: '合川'
				}, {
					value: '垫江县',
					label: '垫江县'
				}, {
					value: '城口县',
					label: '城口县'
				}, {
					value: '巫山县',
					label: '巫山县'
				}, {
					value: '大渡口区',
					label: '大渡口区'
				}, {
					value: '大足',
					label: '大足'
				}, {
					value: '奉节县',
					label: '奉节县'
				}],
				school: [],
			}
		},
//		computed: {
//			headers() {
//				return {
//					
//				}
//			}
//		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中.......',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			axios.get(specialUrlMan + 'file/getToken')
			.then(res => {
						this.myHeaders.token = res.data.data.token
						console.log('this.myHeaders.Authorization',this.myHeaders.Authorization)
					})
		},
		methods: {
			getFileName(e) {
				this.addRaceTeamDTO.teamFileName = (e.currentTarget.files[0].name)
//				this.addRaceTeamDTO.teamFileUrl = 'http://file.eqibian.com/'+res.data.hash
			},
			handlePreview(response, file, fileList) {
				console.log(file.name);
				this.addRaceTeamDTO.teamFileName = file.name
				this.addRaceTeamDTO.teamFileUrl = 'http://file.eqibian.com/'+response.key
			},
			update(e){
            var formdata = new FormData();
            formdata.append('file',e.target.files[0]);
            formdata.append('token',this.toking);
            axios.post(this.uploadUrl,{
                data:formdata,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res)=>{
            		this.teamFileName = e.target.files[0];
            		this.teamFileUrl = 'http://file.eqibian.com/'+res.data.hash;
            	  	console.log('文件名',e.target.files[0].name,'赛事id',this.contestPick,'作品名',this.addRaceTeamDTO.teamWorksName,'文件url','http://file.eqibian.com/'+res.data.hash)
                    this.$alert('添加成功','提示',{
                        callback: action=>{
//                          this.$router.go(-1)
                        }
                    })
            })           
      },
			getProv: function(prov) {
				console.log('目前点击的省份' + prov)        
				axios.post(specialUrlWeb + 'sign/query/school', {
						schoolCounty: prov
					}).then(res => {
						this.school = res.data.data
					})
					//				for (var val of allCity) {          
					//					if (prov == val.prov) {            
					//						console.log(val);            
					//						tempCity.push({
					//							label: val.label,
					//							value: val.label
					//						})          
					//					}        
					//				}        
					//				this.school = tempCity;
			},
			getCity(index) {
				console.log(index)
				this.addRaceUserDTOList.userSchoolId = index
				console.log(this.addRaceUserDTOList.userSchoolId)
			},
			racePickHandle() {
				console.log(this.racePick)
			},
			schoolPickHandle() {
				console.log(this.schoolPick)
				axios.get(specialUrlWeb + 'race/race/' + this.racePick + '/' + this.schoolPick)
					.then(res => {
						this.contestList = res.data.data
					})
			},
			contestPickHandle() {
				this.addRaceTeamDTO.teamRaceId = this.contestPick
				console.log('this.contestPick',this.contestPick)
				console.log(this.contestPick)
			},
			continueAdd() {
				if (this.addRaceUserDTOList.length < this.contestList.race_maxnum) {
					this.addRaceUserDTOList.push({
						userName: '',
						userEmail: '',
						userIdCard: '',
						userSex: '',
						userSchoolId: '',
						userGraduationTime: '',
						userPhone: ''
					})
				} else {
					this.$alert('已添加到最大人数！', '提示', {
						confirmButtonText: '确定',
						callback: action => {}
					});
				}
			},
			continueAddTea() {
				this.addRaceTeacherDTOList.push({})
			},
			chooseContest() {
				if (localStorage.getItem('ifLogin') == 'true') {
					this.GLOBAL.ifLogin = true
				} else {
					this.GLOBAL.ifLogin = false
				}
				if (this.GLOBAL.ifLogin) {
					if (this.racePick) {
						this.ifDisplay = false;
					}
				} else {
					this.$router.push('/login')
				}
			},
			signUp() {
				console.log(this.addRaceTeacherDTOList)
				axios.post(specialUrlWeb + 'sign/race', {
						addRaceUserDTOList: this.addRaceUserDTOList,
						//						addRaceUserDTOList.userName: this.addRaceUserDTOList.userName,
						//						addRaceUserDTOList.userEmail: this.addRaceUserDTOList.userEmail,
						//						addRaceUserDTOList.userIdCard: this.addRaceUserDTOList.userIdCard,
						//						addRaceUserDTOList.userSex: this.addRaceUserDTOList.userSex,
						//						addRaceUserDTOList.userSchoolId: this.addRaceUserDTOList.userSchoolId,
						//						addRaceUserDTOList.userGraduationTime: this.addRaceUserDTOList.userGraduationTime,
						//						addRaceUserDTOList.userPhone: this.addRaceUserDTOList.userPhone,
						addRaceTeacherDTOList: this.addRaceTeacherDTOList,
						addRaceTeamDTO: this.addRaceTeamDTO,
						//						addRaceTeamDTO.teamWorksName: this.addRaceTeamDTO.teamWorksName,
						//						addRaceTeamDTO.teamFileName: this.addRaceTeamDTO.teamFileName,
						//						addRaceTeamDTO.teamFileUrl: this.addRaceTeamDTO.teamFileUrl,
						//						addRaceTeamDTO.teamRaceId: this.contestPick
					})
					.then(res => {
						if (res.data.code == 100001) {
							this.$alert('报名成功！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						} else {
							this.$alert('报名失败，请检查是否填写正确！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						}
					})
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
		}
	}
</script>
<style scoped>
	.specialRegist .buttonBottom {
		width: 100px;
		margin: 0 auto;
		margin-top: 40px;
	}
	
	* {
		font-family: "microsoft yahei";
	}
	/*input {
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		padding: 0 15px;
	}*/
	
	.error {
		border-color: #f56c6c;
	}
	
	.continueAdd {
		width: 150px;
		margin: 0 auto;
		margin-top: 40px;
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
	
	.specialRegist {
		border: 1px solid #00ccff;
		width: 600px;
		padding: 0px 50px 0px 50px;
		margin: 0 auto;
		margin-top: 120px;
		margin-bottom: 80px;
		-moz-box-shadow: 0 5px 15px #999;
		-webkit-box-shadow: 0 5px 15px #999;
		box-shadow: 0 5px 15px #999;
		border-radius: 10px;
	}
	
	.specialRegist .rigistSelect {
		margin: 50px auto;
		width: 400px;
		color: rgb(111, 111, 111);
	}
	
	.specialRegist .rigistTable {
		margin: 50px auto;
		width: 600px;
		color: rgb(111, 111, 111);
	}
	
	.titleAll {
		text-align: center;
		margin-bottom: 30px;
		font-size: 24px;
		color: #0099ff;
	}
	
	.attchmentUpload {
		margin-top: 25px;
		width: 500px;
	}
	
	.attchmentUpload .el-upload__tip:hover {
		color: rgb(87, 170, 255);
		cursor: pointer;
	}
	
	.attchmentUpload .upload-demo {
		width: 200px;
	}
	
	.teamateInfo {
		width: 100%;
		height: 240px;
	}
	
	.teacherInfo {
		width: 100%;
		/*height: 200px;*/
	}
</style>