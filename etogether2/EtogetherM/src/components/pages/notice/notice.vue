<template>
    <div class="notice">
        <div class="noticeHead">
            <div class="noticeHeadLeft"><span>共有<span class="noticeNum">{{allNotice}}</span>条通知</span> <router-link to="/addnotice"><el-button type="primary">增加通知</el-button></router-link></div>
            <!-- <div>搜索</div> -->
        </div>
        <div>
            <el-tabs v-model="activeName" @tab-click="noticeClick">
                <el-tab-pane label="全部通知" name="first">
                    <ul class="noticeList">
                        <li v-for="(item,index) in noticeList" ><span class="noticeListTitle">【{{item.articleLabel}}】{{item.articleTitle}}</span>
                        <span class="noticeListTime">发布时间：{{item.articlePublishTime}}</span>
                        <el-button size="mini" type="primary" @click="seeNotice(index)">查看</el-button>
                        <el-button size="mini" type="danger" @click="deleteNotice(index)">删除</el-button></li>    
                    </ul>
                    <!-- <div class="pageNa">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="totalPage">
                        </el-pagination>
                    </div> -->
                </el-tab-pane>
                <el-tab-pane label="赛事通知" name="second">
                    <ul class="noticeList">
                        <li v-for="(item,index) in noticeList" ><span class="noticeListTitle">【{{item.articleLabel}}】{{item.articleTitle}}</span>
                        <span class="noticeListTime">发布时间：{{item.articlePublishTime}}</span>
                        <el-button size="mini" type="primary" @click="seeNotice(index)">查看</el-button>
                        <el-button size="mini" type="danger" @click="deleteNotice(index)">删除</el-button></li>  
                    </ul>
                    <!-- <div class="pageNa">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="totalPage">
                        </el-pagination>
                    </div> -->
                </el-tab-pane>
                <el-tab-pane label="培训通知" name="third">
                    <ul class="noticeList">
                        <li v-for="(item,index) in noticeList" ><span class="noticeListTitle">【{{item.articleLabel}}】{{item.articleTitle}}</span>
                        <span class="noticeListTime">发布时间：{{item.articlePublishTime}}</span>
                        <el-button size="mini" type="primary" @click="seeNotice(index)">查看</el-button>
                        <el-button size="mini" type="danger" @click="deleteNotice(index)">删除</el-button></li>  
                    </ul>
                    <!-- <div class="pageNa">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="totalPage">
                        </el-pagination>
                    </div> -->
                </el-tab-pane>
                <el-tab-pane label="公告通知" name="fourth">
                    <ul class="noticeList">
                        <li v-for="(item,index) in noticeList" ><span class="noticeListTitle">【{{item.articleLabel}}】{{item.articleTitle}}</span>
                        <span class="noticeListTime">发布时间：{{item.articlePublishTime}}</span>
                        <el-button size="mini" type="primary" @click="seeNotice(index)">查看</el-button>
                        <el-button size="mini" type="danger" @click="deleteNotice(index)">删除</el-button></li>  
                    </ul>
                    
                </el-tab-pane>
            </el-tabs>
            <div class="pageNa">
                        <el-pagination @current-change='currentChange'
                            background
                            layout="prev, pager, next"
                            :total="totalPage">
                        </el-pagination>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
import bus from '../../../assets/js/busEvent.js'
var tabIndex = 'first';
var tabList = 0
export default {
    inject:['reload'],
    data(){
        return{
            activeName: 'first',
            noticeList:[],
            totalPage: 10,
            allNotice: 0
        }
    },
    mounted(){
        this.activeName = tabIndex
        axios.post(this.GLOBAL.urlHead+'/manage/article/getArticleList',{
            pageNum:1,
            filterByLabel: 0
        })
        .then(res=>{
            this.noticeList = res.data.data.articleList
            this.totalPage = res.data.data.totalPages * 10
        })
        axios.get(this.GLOBAL.urlHead+'/manage/article/getArticleNum')
        .then(res=>{
            this.allNotice = res.data.data
        })
    },
    methods:{
        currentChange(value){
            axios.post(this.GLOBAL.urlHead+'/manage/article/getArticleList',{
                pageNum:value,
                filterByLabel: tabList
            })
            .then(res=>{
                this.noticeList = res.data.data.articleList
                this.totalPage = res.data.data.totalPages * 10
            })
        },
        noticeClick(tab,event){
            if(tab.index == 0){
                tabList = 0
                axios.post(this.GLOBAL.urlHead+'/manage/article/getArticleList',{
                    pageNum:1,
                    filterByLabel: 0
                })
                .then(res=>{
                    this.noticeList = res.data.data.articleList
                    this.totalPage = res.data.data.totalPages * 10
                    tabIndex = 'first'
                })
            }else if(tab.index == 1){
                tabList = 1
                axios.post(this.GLOBAL.urlHead+'/manage/article/getArticleList',{
                    pageNum:1,
                    filterByLabel: 1
                })
                .then(res=>{
                    this.noticeList = res.data.data.articleList
                    this.totalPage = res.data.data.totalPages * 10
                    tabIndex = 'second'
                })
            }else if(tab.index == 2){
                tabList = 2
                axios.post(this.GLOBAL.urlHead+'/manage/article/getArticleList',{
                    pageNum:1,
                    filterByLabel: 2
                })
                .then(res=>{
                    this.noticeList = res.data.data.articleList
                    this.totalPage = res.data.data.totalPages * 10
                    tabIndex = 'third'
                })
            }else{
                tabList = 3
                axios.post(this.GLOBAL.urlHead+'/manage/article/getArticleList',{
                    pageNum:1,
                    filterByLabel: 3
                })
                .then(res=>{

                    this.noticeList = res.data.data.articleList
                    this.totalPage = res.data.data.totalPages * 10
                    tabIndex = 'fourth'
                })
            }
        },
        deleteNotice(index){
            axios.post(this.GLOBAL.urlHead+'/manage/article/deleteArticle',
                this.$qs.stringify({
                    articleId: this.noticeList[index].articleId
                })
            ).then(res=>{
                this.reload();    
            })
        },
        seeNotice(index){
            this.$router.push({name:'articleDetail',params:{articleId:this.noticeList[index].articleId}});
        }
    }
}
</script>
<style scoped>
.notice{
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
</style>
