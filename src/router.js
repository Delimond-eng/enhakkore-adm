import Vue from 'vue'
import Router from 'vue-router'

//En-hakkore component input
import DashboardComponent from "./components/input/DashboardComponent.vue"
import ExhortationComponent from "./components/input/ExhortationComponent.vue"
import CitationComponent from "./components/input/CitationComponent.vue"
import EvenementComponent from "./components/input/EvenementComponent.vue"
import LivresComponent from "./components/input/LivresComponent.vue"
import FormationComponent from "./components/input/FormationComponent.vue"

// En-hakkore component view
import viewCitationComponent from "./components/view/viewCitationComponent.vue";
import viewEvenementComponent from "./components/view/viewEvenementComponent";
import viewExhortationComponent from "./components/view/viewExhortationComponent";
import viewFormationComponent from "./components/view/viewFormationComponent";
import viewLivresComponent from "./components/view/viewLivresComponent";

// En-hakkore component main viewer
import mainViewer from './components/mainViewer.vue';


//Auth
import LoginBox from './components/Auth/login.vue';


Vue.use(Router)

function authCheck(to, from, next) {
    let isAuthenticated = false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if (localStorage.getItem('aToken')) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }


    if (isAuthenticated) {
        next(); // allow to enter route
    } else {
        next({ name: 'login' }); // go to '/login';
    }
}

export default new Router({
    routes: [{
            path: '/admin',
            component: mainViewer,
            name: 'admin',
            beforeEnter: authCheck,
            children: [{
                    path: '',
                    component: DashboardComponent
                },
                {
                    path: '/exhortation/add',
                    component: ExhortationComponent
                },
                {
                    path: '/exhortation/edit/:id(\\d+)',
                    component: ExhortationComponent
                },
                {
                    path: '/exhortation/view',
                    component: viewExhortationComponent
                },
                {
                    path: '/citation/add',
                    component: CitationComponent
                },
                {
                    path: '/citation/edit/:id(\\d+)',
                    component: CitationComponent
                },
                {
                    path: '/citation/view',
                    component: viewCitationComponent
                },
                {
                    path: '/formation/view',
                    component: viewFormationComponent
                },
                {
                    path: '/formation/add',
                    component: FormationComponent
                },
                {
                    path: '/formation/edit/:id(\\d+)',
                    component: FormationComponent
                },
                {
                    path: '/livre/view',
                    component: viewLivresComponent
                },
                {
                    path: '/livre/add',
                    component: LivresComponent
                },
                {
                    path: '/livre/edit/:id(\\d+)',
                    component: LivresComponent
                },
                {
                    path: '/evenement/add',
                    component: EvenementComponent
                },
                {
                    path: '/evenement/edit/:id(\\d+)',
                    component: EvenementComponent
                },
                {
                    path: '/evenement/view',
                    component: viewEvenementComponent
                }
            ]
        },
        {
            path: '/',
            component: LoginBox,
            name: 'login'
        },
        //redirect to home
        { path: '*', redirect: '/' }
    ]
})