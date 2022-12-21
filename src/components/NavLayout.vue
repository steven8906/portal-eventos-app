<template>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <router-link class="btn btn-link navbar-brand brand-logo mr-5" exact-active-class="''" :to="{ name : 'home' }">
          <img src="../assets/images/birthday-and-party.png" class="mr-2" alt="logo"/>
        </router-link>
        <router-link class="btn btn-link navbar-brand brand-logo-mini" exact-active-class="''" :to="{ name : 'home' }">
          <img src="../assets/images/birthday-and-party.png" alt="logo"/>
        </router-link>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
              <img src="../assets/images/avatar.png" alt="profile"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown">
              <button class="dropdown-item" type="button" @click="logout">
                <i class="ti-power-off text-primary"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>
      </div>
    </nav>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial -->
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">Eventos</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- partial -->
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="row">
                <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 class="font-weight-bold">Bienvenid@</h3>
                  <h6 class="font-weight-normal mb-0"> <span class="text-primary"></span></h6>
                </div>
                <div class="col-12 col-xl-4">
                  <div class="justify-content-end d-flex">
                    <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                      <button class="btn btn-sm btn-light bg-white" type="button">
                        {{getMoment().format("LLLL")}}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <slot name="main">
            <router-view/>
          </slot>
        </div>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <footer class="footer">
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.</span>
          </div>
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block"><a href="https://www.themewagon.com/" target="_blank"> </a></span>
          </div>
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <loading-component/>
  <!-- container-scroller -->
</template>

<script>
import dateTimeService from "@/services/dateTimeService";
import {mapMutations} from "vuex";
import LoadingComponent from "@/components/LoadingComponent";

export default {
  name : "NavLayout",
  components:{LoadingComponent},
  methods:{
    ...mapMutations(['SET_AUTH', 'SET_EVENT_LIST']),
    getMoment(){
      return dateTimeService.getMoment()
    },
    logout(){
      this.SET_AUTH({})
      this.SET_EVENT_LIST({});
      this.$router.push("login")
    },
  },
}
</script>

<style scoped>
  .active-link{
    background : #4B49A6;
    color      : white !important;
  }
  .nav-item .collapsed > .sidebar .nav .nav-item .nav-link i.menu-icon {
    border-radius : 8px 8px 0 0;
    background    : #4B49AC;
    color         : red !important;
  }
  .preview-list .preview-item .preview-thumbnail img, .preview-list .preview-item .preview-thumbnail .preview-icon {
    width         : 20px;
    height        : 20px;
    border-radius : 100%;
  }
</style>
