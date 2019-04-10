<template>
    <div>
        <div class="course">
            <div class="noticeHead">
                <!-- <span style="margin-right:15px;">共有<span class="noticeNum">223</span>个课程</span> -->
                <div class="noticeHeadLeft"> <router-link to="/addcourse"><el-button type="primary">增加课程</el-button></router-link></div>
                <!-- <div>搜索</div> -->
            </div>
            <div>
            <el-tabs v-model="activeName" @tab-click='choseCourse'>
                <el-tab-pane label="全部课程" name="first">
                    <ul class="noticeList">
                        <li v-for="(item,index) in courseList">
                            <img :src="item.courseImg"/>
                            <div class="courseDetail">
                                <div><span class="title"><el-tag type="success">{{item.courseLable}}</el-tag>{{item.courseTitle}}</span><span class="see">浏览量：{{item.courseViewsNum}}</span></div>
                                <div><span class="time">发布时间：{{item.coursePublishTime}}</span><span><el-button size="mini" type="danger" @click="deleteCourse(index)">删除</el-button></span></div>
                            </div>
                        </li>
                    </ul>
                    
                </el-tab-pane>
                <el-tab-pane label="Python" name="second">
                    <ul class="noticeList">
                        <li v-for="(item,index) in courseList">
                            <img :src="item.courseImg"/>
                            <div class="courseDetail">
                                <div><span class="title"><el-tag type="success">{{item.courseLable}}</el-tag>{{item.courseTitle}}</span><span class="see">浏览量：{{item.courseViewsNum}}</span></div>
                                <div><span class="time">发布时间：{{item.coursePublishTime}}</span><span><el-button size="mini" type="danger">删除</el-button></span></div>
                            </div>
                        </li>
                    </ul>
                    <!-- <div class="pageNa">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="pageAll"
                            >
                        </el-pagination>
                    </div> -->
                </el-tab-pane>
                <el-tab-pane label="Scratch" name="third">
                    <ul class="noticeList">
                        <li v-for="(item,index) in courseList">
                            <img :src="item.courseImg"/>
                            <div class="courseDetail">
                                <div><span class="title"><el-tag type="success">{{item.courseLable}}</el-tag>{{item.courseTitle}}</span><span class="see">浏览量：{{item.courseViewsNum}}</span></div>
                                <div><span class="time">发布时间：{{item.coursePublishTime}}</span><span><el-button size="mini" type="danger">删除</el-button></span></div>
                            </div>
                        </li>
                    </ul>
                    <!-- <div class="pageNa">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="pageAll"
                            >
                        </el-pagination>
                    </div> -->
                </el-tab-pane>
                <el-tab-pane label="C++" name="fourth">
                    <ul class="noticeList">
                        <li v-for="(item,index) in courseList">
                            <img :src="item.courseImg"/>
                            <div class="courseDetail">
                                <div><span class="title"><el-tag type="success">{{item.courseLable}}</el-tag>{{item.courseTitle}}</span><span class="see">浏览量：{{item.courseViewsNum}}</span></div>
                                <div><span class="time">发布时间：{{item.coursePublishTime}}</span><span><el-button size="mini" type="danger">删除</el-button></span></div>
                            </div>
                        </li>
                    </ul>
                    <!-- <div class="pageNa">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="pageAll"
                            >
                        </el-pagination>
                    </div> -->
                </el-tab-pane>
            </el-tabs>
            <div class="pageNa">
                        <el-pagination @current-change='currentChange' :current-page='currentPage'
                            background
                            layout="prev, pager, next"
                            :total="pageAll"
                            >
                        </el-pagination>
                    </div>
            </div>
        </div>
        
    </div>
