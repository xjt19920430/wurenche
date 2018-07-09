import Vue from 'vue'
import Router from 'vue-router'
import driverlessCars from '../components/driverlessCars'
import driverlessCarsState from '../components/driverlessCarsState'
import cabinetState from '../components/cabinetState'
import delivery from '../components/delivery'

Vue.use(Router)

export default new Router({
    linkActiveClass:'active',
    routes: [
        {
            path: '/',
            component: driverlessCars
        },
        {
            path: '/driverlessCars',
            component: driverlessCars
        },
        {
            path: '/driverlessCarsState',
            component: driverlessCarsState
        },
        {
            path: '/cabinetState',
            component: cabinetState
        },
        {
            path: '/delivery',
            component: delivery
        },
    ]
})
