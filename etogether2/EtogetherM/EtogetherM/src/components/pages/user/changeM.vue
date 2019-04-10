<template>
    <div class="changeM">
        <div class="item btn"><router-link to="/allmanager"><el-button type="primary">返回</el-button></router-link></div>
        <div class="item"><span>姓名：</span><el-input v-model="name"></el-input></div>
        <div class="item"><span>电话：</span><el-input v-model="phone"></el-input></div>
        <div class="item"><span>身份：</span><el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select></div>
                                <div class="item btnB"><el-button type="danger" @click="changeIdentity">修改</el-button></div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name:'changeM',
data() {
      return {
        options: [{
          value: '区县观察员',
          label: '区县观察员'
        }, {
          value: '管理员',
          label: '管理员'
        }],
        value: '',
        name:'',
        phone:''
      }
    },
    methods:{
        changeIdentity(){
            axios.post(this.GLOBAL.urlHead + '/manage/admin/modify',{
                adminId: this.$route.params.adminId,
                adminName: this.name,
                adminPhone: Number(this.phone),
                adminRole: this.value
            }).then(res=>{
                if(res.data.code==100001){
                    this.$alert('修改成功','提示',{
                        callback: action=>{
                            this.$router.go(-1)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.btnB{
    justify-content: center;
}
.btn{
    margin-left: -800px;
}
.changeM{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 300px;
    width: 800px;
    padding: 50px 200px;
    margin: 0 auto;
}
.item{
    width: 50%;
    display: flex;
    align-items: center;
}
.item span{
    width: 20%;
    text-align: left;
}
</style>
