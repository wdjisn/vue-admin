<template>
    <div class="admin-create">
        <el-form :model="form" :rules="rules" ref="createAdmin" label-width="78px">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="role_id" label="角色">
                <el-select v-model="form.role_id" placeholder="请选择角色" style="width: 100%">
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="confirm_password" label="确认密码">
                <el-input v-model="form.confirm_password" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    class="tablescope"
                    v-model="form.status_name"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
                    active-text="开"
                    inactive-text="关"
                ></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveCreate" :loading="loading">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { roleList } from '../../api/role';
import { createAdmin } from '../../api/admin';
export default {
    name: 'createAdmin',
    data() {
        return {
            loading: false,
            form: {
                username: '',
                password: '',
                confirm_password: '',
                role_id: '',
                status: '',
                status_name: true
            },
            query: {
                is_admin: 0,
                page: 1,
                per_page: 1000
            },
            roles: [],
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirm_password: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取角色列表
        getData() {
            roleList(this.query).then((res) => {
                this.roles = res.data.data;
            });
        },
        // 保存添加
        saveCreate() {
            this.$refs.createAdmin.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.form.status_name == true) {
                        this.form.status = 1;
                    } else {
                        this.form.status = 0;
                    }
                    createAdmin(this.form).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('添加成功');
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
.tablescope {
    .el-switch__label--left {
        position: relative;
        left: 57px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__core {
        width: 53px !important;
    }
    .el-switch__label--right {
        position: relative;
        right: 57px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
    }
    .el-switch__label--left.is-active {
        z-index: 1111;
        color: #777777 !important;
    }
    .el-switch__label * {
        font-size: 13px;
    }
}
.admin-create .el-switch {
    margin-left: -25px;
}
</style>