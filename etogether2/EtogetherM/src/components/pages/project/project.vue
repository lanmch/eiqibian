<template>
    <div class="project">
        <div class="noticeHead">
            <div class="noticeHeadLeft"><span>共有<span class="noticeNum">{{totalPro}}</span>个题目</span> <router-link to="/addproject"><el-button type="primary">增加题目</el-button></router-link></div>
            <!-- <div>搜索</div> -->
        </div>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部题目" name="first">
                    <ul class="noticeList">
                        <li v-for="(item,index) in proList"><span class="noticeListTitle">【{{item.questionLabel}}】{{item.questionTitle}}</span>                        
                        <div><el-button size="mini" type="primary" @click="seeProgram(index)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteProgram(index)">删除</el-button></div></li>
                    </ul>
                    
                </el-tab-pane>
                <el-tab-pane label="Python" name="second">
                    <ul class="noticeList">
                        <li v-for="(item,index) in proList"><span class="noticeListTitle">【{{item.questionLabel}}】{{item.questionTitle}}</span>                        
                        <div><el-button size="mini" type="primary" @click="seeProgram(index)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteProgram(index)">删除</el-button></div></li>
                    </ul>
                    
                </el-tab-pane>
                <el-tab-pane label="Scratch" name="third">
                    <ul class="noticeList">
                        <li v-for="(item,index) in proList"><span class="noticeListTitle">【{{item.questionLabel}}】{{item.questionTitle}}</span>                        
                        <div><el-button size="mini" type="primary" @click="seeProgram(index)">修改</el-button>
                        <el-button size="mini" type="danger"@click="deleteProgram(index)">删除</el-button></div></li>
                    </ul>
                    
                </el-tab-pane>
                <el-tab-pane label="C++" name="fourth">
                    <ul class="noticeList">
                        <li v-for="(item,index) in proList"><span class="noticeListTitle">【{{item.questionLabel}}】{{item.questionTitle}}</span>                        
                        <div><el-button size="mini" type="primary" @click="seeProgram(index)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteProgram(index)">删除</el-button></div></li>
                    </ul>
                    
                </el-tab-pane>
            </el-tabs>
            <div class="pageNa">
                        <el-pagination
                            background @current-change="changePage" :current-page='currentPage'
                            layout="prev, pager, next"
                            :total="pageTotal">
                        </el-pagination>
                    </div>
        </div>
        <div class="proAlert" v-show="ifAdd">
            <el-input v-model='proTitle' placeholder="题目"></el-input>
            <el-input v-model="proDes" placeholder="问题描述" type="textarea" :rows="8"></el-input>
            <el-input v-model="proAns" placeholder="答案"></el-input>
            <div><el-button type="danger" @click="changePro">修改</el-button>
                <el-button type="primary" @click="closeAlert">关闭</el-button></div>
        </div>
    </div>
</template>
<script>
var pageNow = 1
import axios from 'axios'
axios.defaults.withCredentials = true
var tabIndex = 'first'
var questionId
export default {
    inject:['reload'],
    data(){
        return{
            activeName:'first',
            proList:[],
            pageTotal: 10,
            totalPro: 0,
            currentPage: 0,
            proTitle:'',
            proDes: '',
            proAns: '',
            ifAdd:false
        }
    },
    mounted(){
        this.activeName = tabIndex;
        pageNow = 1;
        axios.get(this.GLOBAL.urlHead+'/manage/question/getQuestionNum')
        .then(res=>{
            this.totalPro = res.data.data
        })
        axios.post(this.GLOBAL.urlHead+'/manage/question/getQuestionList',{
            pageNum:pageNow,
            filterByLanguage:1,
            filterByLabel: 0
        }).then(res=>{
            this.currentPage = pageNow
            this.proList = res.data.data.programList;
            this.pageTotal = res.data.data.totalPages * 10;
        })
    },
    methods:{
        changePage(index){
            pageNow = index
            axios.post(this.GLOBAL.urlHead+'/manage/question/getQuestionList',{
                pageNum:pageNow,
                filterByLanguage:1,
                filterByLabel: 0
            }).then(res=>{
                this.currentPage = pageNow
                this.proList = res.data.data.programList;
                this.pageTotal = res.data.data.totalPages * 10;
            })
        },
        handleClick(tab, event){
            if(tab.index==0){
                pageNow = 1
                axios.post(this.GLOBAL.urlHead+'/manage/question/getQuestionList',{
                    pageNum:1,
                    filterByLanguage:0,
                    filterByLabel: 0
                }).then(res=>{
                    this.currentPage = pageNow
                    this.proList = res.data.data.programList;
                    this.pageTotal = res.data.data.totalPages*10;
                    tabIndex = 'first'
                })
            }else if(tab.index == 1){
                pageNow = 1
                axios.post(this.GLOBAL.urlHead+'/manage/question/getQuestionList',{
                    pageNum:1,
                    filterByLanguage:1,
                    filterByLabel: 0
                }).then(res=>{
                    this.currentPage = pageNow
                    this.proList = res.data.data.programList;
                    this.pageTotal = res.data.data.totalPages*10;
                    tabIndex = 'second'
                })
            }else{
                this.proList = [];
                this.pageTotal = 10;
            }
        },
        deleteProgram(index){
            
            axios.post(this.GLOBAL.urlHead+'/manage/question/deleteQuestion',this.$qs.stringify({
                    questionId: this.proList[index].questionId
            })).then(res=>{
                this.reload();
            })
        },
        seeProgram(index){
            this.ifAdd = true;
            questionId = this.proList[index].questionId;
            axios.get(this.GLOBAL.urlHead + '/manage/question/getQuestion',{                    
                    params:{
                        questionId: this.proList[index].questionId
                    }
                }    
            ).then(res=>{
                    this.proAns = res.data.data.questionAns;
                    this.proTitle = res.data.data.questionTitle;
                    this.proDes = res.data.data.questionOption;
            })
            
            // this.$router.push({name:'questionDetail',params:{questionId:this.proList[index].questionId}});
        },
        closeAlert(){
            this.ifAdd = false
        },
        changePro(){
            axios.post(this.GLOBAL.urlHead + '/manage/question/updateQuestion',{
                questionId: questionId,
                questionOption: this.proDes,
                questionTitle:this.proTitle,
                questionAns: this.proAns,
                questionLanguage: 1
            }).then(res=>{
                if(res.data.code = 100001){
                    this.$alert('修改成功','提示',{
                        callback: action=>{
                            this.reload()
                        }
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
.project{
    padding: 0 50px;
}
.noticeHead{
    display: flex;
    justify-content: space-between;
    font-size: 26px;
    padding: 20px 0;
}
.noticeHeadLeft{
    display: flex;
    align-items: center;
    width: 20%;
    justify-content: space-between;
}

.noticeNum{
    font-weight: bold;
    font-size: 30px;
}
.el-tabs__item{
    font-size: 18px;
}
.noticeList{
    text-align: left;
    width: 100%;
}
.noticeList li{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
}
.noticeListTitle{
    display: inline-block;
    width: 60%;
}
.noticeListTime{
    display: inline-block;
    width: 30%;
    color: #888;
}
.pageNa{
    margin-top: 40px;
}
.proAlert{
    padding: 20px 50px;
    position: fixed;
    z-index: 99;
    background-color: rgb(219, 219, 219);
    border-radius: 10px;
    display: flex;
    height: 400px;
    width: 500px;
    flex-direction: column;
    justify-content: space-around;
    top: 20vh;
    left: 35%;
}
</style>