</template>
<script>
var pageNow = 1
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    inject:['reload'],
    data(){
        return{
            activeName: 'first',
            courseList: [],
            pageAll: 0,
            currentPage: 1
        }
    },
    mounted(){
        
        axios.get(this.GLOBAL.urlHead+'/manage/course/home',{
            params:{
                currentPage:pageNow,
                pageSize:10
            }
        }).then(res=>{
            this.currentPage = pageNow
            this.courseList = res.data.data.courseList;
            this.pageAll = res.data.data.pages * 10;
            for(var i in this.courseList){
                this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
                if(this.courseList[i].courseLable==1){
                    this.courseList[i].courseLable='初级'
                }else if(this.courseList[i].courseLable==2){
                    this.courseList[i].courseLable='中级'
                }else{
                    this.courseList[i].courseLable='高级'
                }
			}
        })
    },
    methods:{
        currentChange(value){
            pageNow = value
            axios.get(this.GLOBAL.urlHead+'/manage/course/home',{
            params:{
                currentPage:pageNow,
                pageSize:10
            }
        }).then(res=>{
            
            this.currentPage = pageNow
            this.courseList = res.data.data.courseList;
            for(var i in this.courseList){
                this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
                if(this.courseList[i].courseLable==1){
                    this.courseList[i].courseLable='初级'
                }else if(this.courseList[i].courseLable==2){
                    this.courseList[i].courseLable='中级'
                }else{
                    this.courseList[i].courseLable='高级'
                }
			}
        })
        },
        choseCourse(tab, event){
            if(tab.index == 0){
                this.currentPage = 1
                axios.get(this.GLOBAL.urlHead+'/manage/course/home',{
                    params:{
                        currentPage:1,
                        pageSize:10,
                    }
                }).then(res=>{
                    this.courseList = res.data.data.courseList;
                    this.pageAll = res.data.data.pages * 10;
                    for(var i in this.courseList){
                        this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
                        if(this.courseList[i].courseLable==1){
                            this.courseList[i].courseLable='初级'
                        }else if(this.courseList[i].courseLable==2){
                            this.courseList[i].courseLable='中级'
                        }else{
                            this.courseList[i].courseLable='高级'
                        }
					}
                })
            }else if(tab.index == 1){
                this.currentPage = 1
                axios.post(this.GLOBAL.urlHead+'/manage/course/filter',{
                        currentPage:1,
                        pageSize:10,
                        courseTitle:null,
                        courseLable:null,
                        courseLanguage: 'python'
                }).then(res=>{
    
                    this.courseList = res.data.data.courseList;
                    this.pageAll = res.data.data.pages * 10;
                    for(var i in this.courseList){
                        this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
                        if(this.courseList[i].courseLable==1){
                            this.courseList[i].courseLable='初级'
                        }else if(this.courseList[i].courseLable==2){
                            this.courseList[i].courseLable='中级'
                        }else{
                            this.courseList[i].courseLable='高级'
                        }
					}
                })
            }else if(tab.index == 2){
                this.currentPage = 1
                axios.post(this.GLOBAL.urlHead+'/manage/course/filter',{
                        currentPage:1,
                        pageSize:10,
                        courseTitle:null,
                        courseLable:null,
                        courseLanguage: 'scratch'
                }).then(res=>{
                    this.courseList = res.data.data.courseList;
                    this.pageAll = res.data.data.pages * 10;
                    for(var i in this.courseList){
                        this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
                        if(this.courseList[i].courseLable==1){
                            this.courseList[i].courseLable='初级'
                        }else if(this.courseList[i].courseLable==2){
                            this.courseList[i].courseLable='中级'
                        }else{
                            this.courseList[i].courseLable='高级'
                        }
					}
                })
            }else{
                this.currentPage = 1
                axios.post(this.GLOBAL.urlHead+'/manage/course/filter',{
                        currentPage:1,
                        pageSize:10,
                        courseTitle:null,
                        courseLable:null,
                        courseLanguage: 'c++'
                }).then(res=>{
                    this.courseList = res.data.data.courseList;
                    this.pageAll = res.data.data.pages * 10;
                    for(var i in this.courseList){
                        this.courseList[i].coursePublishTime = this.formatTime(this.courseList[i].coursePublishTime)
                        if(this.courseList[i].courseLable==1){
                            this.courseList[i].courseLable='初级'
                        }else if(this.courseList[i].courseLable==2){
                            this.courseList[i].courseLable='中级'
                        }else{
                            this.courseList[i].courseLable='高级'
                        }
					}
                })
            }
        },
        deleteCourse(index){
            axios.get(this.GLOBAL.urlHead+'/manage/course/deleteCourse',{
                params:{
                    courseId: this.courseList[index].courseId
                }
            }).then(res=>{
                this.reload();
            })
        },
        //时间戳转化
			add0(m){
				return m<10?'0'+ m : m
			},
			formatTime(timePoint){
				var time = new Date(timePoint);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					return y+'.'+this.add0(m)+'.'+this.add0(d);
			}
    }
}
</script>
<style scoped>
.course{
    padding: 10px 80px;
}
.courseHead{
    display: flex;
    justify-content: space-between;
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
    width: 25%;
    justify-content: space-between;
}
.noticeList{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
}
.noticeList li{
    padding-bottom: 10px;
    margin:0 1%;
    display: flex;
    flex-direction: column;
    width: 18%;
    -moz-box-shadow:0 0 10px #888;
     	-webkit-box-shadow:0 0 10px #888;
    	box-shadow:0 0 10px #888;
        justify-content: space-between;
        height: 30vh;
        margin-bottom: 20px;
    }
.noticeList li img{
    width: 100%;
    height: 200px;
}
.courseDetail{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.courseDetail div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
}
.title{
    font-weight: bold;
    font-size: 14px;
    white-space: nowrap;
    text-overflow:ellipsis;
    word-break: break-all;overflow:hidden;
}
.see{
    font-size: 14px;
    color: #888;
}
.time{
    font-size: 14px;
}
</style>
