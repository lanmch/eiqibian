<template>
	<div class="specialManageHome">
		<div class="manageTitle">
			<h2>电脑制作活动管理系统</h2>
			<p class="manageBack" @click="manageBack">退出系统</p>
		</div>
		<el-tabs tab-position="left" type="border-card" :value = 'tabsPick'>
			<el-tab-pane label="报名情况" name = "tab1">
				<div class="signSituation">
					<div class="signSituation1">
						<p>电脑制作活动报名总人数：{{situation.allPersonNum1+situation.allPersonNum2+situation.allPersonNum3}}</p>
						<p>"数字创作评比"报名总人数：{{situation.allPersonNum1}}</p>
						<p>"创客竞赛"报名总人数：{{situation.allPersonNum2}}</p>
						<p>"机器人竞赛"报名总人数：{{situation.allPersonNum3}}</p>
					</div>
					<div class="signSituation2">
						<p>电脑制作活动报名总学校数：{{situation.allSchoolNum1+situation.allSchoolNum2+situation.allSchoolNum3}}</p>
						<p>"数字创作评比"报名总学校数：{{situation.allSchoolNum1}}</p>
						<p>"创客竞赛"报名总学校数：{{situation.allSchoolNum2}}</p>
						<p>"机器人竞赛"报名总学校数：{{situation.allSchoolNum3}}</p>
					</div>
				</div>
				<div id="provinceChart" style="width: 80%; height: 400px;"></div>
				<div id="schoolChart" style="width: 80%; height: 400px;"></div>
			</el-tab-pane>
			<el-tab-pane label="专家评审" name = "tab2">
				<div class="reviewContent">
					<div class="reviewHead">
						<span style="float: left;margin-right: 20px;margin-top: 5px;">导入专家名单：</span>
						<el-upload :on-success="handlePreview" style="float: left;" class="upload-demo" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" :action="judgeFileUrl">
							<!--专家名单上传地址-->
							<el-button size="small" type="primary">点击上传表格</el-button>
						</el-upload>
						<span style="float: left;margin-left: 20px;margin-top: 5px;">开始分配并评审：</span>
						<el-switch v-model="reviewSwitch" active-text="开" inactive-text="关" @change='reviewSwitchChange' active-color="#13ce66" inactive-color="#ff4949" style='margin-left: 20px;float: left;margin-top: 5px;'></el-switch>
					</div>

					<h2 style="text-align: left;">专家名单：</h2>
					<ul class="nameList">
						<li v-for="(item,index) in nameList">
							<div class="nameListName">
								{{item.judgeName}}
							</div>
							<div class="nameListTel">
								{{item.judgePhone}}
							</div>
							<div class="nameListOp">
								<span @click="nameListDelet(index)">删除</span>
							</div>
						</li>
					</ul>
					<!--<a :href = 'downUrlWork' target='_blank' download="fileName"><el-button style="float: left;margin: 20px 0 20px 0;" size="small" type="primary">下载全部附件</el-button></a>
					<el-upload style="float: left;margin: 20px 0 20px 50px;" class="upload-demo" accept="" action="">
						<el-button size="small" type="primary">批量上传评审附件</el-button>
					</el-upload>-->
					<h2 style="text-align: left;clear: both;">目前有{{noEvaluatedList.length}}人未评审</h2>
					<ul class="noEvaluated">
						<li v-for="(item,index) in noEvaluatedList">
							<div class="noEvaluatedName">
								{{item.judgeName}}
							</div>
							<div class="noEvaluatedTel">
								{{item.judgePhone}}
							</div>
							<div class="noEvaluatedNum">
								还有{{item.count}}个作品
							</div>
						</li>
					</ul>
					<div class="reviewRule1">
						<h2 style="text-align: left;clear: both;">分项成绩比例调整</h2>
						<el-table data='x' type='index' style=''>
							<el-table-column label="思想性、科学性、规范性" width="98">
							<template scope="scope">
												<el-input v-model="reviewRulePropotion.rule1" size="small" ></el-input>
											</template>
