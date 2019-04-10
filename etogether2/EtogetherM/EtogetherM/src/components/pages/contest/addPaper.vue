<template>
    <div class="all">
        <div style='margin-bottom:20px;'><el-button @click="goback()" type='success'>返回</el-button></div>
        <div class="time">
            <span>测试时长：<div class="inputbox" ><el-input type='number' v-model="timeall" placeholder="请直接输入数字，以分钟为单位（不输入单位），如52、23"></el-input></div></span>
        </div>
        
        <div class="oneChose">
            <h3>添加单选题：</h3>
            <div class="oneDetail">
                <span>题目：<div class="inputbox"><el-input v-model="oneQuestion" type='textarea' :rows=3></el-input></div></span>
                <span>分值：<div class="inputbox"><el-input type='number' v-model="oneScore" placeholder="整数分值，无单位（如2、3、10）"></el-input></div></span>
                <span>A：<div class="inputbox"><el-input type="textarea" v-model="oneA"></el-input></div></span>
                <span>B：<div class="inputbox"><el-input type="textarea" v-model="oneB"></el-input></div></span>
                <span>C：<div class="inputbox"><el-input type="textarea" v-model="oneC"></el-input></div></span>
                <span>D：<div class="inputbox"><el-input type="textarea" v-model="oneD"></el-input></div></span>
                <span>正确答案：<el-radio v-model="radio" label="A">A</el-radio>
                                <el-radio v-model="radio" label="B">B</el-radio>
                                <el-radio v-model="radio" label="C">C</el-radio>
                                <el-radio v-model="radio" label="D">D</el-radio></span>
            </div>
            <div class="btn"><el-button type='primary' @click="addOne">继续添加单选题</el-button></div>
        </div>

        <div class="oneChose">
            <h3>添加多选题：</h3>
            <div class="oneDetail">
                <span>题目：<div class="inputbox"><el-input v-model="twoQuestion" type='textarea' :rows=3></el-input></div></span>
                <span>分值：<div class="inputbox"><el-input type='number' v-model="twoScore" placeholder="整数分值，无单位（如2、3、10）"></el-input></div></span>
                <span>A：<div class="inputbox"><el-input type="textarea" v-model="twoA"></el-input></div></span>
                <span>B：<div class="inputbox"><el-input type="textarea" v-model="twoB"></el-input></div></span>
                <span>C：<div class="inputbox"><el-input type="textarea" v-model="twoC"></el-input></div></span>
                <span>D：<div class="inputbox"><el-input type="textarea" v-model="twoD"></el-input></div></span>
                
                <span>正确答案：<el-checkbox-group v-model="checkList">
                                <el-checkbox label="A"></el-checkbox>
                                <el-checkbox label="B"></el-checkbox>
                                <el-checkbox label="C"></el-checkbox>
                                <el-checkbox label="D"></el-checkbox></el-checkbox>
                            </el-checkbox-group></span>
            </div>
            <div class="btn"><el-button type='primary' @click="addTwo">继续添加多选题</el-button></div>
        </div>

        <div class="oneChose">
            <h3>添加编程题：</h3>
            <div class="oneDetail">
                <span>题目：<div class="inputbox"><el-input v-model="proQuestion" type='textarea' :rows=3></el-input></div></span>
                <span>分值：<div class="inputbox"><el-input type='number' v-model="proScore" placeholder="整数分值，无单位（如2、3、10）"></el-input></div></span>
                <span>问题描述：<div class="inputbox"><el-input type="textarea" v-model="proDes"></el-input></div></span>
                <span>问题答案：<div class="inputbox"><el-input type="textarea" v-model="proAns"></el-input></div></span>
                <span>选择语言：<div class="inputbox"><el-select v-model="language" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select></div></span>
            </div>
            <div class="btn"><el-button type='primary' @click="addPro">继续添加编程题</el-button></div>
        </div>
        <div><el-button type='danger' @click="upPaper">上传试卷</el-button></div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
