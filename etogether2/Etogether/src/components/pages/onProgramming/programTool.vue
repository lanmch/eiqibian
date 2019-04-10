<template>
	<div class="onProDetail">
		<div class="onProBTN">
			<div class="onProBTNLeft"><div class="BTNrun" @click="runCode">点击运行</div><div class="BTNclear" @click="clearCode">清空</div></div>
			<div><el-select v-model="value" placeholder="请选择">
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="onProLR">
			<div class="onProL">
				<editor style="font-size:18px;" v-model="content" @init='editorInit' lang="python" theme="clouds" width="520" height="300"></editor>
				<!-- <editor :content="content"></editor> -->
				
			</div>
			<!--<div class="onProR">{{programResult}}</div>-->
			<div class="onProR" v-html="programResult.replace(/\r?\n/g, '<br /><blockquote />')"> </div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
	components:{
		editor: require('vue2-ace-editor')
	},
	data(){
		return{
			options: [{
				value: 'Python',
				label: 'Python3'
			}],
			value: 'Python',
			content:'',
			programResult: ''
		}
	},
	mounted() {

	},
	methods:{
		editorInit(){
			require('brace/ext/language_tools');
			require('brace/mode/python');
			require('brace/theme/clouds');
			require('brace/snippets/python');
		},
		runCode(){
			if(this.value == ''){
//				alert('请选择语言！')
				this.$alert('请选择语言！', '登录消息', {
								confirmButtonText: '确定',
							});
			}else{
				axios({
					method:'post',
					url:this.GLOBAL.urlHead+'/run',
					data: qs.stringify({
						code: this.content
					}),
					headers:{
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(res=>{
					this.programResult = res.data.output
					this.$emit('proAns',this.programResult)
				})
			}
		},
		clearCode(){
			
			this.content = '';
			this.$alert('清除成功！', '提示', {
									confirmButtonText: '确定',
									callback: action => {
										
									}
								})
		}
	}
}
</script>


<style scoped>
	.onProDetail {
		/* clear: both;
		background: gray;
		height: 230px;
		margin-bottom: 30px; */
		display: flex;
		flex-direction: column;
		background-color: #eee;
		padding: 20px;
		margin-bottom: 20px;
		border-radius: 10px;
	}
	.onProLR{
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
	}
	.onProR{
		border-radius: 10px;
		width: 520px;
		height: 300px;
		padding-left: 20px;
		padding-top: 10px;
		background-color: #fff;
	}
	.onProBTN{
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		width: 520px;
		margin-bottom: 20px;
	}
	.onProBTNLeft{
		border-radius: 10px;
		display: flex;
		width: 45%;
		justify-content: space-between;
	}
	.BTNrun{
		border-radius: 5px;
		width: 100px;
		height: 35px;
		text-align: center;
		line-height: 35px;
		background-color: #00b7ee;;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
	}
	.BTNclear{
		border-radius: 5px;
		width: 100px;
		height: 35px;
		text-align: center;
		line-height: 35px;
		background-color: #fff;
		color: #0099ff;
		cursor: pointer;
	}
	.ace_line{
		border-radius: 10px;
		font-family: 'SimHei';
		
	}
</style>