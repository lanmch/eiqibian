<template>
    <div style="padding: 20px 0 0 0;">
        <div><router-link to="/"><el-button type="primary">返回</el-button></router-link></div>
        <div style='margin:20px 0'><el-button type='success' @click="showAdd">增加师生互动</el-button></div>
        <ul class="hhul" style="margin:0 auto;">
            <li class="hhli" v-for="(item,index) in TSlist">
                <img class="hhliimg" :src='item.resultUrl'>
                <div>
                    <h3>{{item.resultTitle}}</h3>
                    <div class="info">{{item.resultInfo}}</div>
                </div>
                <div class="btn">
                    <el-button size="mini" type="primary" @click="change(index)">更新</el-button>
                    <el-button size="mini" type="danger" @click="deleteList(index)">删除</el-button></div>
            </li>
        </ul>
        <div class="addItem" v-show="showAddadd">
            <el-form>
                <el-form-item><el-button @click="close" type='danger'>关闭</el-button></el-form-item>
                <el-form-item><div><span>标题：</span><el-input v-model="title"></el-input></div></el-form-item>
                <el-form-item><div><span>内容：</span><el-input v-model='abs' type="textarea" :rows="5"></el-input></div></el-form-item>
                <el-form-item><div><span>图片：</span><input type="file"  id="fileField" accept="image/*"  @click="upFileGetToken" @change="changeName"/><el-button type="danger" @click="upImg">上传图片</el-button></div></el-form-item>
                
            <span style="font-size:12px;color:red;">请点击上传封面过后，再上传课程，否则课程无封面</span>   
                <el-form-item><el-button  type='danger' @click="add">添加</el-button></el-form-item>
            </el-form>
        </div>
        <div class="change" v-show="showChange">
            <el-input v-model="changeTitle"></el-input>
            <el-input :rows="7" v-model="changeAbs" type="textarea"></el-input>
            <div>
                <el-button type="success" @click="submitChange">修改</el-button>
                <el-button type="danger" @click="closeChange">关闭</el-button>
            </div>
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
var resultId
import qs from 'qs'
export default {
    inject:['reload'],
    data(){
        return{
            TSlist:[],
            showAddadd: false,
            title:'',
            abs:'',
            changeAbs:'',
            changeTitle:'',
            showChange:false
        }
    },
    mounted(){
        axios.get(this.GLOBAL.urlHead + '/manage/result/getResultList')
        .then(res=>{
            this.TSlist = res.data.data
        })
    },
    methods:{
        showAdd(){
            this.showAddadd = true
        },
        close(){
            this.showAddadd = false
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
                    fileUrl = res.data.data.fileUrl
                    if(res.data.code == 100001){
                        this.$alert('图片上传成功！','提示',{
                            callback: action=>{

                            }
                        })
                    }
                })
            })
        },
        add(){
            this.abs = this.abs.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
            axios.post(this.GLOBAL.urlHead + '/manage/result/addResult',{
                resultInfo: this.abs,
                resultTitle: this.title,
                resultUrl: fileUrl
            }).then(res=>{
                if(res.data.code == 100001){
                    this.$alert('添加成功','提示',{
                        callback: action=>{
                            this.showAddadd = false;
                            this.reload()
                        }
                    })
                }
            })
        },
        deleteList(index){
            axios.post(this.GLOBAL.urlHead + '/manage/result/deleteResult',qs.stringify({
                resultId:this.TSlist[index].resultId
            })).then(res=>{
                this.reload()
            })
        },
        change(index){
            this.showChange = true;
            this.changeTitle = this.TSlist[index].resultTitle;
            this.changeAbs = this.TSlist[index].resultInfo;
            resultId = this.TSlist[index].resultId;
        },
        closeChange(){
            this.showChange = false;
        },
        submitChange(){
            axios.post(this.GLOBAL.urlHead + '/manage/result/updateResult',{
                resultId: resultId,
                resultInfo: this.changeAbs,
                resultTitle: this.changeTitle
            }).then(res=>{
                if(res.data.code == 100001){
                    this.$alert('修改成功！','提示',{
                        callback: action=>{
                            this.showChange = false;
                            this.reload()
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.hhul{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.hhli{
    display: flex;
    padding: 20px 50px;
    align-items: center;
     -moz-box-shadow:0 0 10px #888;
     	-webkit-box-shadow:0 0 10px #888;
    	box-shadow:0 0 10px #888;
        margin-bottom: 20px;
        width: 80%;
        justify-content: space-between;
        
}
.hhliimg{
    width: 300px !important;
    height: 200px;
}
.info{
    word-break: break-all;
    word-wrap: break-word;
    width: 700px;
}
.addItem{
    padding: 50px 0;
    position: fixed;
    width: 800px;
    height: 400px;
    background-color: rgb(212, 211, 211);
    position: absolute;
    top: 300px;
    left: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index:99;
    border-radius: 10px;
}
.change{
    padding: 20px 10px;
    position: fixed;
    width: 600px;
    height: 240px;
    background-color: rgb(212, 211, 211);
    position: absolute;
    top: 300px;
    left: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    z-index:90;
    border-radius: 10px;
}
.addItem div{
    width: 640px;
    display: flex;
    align-items: center;
    
}
.addItem div span{
    width: 90px;
}
.btn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.el-button+.el-button{
    margin-left: 0;
}
</style>
