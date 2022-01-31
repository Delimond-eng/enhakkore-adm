<template>
    <div id="pcoded" class="pcoded">
        <div class="pcoded-overlay-box"></div>
        <div class="pcoded-container navbar-wrapper">
            <Header></Header>
            <div class="pcoded-main-container">
            <div class="pcoded-wrapper">

              <Sidebar></Sidebar>

              <div class="pcoded-content">
                <div class="pcoded-inner-content">
                  <!-- Main-body start -->
                  <div class="main-body">
                    <div class="page-wrapper">
                        <transition name="slide">
                            <router-view></router-view>
                        </transition>
                    </div>
                  </div>
                  <!-- Main-body end -->
                </div>
              </div>
            </div></div>
        </div>
    </div>
</template>
<script>
import Sidebar from './SidebarComponent.vue'
import Header from './NavComponent.vue'
export default {
    name:'Main',

    components: {
        Sidebar,
        Header
    }
}
</script>