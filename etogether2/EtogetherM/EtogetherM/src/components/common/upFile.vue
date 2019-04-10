<template>
    <div>
        <input type="file" accept="image/png,image/gif,image/jpeg" id="fileField" @click="upFileGetToken" @change="changeName"/>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'upFile',
    data(){
        return{
            
        }
    },
    methods:{
        upFileGetToken(){
            axios.get(this.GLOBAL.urlHead+'/manage/file/getToken')
            .then(res=>{
                this.$emit('getfileToken',res.data.data.token)
            })
        },
        changeName(){
            var fileName = document.getElementById("fileField").value.split('\\');
            this.$emit('fileName',fileName)
        },

    }
}
</script>

<style scoped>

</style>
