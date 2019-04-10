<template>
    <div class="alluser">
        <div class="btntop"><router-link to="/user"><el-button type="primary">返回</el-button></router-link></div>
        <div>
            <div class="thelist">
                <el-table
                
            :data="tableDataU"
            style="width: 100%">
            <el-table-column
                prop="userRealname"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="userEduLevel"
                label="年级"
                width="150">
            </el-table-column>
            <el-table-column
                prop="userSchool"
                label="学校"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userPhone"
                width="200"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="userInterestCourse"
                label="课程">
            </el-table-column>
            <el-table-column
                width="120"
                label="操作"
                type=index>
                
                <template slot-scope="scope">
                        <el-button type="danger" v-show="ifRole" @click="deleteUser(scope.$index,scope.row)" size="mini">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            </div>
            <el-pagination
             @current-change='currentChange'
                background
                layout="prev, pager, next"
                :current-page='pageIndex'
                :total="totalPage">
                </el-pagination>
        </div>
    </div>
</template>
<script>
var pageindex = 1
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    inject:['reload'],
    data(){
        return{
            ifRole: false,
            totalPage:0,
            pageIndex:1,
            tableDataU: [{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            },{
                name: '王小虎',
                grade: '初中',
                phone: '17784450810',
                school: '重庆第九中学',
                course: 'Python'
            }]
        }
    },
    mounted(){
        if(localStorage.getItem('adminRole')=='区县观察员'){
            this.ifRole = false
        }else{
            this.ifRole = true
        }
        axios.get(this.GLOBAL.urlHead + '/manage/user/userList',{
            params:{
                currentPage: pageindex,
                pageSize: 10
            }
        }).then(res=>{
            this.pageIndex = pageindex
            this.tableDataU = res.data.data.userVOList
            this.totalPage = res.data.data.pages * 10
        })
    },
    methods:{
        currentChange(index){
            pageindex = index
            axios.get(this.GLOBAL.urlHead + '/manage/user/userList',{
            params:{
                currentPage: index,
                pageSize: 10
            }
            }).then(res=>{
                this.tableDataU = res.data.data.userVOList
                this.totalPage = res.data.data.pages * 10
            })
        },
        deleteUser(index,row){

            axios.get(this.GLOBAL.urlHead + '/manage/user/deleteUser',{
                params:{
                    userId: this.tableDataU[index].userId
                }
            }).then(res=>{
                this.reload()
            })
        }
    }
}
</script>
<style scoped>
.btntop{
    text-align: left;
}
.alluser{
    padding: 20px 100px;
    margin-top: -1px;
}
.thelist{
    margin-bottom: 20px;
}
</style>
