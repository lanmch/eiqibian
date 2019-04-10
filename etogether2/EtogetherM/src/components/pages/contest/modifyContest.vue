<template>
    <div class="modifyContest">
        <div style="margin-bottom:30px;"><router-link to="/contest"><el-button type="primary">返回</el-button></router-link></div>
        <el-form>
            <el-form-item>
                <h1>比赛题目：{{oldTitle}}</h1><el-input v-model="contestTitle"></el-input>
            </el-form-item>
            <el-form-item>
                <h1>比赛摘要：</h1><div style="line-height:20px;">{{oldAbs}}</div><el-input type="textarea" :rows="8" v-model="contestContent"></el-input>
            </el-form-item>
            <el-form-item>
                <h1>原比赛报名时间：{{contestTimeOld}}</h1><el-date-picker
                v-model="timeAll" value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <h1>原比赛时间：{{contestAllOld}}</h1><el-date-picker
                    v-model="contestTime" value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="changeContest">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name:'modifyContest',
    data(){
        return{
            contestTime:'',
            timeAll:[],
            contestContent: '',
            contestTitle:'',
            contestTimeOld:'',
            contestAllOld:'',
            oldTitle:'',
            oldAbs:''
        }
    },
    methods:{
        changeContest(){
            var timeEnd, timeStart, title, content;
            if(this.contestTitle==''){
                title = this.oldTitle;
            }else{
                title = this.contestTitle
            }
            if(this.contestContent==''){
                content = this.oldAbs
            }else{
                content = this.contestContent
            }
            if(this.contestTime!=''){
                 for(let i = 0; i < this.contestTime.length; i++){   
                    this.contestTime = this.contestTime.replace(/-/g,'.')
                };
                this.contestTimeOld = this.contestTime
            }
            if(this.timeAll!=''){
                for(let i = 0; i < this.timeAll[0].length; i++){
                    this.timeAll[0] = this.timeAll[0].replace(/-/g,'.')
                    this.timeAll[1] = this.timeAll[1].replace(/-/g,'.')
                };
                timeEnd = this.timeAll[1];
                timeStart = this.timeAll[0];
            }else{
                timeEnd = this.$route.params.contestEndTime;
                timeStart = this.$route.params.contestStartTime;
            }
            if(this.contestTime!=''||this.timeAll!=''||this.contestTitle!=''||this.contestContent!=''){
                axios.post(this.GLOBAL.urlHead+'/manage/contest/updateContest',{
                    contestId:this.$route.params.contestId,
                    contestName:title,
                    contestContext:content,
                    contestStartTime: timeStart,
                    contestEndTime: timeEnd,
                    contestDuringTime: this.contestTimeOld
                    }).then(res=>{

                        if(res.data.code == 100001){
                            this.$alert('比赛基本信息修改成功','提示',{
                                callback: action=>{
                                    this.$router.go(-1)
                                }
                            })
                        }
                    })
            }else if(this.contestTitle==''&&this.contestContent==''&&this.timeAll==''&&this.contestTime==''){
                this.$alert('信息未修改','提示',{
                    callback: action=>{

                    }
                })
            }
            
        }
    },
    mounted(){
        var timeSE = []
        this.oldTitle = this.$route.params.contestTitle;
        this.contestTimeOld = this.$route.params.contestStartTime + '-' + this.$route.params.contestEndTime
        this.contestAllOld = this.$route.params.contestTime;
        this.oldAbs = this.$route.params.contestAbs
    }
}
</script>

<style scoped>
.modifyContest{
    padding: 20px 200px;
}
</style>