</el-table-column>
<el-table-column label="创新性" width="98">
	<template scope="scope">
																		<el-input v-model="reviewRulePropotion.rule2" size="small" ></el-input>
																	</template>
</el-table-column>
<el-table-column label="艺术性" width="98">
	<template scope="scope">
																		<el-input v-model="reviewRulePropotion.rule3" size="small" ></el-input>
																	</template>
</el-table-column>
<el-table-column label="技术性" width="98">
	<template scope="scope">
																		<el-input v-model="reviewRulePropotion.rule4" size="small" ></el-input>
																	</template>
</el-table-column>
<el-table-column label="团队展示与协作" width="98">
	<template scope="scope">
																		<el-input v-model="reviewRulePropotion.rule5" size="small" ></el-input>
																	</template>
</el-table-column>
</el-table>
<el-button style='position: relative;bottom: 100px;left: 270px;' type='primary' @click='reviewRule1'>确认调整</el-button>
</div>
<div class="reviewRule2">
	<span style="float: left;margin-top: 10px;">成绩评定算法选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 当前算法：{{this.reviewRuleNow}}</span>
	<el-select @change="reviewRulePickHandle" v-model="reviewRulePick" placeholder="" size='mini'>
		<el-option v-for="(item,index) in reviewRule" :key="item.value" :label="item.label" :value="item.value">
		</el-option>
	</el-select>
	<el-button type='primary' @click='reviewRule2'>确认调整</el-button>
</div>
<a style="" :href="downUrlScore" target='_blank' download="fileName">
	<el-button type='primary' @click='exportScore'>开始成绩评定并导出成绩</el-button>
</a>
</div>
</el-tab-pane>
<el-tab-pane label="组织单位" name="tab3">
	<div class="companyAdd">
		<el-form :label-position="labelPosition" status-icon label-width="120px" class="demo-ruleForm">
			<el-form-item label="组织单位名称：" prop="companyName">
				<el-input type="" v-model="companyAdd.companyName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系人：" prop="companyContacts">
				<el-input type="" v-model="companyAdd.companyContacts" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="通讯地址：" prop="companyAddress">
				<el-input type="" v-model="companyAdd.companyAddress" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系电话：" prop="companyTel">
				<el-input type="" v-model.number="companyAdd.companyTel" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="电子邮箱：" prop="companyMail">
				<el-input type="" v-model="companyAdd.companyMail" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<el-form :label-position="labelPosition" status-icon label-width="120px" class="demo-ruleForm">
			<el-form-item label="部门：" prop="companyDepart">
				<el-input type="" v-model="companyAdd.companyDepart" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="职务：" prop="companyJob">
				<el-input type="" v-model="companyAdd.companyJob" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮政编码：" prop="companyPost">
				<el-input type="" v-model.number="companyAdd.companyPost" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机：" prop="companyMobile">
				<el-input type="" v-model.number="companyAdd.companyMobile" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="QQ：" prop="companyQ">
				<el-input type="" v-model.number="companyAdd.companyQ" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<el-button style='clear: both;margin: 0 auto;;margin-bottom: 20px;display: block;' @click='companyAddto'>添加组织单位</el-button>
	</div>
	<el-collapse v-for="(item,index) in companyDisplay" @change="changeCollapse" align='left' style='border:2px solid #ebeef5;width: 80%;margin: 0 auto;'>
		<i class="el-icon-delete companyDelete" @click="companyDelete(index)"></i>
		<el-collapse-item :title="item.organization_username" :name="index" style='font-size: 15px;margin-left: 20px;'>
			<div class="companyDisplay">
				<div class="companyDisplay1">
					<p>组织单位名称：{{item.organization_name}}</p>
					<p>联系人：{{item.organization_username}}</p>
					<p>通讯地址：{{item.organization_addr}}</p>
					<p>联系电话：{{item.organization_phone}}</p>
					<p>电子邮箱：{{item.organization_email}}</p>
				</div>
				<div class="companyDisplay2">
					<p>部门：{{item.organization_department}}</p>
					<p>职务：{{item.organization_position}}</p>
					<p>邮政编码：{{item.organization_postcode}}</p>
					<p>手机：{{item.organization_tel}}</p>
					<p>QQ：{{item.organization_qq}}</p>
				</div>
			</div>
		</el-collapse-item>
	</el-collapse>
