<template>
    <div class="app" id="app" :class="[layoutClass?layoutClass:'app-header-fixed']" >
        <!-- navbar -->
        <div class="app-header navbar">
            <!-- navbar header -->
            <div class="navbar-header" v-bind:class="[navbarHeaderClass?navbarHeaderClass:'bg-info']">
                <button class="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse">
          <i class="glyphicon glyphicon-cog"></i>
        </button>
                <button class="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside" ui-scroll="app">
          <i class="glyphicon glyphicon-align-justify"></i>
        </button>
                <!-- brand -->
                <a href="#/" class="navbar-brand text-lt">
                    <!-- <i class="fa fa-btc"></i> -->
                    <img src="../../img/lt.png" alt="." class="hide"/>
                    <span class="hidden-folded m-l-xs">
                        <img v-bind:src="require(`../../img/`+sys.logo)" />
                        </span>
                </a>
                <!-- / brand -->
            </div>
            <!-- / navbar header -->

            <!-- navbar collapse -->
            <div class="collapse pos-rlt navbar-collapse box-shadow" v-bind:class="[navbarCollapseClass?navbarCollapseClass:'bg-info']">
                <!-- buttons -->
                <div class="nav navbar-nav hidden-xs">
                    <a href="#" class="btn no-shadow navbar-btn" data-toggle="class:app-aside-folded" data-target=".app">
                        <i class="fa fa-outdent fa-fw text"></i>
                        <i class="fa fa-indent fa-fw text-active"></i>
                    </a>
                    <!-- <a href class="btn no-shadow navbar-btn" data-toggle="class:show" data-target="#aside-user">
                        <i class="fa fa-user-o fa-fw"></i>
                    </a> -->
                </div>

                 <div class="title">{{sys.name}}</div>

                <!-- / buttons -->



                <!-- nabar right -->
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                            <i class="iconfont icon-tixing fa-fw" aria-hidden="true"></i>
                            <span class="visible-xs-inline">通知</span>
                            <span class="badge badge-sm up bg-danger pull-right-xs" v-if="notifies.count>0" >{{notifies.count}}</span>
                        </a>
                        <!-- dropdown -->
                        <div class="dropdown-menu w-xl animated fadeInUp"  v-if="notifies.count>0">
                            <div class="panel bg-white">
                                <div class="panel-heading b-light bg-light">
                                    <strong>你有<span>{{notifies.count}}</span>个通知未处理</strong>
                                </div>
                                <div class="list-group">
                                    <a href class="media list-group-item" v-for="notify in notifies.details" :key="notify.id">
                                        <span class="media-body block m-b-none">
                      {{notify.title}}<br>
                      <small class="text-muted">1 hour ago</small>
                    </span>
                                    </a>
                                </div>
                                <div class="panel-footer text-sm">
                                    <a href="#notes" data-toggle="class:show animated fadeInRight">查看所有通知</a>
                                </div>
                            </div>
                        </div>
                        <!-- / dropdown -->
                    </li>
                    <li class="dropdown">
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle clear">
                            <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img src="../../img/a0.jpg" alt="...">
                <i class="on md b-white bottom"></i>
              </span>
                            <span class="hidden-sm hidden-md">{{user.user_name}}</span> <b class="caret"></b>
                        </a>
                        <!-- dropdown -->
                        <ul class="dropdown-menu animated fadeInRight w">
                            <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                                <div>
                                    {{user.role_name}}
                                </div>
                                <progressbar value="60" class="progress-xs m-b-none bg-white"></progressbar>
                            </li>
                            <li>
                                <a @click="goto('/profile')">
                                    <span class="badge bg-danger pull-right"> {{user.profile_percent}}%</span>
                                    <span>个人资料</span>
                                </a>
                            </li>
                            <li>
                                <a ui-sref="app.page.profile" @click="goto('/change_passwd')">修改密码</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a ui-sref="access.signin" @click="goto('/member/login')">退出</a>
                            </li>
                        </ul>
                        <!-- / dropdown -->
                    </li>
                </ul>



               <!-- link and dropdown -->
                <ul class="nav navbar-nav hidden-sm navbar-right">


                    <li class="dropdown pos-stc">
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                            <span>常用菜单</span>
                            <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu wrapper w-full bg-white">
                            <div class="row">
                                <div class="col-sm-4" v-for="pi in populars" :key="pi.id">
                                    <div class="m-l-xs m-t-xs m-b-xs font-bold">{{pi.name}} <span class="badge badge-sm bg-success">{{pi.children.length}}</span></div>
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <ul  class="list-unstyled l-h-2x" >
                                                <li v-for="(vi,vn) in pi.children" :key="vi.id" v-if="vn%2==0">
                                                    <a @click="link(vi)"><i class="fa fa-fw fa-angle-right text-muted m-r-xs"></i>{{vi.name}}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xs-6">
                                            <ul class="list-unstyled l-h-2x">
                                               <li v-for="(vi,vn) in pi.children" :key="vi.id" v-if="vn%2==1">
                                                    <a @click="link(vi)"><i class="fa fa-fw fa-angle-right text-muted m-r-xs"></i>{{vi.name}}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </li>
                </ul>
                <!-- / link and dropdown -->

                <!-- search form -->
                <form class="navbar-form navbar-form-sm navbar-right shift" ui-shift="prependTo" data-target=".navbar-collapse" role="search" ng-controller="TypeaheadDemoCtrl">
                    <div class="form-group">
                        <div class="input-group">
                            <input type="text" ng-model="selected" typeahead="state for state in states | filter:$viewValue | limitTo:8" class="form-control input-sm bg-light no-border rounded padder" placeholder="Search projects...">
                            <span class="input-group-btn">
                <button type="submit" class="btn btn-sm bg-light rounded"><i class="fa fa-search"></i></button>
              </span>
                        </div>
                    </div>
                </form>
                <!-- / search form -->

                <!-- / navbar right -->

            </div>
            <!-- / navbar collapse -->
        </div>
        <!-- / navbar -->

        <!-- menu -->
        <div class="app-aside hidden-xs" v-bind:class="[appAsideClass?appAsideClass:'']">
            <div class="aside-wrap">
                <div class="navi-wrap">
                    <!-- user -->
                    <div class="clearfix hidden-xs text-center hide" id="aside-user">
                        <div class="dropdown wrapper">
                            <a ui-sref="app.page.profile">
                                <span class="thumb-lg w-auto-folded avatar m-t-sm">
                  <img src="../../img/a0.jpg" class="img-full" alt="...">
                </span>
                            </a>
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle hidden-folded">
                                <span class="clear">
                  <span class="block m-t-sm">
                    <strong class="font-bold text-lt">John.Smith</strong>
                    <b class="caret"></b>
                  </span>
                                <span class="text-muted text-xs block">Art Director</span>
                                </span>
                            </a>
                            <!-- dropdown -->
                            <ul class="dropdown-menu animated fadeInRight w hidden-folded">
                                <li class="wrapper b-b m-b-sm bg-info m-t-n-xs">
                                    <span class="arrow top hidden-folded arrow-info"></span>
                                    <div>
                                        <p>300mb of 500mb used</p>
                                    </div>
                                    <progressbar value="60" type="white" class="progress-xs m-b-none dker"></progressbar>
                                </li>
                                <li>
                                    <a href>Settings</a>
                                </li>
                                <li>
                                    <a ui-sref="app.page.profile">Profile</a>
                                </li>
                                <li>
                                    <a href>
                                        <span class="badge bg-danger pull-right">3</span> Notifications
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a ui-sref="access.signin">Logout</a>
                                </li>
                            </ul>
                            <!-- / dropdown -->
                        </div>
                        <div class="line dk hidden-folded"></div>
                    </div>
                    <!-- / user -->

                    <!-- nav -->
                    <!-- 左边导航 -->
                    <nav ui-nav class="navi">
                        <ul class="nav" v-for="l1 in menus" :key="l1.id" >

                            <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                                <span translate="aside.nav.your_stuff.YOUR_STUFF">快捷菜单</span>
                            </li>
                            <li v-for="(short,index) in shortcuts" :key="short.id" :class="index==active?'active':''">
                                     <a @click="open(short)">

                    <span class="pull-right text-muted">
                    <i class="fa fa-times fa-angle-right text" @click="del(short)"></i>
                  </span>

                                         <i :class="index==active?'fa fa-angle-right text-info-lter':'fa fa-angle-right'"></i>
                                         <span :class="index==active?'text-info-lter':''">{{short.name}}</span>
                                        </a>

                            </li>


                            <li class="line dk hidden-folded" ></li>

                            <li class="hidden-folded padder m-t m-b-sm text-muted text-xs" >
                                <span translate="aside.nav.HEADER">{{l1.name}}</span>
                            </li>
                            <li v-for="l2 in l1.children" :key="l2.id" class="active">
                                <a href class="auto">
                                    <span class="pull-right text-muted">
                    <i class="fa fa-fw fa-angle-right text"></i>
                    <i class="fa fa-fw fa-angle-down text-active"></i>
                  </span>
                                    <i :class="l2.icon"></i>
                                    <span class="font-bold" translate="aside.nav.DASHBOARD">{{l2.name}}</span>
                                </a>
                                <ul class="nav nav-sub dk" >
                                    <li class="nav-sub-header">
                                        <a href>
                                            <span translate="aside.nav.DASHBOARD">{{l2.name}}</span>
                                        </a>
                                    </li>
                                    <li ui-sref-active="active" v-for="l3 in l2.children" :key="l3.id">
                                        <a @click="link(l3)">
                                            <span>{{l3.name}}</span>
                                        </a>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <!-- nav -->

                    <!-- aside footer -->
                    <!-- / aside footer -->
                </div>
            </div>
        </div>
        <!-- / menu -->

        <!-- content -->
        <div class="app-content">
            <div ui-butterbar></div>
            <a href class="off-screen-toggle hide" data-toggle="class:off-screen" data-target=".app-aside"></a>
            <div class="app-content-body fade-in-up">
                <!-- COPY the content from "tpl/" -->
                <div class="bg-light lter b-b wrapper-md" v-show="iframeState">
                <h1 class="m-n font-thin h3">{{activeMenu.name}}</h1>
                </div>
              <iframe v-show="iframeState" id="show-iframe"  :src="currentPageURL" frameborder="false" scrolling="no" width="100%"  height="100%" allowtransparency="true"
