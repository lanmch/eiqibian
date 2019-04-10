<template>
<div>
    <div v-show="ifShow" class="headTab">
        <div style="width:100px;display:flex;aglin-items:center;justify-content:center;" v-show="ifShow"><img :src="tabIcon" @click="showTab"/></div>
        <div class="title">E启编管理端</div>
        <div class="user" @click="cancel" v-show="ifShow">注销</div>
    </div>
    <div v-show="!ifShow" class="headTab2">
        
        <div class="title">E启编管理端</div>
    </div>
    <el-menu v-show="ifShowTab" @select="select" default-active="1-4-1" class="el-menu-vertical-demo">
            <router-link to="/homepage">
                <el-menu-item index="1">
                    <span slot="title">管理首页</span>
                </el-menu-item>
            </router-link>
            <router-link to="/notice">
                <el-menu-item index="2"  v-show="ifRole">
                    <span slot="title">通知管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/project">
                <el-menu-item index="3"  v-show="ifRole">
                    <span slot="title">题库管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/course"  v-show="ifRole">
                <el-menu-item index="4">
                    <span slot="title">课程管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/contest">
                <el-menu-item index="5"  v-show="ifRole"> 
                    <span slot="title">赛事管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/user">
                <el-menu-item index="6">
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/changeKey">
                <el-menu-item index="7" >
                    <span slot="title">修改密码</span>
                </el-menu-item>
            </router-link>
            <!-- <router-link to="/exit">
                <el-menu-item index="8">
                    <span slot="title">退出登录</span>
                </el-menu-item>
            </router-link> -->
            <router-link to="/banner"  v-show="ifRole">
                <el-menu-item index="8" style="border-bottom:2px solid #0099ff;">
                    <span slot="title">添加Banner</span>
                </el-menu-item>
            </router-link>
    </el-menu>
</div>
</template>
<script>
import axios from 'axios'
var logo1 = require('../../../static/icon/common/tab.png')
var logo2 = require('../../../static/icon/common/cancel.png')
export default {
    name: 'headTab',
    data(){
        return{
            ifShowTab: false,
            tabIcon: logo1,
            ifShow: JSON.parse(localStorage.getItem('ifLogin')),
            ifRole: false
        }
    },
    created(){
       
        if(localStorage.getItem('adminRole')=='区县观察员'){
            this.ifRole = false
        }else{
            this.ifRole = true
        }
        
    },
    mounted(){
        let a = localStorage.getItem('account')
        let b = localStorage.getItem('passwd')
        axios.post(this.GLOBAL.urlHead + '/manage/admin/adminLogin',{
                adminPhone: a,
                password: b
            }).then(res=>{
   
                if(res.data.code == 100001){
                    
                    this.GLOBAL.ifLogin = true;
                    localStorage.setItem('ifLogin',this.GLOBAL.ifLogin); 
                    this.GLOBAL.adminId = res.data.data.adminId
                    localStorage.setItem('adminId',this.GLOBAL.adminId); 
                    localStorage.setItem('adminRole',res.data.data.adminRole)
                }
        })
                    
    },
    methods:{
        showTab(){
            if(this.ifShowTab){
                this.tabIcon = logo1
            }else{
                this.tabIcon = logo2
            }
            this.ifShowTab = !this.ifShowTab
        },
        cancel(){
            var account = '';
            var passwd = '';
            localStorage.setItem('account',account);
            localStorage.setItem('passwd',passwd);
            this.GLOBAL.ifLogin = false;
            localStorage.setItem('ifLogin',this.GLOBAL.ifLogin);
            localStorage.setItem('adminRole','')
            this.$alert('注销成功','提示',{
                callback: action=>{
                    this.$router.replace('/');
                    this.$router.go(0);
                }
            }
        );
            
        },
        select(index){
            if(index){
                this.tabIcon = logo1;
                this.ifShowTab = !this.ifShowTab;
            }
        }
    }
}
</script>
<style scoped>
.headTab{
    height: 50px;
    padding: 0 50px;
    line-height: 50px;
    background-color: #0099ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}
.headTab2{
    height: 50px;
    padding: 0 50px;
    line-height: 50px;
    background-color: #0099ff;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.headTab img{
    height: 25px;
}
.title{
    font-size: 26px;
    color: #fff;
}
.user{
    color: #fff;
    cursor: pointer;
    padding: 0 30px;
}
.el-menu-vertical-demo{
    width: 200px;
    min-height: 400px;
    float: left;
}
.el-menu-item{
    height: 60px;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid #0099ff;
    border-bottom: none;
}
a:-webkit-any-link{
    text-decoration: none;
}
.el-menu{
    position: fixed;
    z-index: 99;
    margin-top: -2px;
}
</style>
