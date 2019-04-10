<template>
    <div class="addcourse">
        <div class="btnTop"><router-link to="/course"><el-button type="primary">返回</el-button></router-link></div>
        <div class="detail">
            <div class="detailcommon"><span>课程标题：</span><el-input v-model="title"></el-input></div>
            <div class="detailcommon"><span>课程种类：</span><el-select v-model="value" placeholder="请选择课程种类">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select></div>
            <div class="detailcommon"><span>课程链接：</span><el-input v-model="courseURL"></el-input></div>
            <div class="detailcommon"><span>课程封面：</span><input type="file"  id="fileField" accept="image/*"  @click="upFileGetToken" @change="changeName"/><el-button type="danger" @click="upImg">上传封面</el-button></div>
            <span style="font-size:12px;color:red;">请点击上传封面过后，再上传课程，否则课程无封面</span>             
            <div class="uploadbtn"><el-button @click="upAll" type="primary">上传</el-button></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
var getFileToken = ''
var FileToken = ''
var getFileName = ''
var filename = ''
var fileId
var fileaa
var fileUrl = ''
import upFile from '../../common/upFile'
export default {
    name:'addcourse',
    components:{
        upFile
    },
    data() {
      return {
        options: [{
          value: 'python',
          label: 'Python'
        }, {
          value: 'scratch',
          label: 'Scratch'
        }, {
          value: 'c++',
          label: 'C++'
        }],
        value: '',
        title:'',
        courseURL:''
      }
    },
    methods:{
        upAll(){
            axios.post(this.GLOBAL.urlHead+'/manage/course/addCourse',{
                courseTitle:this.title,
                courseUrl:this.courseURL,
                courseUpId:localStorage.getItem('adminId'),
                courseLanguage:this.value,
                courseImg:fileUrl
            }).then(res=>{
                if(res.data.code == 100001){
                    this.$alert('课程添加成功','提示',{
                        callback: action=>{
                            this.$router.go(-1)
                        }
                    })

                }
            })
        },
        upImg(){
            filename = new Date().getTime();
            const axiosInstance = axios.create({withCredentials: false});    //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
            var data = new FormData();
            data.append('file', fileaa);
            data.append('token', getFileToken); 
            data.append('key', filename)    //七牛需要的token，叫后台给，是七牛账号密码等组成的hash

            axiosInstance({
                method: 'POST',
                url: 'https://upload-z2.qiniup.com',  //上传地址
                name: 'file',
                data: data,
                headers:{'Content-Type':'multipart/form-data'},
                timeout:30000,      //超时时间，因为图片上传有可能需要很久
                onUploadProgress: (progressEvent)=> {
                    //imgLoadPercent 是上传进度，可以用来添加进度条
                    let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                },
                }).then(res =>{
                    FileToken = res.data.hash;
                }).catch(function(err) {
            });

            axios.post(this.GLOBAL.urlHead+'/manage/file/addFile',{
                fileUrl: filename,
                filename: fileaa,

            }).then(res=>{

                fileId = res.data.data.fileId;
                axios.get(this.GLOBAL.urlHead + '/manage/file/getFileById',{
                    params:{
                        fileId: fileId
                    }
                }).then(res=>{
                    fileUrl = res.data.data.fileUrl;
                    if(res.data.code == 100001){
                        this.$alert('课程封面上传成功！','提示',{
                            callback: action=>{

                            }
                        })
                    }
                })
            })
        },
        changeName(){
            fileaa = document.getElementById('fileField').files[0]
        },
        upFileGetToken(){
            axios.get(this.GLOBAL.urlHead+'/manage/file/getToken')
            .then(res=>{
                // this.$emit('getfileToken',res.data.data.token)
                getFileToken = res.data.data.token
            })
        },
    }
}
</script>
<style scoped>
.addcourse{
    padding: 20px 120px;
}
.btnTop{
    text-align: left;
    margin-bottom: 20px;
}
.detail{
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 50vh;
}
.detailcommon{
    width: 50%;
    display: flex;
    align-items: center;
}
.detailcommon span{
    display: inline-block;
    width: 20%;
}
.uploadbtn{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
