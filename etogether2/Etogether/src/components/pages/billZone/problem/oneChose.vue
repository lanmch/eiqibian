<template>
    <div>
        <div class="oneDetail">
                <!-- <div class="oneType">单选</div> -->
                <div class="onePro">
                	<div class="oneProdiv">
                		<h4>{{index+1}}.</h4>{{onePro.questionTitle}}
                		 <span>({{onePro.questionScore}}分)</span>
                	</div>
                    <div class="oneProdiv">
	                    	<div class="oneProdivOp">
	                    		<div class="BTN" 
	                    		:class="{BTNchoose:nOne=='A'}" 
	                    		@click="chooseOneAnswerA">
	                    		A
	                    	</div>
                    	<!--<span>{{onePro.questionOption.optionA}}</span>-->
                    	<span v-html='onePro.questionOption.optionA'></span>
                    	</div>
                    	
                    	<div class="oneProdivOp">
	                    	<div class="BTN" 
	                    		:class="{BTNchoose:nOne=='B'}" 
	                    		@click="chooseOneAnswerB">
	                    		B
	                    	</div>
	                    	<!--<span>{{onePro.questionOption.optionB}}</span>-->
	                    	<span v-html='onePro.questionOption.optionB'></span>
                    	</div>
                    	
                    	<div class="oneProdivOp">
	                    	<div class="BTN" 
	                    		:class="{BTNchoose:nOne=='C'}" 
	                    		@click="chooseOneAnswerC">
	                    		C
	                    	</div>
	                    	<!--<span>{{onePro.questionOption.optionC}}</span>-->
	                    	<span v-html='onePro.questionOption.optionC'></span>
                    	</div>
                    	
                    	<div class="oneProdivOp">
	                    	<div class="BTN" 
	                    		:class="{BTNchoose:nOne=='D'}" 
	                    		@click="chooseOneAnswerD">
	                    		D
	                    	</div>
	                    	<!--<span>{{onePro.questionOption.optionD}}</span>-->
	                    	<span v-html='onePro.questionOption.optionD'></span>
                    	</div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'oneChose',
    data() {
			return {
				proOneDetailList: [
                'int','float','char','double'
            ],
				nOne: -1,
				oneChoiceQuestion: [],
				paperId : 4,	
			}
        },
        props:{
            onePro:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            }
        },
        methods:{
            chooseOneAnswerA() {
				this.nOne = 'A';
				let chooseData = {
					answer: this.nOne,
					index: this.index
				}
				this.$emit('chooseOne',chooseData)
			},
			chooseOneAnswerB() {
				this.nOne = 'B';
				let chooseData = {
					answer: this.nOne,
					index: this.index
				}
				this.$emit('chooseOne',chooseData)
			},
			chooseOneAnswerC() {
				this.nOne = 'C';
				let chooseData = {
					answer: this.nOne,
					index: this.index
				}
				this.$emit('chooseOne',chooseData)
			},
			chooseOneAnswerD() {
				this.nOne = 'D';
				let chooseData = {
					answer: this.nOne,
					index: this.index
				}
				this.$emit('chooseOne',chooseData)
			},
        }
}
</script>

<style scoped>
.BTN {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border: 2px solid #99ccff;
		border-radius: 50%;
		color: #99ccff;
		cursor: pointer;
		margin-right: 8px;
	}
	
	.BTNchoose {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		background-color: #99ccff;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
    }
    .oneType {
		height: 22px;
		line-height: 22px;
		text-align: center;
		width: 40px;
		border: 2px solid #0099ff;
		color: #0099ff;
		font-size: 12px;
		float: left;
	}
	
	.onePro {
		display: flex;
		flex-direction: column;
		margin-left: 55px;
	}
	
	.onePro .oneProdivOp {
		margin-bottom: 8px;
		display: flex;
		align-items: baseline;
	}
	
	.onePro h4 {
		display: inline-block;
	}
	
	.oneProdiv {
		margin-bottom: 20px;
		display: inline-block;
	}
	.oneProdiv span{
		display: inline-block;
		margin-left: 8px;
	}
	.onePro span {
		display: inline-block;
		margin-left: 8px;
	}
		.onePro .oneProdivOp {
		margin-bottom: 8px;
	}
	
</style>
