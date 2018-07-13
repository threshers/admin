<!-- 用户信息列表，查询，启动，禁用，解锁 -->
<template>
  <div class="panel panel-default">
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-inline" role="form">
          <div class="form-group">
            <label class="sr-only" for="exampleInputEmail2">用户名</label>
            <input type="text" class="form-control" v-model="paging.username"  placeholder="请输入用户名">
          </div>
          <div class="form-group ">
            <label class="col-sm-2 control-label sr-only">角色</label>
            <select name="roleid" class="form-control visible-md  visible-lg">
              <option value="" selected="selected" >---请选择角色---</option>
              <option v-for="(r, index) in roleList" :key="index" :value="r.role_id">{{r.name}}</option>
            </select>
          </div>
          <button class="btn btn-success" @click="searchClick" >查询</button>
          <button class="btn btn-primary" @click="showModal(1,{})" >添加用户</button>
          <umodal @on-close="closeThis('isShowLog')" :is-show='isShowLog' :is-add='isAdd' :user-info='selectUser' v-on:childMethod="searchClick"></umodal>
        </form>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped m-b-none">
        <thead>
        <tr>
          <th>用户名</th>
          <th>角色名</th>
          <th class="visible-md-block  visible-lg-block">联系电话</th>
          <th>状态</th>
          <th class="visible-md-block visible-lg-block">创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in datalist.items" :key="index">
          <td>{{item.user_name}}</td>
          <td>{{item.role_name}}</td>
          <td class="visible-md-block  visible-lg-block">{{item.mobile}}</td>
          <td>{{item.status_label}}</td>
          <td class="visible-md-block  visible-lg-block">{{item.create_time}}</td>
          <td>
            <div class="form-group form-inline">
              <div class="form-group">
                <button class="btn btn-xs btn-primary visible-md visible-lg" @click="showModal(0,item)">编辑</button>
              </div>
              <div class="form-group">
                <button class="btn btn-xs btn-warning" @click="userChange(0,item.user_id)" v-if="item.status==0" >禁用</button>
                <button class="btn btn-xs btn-warning" @click="userChange(2,item.user_id)" v-if="item.status==2" >启用</button>
                <button class="btn btn-xs btn-warning" @click="userChange(1,item.user_id)" v-if="item.status==1" >解锁</button>
              </div>
              <div class="form-group">
                <button class="btn btn-xs btn-danger visible-md visible-lg" @click="userDel(item.user_id)">删除</button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="form-group form-inline">
      <div class="form-group">
        <div class="list_number">
          共 {{datalist.count}} 条记录 | 每页显示:
          <select id="ddlps" v-model="paging.ps" @change="searchClick">
            <option v-for="psl in pageSizeList" :key="psl.id" :value="psl">{{psl}}</option>
          </select>
          条
        </div>
      </div>
      <div class="form-group" style="float:right">
        <paging style="float:right" class="visible-md visible-lg"
                :pageIndex="paging.pi"
                :total="datalist.count"
                :pageSize="paging.ps"
                @change="pageChange">
        </paging>
      </div>
    </div>

  </div>

</template>
<script>
import umodal from './add.vue';
import { base4UserIndex } from "../../../services/common";
export default {
  components: {umodal},
  data() {
    return {
      paging: { ps: 10, pi: 1, username: "", role: 0 },
      pageSizeList: [10, 20, 50, 100], //可选显示数据条数
      datalist: { count: 0, items: [] },
      roleList: [], //角色列表
      roleid: "",
      role_ng: "",
      isShowLog: false,
      isAdd: 1,
      selectUser: {},
      username: ""
    };
  },
  mounted() {
    base4UserIndex(this);
    this.queryData();
  },
  methods: {
     loadmore: function(loaded) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    loaded('done')
                }, 1000);
            });

    },
    queryData: function() {
      if (this.paging.pi == 0) {
        this.paging.pi = 1;
      }
      this.$post("/sso/user/index", this.paging)
        .then(res => {
          this.datalist.items = res.list;
          this.datalist.count = new Number(res.count);
        })
        .catch(err => {
          if (err.response) {
            alert("查询发生错误");
          }
        });
    },
    pageChange: function(page) {
      this.paging.pi = page;
      this.queryData();
    },

    searchClick: function() {
      this.paging.pi = 1;
      this.queryData();
    },

    showModal: function(i, j) {
      if (j.status == 1) {
        alert("请先进行解锁操作！");
        return false;
      }
      if (i == 1) {
        this.isAdd = 1;
      } else {
        this.isAdd = 0;
        var obj = {
          user_name: j.user_name,
          role_id: j.role_id,
          mobile: j.mobile,
          status: j.status,
          user_id: j.user_id,
          is_add: 0
        }
        this.selectUser = obj;
      }
      this.isShowLog = true;
    },
    closeThis: function() {
      this.isShowLog = false;
    },
    userChange: function(ests, userid) {
      var r = confirm("确认执行该操作吗？");
      if (r == true) {
        var user = { ex_status: ests, user_id: userid};
        this.$post("/sso/user/change", user)
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
        this.queryData();
      } else {
        return false;
      }
    },
    userDel: function(userid) {
      var r = confirm("警告！确认删除该用户吗？");
      if (r == true) {
        var user = { user_id: userid};
        this.$post("/sso/user/delete", user)
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
        this.queryData();
      } else {
        return false;
      }
    }
  }
};
</script>