onload="this.height=160" >
</iframe>


                <router-view v-show="!iframeState"></router-view>
                <!-- PASTE above -->
            </div>
        </div>
        <!-- /content -->

        <!-- aside right -->
        <div class="app-aside-right pos-fix no-padder w-md w-auto-xs bg-white b-l animated fadeInRight hide">
            <div class="vbox">
                <div class="wrapper b-b b-t b-light m-b">
                    <a href class="pull-right text-muted text-md" data-toggle="class:show" data-target=".app-aside-right"><i class="icon-close"></i></a> Chat
                </div>
                <div class="row-row">
                    <div class="cell">
                        <div class="cell-inner padder">
                            <!-- chat list -->
                            <div class="m-b">
                                <a href class="pull-left thumb-xs avatar"><img src="img/a2.jpg" alt="..."></a>
                                <div class="clear">
                                    <div class="pos-rlt wrapper-sm b b-light r m-l-sm">
                                        <span class="arrow left pull-up"></span>
                                        <p class="m-b-none">Hi John, What's up...</p>
                                    </div>
                                    <small class="text-muted m-l-sm"><i class="fa fa-ok text-success"></i> 2 minutes ago</small>
                                </div>
                            </div>
                            <div class="m-b">
                                <a href class="pull-right thumb-xs avatar"><img src="img/a3.jpg" class="img-circle" alt="..."></a>
                                <div class="clear">
                                    <div class="pos-rlt wrapper-sm bg-light r m-r-sm">
                                        <span class="arrow right pull-up arrow-light"></span>
                                        <p class="m-b-none">Lorem ipsum dolor :)</p>
                                    </div>
                                    <small class="text-muted">1 minutes ago</small>
                                </div>
                            </div>
                            <div class="m-b">
                                <a href class="pull-left thumb-xs avatar"><img src="img/a2.jpg" alt="..."></a>
                                <div class="clear">
                                    <div class="pos-rlt wrapper-sm b b-light r m-l-sm">
                                        <span class="arrow left pull-up"></span>
                                        <p class="m-b-none">Great!</p>
                                    </div>
                                    <small class="text-muted m-l-sm"><i class="fa fa-ok text-success"></i>Just Now</small>
                                </div>
                            </div>
                            <!-- / chat list -->
                        </div>
                    </div>
                </div>
                <div class="wrapper m-t b-t b-light">
                    <form class="m-b-none">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Say something">
                            <span class="input-group-btn">
                <button class="btn btn-default" type="button">SEND</button>
              </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- / aside right -->

        <!-- footer -->
        <div class="app-footer wrapper b-t bg-light">
            <span class="pull-right">1.0.0 <a href="#app" class="m-l-sm text-muted"><i class="fa fa-long-arrow-up"></i></a></span> &copy; 2014 All Copyright Reserved. <a href="http://www.qianxingniwo.com/" target="_blank" title="qxnw">千行你我</a>
        </div>
        <!-- / footer -->
    </div>