var oneChoiceQuestion = [];
var multipleChoiceQuestion = [];
var progammingQuestion = [];
var oneChoiceAns = [];
var multipleChoiceAns = [];
var progammingAns = [];
var i = 1;
var alltime = 0;
export default {
    name:'addPaper',
    data(){
        return{
            timeall: '',
            oneQuestion:'',
            oneScore:'',
            oneA:'',
            oneB:'',
            oneC:'',
            oneD:'',
            radio: '',
            twoQuestion:'',
            twoScore:'',
            twoA:'',
            twoB:'',
            twoC:'',
            twoD:'',
            checkList: [],
            proQuestion:'',
            proScore:'',
            proDes:'',
            options: [{
                value: '选项1',
                label: 'Python'
                }],
            language: '',
            proAns:''

        }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        addOne(){
            if(this.oneQuestion==''||this.oneScore==''||this.oneA==''||this.oneB==''||this.oneC==''||this.oneD==''||this.radio==''){
                    this.$alert('请将多选题相关信息补充完整','提示',{
                    callback: action=>{

                    }
                })
                
            }else{
                let oneQues = {
                    questionId: i,     //问题id可以自己限定，但是要与下面的答案快照中的每一题对应，推荐按照题目顺序排列
                    questionTitle: this.oneQuestion,
                    questionOption:{
                        optionA:this.oneA.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                        optionB:this.oneB.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                        optionC:this.oneC.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                        optionD:this.oneD.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
                    },
                    questionScore:this.oneScore    //问题分数
                };
                oneChoiceQuestion.push(oneQues);

                let oneAns = {
                    questionId:i,
                    questionAns:[this.radio],
                    questionScore:this.oneScore
                };
                oneChoiceAns.push(oneAns);
                i = i + 1;
                this.$alert('此题添加成功，请继续添加下一题','提示',{
                    callback: action=>{

                    }
                })
                this.oneQuestion=''
                this.oneScore=''
                this.oneA=''
                this.oneB=''
                this.oneC=''
                this.oneD=''
                this.radio=''
                
            }
        },
        addTwo(){
            if(this.twoQuestion==''||this.twoScore==''||this.twoA==''||this.twoB==''||this.twoC==''||this.twoD==''||this.checkList==[]){
                this.$alert('请将单选题相关信息补充完整','提示',{
                callback: action=>{

                }
            })
            }else{
                let twoQues = {
                    questionId: i,     //问题id可以自己限定，但是要与下面的答案快照中的每一题对应，推荐按照题目顺序排列
                    questionTitle: this.twoQuestion,
                    questionOption:{
                        optionA:this.twoA.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                        optionB:this.twoB.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                        optionC:this.twoC.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                        optionD:this.twoD.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
                    },
                    questionScore:this.twoScore    //问题分数
                };
                multipleChoiceQuestion.push(twoQues);

                let twoAns = {
                    questionId:i,
                    questionAns:this.checkList,
                    questionScore:this.twoScore
                };
                multipleChoiceAns.push(twoAns);
                
                i = i + 1;
                this.$alert('此题添加成功，请继续添加下一题','提示',{
                    callback: action=>{

                    }
                })
                this.twoQuestion=''
                this.twoScore=''
                this.twoA=''
                this.twoB=''
                this.twoC=''
                this.twoD=''
                this.checkList=[]
                
            }
            
        },
        addPro(){
            if(this.proQuestion==''||this.proScore==''||this.proDes==''||this.proAns==''||this.language==''){
                this.$alert('请将编程题表单补充完整','提示',{
                callback: action=>{

                }
            })
            }else{
                let proQues = {
                    questionId:i,
                    questionTitle:this.proQuestion.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                    questionOption:this.proDes.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                    questionScore:this.proScore,
                    questionLanguage:1
                }
                progammingQuestion.push(proQues)

                let proAns = {
                    questionId:i,
                    questionAns:[
                        this.proAns.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;') + '\n'
                    ],
                    questionScore:this.proScore
                }

                progammingAns.push(proAns)
                i = i+1
                this.$alert('此题添加成功，请继续添加下一题！','提示',{
                    callback: action=>{

                    }
                })
                this.proQuestion = ''
                this.proScore = '';
                this.proDes = '';
                this.proAns = '';

            }
        },
        
        upPaper(){
            alltime = Number(this.timeall)
            var dataHead = {
                contestId: this.$route.params.contestId,
                    paperDuration: alltime,
                    paperSnapshot:{
                        oneChoiceQuestion: oneChoiceQuestion,
                        multipleChoiceQuestion: multipleChoiceQuestion,
                        programmingQuestion: progammingQuestion
                    },
                    paperAnswerSnapshot:{
                        oneChoiceQuestion: oneChoiceAns,
                        multipleChoiceQuestion: multipleChoiceAns,
                        programmingQuestion: progammingAns
                    }
            }
            if(alltime = '' || alltime == 0){
                this.$alert('请填写考试时间！','提示',{
                callback: action=>{

                }
            })
                
            }else{
                axios.post(this.GLOBAL.urlHead + '/manage/paper/createPaper',dataHead)
                .then(res=>{
                    if(res.data.code == 100001){
                        this.$alert('添加成功！','提示',{
                            callback: action=>{
                                this.$router.go(-1)
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.all{
    padding: 20px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h3{
    margin-bottom: 10px;
}
.oneChose .oneDetail span{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.time{
    width: 480px;
    margin-bottom: 20px;
}
.time span{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.inputbox{
    width: 400px;
}
.oneChose{
    width: 480px;
}
.btn{
    margin:10px 0 20px 0;
}

</style>
