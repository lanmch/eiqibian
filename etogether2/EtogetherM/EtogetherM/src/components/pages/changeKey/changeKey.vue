<template>
<div class="keyall">
    <div class="changeKey">
        <div class="keyItemEs"><span> 手机号：</span><el-input v-model.number="tel"></el-input>
            <el-button v-show="show" @click="getTelCode" type="success">{{getCode}}</el-button>
            <el-button v-show="show1" class="count" type="info" size="small" autocomplete="off" disabled>{{count}}s后获取</el-button>
        </div>
        <div class="keyItem"><span> 验证码：</span><el-input v-model="code"></el-input></div>
        <div class="keyItem"><span> 旧密码：</span><el-input v-model="oldPass"></el-input></div>
        <div class="keyItem"><span> 新密码：</span><el-input v-model="newPass"></el-input></div>
        <div class="keyItem"><span> 再次输入：</span><el-input v-model="checkPass"></el-input></div>
        <div class="keyItem btn"><el-button type="primary" @click="changePass">确认修改</el-button></div>
    </div>
</div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true
import element from "element-ui";
export default {
  name: "changeKey",
  data() {
    return {
      show: true,
      show1: false,
      tel: "",
      code: "",
      oldPass: "",
      newPass: "",
      checkPass: "",
      count: "",
      getCode: '获取验证码'
    };
  },
  methods: {
    getTelCode() {
      this.getCode = '验证码已发送'
      axios.get("http://39.108.53.5/user/sendSms", {
          params: {
            phone: Number(this.tel)
          }
        })
        .then(res => {
          if (res.data.code == 10001) {
            if (!this.timer) {
              const TIME_COUNT = 60;
              this.count = TIME_COUNT;
              this.timer = setInterval(() => {
                if (this.count > 1 && this.count <= TIME_COUNT) {
                  this.show = false;
                  this.show1 = true;
                  this.count--;
                } else {
                  this.show = true;
                  this.show1 = false;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            this.$alert('验证码已发送，请注意查收',{
                callback: action=>{
                }
            })
          } else {
            this.$alert('验证码已发送','提示',{
                callback: action=>{

                }
            })
          }
        });
    },
    changePass() {
      axios
        .post(this.GLOBAL.urlHead + "/manage/admin/updatePass", {
          adminPhone: this.tel,
          adminOldPass: this.oldPass,
          adminNewPass: this.newPass,
          phoneCode: this.code
        })
        .then(res => {
          if (res.data.code == 10001) {
            alert("修改密码成功");
          } else {
            alert(res.data.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
.keyall {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.changeKey {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.keyItemEs {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.keyItemEs span {
  display: inline-block;
  width: 30%;
  text-align: left;
}
.keyItem {
  width: 75%;
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.keyItem span {
  display: inline-block;
  width: 30%;
  text-align: left;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>
