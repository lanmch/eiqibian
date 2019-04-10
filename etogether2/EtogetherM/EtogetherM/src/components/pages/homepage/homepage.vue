<template>
    <div class="homepage">
        <h3>当前注册总人数：<span>{{totalAllPeo}}</span> 人</h3>
        <!-- <div class="contestNum">重庆市青少年机器人等级考试报名总人数：<span>1213</span> 人</div> -->
        <router-link to="/teaANDstu"  v-show="ifRole"><el-button type="primary">增加师生互动</el-button></router-link>
        <router-link to="/contestDetail"><el-button type="primary">查看赛事报名情况</el-button></router-link>

        

        <div class="table">
            <el-table
                :data="tableData1"
                height="400"
                border
                style="width:30%;">
                <el-table-column
                prop="notice"
                label="通知下载排行"
                >
                </el-table-column>
                
            </el-table>
            <el-table
                :data="tableData2"
                height="400"
                border
                style="width:30%;">
                <el-table-column
                prop="course"
                label="课程观看排行"
                >
                </el-table-column>
            </el-table>
            <el-table
                :data="tableData3"
                height="400"
                border
                style="width:30%;">
                <el-table-column
                prop="project"
                label="题库热度排行" >
                </el-table-column>
            </el-table>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            tableData3:[],
            tableData1:[],
            tableData2:[],
            totalAllPeo: 0,
            ifRole: false
        }
    },
    methods:{
        


    },
    mounted(){
        console.log(localStorage.getItem('adminRole'))
        console.log(localStorage.getItem('account'))
        console.log (localStorage.getItem('passwd'))
        if(localStorage.getItem('adminRole')=='区县观察员'){
            this.ifRole = false
        }else{
            this.ifRole = true
        }
        var noticeList=[]; 
        var questionList=[];
        var courseList = [];
        axios.get(this.GLOBAL.urlHead+'/manage/article/getArticleRankingList')
        .then(res=>{

            noticeList = res.data.data;
            for(let i = 0; i < noticeList.length; i++){
                this.tableData1.push({notice:'【'+ noticeList[i].articleLabel + '】' + noticeList[i].articleTitle})
            };
        });       
        axios.get(this.GLOBAL.urlHead+'/manage/question/getQuestionRankingList')
        .then(res=>{

            questionList = res.data.data;
            for(let i = 0; i < questionList.length; i++){
                this.tableData3.push({project:'【'+ questionList[i].questionLabel + '】'+ '【'+ questionList[i].questionLanguage + '】' + questionList[i].questionTitle})
            };
        });
        axios.get(this.GLOBAL.urlHead+'/manage/course/home',{
            params:{
                currentPage: 1,
                pageSize: 20
            }
        }).then(res=>{
            courseList = res.data.data.courseList;
            for(let i = 0; i < courseList.length; i++){
                this.tableData2.push({course:'【'+courseList[i].courseLanguage +'】' + courseList[i].courseTitle})
            }
        })
        
        axios.get(this.GLOBAL.urlHead + '/manage/user/userList ',{
            params:{
                currentPage:1,
                pageSize:1
            }
        })
        .then(res=>{
            this.totalAllPeo = res.data.data.total
        })
        
    }
}
</script>
<style scoped>
.homepage{
    margin-top: -1px;
}
h3 span{
    font-size: 32px;
    color: green;
}
h3{
    font-size: 24px;
    padding: 30px 0;
}
.contestNum{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}
.contestNum span{
    font-size: 32px;
    color: green;
}
.table{
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    margin-top: 20px;
    width: 1500px;
}
.el-table th>.cell{
    font-size: 25px;
}
</style>
