<template>
    <div>
        <nav class="pcoded-navbar">
            <div class="pcoded-inner-navbar main-menu">
                <div class="pcoded-navigatio-lavel">Menu</div>
                <ul class="pcoded-item pcoded-left-item">
                    <li class="">
                        <router-link tag="a" to="/admin">
                            <span class="pcoded-micon"><i class="ti-bar-chart"></i></span>
                            <span class="pcoded-mtext">Tableau de Bord</span>
                        </router-link>
                    </li>
                    <li class="">
                        <router-link tag="a" to="/citation/view">
                            <span class="pcoded-micon"><i class="ti-write"></i></span>
                            <span class="pcoded-mtext">Création citation</span>
                        </router-link>
                    </li>
                    <li class="">
                        <router-link tag="a" to="/exhortation/view">
                            <span class="pcoded-micon"><i class="icofont icofont-fire-alt"></i></span>
                            <span class="pcoded-mtext">Création Exhortation</span>
                        </router-link>
                    </li>
                    <li class="">
                        <router-link tag="a" to="/evenement/view">
                            <span class="pcoded-micon"><i class="icofont icofont-education"></i></span>
                            <span class="pcoded-mtext">Création Evénement</span>
                        </router-link>
                    </li>
                    <li class="">
                        <router-link tag="a" to="/livre/view">
                            <span class="pcoded-micon"><i class="feather icon-book"></i></span>
                            <span class="pcoded-mtext">Poster les Livres</span>
                        </router-link>
                    </li>
                    <li class="">
                        <router-link  to="/formation/view" tag="a">
                            <span class="pcoded-micon"><i class="icofont icofont-graduate-alt text-c-pink"></i></span>
                            <span class="pcoded-mtext">Création Formation</span>
                        </router-link>
                    </li>
                    <li class="">
                        <router-link tag="a" to="">
                            <span class="pcoded-micon"><i class="icofont icofont-question-square"></i></span>
                            <span class="pcoded-mtext">Jeu de questionnaire</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "SidebarComponent"
    }
</script>

<style scoped>

</style>