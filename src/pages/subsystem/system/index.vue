//系统管理,查询，添加，编辑，禁用
<template>
  <div class="bg-light lter b-b wrapper-md panel panel-default">
      <div class="panel panel-default">
        <div class="panel-body">
          <form class="form-inline">
            <div class="form-group">
              <label class="sr-only">系统名</label>
              <input type="text" class="form-control" v-model="sysname" placeholder="请输入系统名称">
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label sr-only">状态</label>
              <select  class="form-control visible-md  visible-lg" v-model="selected">
                <option value="" selected="selected" >---请选择状态---</option>
                <option value="0">禁用</option>
                <option value="1">启用</option>
              </select>
            </div>
            <a class="btn btn-success" @click="query">查询</a>
            <span ng-controller="ModalDemoCtrl">
              <script type="text/ng-template" id="myModalContent.html">
                <div ng-include="'src/pages/user/index/add.vue'"></div>
              </script>
              <a class="btn btn-primary" @click="openAdd">添加</a>
            </span>
          </form>
        </div>
      </div>
      <div class="table-responsive">
         <table class="table table-striped m-b-none">
        <thead>
          <tr>
            <th>编号</th>
            <th>系统名称</th>
            <th>首页地址</th>
            <th>状态</th>
            <th>超时时长</th>
            <th>logo</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datalist" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td >{{item.index_url}}</td>
            <td v-if="item.enable==0" class="text-danger">禁用</td>
            <td v-if="item.enable==1" class="text-success">启用</td>
            <td >{{item.login_timeout}}</td>
            <td >{{item.logo}}</td>
            <td>
              <div class="form-group form-inline">
              <div class="form-group" ng-controller="ModalDemoCtrl">
                <button class="btn btn-xs btn-primary visible-md visible-lg" @click="edit(item.id)">编辑</button>
              </div>
              <div class="form-group" ng-controller="ModalDemoCtrl">
                <a class="btn btn-xs btn-warning" @click="enable(item.id,1)" v-if="item.enable==0" >启用</a>
                <a class="btn btn-xs btn-warning" @click="enable(item.id,0)" v-if="item.enable==1" >禁用</a>
              </div>
              <div class="form-group">
                <a class="btn btn-xs btn-danger visible-md visible-lg" @click="deleteById(item.id)">删除</a>

              </div>
              <div class="form-group">
                <a class="btn btn-xs btn-default visible-md visible-lg" @click="manage(item.id)">管理</a>
              </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
        <div  style="float:right">
          <pager
            :total-page="totalPage"
            :init-page="page"
            @go-page="goPage"></pager>
        </div>

      </div>
    <bootstrap-modal ref="theModal" :need-header="true" :need-footer="true" >
      <div slot="title">
        删除系统
      </div>
      <div slot="body">
        确定删除系统？
      </div>
      <div slot="footer">
        <a class="btn btn-sm btn-danger" @click="ok">确定</a>
        <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
      </div>
    </bootstrap-modal>
    <bootstrap-modal ref="deletOkModal" :need-header="true" :need-footer="false" >
      <div slot="title">
        提示
      </div>
      <div slot="body">
        删除成功
      </div>
      <div slot="footer">
        <a class="btn btn-sm btn-primary" @click="chanl">确定</a>
      </div>
    </bootstrap-modal>
    <bootstrap-modal ref="addModal" :need-header="true" :need-footer="true">
      <div slot="title">
        添加系统
      </div>
      <div slot="body">
        <div class="panel panel-default">
          <div class="panel-body">
            <form role="form" class="ng-pristine ng-valid ng-submitted height-min">
              <div class="form-group">
                <label>系统名称</label>
                <input class="form-control" placeholder="请输入系统名称" v-validate="'required'" name="name" v-model="addData.name"  type="text">
                <div class="form-height text-danger"><span>{{ errors.first('name') }}</span></div>

              </div>
              <div class="form-group">
                <label>首页地址</label>
                <input class="form-control" placeholder="请输入首页地址" v-validate="'required'" name="addr" v-model="addData.addr"  type="text">
                <div class="form-height text-danger"><span>{{ errors.first('addr') }}</span></div>
              </div>
              <div class="form-group">
                <label>超时时常</label>
                <input class="form-control" placeholder="请输入超时时常" v-validate="'required|numeric'" v-model="addData.time_out" name="time_out"  type="text">
                <div class="form-height text-danger">  <span>{{ errors.first('time_out') }}</span> </div>
              </div>
              <div class="form-group">
                <label>logo</label>
                <input class="form-control" placeholder="请输入logo地址" v-validate="'required'" name="logo" v-model="addData.logo"  type="text">
                <div class="form-height text-danger"> <span>{{ errors.first('logo') }}</span> </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div slot="footer">
        <a  class="btn btn-sm btn-danger" @click="addNew">提交</a>
        <a  class="btn btn-sm btn-primary" @click="chanl">取消</a>
      </div>
    </bootstrap-modal>
    <bootstrap-modal ref="editModal" :need-header="true" :need-footer="true">
      <div slot="title">
        编辑系统
      </div>
      <div slot="body">
        <div class="panel panel-default">
          <div class="panel-body">
            <form role="form" class="ng-pristine ng-valid ng-submitted">
              <div class="form-group">
                <label>系统名称</label>
                <input class="form-control" placeholder="" v-validate="'required'" name="name2" v-model="editData.name"  type="text">
                <div class="form-height text-danger"><span>{{ errors.first('name2') }}</span></div>
                <input class="form-control" placeholder=""  v-model="editData.id"  type="hidden">
              </div>
              <div class="form-group">
                <label>首页地址</label>
                <input class="form-control" placeholder="" v-validate="'required'" name="url2" v-model="editData.index_url"  type="text">
                <div class="form-height text-danger"><span>{{ errors.first('url2') }}</span></div>
              </div>
              <div class="form-group">
                <label>超时时常</label>
                <input class="form-control" placeholder="" v-validate="'required|numeric'" name="time_out2" v-model="editData.login_timeout"  type="text">
                <div class="form-height text-danger"><span>{{ errors.first('time_out2') }}</span></div>
              </div>
              <div class="form-group">
                <label>logo</label>
                <input class="form-control" placeholder="" v-validate="'required'" name="logo2" v-model="editData.logo"  type="text">
                <div class="form-height text-danger"><span>{{ errors.first('logo2') }}</span></div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div slot="footer">
        <a class="btn btn-sm btn-danger" @click="editPost">提交</a>
        <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
      </div>
    </bootstrap-modal>
    <bootstrap-modal ref="msgModal" :need-header="true" :need-footer="true">
      <div slot="title">
        提示
      </div>
      <div slot="body">
        不能删除该系统
      </div>
      <div slot="footer">
        <button class="btn btn-sm btn-primary" @click="chanl">确定</button>
      </div>
    </bootstrap-modal>
    <bootstrap-modal ref="msg2Modal" :need-header="true" :need-footer="true">
      <div slot="title">
        提示
      </div>
      <div slot="body">
        确定修改当前状态？
      </div>
      <div slot="footer">
        <button class="btn btn-sm btn-danger" @click="enableOk">确定</button>
        <button class="btn btn-sm btn-primary" @click="chanl">取消</button>
      </div>
    </bootstrap-modal>

  </div>
