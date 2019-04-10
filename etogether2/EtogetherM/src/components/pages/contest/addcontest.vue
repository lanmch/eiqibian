<template>
    <div class="addcontest">
        <div><router-link to="/contest"><el-button type="primary">返回</el-button></router-link></div>
        <div><span>赛事名称：</span><el-input v-model="contestName"></el-input></div>
        <div><span>赛事简介：</span><el-input type="textarea" :rows="8" v-model="contestAbs"></el-input></div>
        <div><span>报名时间：</span>
            <el-date-picker
            v-model="timeAll" value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker></div>
        <div><span>参赛时间：</span><el-date-picker
            v-model="contestTime" value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
            </el-date-picker></div>
        <div><el-button type="danger" @click="addContest">添加</el-button></div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    inject:['reload'],
    data(){
        return{
            timeAll:'',
            contestTime:'',
            contestName:'',
            contestAbs:''
        }
    },
    methods:{
        addContest(){
            if(this.timeAll==''||this.contestTime==''||this.contestName==''||this.contestAbs==''){
                this.$alert('请将表单信息补充完整','提示',{
                callback: action=>{

                }
            })
            }else{
                for(let i = 0; i < this.contestTime.length; i++){
                    this.timeAll[0] = this.timeAll[0].replace(/-/g,'.')
                    this.timeAll[1] = this.timeAll[1].replace(/-/g,'.')
                    this.contestTime = this.contestTime.replace(/-/g,'.')
                }
                axios.post(this.GLOBAL.urlHead + '/manage/contest/addContest',{
                    contestName: this.contestName,
                    contestContext: this.contestAbs,
                    contestStartTime: this.timeAll[0],
                    contestEndTime: this.timeAll[1],
                    contestDuringTime: this.contestTime
                    }
                ).then(res=>{

                    if(res.data.code == 100001){
                        this.$alert('添加比赛成功','提示',{
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
.addcontest{
    padding: 20px 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.addcontest div{
    width: 70%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
