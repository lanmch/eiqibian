<template>
	<div class="review">
		<div class="reviewLeft">
			<el-button type='' style='width: 90%;margin: 20px auto;' @click="backToPer">返回个人中心</el-button>
			<div class="reviewNotice">
				<h2>评分须知</h2>
				<p style="font-size:9pt; line-height:22pt; margin:0pt 0pt 10pt; orphans:0; text-align:justify; widows:0"><span style="font-family:微软雅黑; font-size:9pt">本届电脑活动内容包括</span><span style="font-family:微软雅黑; font-size:9pt">：</span><span style="font-family:微软雅黑; font-size:9pt">“数字创作评比”、“创客竞赛”和“机器人竞赛”，</span><span style="font-family:微软雅黑; font-size:9pt">作品</span>
				<span
					style="font-family:微软雅黑; font-size:9pt">评比</span><span style="font-family:微软雅黑; font-size:9pt">注意事项如下：</span></p>
			<p style="line-height:22pt; margin:0pt 0pt 10pt 21.25pt; orphans:0; text-align:justify; text-indent:-21.25pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">(1)</span><span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span style="font-family:微软雅黑; font-size:9pt">有政治原则性错误和科学常识性错误的作品，取消参评资格。</span></p>
			<p style="line-height:22pt; margin:0pt 0pt 10pt 21.25pt; orphans:0; text-align:justify; text-indent:-21.25pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">(2)</span><span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span style="font-family:微软雅黑; font-size:9pt">严格杜绝弄虚作假行为，一经发现，取消该作品参评或获奖资格。并视情况取消其参赛学生和指导教师1-3年的参赛资格，将有关情况通报相关省级教育部门及所在学校。</span></p>
			<p
				style="line-height:22pt; margin:0pt 0pt 10pt 21.25pt; orphans:0; text-align:justify; text-indent:-21.25pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">(3)</span><span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span style="font-family:微软雅黑; font-size:9pt">不符合作品形态界定相关要求的作品，</span><span style="font-family:微软雅黑; font-size:9pt">取消参评资格。</span></p>
				<p
					style="line-height:22pt; margin:0pt 0pt 10pt 21.25pt; orphans:0; text-align:justify; text-indent:-21.25pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">(4)</span><span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span style="font-family:微软雅黑; font-size:9pt">评比指标</span></p>
					<ol type="a" style="margin:0pt; padding-left:0pt">
						<li style="font-family:微软雅黑; font-size:9pt; line-height:22pt; margin:0pt 0pt 10pt 12.14pt; orphans:0; padding-left:9.11pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">a.思想性、科学性、规范性</span></li>
					</ol>
					<p style="line-height:22pt; margin:0pt 0pt 10pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">作品主题明确，内容健康向上</span><span style="font-family:微软雅黑; font-size:9pt"> </span><span style="font-family:微软雅黑; font-size:9pt">，科学严谨，无常识性错误，同时非原创素材（含音乐）及内容应注明来源和出处</span></p>
					<ol start="2" type="a" style="margin:0pt; padding-left:0pt">
						<li style="font-family:微软雅黑; font-size:9pt; line-height:22pt; margin:0pt 0pt 10pt 12.91pt; orphans:0; padding-left:8.34pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">b.创新性</span></li>
					</ol>
					<p style="line-height:22pt; margin:0pt 0pt 10pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">作品主题和表达形式新颖，创作包含原创性内容，具备一定</span><span style="font-family:微软雅黑; font-size:9pt">的</span><span style="font-family:微软雅黑; font-size:9pt">创意、想象力和个性表现力</span></p>
					<ol start="3" type="a" style="margin:0pt; padding-left:0pt">
						<li style="font-family:微软雅黑; font-size:9pt; line-height:22pt; margin:0pt 0pt 10pt 11.68pt; orphans:0; padding-left:9.57pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">c.艺术性</span></li>
					</ol>
					<p style="line-height:22pt; margin:0pt 0pt 10pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">作品</span><span style="font-family:微软雅黑; font-size:9pt">能够</span><span style="font-family:微软雅黑; font-size:9pt">反映出作者有一定的审美能力和艺术表现能力，具有较好的视觉效果，设计完整，并能反映艺术</span><span style="font-family:微软雅黑; font-size:9pt">来源于</span>
						<span
							style="font-family:微软雅黑; font-size:9pt">生活</span>
					</p>
					<ol start="4" type="a" style="margin:0pt; padding-left:0pt">
						<li style="font-family:微软雅黑; font-size:9pt; line-height:22pt; margin:0pt 0pt 10pt 12.92pt; orphans:0; padding-left:8.33pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">d.技术性</span></li>
					</ol>
					<p style="line-height:22pt; margin:0pt 0pt 10pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">作品选用制作软件和表现技巧恰当，技术运用准确、适当，设计说明内容清晰，相关设计符合标准</span><span style="font-family:微软雅黑; font-size:9pt">、规范、</span><span style="font-family:微软雅黑; font-size:9pt">工艺及</span><span style="font-family:微软雅黑; font-size:9pt">平台</span>
						<span
							style="font-family:微软雅黑; font-size:9pt">要求，作品</span><span style="font-family:微软雅黑; font-size:9pt">完成度高</span></p>
					<ol start="5" type="a" style="margin:0pt; padding-left:0pt">
						<li style="font-family:微软雅黑; font-size:9pt; line-height:22pt; margin:0pt 0pt 10pt 12.27pt; orphans:0; padding-left:8.98pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">e.团队展示与协作</span></li>
					</ol>
					<p style="line-height:22pt; margin:0pt 0pt 10pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:9pt">需</span><span style="font-family:微软雅黑; font-size:9pt">进行</span><span style="font-family:微软雅黑; font-size:9pt">作品</span><span style="font-family:微软雅黑; font-size:9pt">说明</span><span style="font-family:微软雅黑; font-size:9pt">时应</span>
						<span
							style="font-family:微软雅黑; font-size:9pt">提交</span><span style="font-family:微软雅黑; font-size:9pt">展现出作品的设计思路、制作过程和功能实现情况,</span><span style="font-family:微软雅黑; font-size:9pt">团队协作分工明确、合理；团队成员充分参与、协作配合</span><span style="font-family:微软雅黑; font-size:9pt">。</span></p>
			</div>
		</div>
		<div class="reviewRight">
			<h2>尊敬的{{userName}}老师您好！您有{{taskNum}}个作品需要处理~</h2>
			<p class="reviewTips">注意：总分将自动生成 成绩一旦提交无法修改，请老师确认后提交！</p>

			<el-table :data="tableData" border width="840" align='center' header-align='center'>
				<el-table-column label="序号" type='index' width="55" >
				</el-table-column>
				
				<el-table-column label="作品链接" width="100">
					<template scope="scope">
						<a :href="scope.row.reviewLink" download="filename">点击下载</a>
						<!--<span>{{scope.row.reviewLink}}</span>-->
					</template>
