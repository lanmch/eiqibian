<template>
    <div class="stimulationTestResult">
        
        <div class="resultbox">
            <div class="resultTitle">最终结果</div>
            <div class="resultContent">
                <!--<div class="resultTime">耗时：00:29:34</div>-->
                <div class="resultTime">得分：{{score}}分</div>
                <router-link to="/billZone"><div class="resultBTN">返回赛事专区</div></router-link>
            </div>
        </div>
        <!-- <img class="img" :src="imgURL"/> -->
    </div>
</template>
<script>
export default {
    name:'stimulationTestResult',
    data(){
    	return{
            score:0,
            imgURL: ''
    	}
    	
    },
    mounted(){
        this.score = this.$route.params.score;
        if(this.score >= 60){
            this.imgURL = '../../../../static/logoAll/mascot/1.png'
        }else{
            this.imgURL = '../../../../static/logoAll/mascot/4.png'
        }
    }
}
</script>
<style scoped>
.img{
    width: 200px;
    position: relative;
    z-index: 99;
}
.stimulationTestResult{
    height: 550px;
    margin-top: 14px;
    width: 1100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.resultbox{
    -moz-box-shadow:0 0 10px #888;
    -webkit-box-shadow:0 0 10px #888;
    box-shadow:0 0 10px #888;
    width: 300px;
    height: 240px;
}
.resultTitle{
    color: #fff;
    background-color: #99ccff;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.resultContent{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 180px;
    align-items: center;
}
.resultBTN{
    background-color: #0099ff;
    color: #fff;
    height: 30px;
    line-height: 30px;
    width: 120px;
    text-align: center;
}
</style>

