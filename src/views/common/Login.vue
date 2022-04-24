<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">智慧管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入账号">
                        <i class="el-icon-user el-input__icon" size="22" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="param.password" @keyup.enter.native="submitForm()">
                        <i class="el-icon-lock el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '../../api/common';
import { permission } from '../../api/common';
export default {
    name: 'login',
    data: function () {
        return {
            loading: false,
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        // 登录
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    login(this.param).then((res) => {
                        if (res.code == 200) {
                            localStorage.setItem('token', res.data.token);
                            // 获取权限
                            permission({}).then((result) => {
                                if (result.data.list.length == 0) {
                                    localStorage.removeItem('token');
                                    this.$message.error('暂无权限');
                                    this.loading = false;
                                } else {
                                    localStorage.setItem('username', res.data.username);
                                    localStorage.setItem('error_count', res.data.error_count);
                                    localStorage.setItem('permission', JSON.stringify(result.data.list));
                                    if (result.data.tree[0]['children'] == undefined) {
                                        this.$router.push('/' + result.data.tree[0]['alias']);
                                    } else {
                                        this.$router.push('/' + result.data.tree[0]['children'][0]['alias']);
                                    }
                                }
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.loading = false;
                        }
                    });
                } else {
                    this.loading = false;
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login.jpg);
    background-size: 100% 100%;
}
.ms-title {
    width: 100%;
    line-height: 35px;
    margin-top: 35px;
    margin-bottom: -15px;
    color: #333333;
    text-align: center;
    font-size: 28px;
    font-weight: bolder;
    letter-spacing: 4px;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 345px;
    margin: -220px 0 0 -172px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
}
.ms-content {
    padding: 50px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0px;
    letter-spacing: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}

.login-wrap .el-form-item--small.el-form-item {
    margin-bottom: 28px;
}

>>> .el-input__inner {
    height: 40px;
    font-size: 15px;
}
.el-input--small .el-input__icon {
    font-size: 18px;
    padding-right: 10px;
    line-height: 40px;
}
</style>