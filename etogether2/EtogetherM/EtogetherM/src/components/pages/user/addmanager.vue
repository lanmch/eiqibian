<template>
<div>
    
    <div class="addM">
        <div class="Btn"><router-link to="/user"><el-button type="primary">返回</el-button></router-link></div>
        <div class="addMM">
            <div><span>姓名：</span><el-input v-model="name"></el-input></div>
            <div><span>电话：</span><el-input v-model="phone"></el-input></div>
            <div><span>身份：</span> <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in identity"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select></div>
                    <div class="Btn"><el-button type='danger' @click="addManager">添加</el-button></div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data() {
      return {
        identity: [{
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
    mounted(){
        if(localStorage.getItem('adminRole')=='admin'){
            this.identity=[{
            value: '区县观察员',
            label: '区县观察员'
            }, {
            value: '管理员',
            label: '管理员'
            }]
        }else{
            this.identity=[{
            value: '区县观察员',
            label: '区县观察员'
            }]
        }
    },
    methods:{
        addManager(){
            if(this.value==''||this.phone==''||this.name==''){
                this.$alert('请将表单信息补充完整','提示',{
                    callback: action=>{

                    }
                })
            }else{
                
                axios.post(this.GLOBAL.urlHead+'/manage/admin/addAdmin',{
                    adminPhone: Number(this.phone),  
                    adminRole: this.value,
                    adminName: this.name
                }).then(res=>{
            
                   if(res.data.code==100001){
                       this.$alert('添加成功！','提示',{
                            callback: action=>{
                                this.$router.go(-1)
                            }
                        })
                   }else{
                   }
                })
            }
            
        }

    }
}
</script>

<style scoped>
.Btn{
    margin-top: 20px;
    text-align: left;
    padding: 20px 120px;
    

}
.addM{
    margin-top: -1px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.addMM{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 30vh;
}
.addMM div{
    display: flex;
    align-items: center;
    text-align: left;
}
.addMM div span{
    display: inline-block;
    width: 30%;
}
</style>
