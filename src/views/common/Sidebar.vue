<template>
    <div class="sidebar">
        <div class="sidebar-logo-container" :class="{ collapse: collapse }">
            <transition name="sidebarLogoFade">
                <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                    <img v-if="logo" :src="logo" class="sidebar-logo" />
                    <h1 v-else class="sidebar-title">{{ title }}</h1>
                </router-link>
                <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                    <img v-if="logo" :src="logo" class="sidebar-logo" />
                    <h1 class="sidebar-title">{{ title }}</h1>
                </router-link>
            </transition>
        </div>
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#242f42"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.alias" :key="item.alias">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children" :index="subItem.alias" :key="subItem.alias">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.alias">{{
                                    threeItem.name
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.alias" :key="subItem.alias">{{ subItem.name }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.alias" :key="item.alias">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '@/assets/js/bus';
import { permission } from '../../api/common';
export default {
    data() {
        return {
            collapse: false,
            title: 'Vue Style Admin',
            logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
            items: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        this.getPermission();
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods: {
        // 获取权限
        getPermission() {
            permission({}).then((res) => {
                this.items = res.data.tree;
                localStorage.setItem('permission', JSON.stringify(res.data.list));
            });
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 205px;
}
.sidebar > ul {
    height: 100%;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgb(36, 47, 66);
    text-align: center;
    overflow: hidden;
}
.sidebar-logo-link {
    height: 100%;
    width: 100%;
}
.sidebar-logo {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 12px;
    position: absolute;
    left: 18px;
    top: 10px;
}
.sidebar-title {
    display: inline-block;
    color: rgb(191, 203, 217);
    line-height: 50px;
    font-size: 16px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    widows: 100px;
    position: absolute;
    left: 58px;
}
.collapse .sidebar-logo {
    margin-right: 0px;
}
</style>