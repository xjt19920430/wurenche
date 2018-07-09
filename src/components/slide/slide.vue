<template>
    <div class='silder'>
        <ul>
            <router-link to="/driverlessCars">无人车管理</router-link>
            <router-link to="/driverlessCarsState">无人车运行管理</router-link>
            <router-link to="/cabinetState">柜子状态管理</router-link>
            <router-link to="/delivery">派件管理</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "slide"
    }
</script>

<style lang="scss" scoped>
    .silder {
        text-align: center;
        ul {
            a{
                line-height: 30px;
                display: inline-block;
                text-decoration: none;
                color: #0F5CCB;
                width: 100%;
            }
        }
    }
    .active {
        color: #fff !important;
        background-color: #41CC50;
    }
</style>