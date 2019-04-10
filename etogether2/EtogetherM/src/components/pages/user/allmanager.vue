<template>
    <div class="allM">
        <div class="btntop"><router-link to="/user"><el-button type="primary">返回</el-button></router-link></div>
        <div class="list">
            <el-table
                    :data="tableDataM"
                    style="width: 100%">
                    <el-table-column
                        prop="adminName"
                        label="姓名"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="adminPhone"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        prop="adminRole"
                        label="身份">
                    </el-table-column>
                    <el-table-column
                        width="240"
                        label="操作">
                        <template slot-scope="scope">
                        <el-button v-show='ifMlevel1' @click="changeInfo(scope.$index,scope.row)" type="primary" size="mini">修改</el-button>
                        <el-button type="danger" v-show='ifMlevel2' @click="deleteM(scope.$index,scope.row)" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
        </div>
        <el-pagination
                background
                :current-page='pageIndex'
                @current-change='currentChange'
                layout="prev, pager, next"
                :total="totalPage">
                </el-pagination>
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
            ifMlevel1:true,
            ifMlevel2:true,
            pageIndex: 1,
            totalPage:10,
            tableDataM: [{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            },{
                name: '王小虎',
                phone: '17784450810',
                id: '区县观察员'
            }]
        }
    },
    mounted(){
        axios.get(this.GLOBAL.urlHead + '/manage/admin/getAdmins',{
            params:{
                currentPage:pageindex,
                pageSize: 8
            }
        })
        .then(res=>{
            this.pageIndex = pageindex
            this.totalPage = res.data.data.pages * 10
            this.tableDataM = res.data.data.adminList
        })
        if(localStorage.getItem('adminRole')=='admin'){
            this.ifMlevel1 = true
            this.ifMlevel2 = true
        }else{
            this.ifMlevel1 = false
            this.ifMlevel2 = false
        }
    },
    methods:{
        currentChange(index){
            pageindex = index
            axios.get(this.GLOBAL.urlHead + '/manage/admin/getAdmins',{
                params:{
                    currentPage:index,
                    pageSize: 8
                }
            })
            .then(res=>{
                this.totalPage = res.data.data.pages * 10
                this.tableDataM = res.data.data.adminList
            })
        },
        deleteM(index,row){
            
            axios.get(this.GLOBAL.urlHead + '/manage/admin/deleteAdmin',{
                params:{
                    adminId: this.tableDataM[index].aminId
                }
            }).then(res=>{
                this.reload()
            })
        },
        changeInfo(index,row){
            this.$router.push({name:'changeM',params:{adminId:this.tableDataM[index].aminId}})
        }
    }
}
</script>

<style scoped>
.btntop{
    text-align: left;
}
.allM{
    padding: 20px 100px;
    margin-top: -1px;
}
.list{
    margin-bottom: 20px;
}
</style>
