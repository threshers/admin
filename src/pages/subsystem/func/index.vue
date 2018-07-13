//系统功能查询
<template>
  <div class="app-content-body fade-in-up ng-scope">
    <div class="fade-in-down ng-scope">
      <div class="bg-light lter b-b wrapper-md hidden-print ng-scope">
        <h1 class="m-n font-thin h3">系统功能管理</h1>
      </div>
      <div class="wrapper-md ng-scope">
        <div class="panel panel-default">
          <div class="panel-body">
            <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :expand='expandClick' :contextmenu='contextmenuClick' :is-open='true'></vue-ztree>
          </div>
        </div>

        <bootstrap-modal ref="editModal1" :need-header="true" :need-footer="true" >
          <div slot="title">
            编辑功能
          </div>
          <div slot="body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form role="form" class="ng-pristine ng-valid ng-submitted">
                  <div class="form-group">
                    <label>功能名称</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="name" v-model="currentData.name" type="text">
                    {{ errors.first('name') }}
                    <input class="form-control" placeholder="" v-model="currentData.id"  type="hidden">
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div slot="footer">
            <a class="btn btn-sm btn-danger" @click="editFunc">提交</a>
            <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
          </div>
        </bootstrap-modal>
        <bootstrap-modal ref="editModal2" :need-header="true" :need-footer="true"  >
          <div slot="title">
            编辑功能
          </div>
          <div slot="body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form role="form" class="ng-pristine ng-valid ng-submitted">
                  <div class="form-group">
                    <label>功能名称</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="name" v-model="currentData.name" type="text">
                    {{ errors.first('name') }}
                    <input class="form-control" placeholder="" v-model="currentData.id"  type="hidden">
                  </div>
                  <div class="form-group">
                    <label>图标</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="icon" v-model="currentData.icon" type="text">
                    {{ errors.first('icon') }}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div slot="footer">
            <a class="btn btn-sm btn-danger" @click="editFunc">提交</a>
            <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
          </div>
        </bootstrap-modal>
        <bootstrap-modal ref="editModal3" :need-header="true" :need-footer="true"  >
          <div slot="title">
            编辑功能
          </div>
          <div slot="body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form role="form" class="ng-pristine ng-valid ng-submitted">
                  <div class="form-group">
                    <label>功能名称</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="name" v-model="currentData.name" type="text">
                    {{ errors.first('name') }}
                    <input class="form-control" placeholder="" v-model="currentData.id"  type="hidden">
                  </div>
                  <div class="form-group">
                    <label>地址</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="path" v-model="currentData.path" type="text">
                    {{ errors.first('path') }}
                  </div>
                  <div class="form-group">
                    <label>图标</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="icon" v-model="currentData.icon" type="text">
                    {{ errors.first('icon') }}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div slot="footer">
            <a class="btn btn-sm btn-danger" @click="editFunc">提交</a>
            <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
          </div>
        </bootstrap-modal>
        <bootstrap-modal ref="addModal1" :need-header="true" :need-footer="true" >
          <div slot="title">
            添加功能
          </div>
          <div slot="body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form role="form" class="ng-pristine ng-valid ng-submitted">
                  <div class="form-group">
                    <label>功能名称</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="name" v-model="currentData.name" type="text">
                    {{ errors.first('name') }}
                    <input class="form-control" placeholder="" v-model="currentData.id"  type="hidden">
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div slot="footer">
            <a class="btn btn-sm btn-danger" @click="addFunc">提交</a>
            <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
          </div>
        </bootstrap-modal>
        <bootstrap-modal ref="addModal2" :need-header="true" :need-footer="true" >
          <div slot="title">
            添加功能
          </div>
          <div slot="body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form role="form" class="ng-pristine ng-valid ng-submitted">
                  <div class="form-group">
                    <label>功能名称</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="name" v-model="currentData.name" type="text">
                    {{ errors.first('name') }}
                    <input class="form-control" placeholder="" v-model="currentData.id"  type="hidden">
                  </div>
                  <div class="form-group">
                    <label>图标</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="icon" v-model="currentData.icon" type="text">
                    {{ errors.first('icon') }}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div slot="footer">
            <a class="btn btn-sm btn-danger" @click="addFunc">提交</a>
            <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
          </div>
        </bootstrap-modal>
        <bootstrap-modal ref="addModal3" :need-header="true" :need-footer="true" >
          <div slot="title">
            添加功能
          </div>
          <div slot="body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form role="form" class="ng-pristine ng-valid ng-submitted">
                  <div class="form-group">
                    <label>功能名称</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="name" v-model="currentData.name" type="text">
                    {{ errors.first('name') }}
                    <input class="form-control" placeholder="" v-model="currentData.id"  type="hidden">
                  </div>
                  <div class="form-group">
                    <label>地址</label>
                    <input class="form-control"  placeholder="" v-validate="'required'" name="path" v-model="currentData.path" type="text">
                    {{ errors.first('path') }}
                  </div>
                  <div class="form-group">
                    <label>图标</label>
                    <input class="form-control" placeholder="" v-validate="'required'" name="icon" v-model="currentData.icon" type="text">
                    {{ errors.first('icon') }}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div slot="footer">
            <a class="btn btn-sm btn-danger" @click="addFunc">提交</a>
            <a class="btn btn-sm btn-primary" @click="chanl">取消</a>
          </div>
        </bootstrap-modal>
      </div>
    </div>
  </div>

