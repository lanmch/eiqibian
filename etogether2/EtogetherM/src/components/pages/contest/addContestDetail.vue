<template>
    <div class="aDetail">
        <div style="margin-bottom:40px;"><el-button type="primary" @click="goBack">返回</el-button></div>
        <el-form>
            <el-form-item>
                <h3>有关{{typeTitle}}的通知标题</h3>
                <el-input v-model="title"/>
            </el-form-item>
            <el-form-item>
                <h3>有关{{typeTitle}}的内容通知</h3>
                <el-input type="textarea" v-model="content" :rows="10"/>
            </el-form-item>
            <el-form-item>
                <h3>上传文件</h3>
                
            </el-form-item>
            <el-form-item label="附件名称">
                    <el-input v-model="noticeFileName" ></el-input>
                </el-form-item>
                <el-form-item label="通知附件">
                    <!-- <up-file  @getfileToken="showFileToken" @fileName="getFileName"></up-file> -->
                    <input type="file"  id="fileField"   @click="upFileGetToken" @change="changeName"/>
                </el-form-item>
            <el-form-item>
                <el-button type="danger" style="width:200px;" @click="publish">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
var getFileToken = ''
var FileToken = ''
var getFileName = ''
var filename = ''
var fileId
var lastName = ''
import upFile from '../../common/upFile'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name: 'addContestDetail',
    components:{
        upFile
    },
    data(){
        return{
            typeTitle:'',
            title:'',
            content:'',
            noticeFileName: ''
        }
    },

    mounted(){
        fileId = 0;
        getFileName = '';
        lastName = '';
        if(this.$route.params.articleType==1){
            this.typeTitle = '考点分布'
        }else if(this.$route.params.articleType==2){
            this.typeTitle = '考试计划'
        }else if(this.$route.params.articleType==3){
            this.typeTitle = '报名须知'
        }else{
            this.$router.go(-1);
        };
        if(this.$route.params.aricleId!=''){
            axios.get(this.GLOBAL.urlHead+'/manage/article/getArticleDetails',{
                params:{
                    articleId: this.$route.params.aricleId
                }
            }).then(res=>{
                this.title = res.data.data.articleTitle;
                this.content = res.data.data.articleContent
            })
        }
        
    },
    methods:{
        upFileGetToken(){
            axios.get(this.GLOBAL.urlHead+'/manage/file/getToken')
            .then(res=>{
                // this.$emit('getfileToken',res.data.data.token)
                getFileToken = res.data.data.token
            })
        },
        changeName(){
            getFileName = document.getElementById('fileField').files[0];
            var name = getFileName.name
            var index1 = name.lastIndexOf(".");
            var index2=name.length;
            lastName= name.substring(index1,index2);//后缀名
        },
        goBack(){
            this.$router.go(-1);
        },
        showFileToken(fileToken){
            getFileToken = fileToken
        },
        upFileToQN(){
            filename = new Date().getTime();
            const axiosInstance = axios.create({withCredentials: false});    //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
            let data = new FormData();
            data.append('file', getFileName);
            data.append('token', getFileToken); 
            data.append('key', filename+lastName)
            axiosInstance({
                method: 'POST',
                url: 'https://upload-z2.qiniup.com',  //上传地址
                data: data,
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
                fileUrl: filename+lastName,
                filename: this.noticeFileName
            }).then(res=>{
                fileId = res.data.data.fileId;
            })
        },
        publish(){
            if(this.title==''||this.content==''){
                this.$alert('请将表单信息补充完整','提示',{
                callback: action=>{

                }
            })
            }else{
                this.upFileToQN();
                axios.post(this.GLOBAL.urlHead+'/manage/article/addContestArticle',{
                    contestId: this.$route.params.contestId,
                    type: this.$route.params.articleType,
                    articleTitle: this.title,
                    articleContent: this.content,
                    articleFileId: fileId
                }).then(res=>{
                    if(res.data.code == 100001){
                        this.$alert('信息发布成功！','提示',{
                            callback: action=>{
                                this.$router.go(-1)
                            }
                        })
                    }
                })
            }
            
        }
    }
}
</script>

<style scoped>
.aDetail{
    padding: 20px 60vh;
}
</style>
