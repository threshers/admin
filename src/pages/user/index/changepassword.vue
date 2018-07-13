<!-- 修改密码 -->
<template>
  <form role="form" class="form-validation">
    <div class="panel panel-default">
      <div class="panel-heading">
        <span class="h4">个人密码修改</span>
      </div>
      <div class="panel-body clearfix">
        <div class="form-group">
          <div class="col-sm-12">
            <label>请输入原密码</label>
            <input type="password" class="form-control" name="expassword" v-model="expassword" v-validate="'required|min:6'" required >
            <span v-show="errors.has('expassword')" style="color:red">密码不少于6位</span>
          </div>
        </div>
        <div class="line line-dashed b-b line-lg"></div>
        <div class="form-group">
          <div class="col-sm-6">
            <label>请输入新密码</label>
            <input type="password" name="password1" class="form-control" v-model="password1" v-validate="'required|min:6'" required >
            <span v-show="errors.has('password1')" style="color:red">密码不少于6位</span>
          </div>
          <div class="col-sm-6">
            <label>请再次输入新密码</label>
            <input type="password" name="password2" class="form-control" v-model="password2" v-validate="{'required': 'true', 'is': password1}" required >
            <span v-show="errors.has('password2')" style="color:red">两次密码不匹配</span>
          </div>
        </div>
      </div>
      <footer class="panel-footer text-right bg-light lter">
        <button id="submit_btn" class="btn btn-success" @click="submitPswd">提交</button>
      </footer>
    </div>
  </form>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
export default {
  data() {
    return {
      expassword: "",
      password1: "",
      password2: "",
      notMatch: false,
    };
  },
  methods: {
    check: function() {
      if (this.password1 != this.password2) {
        this.notMatch = true;
      } else {
        this.notMatch = false;
      }
    },
    submitPswd() {
      this.$validator.validateAll().then((msg)=>{
        if(!msg){
          alert("请确认填写正确！");
          return false;
        } else {
          alert("ok");
        }
      })
    }
  }
};
</script>
<style>
.line {
  height: 20px;
}
</style>
>
