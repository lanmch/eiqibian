<template>
    <div>
        <div style="padding-top: 20px;"><router-link to='/contest'><el-button   type="primary">返回</el-button></router-link></div>
        <div v-show="ifShow" style="padding-top:20px;font-size:12px;color:red;">请先选择比赛</div>
        <div style="padding-top:20px;">
            <el-select @change="selectContest" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.contestName"
                :value="item.contestId">
                </el-option>
            </el-select>
        </div>
        <div><div style="margin-top: 20px;">上传成绩excel<input name="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" @change="update"/></div></div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        ifShow: true
      }
    },
    mounted(){
        axios.get(this.GLOBAL.urlHead + '/manage/grade/contests')
        .then(res=>{
            this.options = res.data.data
        })
    },
    methods:{
        selectContest(value){
            this.ifShow = false
        },
        update(e){
            var formdata = new FormData();
            formdata.append('file',e.target.files[0]);
            formdata.append('contestId',this.value);
            axios({
                url:this.GLOBAL.urlHead+'/manage/grade/import',
                method:'POST',
                data:formdata,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res)=>{
                if(res.data.code == 100001){
                    this.$alert('添加成功','提示',{
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

</style>
