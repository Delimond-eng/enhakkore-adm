<template>
    <!-- Page-header start -->
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <div class="d-inline">
                        <h4>{{title}}</h4>
                        <span>{{description}}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="page-header-breadcrumb">
                    <ul class="breadcrumb-title">
                        <li class="breadcrumb-item"  style="float: left;">
                            <router-link to="/admin" tag="a"> <i class="feather icon-home"></i> </router-link>
                        </li>
                        <li class="breadcrumb-item"  style="float: left;"><router-link to="/admin" tag="a">Accueil</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Page-header end -->
</template>

<script>
    export default {
        name: "PageHeader",
        props:['title','description']
    }
</script>

<style scoped>

</style>