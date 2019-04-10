<template>
    <div class="user">
        <div class="userHead">
            <h2>共有{{allM}}名管理员、{{allU}}名用户</h2>
            <!-- <div>搜索</div> -->
        </div>
        <div class="allmanager">
            <div class="allhead">
                <div><span class="M">管理员</span>
                <router-link to="/addmanager"><el-button type="primary">增加管理员</el-button></router-link></div>
                <router-link to="/allmanager"><div>更多<i class="el-icon-arrow-right"></i></div></router-link>
            </div>
            <div>
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
                    <!-- <el-table-column
                        width="240"
                        label="操作">
                        <template slot-scope="scope">
                        <router-link to="changeM"><el-button type="primary" size="mini">修改</el-button></router-link>
                        <el-button type="danger" size="mini">删除</el-button>
                        </template>
                    </el-table-column> -->
                    </el-table>
            </div>
        </div>
        <div class="alluser">
            <div class="allhead">
                <div><span class="M">用户</span></div>
                <router-link to="/alluser"><div>更多<i class="el-icon-arrow-right"></i></div></router-link>
            </div>
            <div>
                <el-table
            :data="tableDataU"
            style="width: 100%">
            <el-table-column
                prop="userRealname"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userEduLevel"
                label="年级"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userSchool"
                label="学校"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userPhone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="userInterestCourse"
                label="课程">
            </el-table-column>
            <!-- <el-table-column
                width="120"
                label="操作">
                
                <template slot-scope="scope">
                        <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column> -->
            </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            allM:0,
            allU:0,
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
            }],
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
            },]
        }
    },
    mounted(){
        axios.get(this.GLOBAL.urlHead+'/manage/admin/getAdmins',{
            params:{
                currentPage:1,
                pageSize:5
            }
        })
        .then(res=>{
            this.allM = res.data.data.total
            this.tableDataM = res.data.data.adminList
        })
        axios.get(this.GLOBAL.urlHead+'/manage/user/userList',{
            params:{
                currentPage:1,
                pageSize:7
            }
        })
        .then(res=>{
            this.allU = res.data.data.total
            this.tableDataU = res.data.data.userVOList
        })
    }
}
</script>
<style scoped>
a:-webkit-any-link{
    text-decoration: none;
    color: #000;
}
.user{
    padding: 20px 100px;
}
.userHead{
    display: flex;
    justify-content: space-between;
}
.allhead{
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.M{
    font-size: 18px;
    font-weight: bold;
}
.allmanager,.alluser{
    -moz-box-shadow:0 0 10px #888;
     	-webkit-box-shadow:0 0 10px #888;
    	box-shadow:0 0 10px #888;
        padding: 20px 50px;
        margin-top: 20px;
}
</style>