</el-table-column>
<el-table-column label="思想性、科学性、规范性" width="98">
	<template scope="scope">
						<el-input v-model.number="scope.row.score1" size="small" :disabled="scope.row.ifReview"></el-input>
					</template>
</el-table-column>
<el-table-column label="创新性" width="98">
	<template scope="scope">
						<el-input v-model.number="scope.row.score2" size="small" :disabled="scope.row.ifReview"></el-input>
					</template>
</el-table-column>
<el-table-column label="艺术性" width="98">
	<template scope="scope">
						<el-input v-model.number="scope.row.score3" size="small" :disabled="scope.row.ifReview"></el-input>
					</template>
</el-table-column>
<el-table-column label="技术性" width="98">
	<template scope="scope">
						<el-input v-model.number="scope.row.score4" size="small" :disabled="scope.row.ifReview"></el-input>
					</template>
</el-table-column>
<el-table-column label="团队展示与协作" width="98">
	<template scope="scope">
						<el-input v-model.number="scope.row.score5" size="small" :disabled="scope.row.ifReview"></el-input>
					</template>
</el-table-column>
<el-table-column prop='scoreAll' label="总分" width="98">
</el-table-column>
<el-table-column label="操作" width="55">
	<template slot-scope="scope">
						<el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">提交</el-button>
					</template>
</el-table-column>
</el-table>

<!--<ul>
					<li>x x x x x xx x x </li>
					<li v-for = '(item,index) in reviewScore'>
						{{index}} 
						{{item.reviewLink}}
						<el-input v-model.number="item.score1" size="small" :disabled="ifReview"></el-input>
						<el-input v-model.number="item.score2" size="small" :disabled="ifReview"></el-input>
						<el-input v-model.number="item.score3" size="small" :disabled="ifReview"></el-input>
						<el-input v-model.number="item.score4" size="small" :disabled="ifReview"></el-input>
						<el-input v-model.number="item.score5" size="small" :disabled="ifReview"></el-input>
						{{scoreAll}}
					</li>
				</ul>-->
