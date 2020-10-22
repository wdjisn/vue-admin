<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell error-msg">
                    <el-tooltip effect="dark" :content="error_count > 0 ? `有${error_count}个待处理bug` : `错误日志`" placement="bottom">
                        <router-link :to="error_count > 0 ? '/errorLog?status=0' : '/errorLog'">
                            <i class="el-icon-warning-outline"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="error_count > 0"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="passwordVisible" width="450px" custom-class="style-dialog">
            <change-password v-if="passwordVisible == true" @on-success="onSuccess"></change-password>
        </el-dialog>
    </div>
</template>
<script>
import changePassword from './ChangePassword';
import bus from '@/assets/js/bus';
export default {
    components: { changePassword },
    data() {
        return {
            collapse: false,
            fullscreen: false,
            passwordVisible: false
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('username');
            return username;
        },
        error_count() {
            let error_count = localStorage.getItem('error_count');
            return error_count;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('error_count');
                localStorage.removeItem('permission');
                this.$router.push('/login');
            }
            if (command == 'changePassword') {
                this.passwordVisible = true;
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        // 修改密码成功回调
        onSuccess() {
            this.passwordVisible = false;
            localStorage.removeItem('username');
            var that = this;
            setTimeout(function () {
                that.$router.push('/login');
            }, 1500);  
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style lang="scss">
.header {
    position: relative;
    box-sizing: border-box;
    height: 50px;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 50px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 50px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 9px;
    font-size: 22px;
    margin-left: 9px;
}
.btn-fullscreen {
    margin-top: 6px;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-warning-outline {
    color: #333333;
    font-weight: bold;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #242f42;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.style-dialog {
    .header {
        line-height: 24px;
    }
    .el-dialog__header {
        padding-top: 18px !important;
    }
    .el-dialog__body {
        padding-top: 10px !important;
    }
}
</style>