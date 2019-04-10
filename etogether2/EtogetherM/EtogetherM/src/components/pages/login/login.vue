<template>
    <div class="whole"><div class="wholeWidth">
        <h1>E启编管理平台</h1>
        <div>
            <el-form>
                <el-form-item>
                    <el-input placeholder="账号" v-model="account"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="密码" type="password" v-model="passwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div></div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name: 'login',
    data(){
        return{
            account: '',
            passwd: ''
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('ifLogin'))){
            this.$router.replace('/homepage')
        }
    },
    methods:{
        login(){
            axios.post(this.GLOBAL.urlHead + '/manage/admin/adminLogin',{
                adminPhone: this.account,
                password: this.passwd
            }).then(res=>{
        
                if(res.data.code == 100001){
                    localStorage.setItem('account',this.account);
                    localStorage.setItem('passwd',this.passwd);
                    this.GLOBAL.ifLogin = true;
                    localStorage.setItem('ifLogin',this.GLOBAL.ifLogin); 
                    this.GLOBAL.adminId = res.data.data.adminId
                    localStorage.setItem('adminId',this.GLOBAL.adminId); 
                    localStorage.setItem('adminRole',res.data.data.adminRole)
                    this.$alert('登录成功！','提示',{   
                        callback: action=>{
                            this.$router.push('/homepage');
                            this.$router.go(0);
                        }
                    })
                }
                else if(res.data.code == 900002){
                    this.$alert('管理员不存在，请联系高级管理员添加','提示',{
                        callback: action=>{

                        }
                    })
                }else{
                    this.$alert('密码错误！','提示',{
                        callback: action=>{

                        }
                    })
                }
            })
        },
        // setCookie(c_name, c_pwd, exdays, remeberFlag){
        //     var exdate = new Date(); //获取时间
        //     exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
        //     window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        //     window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        //     window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
        // },
        // getCookie: function() {
        // if (document.cookie.length > 0) {
        //     var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        //     for (var i = 0; i < arr.length; i++) {
        //         var arr2 = arr[i].split('='); //再次切割
        //         //判断查找相对应的值
        //             if (arr2[0] == 'userName') {
        //                 this.username = arr2[1]; //保存到保存数据的地方
        //             } else if (arr2[0] == 'userPwd') {
        //                 this.password = arr2[1];
        //             }
        //         }
        //     }
        // }
    }
}
</script>

<style scoped>
.whole{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88.3vh;
    background-image: url('./back.jpg');
    background-repeat:no-repeat;
    background-position:center;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
}
.wholeWidth{
    width: 300px;
}
h1{
    margin-bottom: 20px;
    color: #fff;
}
</style>
