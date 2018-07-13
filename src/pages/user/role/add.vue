<!--添加,编辑用户信息-->

<template>
<div>
  <div class="dialog-modal"> <!-- 根元素，z-index 需要高于父容器其他元素 -->
    <div class="dialog-wrapper" v-show="isShow"></div> <!-- 加载一个具有透明度的背景，使根元素透明，子元素会继承该透明度 -->
    <transition name="drop">
        <div class="dialog-container" v-show="isShow">  <!-- 模态框容器，z-index 需要高于背景 -->
            <span class="close-btn" @click="onClose">x</span>
            <form name="formValidate" class="form-horizontal form-validation">
          <div class="panel panel-default">
            <div class="panel-heading">
              <strong>{{isAdd == 1 ? "添加用户" : "编辑用户信息"}}</strong>
            </div>
            <div class="panel-body">
              <div class="form-group">
                <label class="col-sm-3 control-label">角色名</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="roleInfo.role_name" placeholder="请输入角色名" required >
                </div>
              </div>
              <div class="line line-dashed b-b line-lg pull-in"></div>
              <div class="form-group">
                <label class="col-sm-8 control-label">启用</label>
                <div class="col-sm-4">
                  <label class="checkbox i-checks" v-if="isAdd == 1">
                    <input id="statuscheck" type="checkbox">
                  </label>
                  <label class="checkbox i-checks" v-if="isAdd == 0">
                    <input type="checkbox" v-if="roleInfo.status == 0" checked disabled>
                    <input type="checkbox" v-if="roleInfo.status != 0" disabled>
                  </label>
                </div>
              </div>
            </div>
            <footer class="panel-footer text-right bg-light lter">
              <button class="btn btn-default" @click="onClose">取消</button>
              <button class="btn btn-success" @click="submitUser">提交</button>
            </footer>
          </div>
        </form>
        </div>
    </transition>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      roleList: [] //角色列表
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Number,
      default: 1
    },
    roleInfo: {
      type: Object,
      default: {
        role_name: "",
        role_id: -1,
        status: 0,
        is_add: 0
      }
    }
  },
  methods: {
    onClose() {
      this.$emit("on-close");
    },
    callMethod() {
      this.$emit("childMethod");
    },
    submitUser() {
      var r = confirm("确认提交吗？");
      if (r) {
        if (this.isAdd == 1) {
          this.roleInfo.is_add = 1;
          var x = document.getElementById("statuscheck").checked;
          if (x == true) {
            this.roleInfo.status = 0;
          } else if (x == false) {
            this.roleInfo.status = 2;
          }
        }
        this.$post("/sso/role/edit", this.roleInfo)
          .then(res => {
            if (res.Status == 200) {
              alert("操作成功！");
            } else {
              alert("操作失败");
            }
          })
          .catch(err => {
            if (err.response) {
              alert("操作执行时发生错误");
            }
          });
        this.onClose();
        window.location.reload();
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
.panel {
  margin-bottom: 0;
}
.drop-enter-active {
  transition: all 0.5s;
}
.drop-leave-active {
  transition: all 0.3s;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-modal {
  position: absolute;
  z-index: 5;
}
.dialog-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.dialog-wrapper {
  background-color: rgb(0, 0, 0);
  opacity: 0.2;
}
.dialog-container {
  position: fixed;
  z-index: 80;
  top: 10%;
  left: 30%;
  width: 40%;
  /* margin: 0 auto; */
  background-color: #eee;
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
span.close-btn {
  padding: 0 5px;
  float: right;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}
.line {
  width: 100%;
  height: 2px;
  margin: 10px 0;
  overflow: hidden;
  font-size: 0;
}
.line-xs {
  margin: 0;
}

.line-lg {
  margin-top: 15px;
  margin-bottom: 15px;
}

.line-dashed {
  background-color: transparent;
  border-style: dashed !important;
  border-width: 0;
}
.b-b {
  border-bottom: 1px solid #dee5e7;
}
</style>
