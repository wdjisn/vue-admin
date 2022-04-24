<template>
    <div class="change-password">
        <el-form :model="form" :rules="rules" ref="changePassword" label-width="78px">
            <el-form-item prop="old_password" label="旧密码">
                <el-input v-model="form.old_password"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="confirm_password" label="确认密码">
                <el-input v-model="form.confirm_password"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveCreate" :loading="loading">确 定</el-button>
        </span>
    </div>
</template>
<script>
import { changePassword } from '../../api/common';
export default {
    name: 'changePassword',
    data() {
        return {
            loading: false,
            form: {
                old_password: '',
                password: '',
                confirm_password: ''
            },
            rules: {
                old_password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirm_password: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        // 保存添加
        saveCreate() {
            this.$refs.changePassword.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    changePassword(this.form).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('修改成功，请重新登录');
                            this.$emit('on-success', true);
                        } else {
                            this.$message.error(res.msg);
                            this.loading = false;
                        }
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss">
.style-dialog {
    .el-dialog__header {
        padding-top: 5px !important;
    }
    .el-dialog__body {
        padding-top: 10px !important;
    }
}
</style>