</template>


<script>

  import vueZtree from '../../../components/vue-tree.vue'
  export default {
    data () {
      return {
        currentData: {},
        id:null,
        showAddr:false,
        ztreeDataSource:[],
        obj: null,
      }
    },
    methods:{
      editFunc(){
        let data = JSON.parse(JSON.stringify(this.currentData))
        this.$validator.validate().then(result => {
          if (!result) {
            return false
          } else {
            this.$post("/sso/sysfunc/edit", {id: data.id, name: data.name, icon: data.icon, path: data.path})
              .then(res => {
                if (res.msg == "success") {
                 this.initData()
                  this.chanl()
                }
              })
              .catch(err => {
                if (err.response) {
                  // this.$router.push("/member/login");
                }
              });
          }
        })
      },
      addFunc(){
        let d = JSON.parse(JSON.stringify(this.currentData))
        console.log(d);
        this.$validator.validate().then(result => {
          if (!result) {
            return false
          } else {
            this.$post("/sso/sysfunc/add", {
              parentid: d.parentId,
              parentlevel: d.parentLevel,
              sysid: this.id,
              name: d.name,
              icon: d.icon,
              path: d.path
            })
              .then(res => {
                if (res.msg == "success") {
                  this.initData()
                  this.chanl()
                }
              })
              .catch(err => {
                if (err.response) {
                  // this.$router.push("/member/login");
                }
              });
          }
        })
      },
      // 点击节点
      nodeClick:function(m){
        this.obj = m
        let d = JSON.parse(JSON.stringify(m))
        console.log(d)
        if (d.isNew == true){
          if(d.parentLevel == 2 || d.level_id == 3){
            this.currentData = d
            this.$refs.addModal3.open()
          }
          if(d.parentLevel == 1 || d.level_id == 2){
            this.currentData = d
            this.$refs.addModal2.open()
          }
          if (d.parentLevel == 0 || d.level_id == 1){
            this.currentData = d
            this.$refs.addModal1.open()
          }
        }else{
          if(d.level_id==3 || d.parentLevel == 2) {
            this.currentData = d
            this.$refs.editModal3.open()
          }
          if(d.level_id==2 || d.parentLevel == 1) {
            this.currentData = d
            this.$refs.editModal2.open()
          }
          if(d.level_id==1 || d.parentLevel == 0) {
            this.currentData = d
            this.$refs.editModal1.open()
          }
        }
      },
      // 右击事件
      contextmenuClick:function(m){

        console.log("触发了自定义的contextmenuClick事件");
      },
      // 点击展开收起
      expandClick:function(m){
        console.log(JSON.parse(JSON.stringify(m)));
        // 点击异步加载
        if(m.isExpand) {
          // 动态加载子节点, 模拟ajax请求数据
          // 请注意 id 不能重复哦。
          if(m.hasOwnProperty("children")){

            m.loadNode = 1; // 正在加载节点

            setTimeout(()=>{

              m.loadNode = 2; // 节点加载完毕

              m.isFolder = !m.isFolder;

              // m.children.push({
              //   id:+new Date(),
              //   name:"动态加载节点1",
              //   path:"",
              //   clickNode:false,
              //   isFolder:false,
              //   isExpand:false,
              //   loadNode:0,
              //   children:[{
              //     id:+new Date()+1,
              //     name:"动态加载末节点",
              //     path:"",
              //     clickNode:false,
              //     isExpand:false,
              //     isFolder:false,
              //     loadNode:0
              //   }]
              // })
            },500)

          }
        }
      },
      chanl(){
        this.initData()
        this.$refs.editModal1.close()
        this.$refs.editModal2.close()
        this.$refs.editModal3.close()
        this.$refs.addModal1.close()
        this.$refs.addModal2.close()
        this.$refs.addModal3.close()
      },
      initData() {
        let routerParams = this.$route.query;
        this.id = routerParams.id;
        this.$post("sso/sysfunc/query",{id:this.id})
          .then(res => {
            if (JSON.stringify(res) == '[]') {
              this.ztreeDataSource = [{
                name:"新节点",
                children:[],
                path:"",
                icon:"",
                isNew:true,
                parentId:0,
                parentLevel:0,
              }]
            }else{
              this.ztreeDataSource = res
            }
          })
          .catch(err => {
            if (err.response) {
              // this.$router.push("/member/login");
            }
          });
      }
    },
    components:{
      vueZtree,
      'bootstrap-modal': require('vue2-bootstrap-modal')
    },
    mounted() {
      this.initData()
    }
  }
</script>