</el-tab-pane>
<el-tab-pane label="成绩查询" name="tab4">
	<div class="specialScoreInqury">
		<div class="scoreSearch">
			<el-form label-position="left" status-icon label-width="60px" class="demo-ruleForm">
				<el-form-item label="搜索：">
					<el-input size='small' type="" v-model="searchContent" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<el-button @click='scoreSearch' type='small' class='searchButton'>立即搜索</el-button>
		</div>
		<div class="scorePick">
			<span class="pickTitle">筛选条件：</span>
			<el-select @change="regionPickHandle" v-model="regionPick" placeholder="" size='mini'>
				<el-option v-for="(item,index) in regionList" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select @change="gradePickHandle" v-model="gradePick" placeholder="" size='mini'>
				<el-option v-for="(item,index) in gradeList" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select @change="contestTypeHandle" v-model="contestPick" placeholder="" size='mini'>
				<el-option v-for="(item,index) in contestType" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>

		<div class="scoreDisplay">
			<el-table :data="scoreList" type='index' style="width: 100%;margin-bottom: 30px;">
				<el-table-column label="序号" type='index' align='center' width="50">
				</el-table-column>
				<el-table-column prop="userName" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="schoolCounty" label="所在地" width="180">
				</el-table-column>
				<el-table-column prop="raceGrade" label="教育水平">
				</el-table-column>
				<el-table-column prop="raceGame" label="报名项目">
				</el-table-column>
				<el-table-column prop="userScore" label="比赛成绩">
				</el-table-column>
				<el-table-column prop="prizeName" label="奖项">
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :total='pageAll' :current-page.sync='currentPage' @current-change='currentChange'>
			</el-pagination>
		</div>
	</div>
</el-tab-pane>
<el-tab-pane label="作品管理" name="tab5">
	<h2>已处理{{workManageDone}}个文件，未处理{{workManageNo}}个文件</h2>
	<el-table :data="workManageList" border align='center' header-align='center'>
		<el-table-column label="序号" type='index'>
		</el-table-column>
		<el-table-column label="作品ID">
			<template scope="scope">
						<span>{{scope.row.workManageId}}</span>
					</template>
		</el-table-column>
		<el-table-column label="作品链接">
			<template scope="scope">
						<a :href="scope.row.workManageLink" download="filename">点击下载</a>
					</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
						<el-upload :limit='1' :on-success="handlePreview" style="float: left;" class="upload-demo" accept="application/x-zip-compressed,application/x-rar-compressed" :action="judgeFileUrl">
							<!--专家名单上传地址-->
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</template>
		</el-table-column>

	</el-table>