</template>

<script>
  import pager from 'vue-simple-pager'
  export default {
  components: {
    'bootstrap-modal': require('vue2-bootstrap-modal'),
    'pager': pager
  },
  data() {
    return {
      datalist: null,
      datacount: 0,
      sysid: 0,
      id: null,
      sysname: "",
      selected: "",
      addData: {name:"",addr:"",time_out:"",logo:""},
      editData: {},
      enableData: {id:null,status:null},
      page: 1,
      totalPage: 10
    }
  },
  mounted(){
    this.goPage({page:1})
    },
  methods:{
    goPage (data) {
      console.log(data)
      this.page = data.page
      this.$fetch("/sso/subsys/manage", {page: data.page})
        .then(res => {
          this.datalist = res.list
          this.datacount = res.count
          this.totalPage = Math.ceil(res.count / 10)
        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    },
    queryData: function() {
      this.$fetch("/sso/subsys/manage", {page:this.page})
        .then(res => {
          this.datalist = res.list
          this.datacount = res.count
          this.totalPage = Math.floor(res.count / 10)

        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    },
    query() {
      this.$post("/sso/subsys/query", {name: this.sysname, status: this.selected})
        .then(res => {
          this.datalist = res.list
          this.datacount = res.count
        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    },
    openAdd() {
      this.$refs.addModal.open()
    },
    addNew(){

          this.$post("/sso/subsys/manage",{
            name:this.addData.name,
            addr: this.addData.addr,
            time_out:this.addData.time_out,
            logo: this.addData.logo
          })
            .then(res => {
              if(res.msg == "success"){
                this.$refs.addModal.close()
                this.goPage({page:this.page})
              }
            })
            .catch(err => {
              if (err.response) {
                // this.$router.push("/member/login");
              }
            });


    },
    deleteById(id) {
      this.sysid = id
      if (this.sysid == 0 || this.sysid == 100) {
        this.$refs.msgModal.open()
        return false
      }
      this.$refs.theModal.open()
    },
    chanl() {
      this.$refs.theModal.close()
      this.$refs.msgModal.close()
      this.$refs.editModal.close()
      this.$refs.addModal.close()
      this.$refs.msg2Modal.close()
    },
    ok() {
      this.$del("/sso/subsys/manage", {data:{id:this.sysid}})
        .then(res => {
          if (res.msg == "success"){
            this.chanl()
            this.goPage({page:this.page})
          }
        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    },
    enable(id,status) {
        this.$refs.msg2Modal.open()
        this.enableData.id = id
        this.enableData.status = status
    },
    enableOk(){
      this.$fetch("/sso/subsys/enable",{id:this.enableData.id,status:this.enableData.status})
        .then(res => {
          if(res.msg == "success"){
            this.goPage({page:this.page})
            this.chanl()
          }
        })
        .catch(err => {
          if (err.response) {
            // this.$router.push("/member/login");
          }
        });
    },
    edit(id){
      this.datalist.forEach((item, index) =>{
       if(item.id == id){
         this.editData = item
         this.$refs.editModal.open()
       }
      })
    },
    editPost() {

          this.$post("/sso/subsys/edit",this.editData)
            .then(res => {
              if(res.msg == "success"){
                this.$refs.editModal.close()
                this.goPage({page:this.page})
              }
            })
            .catch(err => {
              if (err.response) {
                // this.$router.push("/member/login");
              }
            });



    },
    manage(id) {
      this.$router.push({
        name: 'sysfunc',
        query: {
          id: id
        }
      })

    }
  }
}
</script>