</div>

</div>
</template>

<script>
	var specialUrl = 'http://148.70.213.160/web'
	var specialUrlMan = 'http://148.70.213.160/manage'
	import axios from 'axios'
	import Element from 'element-ui'
	export default {
		inject: ['reload'],
		name: 'review',
		data() {
			return {
				userName: '',
				phoneNum: '',
				taskNum: '',
				judgeNotice: '',
				ifNotice: '',
				notDoneTasks: [],
				reviewScore: []
			}
		},
		mounted() {
			this.GLOBAL.userId = localStorage.getItem('userId');
			axios.get(this.GLOBAL.urlHead + '/user/userDetail', {
					params: {
						userId: this.GLOBAL.userId
					}
				})
				.then(res => {
					this.userName = res.data.data.user.userRealname;
					this.phoneNum = res.data.data.user.userPhone;
					axios.get(specialUrl + '/user/task/notDoneTaskNum/' + Number(this.phoneNum))
						// + Number(this.phoneNum) 18225039892
						.then(res => {
							console.log(this.phoneNum)
							if (res.data.code == 100001) {
								this.taskNum = res.data.data;
							} else {
								this.taskNum = Number(res.data.data);
							}
						}),
						axios.get(specialUrl + '/user/task/notDoneTasks/' + Number(this.phoneNum))
						.then(res => {
							this.notDoneTasks = res.data.data;
							for (var i in this.notDoneTasks) {
								axios.get(specialUrlMan + '/file/url/teamId/' + this.notDoneTasks[i]["task_team_id"])
									.then(res => {
										this.reviewScore.push({
											reviewLink: res.data.data
										})
									})
							}
							console.log(this.reviewScore)
						})
				})
		},
		computed: {
			tableData() {
				this.reviewScore.map((v, i) => {
					v.scoreAll = parseFloat((v.score1 + v.score2 + v.score3 + v.score4 + v.score5) / 5.0)
				});
				return this.reviewScore
			}
		},
		methods: {
			handleClick(index, row) {
				axios.post(specialUrl + '/user/submit/score', {
						scoreTeamId: this.notDoneTasks[index].task_team_id,
						scoreOne: Number(this.reviewScore[index].score1),
						scoreTwo: Number(this.reviewScore[index].score2),
						scoreThree: Number(this.reviewScore[index].score3),
						scoreFour: Number(this.reviewScore[index].score4),
						scoreFive: Number(this.reviewScore[index].score5),
						scoreJudgeId: this.notDoneTasks[index].task_judge_id
					})
					.then(res => {
						if (res.data.code == 100001) {
							var obj = this.reviewScore[index];
							obj.ifReview = true;
							this.reviewScore.splice(index, 1, {
								obj
							});
							this.$alert('提交成功！', '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.reload()
								}
							});
						} else {
							this.$alert('提交失败，请检查打分是否合乎规则！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						}
					})
			},
			backToPer() {
				this.$confirm('未提交的成绩将不会保留，确定退出评审系统吗？', '提示', {
					confirmButtonText: '确定返回',
					cancelButtonText: '继续评审',
					type: 'warning',
					center: true
				}).then(() => {
					this.$router.push({
						name: 'personalInfo',
					})
				}).catch(() => {
					//					this.$message({
					////						type: 'info',
					////						message: '已取消删除'
					//					});
				});
			}
		}
	}
</script>

<style scoped>
	* {
		font-family: "microsoft yahei";
	}
	
	.review {}
	
	.review h2 {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.reviewNotice {
		width: 77%;
		font-size: 14px;
		border: 1px solid #dcdfe6;
		padding: 20px;
		border-radius: 15px;
		color: #909399;
	}
	
	.reviewLeft {
		float: left;
		width: 27%;
		margin-bottom: 30px;
	}
	
	.reviewRight {
		float: left;
		width: 800px;
		margin-top: 20px;
		margin-bottom: 30px;
	}
	
	.reviewRight .reviewTips {
		font-size: 12px;
		float: right;
		margin-bottom: 10px;
	}
</style>