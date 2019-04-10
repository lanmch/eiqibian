<template>
    <div class="addnotice">
        <div style="text-align:left;"><router-link to="/project"><el-button type="primary">返回</el-button></router-link></div>
        <div class="formAll">
        <el-form ref="form"  label-width="80px">
            <div style="width:300px;">
                <el-form-item label="题目标题">
                    <el-input v-model="questionTitle"></el-input>
                </el-form-item>
            </div>
            <div style="width:300px;">
                <el-form-item label="题目种类">
                    <el-select v-model="questionType" placeholder="请选择题目种类">
                    <el-option label="Python" value=1></el-option>
                    <el-option label="Scratch" value=2></el-option>
                    <el-option label="C++" value=3></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div style="width:300px;">
                <el-form-item label="题目难度">
                    <el-select v-model="questionLabel" placeholder="请选择题目种类">
                    <el-option label="初级" value=1></el-option>
                    <el-option label="中级" value=2></el-option>
                    <el-option label="高级" value=3></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="程序描述">
                    <el-input type="textarea" :rows="4" v-model="questionOption"></el-input>
                </el-form-item>
            </div>
            <!-- <div>
                <el-form-item label="程序代码">
                    <el-input type="textarea"></el-input>
                    <div style="margin-top:20px;"><el-button type="danger">测试运行</el-button></div>
                </el-form-item>
            </div> -->
            <!-- <div>
                <el-form-item label="结果展示">
                <el-input type="textarea"></el-input>
                </el-form-item>
            </div> -->
            <div>
                <el-form-item label="问题答案">
                    <el-input type="textarea" :rows="3" v-model="questionAns"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item>
                    <el-button type="primary" @click="pulishQuestion">发布题目</el-button>
                </el-form-item>
            </div>
        </el-form>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    inject:['reload'],
    data(){
        return{
            questionTitle:'',
            questionType:'',
            questionLabel:'',
            questionOption:'',
            questionAns:'',
        }
    },
    methods:{
        pulishQuestion(){
            if(this.questionTitle==''||this.questionType==''||this.questionLabel==''||this.questionOption==''||this.questionAns==''){
                this.$alert('请将表单信息补充完整','提示',{
                    callback: action=>{

                    }
                })
            }else if(this.questionType=='2' || this.questionType=='3'){
                this.$alert('暂不支持此语言','提示',{
                    callback: action=>{

                    }
                })
            }else{
                axios.post(this.GLOBAL.urlHead+'/manage/question/addProgrammingQuestion',{
                    questionTitle: this.questionTitle,      
                    questionOption: this.questionOption,
                    questionAns: this.questionAns,
                    questionLabel: this.questionLabel,
                    questionLanguage: this.questionType
                }).then(res=>{
                    this.$alert('题目发布成功','提示',{
                        callback: action=>{
                            this.reload();
                            this.$router.go(-1);
                        }
                    })
                })
            }
        }
    }
}
</script>

<style scoped>
.addnotice{
    padding: 20px 80px;
}
.formAll{
    margin-top: 20px;
}
.el-input__inner{
    width: 100px;
}
</style>