</el-tab-pane>
</el-tabs>
</div>
</template>
<script>
	import Vue from 'vue'
	import axios from 'axios'
	import Element from 'element-ui'
	import echarts from 'echarts'
	Vue.prototype.$echarts = echarts
	var specialUrl = 'http://148.70.213.160/manage/'
	export default {
		inject: ['reload'],
		name: 'specialManageHome',
		data() {
			return {
				//				activeNames:['1'],
				workManageList: [{
					workManageId: '01',
					workManageLink: 'http://xxxx'
				}, {
					workManageId: '02',
					workManageLink: 'zzz'
				}],
				workManageDone: '',
				workManageNo: '',
				judgeFileUrl: specialUrl + 'file/upload/judgeList',
				downUrlScore: '',
				reviewRuleExport: 0,
				downUrlWork: '',
				reviewBeginButton: false,
				labelPosition: 'right',
				reviewSwitch: '',
				tabsPick: 'tab1',
				pageAll: 10,
				currentPage: 1,
				pageSize: 5,
				ruleForm: {
					ifDisplay: true,
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
					teamNameMem: '',
				},
				searchContent: '',
				companyAdd: {
					companyName: '',
					companyContacts: '',
					companyAddress: '',
					companyTel: '',
					companyMail: '',
					companyDepart: '',
					companyJob: '',
					companyPost: '',
					companyMobile: '',
					companyQ: ''
				},
				companyDisplay: [],
				situation: {
					allPersonNum1: '',
					allPersonNum2: '',
					allPersonNum3: '',
					allSchoolNum1: '',
					allSchoolNum2: '',
					allSchoolNum3: '',
				},
				//				var provinceChartData = [situation.allPersonNum1,situation.allPersonNum2,situation.allPersonNum3]
				nameList: [],
				noEvaluatedList: [],
				//				series: [{
				//					name: '访问量',
				//					type: 'pie',
				//					radius: '60%',
				//					data: [{
				//						value: 500,
				//						name: 'Android'
				//					}, {
				//						value: 200,
				//						name: 'IOS'
				//					}, {
				//						value: 360,
				//						name: 'PC'
				//					}, {
				//						value: 100,
				//						name: 'Ohter'
				//					}]
				//				}],
				scoreList: [],
				province: [],
				regionList: [{
					value: '',
					label: '全部'
				}],
				regionPick: '',
				gradeList: [{
					value: '',
					label: '全部'
				}, {
					value: '小学',
					label: '小学'
				}, {
					value: '初中',
					label: '初中'
				}, {
					value: '高中',
					label: '高中'
				}, {
					value: '中职',
					label: '中职'
				}],
				gradePick: '',
				contestType: [{
					value: '0',
					label: '全部'
				}, {
					value: '1',
					label: '国家级'
				}, {
					value: '2',
					label: '重庆级'
				}],
				contestPick: '0',
				//画图的数据
				sampleSize: 100,
				limit: 15,
				provinceData: [],
				provX: [],
				provY: [],
				schoolData: [],
				schoolX: [],
				schoolY: [],
				reviewRule: [{
					value: '平均分',
					label: '平均分'
				}, {
					value: '最高分平均分',
					label: '最高分平均分'
				}, {
					value: '最低分平均分',
					label: '最低分平均分'
				}],
				reviewRulePick: '平均分',
				reviewRuleNow: '平均分',
				reviewRulePropotion: {
					rule1: '20%',
					rule2: '20%',
					rule3: '20%',
					rule4: '20%',
					rule5: '20%',
				}
			}
		},
		mounted() {
			//获取作品管理文件数目
			axios.get(specialUrl + '')
				.then(res => {
					this.workManageDone = res.data.data;
					this.workManageNo = res.data.data;
				})
				// 获取专家名单
			axios.get(specialUrl + 'judge/all')
				.then(res => {
					this.nameList = res.data.data;
				}),
				axios.get(specialUrl + 'judge/notDoneTaskList')
				.then(res => {
					this.noEvaluatedList = res.data.data;
				}),
				//			console.log('provinceData' + this.provinceData)
				//			for (var i in this.dataX) {
				//				this.provX[i] = this.dataX[i].name;
				//				this.provY[i] = this.dataX[i].num;
				//			};
				//			console.log(this.provX)
				//获取区县列表
				axios.get(specialUrl + 'user/query/countyList')
				.then(res => {
					this.province = res.data.data;
					console.log('province' + this.province)
					for (var i in this.province) {
						this.regionList.push({
								value: this.province[i],
								label: this.province[i]
							})
							//				this.regionList[i].lable = this.province[i]
					}
				})
			console.log('regionList', this.regionList)
				//获取地区样本
			axios.get(specialUrl + 'user/query/signCounty/' + this.sampleSize + '/' + this.limit)
				.then(res => {
					this.provinceData = res.data.data;
					console.log("provinceData", this.provinceData)
					for (var i = 0; i < this.provinceData.length; i++) {
						var keyProv = Object.keys(this.provinceData[i])[0]
						var valueProv = Object.values(this.provinceData[i])[0]
						this.provX[i] = keyProv
						this.provY[i] = valueProv
						console.log("provX[i]", this.provX[i])
					}
					console.log('prov', this.provX, this.provY)
					this.drawLineProvince();
				})
				//			console.log(this.provX, this.provY)
				//获取学校样本
			axios.get(specialUrl + 'user/query/signSchool/' + this.sampleSize + '/' + this.limit)
				.then(res => {
					this.schoolData = res.data.data;
					for (var i = 0; i < this.schoolData.length; i++) {
						var keySchool = Object.keys(this.schoolData[i])[0]
						var valueSchool = Object.values(this.schoolData[i])[0]
						this.schoolX[i] = keySchool
						this.schoolY[i] = valueSchool
					}
					this.drawLineProvince();
				})
			axios.get(specialUrl + 'organization/organization/all')
				.then(res => {
					this.companyDisplay = res.data.data;
				}),
				axios.get(specialUrl + 'sign/count/team/0')
				.then(res => {
					this.situation.allPersonNum1 = res.data.data;
				}),
				axios.get(specialUrl + 'sign/count/team/1')
				.then(res => {
					this.situation.allPersonNum2 = res.data.data;
				}),
				axios.get(specialUrl + 'sign/count/team/2')
				.then(res => {
					this.situation.allPersonNum3 = res.data.data;
				}),
				axios.get(specialUrl + 'sign/count/school/0')
				.then(res => {
					this.situation.allSchoolNum1 = res.data.data;
				}),
				axios.get(specialUrl + 'sign/count/school/1')
				.then(res => {
					this.situation.allSchoolNum2 = res.data.data;
				}),
				axios.get(specialUrl + 'sign/count/school/2')
				.then(res => {
					this.situation.allSchoolNum3 = res.data.data;
				}),
				axios.post(specialUrl + 'user/query', {
					pageNum: 1,
					pageSize: this.pageSize,
					schoolCounty: this.regionPick,
					raceGrade: this.gradePick,
					prizeType: this.contestPick
				}).then(res => {
					axios.post(specialUrl + 'user/query/allRecordCount', {
						pageNum: 1,
						pageSize: this.pageSize,
						userName: this.searchContent,
						schoolCounty: this.regionPick,
						raceGrade: this.gradePick,
						prizeType: this.contestPick
					}).then(res => {
						console.log('总页数' + res.data.data)
						this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
						console.log(typeof(this.pageAll))
					})
					this.scoreList = res.data.data;
				})
		},
		methods: {
			reviewRulePickHandle() {
			},
			reviewRule1() {
			},
			reviewRule2() {
				this.reviewRuleNow = this.reviewRulePick
			},
			handlePreview(response, file, fileList) {
				console.log(file.name);
				axios.get(specialUrl + 'judge/all')
					.then(res => {
						this.nameList = res.data.data;
					})
			},
			//			//文件上传函数
			//			update(){
			//          var formdata = new FormData();
			////          formdata.append('file',e.target.files[0]);
			//          axios.post(this.judgeFileUrl,{
			//              data:formdata,
			//              headers: {'Content-Type': 'multipart/form-data'}
			//          }).then((res)=>{
			//          		console.log(res)
			////          		console.log('文件名'+e.target.files[0])
			//          })           
			//    },
			//分页函数
			currentChange(index) {
				if (this.searchContent) {
					axios.post(specialUrl + 'user/query/name', {
						pageNum: index,
						pageSize: this.pageSize,
						userName: this.searchContent
					}).then(res => {
						//						this.currentPage = 1
						axios.post(specialUrl + 'user/query/allRecordCount', {
							pageNum: 1,
							pageSize: this.pageSize,
							userName: this.searchContent
						}).then(res => {
							console.log('总页数' + res.data.data)
							this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
						})
						this.scoreList = res.data.data;
					})
				} else {
					axios.post(specialUrl + 'user/query', {
						pageNum: index,
						pageSize: this.pageSize,
						schoolCounty: this.regionPick,
						raceGrade: this.gradePick,
						prizeType: this.contestPick
					}).then(res => {
						axios.post(specialUrl + 'user/query/allRecordCount', {
							pageNum: 1,
							pageSize: this.pageSize,
							userName: this.searchContent,
							schoolCounty: this.regionPick,
							raceGrade: this.gradePick,
							prizeType: this.contestPick
						}).then(res => {
							console.log('总页数' + res.data.data)
							this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
						})
						this.scoreList = res.data.data;
						//					this.pageAll = Math.ceil(res.data.data.length / this.pageSize) * 10
					})
				}
			},
			drawLineProvince() {
				// 基于准备好的dom，初始化echarts实例
				let provinceChart = this.$echarts.init(document.getElementById('provinceChart'))
					// 绘制图表
				provinceChart.setOption({
					color: ['#3398DB'],
					title: {
						text: '区县的分布直方图',
						left: 'center'
					},
					tooltip: {},
					xAxis: {
						data: this.provX
					},
					yAxis: {},
					series: [{
						name: '人数',
						type: 'bar',
						data: this.provY
					}]
				});
				let schoolChart = this.$echarts.init(document.getElementById('schoolChart'))
					// 绘制图表
				schoolChart.setOption({
					color: ['#3398DB'],
					title: {
						text: '学校的分布直方图',
						left: 'center'
					},
					tooltip: {},
					xAxis: {
						type: 'category',
						data: this.schoolX,
						axisLabel: {
							interval: 0,
							formatter: function(val) {
								return val.split("").join("\n");
							}
						}
					},
					yAxis: {},
					grid: {
						//						top:-100,
						//						x: 40,
						//           x2: 100,
						y2: 200
					},
					series: [{
						name: '人数',
						type: 'bar',
						data: this.schoolY
					}]
				});
			},
			regionPickHandle() {
				this.currentPage = 1
				console.log(this.currentPage)
				axios.post(specialUrl + 'user/query', {
					pageNum: this.currentPage,
					pageSize: this.pageSize,
					schoolCounty: this.regionPick,
					raceGrade: this.gradePick,
					prizeType: this.contestPick
				}).then(res => {
					axios.post(specialUrl + 'user/query/allRecordCount', {
						//						pageNum: 1,
						//						pageSize: this.pageSize,
						schoolCounty: this.regionPick,
						raceGrade: this.gradePick,
						prizeType: this.contestPick
					}).then(res => {
						console.log('总页数' + res.data.data)
						this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
					})
					this.scoreList = res.data.data;
				})
			},
			gradePickHandle() {
				console.log(this.gradePick)
				axios.post(specialUrl + 'user/query', {
					pageNum: 1,
					pageSize: this.pageSize,
					schoolCounty: this.regionPick,
					raceGrade: this.gradePick,
					prizeType: this.contestPick
				}).then(res => {
					this.currentPage = 1
					axios.post(specialUrl + 'user/query/allRecordCount', {
						pageNum: 1,
						pageSize: this.pageSize,
						schoolCounty: this.regionPick,
						raceGrade: this.gradePick,
						prizeType: this.contestPick
					}).then(res => {
						console.log('总页数' + res.data.data)
						this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
					})
					this.scoreList = res.data.data;
				})
			},
			contestTypeHandle() {
				console.log(this.contestType)
				axios.post(specialUrl + 'user/query', {
					pageNum: 1,
					pageSize: this.pageSize,
					schoolCounty: this.regionPick,
					raceGrade: this.gradePick,
					prizeType: this.contestPick
				}).then(res => {
					this.currentPage = 1
					axios.post(specialUrl + 'user/query/allRecordCount', {
						pageNum: 1,
						pageSize: this.pageSize,
						schoolCounty: this.regionPick,
						raceGrade: this.gradePick,
						prizeType: this.contestPick
					}).then(res => {
						console.log('总页数' + res.data.data)
						this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
					})
					this.scoreList = res.data.data;
				})
			},
			scoreSearch() {
				axios.post(specialUrl + 'user/query/name', {
					pageNum: 1,
					pageSize: this.pageSize,
					userName: this.searchContent
				}).then(res => {
					this.currentPage = 1
					axios.post(specialUrl + 'user/query/allRecordCount', {
						pageNum: 1,
						pageSize: this.pageSize,
						userName: this.searchContent
					}).then(res => {
						console.log('总页数' + res.data.data)
						this.pageAll = (Math.ceil(res.data.data / this.pageSize) * 10)
					})
					this.scoreList = res.data.data;
				})
			},
			scoreListPick() {
				axios.post(specialUrl + '', {}).then(res => {
					this.reload()
				})
			},
			changeCollapse() {
				//				alert(111)
			},
			reviewSwitchChange() {
				if (this.reviewSwitch) {
					axios.post(specialUrl + 'judge/assign')
						.then(res => {
							axios.get(specialUrl + 'judge/notDoneTaskList')
								.then(res => {
									this.noEvaluatedList = res.data.data;
								})
						})
				} else {
					this.$confirm('下次打开将会重新分配！', '提示', {
						confirmButtonText: '确定关闭',
						cancelButtonText: '暂不关闭',
						type: 'warning',
						center: true
					}).then(() => {}).catch(() => {
						this.reviewSwitch = true
					});
				}
			},
			manageBack() {
				this.$confirm('确定退出管理系统吗？', '提示', {
					confirmButtonText: '确定退出',
					cancelButtonText: '继续留下',
					type: 'warning',
					center: true
				}).then(() => {
					this.$router.push({
						name: 'contest',
					})
				}).catch(() => {});
			},
			companyAddto() {
				console.log(this.companyAdd.companyTel)
				axios.post(specialUrl + 'organization/organization', {
						organizationName: this.companyAdd.companyName,
						organizationDepartment: this.companyAdd.companyDepart,
						organizationPosition: this.companyAdd.companyJob,
						organizationUsername: this.companyAdd.companyContacts,
						organizationAddr: this.companyAdd.companyAddress,
						organizationPostcode: this.companyAdd.companyPost,
						organizationPhone: this.companyAdd.companyTel,
						organizationEmail: this.companyAdd.companyMail,
						organizationTel: this.companyAdd.companyMobile,
						organizationQq: this.companyAdd.companyQ
					})
					.then(res => {
						if (res.data.code == 100001) {
							axios.get(specialUrl + 'organization/organization/all')
								.then(res => {
									this.companyDisplay = res.data.data;
								})
						} else {
							this.$alert('添加失败,请检查数据格式！', '提示！', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						}
					})
			},
			nameListDelet(index) {
				this.$confirm('确定删除吗？', '提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '我点错了',
					type: 'warning',
					center: true
				}).then(() => {
					axios.delete(specialUrl + 'judge/' + Number(this.nameList[index].judgeId))
						.then(res => {
							if (res.data.code == 100001) {
								this.$alert('删除成功！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										axios.get(specialUrl + 'judge/all')
											.then(res => {
												this.nameList = res.data.data;
											})
									}
								});
							}
						})
				}).catch(() => {});
			},
			reviewBegin() {
				//				this.reviewBeginButton
				axios.get(specialUrl + '', {
						params: {
							reviewBeginButton: true //开始评定
						}
					})
					.then(res => {})
			},
			exportScore() {
				axios.get(specialUrl + 'score/output/' + this.reviewRuleExport)
					.then(res => {
						this.downUrlScore = 'http://file.eqibian.com/' + res.data.data
					})
			},
			companyDelete(index) {
				this.$confirm('确定删除吗？', '提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '我点错了',
					type: 'warning',
					center: true
				}).then(() => {
					axios.delete(specialUrl + 'organization/organization/' + this.companyDisplay[index].organization_id)
						.then(res => {
							if (res.data.code == 100001) {
								this.$alert('删除成功！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										//										this.reload()
										//										console.log(this.tabsPick)
										//										this.tabsPick = 'tab3'
										axios.get(specialUrl + 'organization/organization/all')
											.then(res => {
												this.companyDisplay = res.data.data;
											})
									}
								});
							}
						})
				}).catch(() => {});
			}
		}
	}
