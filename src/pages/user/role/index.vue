<!--角色基础信息查询-->
<template>
  <div class="panel panel-default">
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-inline" role="form">
          <div class="form-group">
            <label class="sr-only" for="exampleInputEmail2">角色名</label>
            <input type="text" class="form-control" v-model="paging.role_name"  placeholder="请输入用户名">
          </div>
          <a class="btn btn-success" @click="searchClick" >查询</a>
          <a class="btn btn-primary" @click="showModal(1,{})" >添加角色</a>
          <rmodal @on-close="closeThis('isShowLog')" :is-show='isShowLog' :is-add='isAdd' :role-info='selectRole' v-on:childMethod="searchClick"></rmodal>
        </form>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped m-b-none">
        <thead>
        <tr>
          <th>角色名</th>
          <th>状态</th>
          <th class="visible-md-block visible-lg-block">创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in datalist.items" :key="index">
          <td>{{item.role_name}}</td>
          <td>{{item.status_label}}</td>
          <td class="visible-md-block  visible-lg-block">{{item.create_time}}</td>
          <td>
            <div class="form-group form-inline">
              <div class="form-group">
                <button class="btn btn-xs btn-primary visible-md visible-lg" @click="showModal(0,item)">编辑</button>
              </div>
              <div class="form-group">
                <button class="btn btn-xs btn-warning" @click="roleChange(0,item.role_id)" v-if="item.status==0" >禁用</button>
                <button class="btn btn-xs btn-warning" @click="roleChange(2,item.role_id)" v-if="item.status==2" >启用</button>
              </div>
              <div class="form-group">
                <button class="btn btn-xs btn-danger visible-md visible-lg" @click="roleDel(item.role_id)">删除</button>
              </div>
              <div class="form-group">
                <button class="btn btn-xs btn-default visible-md visible-lg" @click="auth(item.role_id)">授权</button>
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
import rmodal from './add.vue';
export default {
  components: {rmodal},
  data() {
    return {
      paging: { ps: 10, pi: 1, role_name: "" },
      pageSizeList: [10, 20, 50, 100], //可选显示数据条数
      datalist: { count: 0, items: [] },
      isShowLog: false,
      isAdd: 1,
      selectRole: {}
    };
  },
  mounted() {
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
      this.$post("/sso/role/index", this.paging)
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
      if (i == 1) {
        this.isAdd = 1;
      } else {
        this.isAdd = 0;
        var obj = {
          role_name: j.role_name,
          role_id: j.role_id,
          status: j.status,
          is_add: 0
        }
        this.selectRole = obj;
      }
      this.isShowLog = true;
    },
    closeThis: function() {
      this.isShowLog = false;
    },
    roleChange: function(ests, roleid) {
      var r = confirm("确认执行该操作吗？");
      if (r == true) {
        var role = { ex_status: ests, role_id: roleid};
        this.$post("/sso/role/change", role)
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
        window.location.reload();
      } else {
        return false;
      }
    },
    roleDel: function(roleid) {
      var r = confirm("警告！确认删除该用户吗？");
      if (r == true) {
        var role = { role_id: roleid};
        this.$post("/sso/role/delete", role)
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
        window.location.reload();
      } else {
        return false;
      }
    },
    auth(id) {
      this.$router.push({
        name: 'roleauth',
        query: {
          role_id: id
        }
      })
    }
  }
};
</script>

