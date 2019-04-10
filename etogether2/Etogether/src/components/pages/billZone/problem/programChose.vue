<template>
    <div>

<div class="head"><h4>{{length+index+1}}.</h4>{{proPro.questionTitle}}({{proPro.questionScore}}分)
<div style="margin-top:5px;">{{proPro.questionOption}}</div>
</div>
            <program-tool @proAns='getCodeAnswer'></program-tool>
    </div>


</template>

<script>
import programTool from '../../onProgramming/programTool'
export default {
    name:'programChose',
    components:{
        programTool
    },
    props:{
        proPro:{
            type:Object,
            required:true
        },
        index:{
            type:Number,
            required:true
        },
        length:{
            	type:Number,
            	required:true
            }
    },
    methods:{
        getCodeAnswer(proAns){
            let codeAns = {
                proAns: proAns,
                index: this.index
            }
            this.$emit('codeAns',codeAns)
        }
    }
}
</script>

<style scoped>
h4 {
		display: inline-block;
	}
	.head{
        margin-bottom: 10px;
    }
</style>