</script>
<style scoped>
	li {
		list-style: none;
	}
	
	* {
		font-family: "microsoft yahei";
	}
	
	.manageTitle {
		position: relative;
		height: 60px;
		margin-top: 20px;
	}
	
	.manageBack {
		position: absolute;
		right: 20px;
		font-size: 13px;
	}
	
	.manageBack:hover {
		color: rgb(0, 153, 255);
		cursor: pointer;
	}
	
	.specialManageHome {
		width: 80%;
		margin: 0 auto;
	}
	
	.signSituation {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.signSituation p {
		padding: 10px;
	}
	
	.signSituation1,
	.signSituation2 {
		width: 40%;
		text-align: left;
	}
	
	.companyAdd {
		height: 350px;
		border: 2px solid #ebeef5;
		margin: 0 auto;
		margin-bottom: 40px;
		width: 80%;
		/*height: 300px;*/
	}
	
	.companyDisplay {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.companyDisplay p {
		padding: 10px;
		font-size: 15px;
	}
	
	.companyDisplay1,
	.companyDisplay2 {
		width: 40%;
		text-align: left;
		color: #606266;
	}
	
	.reviewContent {
		padding: 20px;
	}
	
	.reviewHead {
		margin-top: 20px;
		width: 100%;
		height: 50px;
	}
	
	.nameList {
		/*width: 80%;*/
		margin: 10px auto;
		/*height: 200px;*/
		border: 1px solid rgb(220, 223, 230);
	}
	
	.nameList li {
		height: 35px;
		line-height: 35px;
		/*padding: 10px 0;*/
		font-size: 16px;
	}
	
	.nameListName,
	.nameListTel,
	.nameListOp {
		display: inline-block;
		width: 200px;
		text-align: left;
	}
	
	.nameListOp {
		text-align: center;
		font-size: 16px;
		color: #000;
		cursor: pointer;
	}
	
	.nameListOp span:hover {
		color: rgb(51, 144, 255);
	}
	
	.noEvaluated {
		/*width: 80%;*/
		margin: 10px auto;
		/*height: 200px;*/
		border: 1px solid rgb(220, 223, 230);
	}
	
	.noEvaluated li {
		height: 35px;
		line-height: 35px;
		padding: 10px 0;
		font-size: 16px;
	}
	
	.noEvaluatedName,
	.noEvaluatedTel,
	.noEvaluatedNum {
		display: inline-block;
		width: 200px;
		text-align: left;
	}
	
	.noEvaluatedNum {
		text-align: center;
		font-size: 16px;
		color: #000;
	}
	
	.noEvaluated {
		/*width: 80%;*/
		margin: 10px auto;
		height: 200px;
		border: 1px solid rgb(220, 223, 230);
	}
	
	.companyDelete:hover {
		cursor: pointer;
	}
	
	.companyDelete {
		position: absolute;
		right: 80px;
		margin-top: 15px;
	}
	
	.specialScoreInqury {
		padding: 20px;
	}
	
	.scoreSearch .searchButton {
		float: left;
		margin-top: 20px;
	}
	
	.scoreSearch {
		width: 100%;
		height: 80px;
	}
	
	.scorePick {
		width: 100%;
		height: 50px;
		text-align: left;
		font-size: 14px;
	}
	
	.pickTitle {}
	
	.reviewRule1 {
		height: 200px;
		margin-bottom: 30px;
	}
	
	.reviewRule2 {
		margin-bottom: 30px;
	}
</style>