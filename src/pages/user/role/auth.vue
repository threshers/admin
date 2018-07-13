//角色的授权

<template>
  <div  class="bg-light lter b-b wrapper-md panel panel-default">
      <div class="panel panel-default">
        <div class="panel-heading">角色授权管理</div>
        <div class="panel-body">
          <form class="form-inline">
            <select name="roleid" class="form-control" v-model="sysid">
                <option value="" selected="selected" >---请选择系统---</option>
                <option v-for="(s, index) in datalist" :key="index" :value="s.id">{{s.name}}</option>
            </select>
            <a class="btn btn-success" @click="queryTree" >切换</a>
          </form>
          <div class="line line-dashed b-b line-lg pull-in"></div>
          <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :expand='expandClick' :contextmenu='contextmenuClick' :is-open='true'></vue-ztree>
        </div>
        <footer class="panel-footer text-right bg-light lter">
              <button class="btn btn-default" @click="back">返回</button>
              <button class="btn btn-success" @click="saveAuth">保存</button>
        </footer>
      </div>
  </div>
</template>
<script>
import vueZtree from "./view.vue";
export default {
  components: { vueZtree },
  data() {
    return {
      datalist: null,
      sysid: null,
      currentData: {},
      role_id: null,
      ztreeDataSource: [],
      selectAuth: []
    };
  },
  mounted() {
    this.role_id = this.$route.query.role_id;
    this.querySys();
  },
  methods: {
    // 点击展开收起
    expandClick: function(m) {
      console.log(JSON.parse(JSON.stringify(m)));
      // 点击异步加载
      if (m.isExpand) {
        // 动态加载子节点, 模拟ajax请求数据
        // 请注意 id 不能重复哦。
        if (m.hasOwnProperty("children")) {
          m.loadNode = 1; // 正在加载节点
          setTimeout(() => {
            m.loadNode = 2; // 节点加载完毕
            m.isFolder = !m.isFolder;
          }, 500);
        }
      }
    },
    // 右击事件
    contextmenuClick: function(m) {
      console.log(m);
      console.log("触发了自定义的contextmenuClick事件");
    },
    check: function(m) {
      if (this.selectAuth.indexOf(m.id) > -1) {
          let index = this.selectAuth.indexOf(m.id)
          this.selectAuth.splice(index, 1)
        } else {
          this.selectAuth.push(m.id)
        }
    },
    // 点击节点
    nodeClick: function(m) {
      let d = JSON.parse(JSON.stringify(m));
      console.log(d);
      if (d.isNew == true) {
        this.currentData = d;
        this.check(m);
      } else {
        this.currentData = d;
        this.check(m);
      }
    },
    back: function() {
      this.$router.go(-1);
    },
    saveAuth: function() {
      alert(typeof(this.selectAuth[0]));
      alert(this.selectAuth);
      this.$post("/sso/role/auth", {
        role_id:this.role_id,
        sys_id:this.sysid,
        selectauth:this.selectAuth
      })
        .then(res => {
          if (res.Status == 200) {
              alert("操作成功！");
            } else {
              alert("操作失败");
            }
        })
        .catch(err => {
          if (err.response) {
            alert("操作发生错误");
          }
        });
    },
    queryTree: function() {
      this.$post("sso/sysfunc/query", { id: this.sysid })
        .then(res => {
          if (JSON.stringify(res) == "[]") {
            this.ztreeDataSource = [
              {
                name: "新节点",
                children: [],
                path: "",
                icon: "",
                isNew: true,
                parentId: 0,
                parentLevel: 0
              }
            ];
          } else {
            this.ztreeDataSource = res;
          }
        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    },
    querySys: function() {
      this.$fetch("/sso/subsys/manage", {})
        .then(res => {
          this.datalist = res.list
          if (res.count > 0) {
            this.sysid = this.datalist[0].id;
            this.queryTree();
          }
        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    }
  }
};
</script>
<style>
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
>