</template>

<script>
import { loadNavbar,resizeIframe } from "../../services/nav";
import {changeTheme} from "../../services/bg"
loadNavbar();
resizeIframe();
export default {
  data() {
    return {
      navbarHeaderClass:"bg-primary",
      navbarCollapseClass:"bg-primary",
      appAsideClass:"bg-dark",
      layoutClass:"",
      sys: {
        logo: "logo.png"
       
      },
      currentPageURL:"http://www.baidu.com",
      iframeState:false,
      notifies:{count:0,details:[]},//{count:1,details:[{id:1,title:"下游卡单59笔"}]}
      user: {},
      shortcuts: [],
      populars: [],
      active: 0,
      activeMenu:{},
      menus: []
    };
  },
  mounted() {
      

    this.$fetch("/sso/member/query")
      .then(res => {
        this.user = res;
      })
      .catch(err => {
        if (err.response) {
           this.$router.push("/member/login");
        }
      });
    this.$fetch("/sso/sys/get")
      .then(res => {
        this.sys = res;
        document.title=res.name    
        if (this.sys.theme){
            let themes=this.sys.theme.split("|")
            if (themes.length==3){
                this.navbarHeaderClass=themes[0]
                this.navbarCollapseClass=themes[1]
                this.appAsideClass=themes[2]             
            }
        }
        if (this.sys.layout){
            this.layoutClass=this.sys.layout
        }
      })
      .catch(err => {
        if (err.response) {
           this.$router.push("/member/login");
        }
      });
    this.$fetch("/sso/menu/get")
      .then(res => {
        this.menus = res;
      })
      .catch(err => {
        if (err.response) {
           this.$router.push("/member/login");
        }
      });
    this.$fetch("/sso/popular")
      .then(res => {
        console.log("populars:", res);
        this.populars = res;
      })
      .catch(err => {
        if (err.response) {
           this.$router.push("/member/login");
        }
      });
  },
  methods: {
    goto: function(i) {
      this.$router.push(i);
    },
    del: function(i) {
      this.shortcuts.splice(this.shortcuts.indexOf(i), 1);
    },
    open: function(i) {
       if (i.path.startsWith("http")){
           this.currentPageURL=i.path
           this.iframeState=true
          return
       }
      this.iframeState=false
      this.$router.push(i.path)
    },
    link: function(i) {
      if (!this.shortcuts.includes(i)) {
        if (this.shortcuts.length > 7) {
          this.shortcuts.splice(0, 1);
        }
        this.shortcuts.push(i);
      }

      this.active = this.shortcuts.indexOf(i);
      this.activeMenu=i
      this.open(i);
    }
  },
  destroyed: function() {
    let menu_ids = [];
    let pids = [];
    this.shortcuts.forEach(function(v, k) {
      menu_ids.push(v.id);
      pids.push(v.parent);
    });
    if (menu_ids.length==0){
        return
    }
    this.$post("/sso/popular", {
      menu_ids: menu_ids.join(","),
      pids: pids.join(",")
    })
      .then(res => {})
      .catch(err => {
        if (err.response) {
          // this.$router.push("/member/login");
        }
      });
  }
};
</script>

<style scoped>
@import "../../assets/app.css";
</style>
