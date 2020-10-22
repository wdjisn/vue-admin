<template>
    <div class="admin-edit">
        <el-form ref="editAdmin" :model="form" label-width="78px">
            <el-form-item label="用户名">
                <el-input v-model="adminInfo.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
                <span class="admin-edit-tips">非必填，修改密码时可填</span>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="form.role_id" placeholder="请选择角色" style="width: 100%">
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="form.status_name"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
                    active-text="正常"
                    inactive-text="禁用"
                ></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveEdit" :loading="loading">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { roleList } from '../../api/role';
import { editAdmin } from '../../api/admin';
export default {
    name: 'edtiAdmin',
    props: {
        adminInfo: {}
    },
    data() {
        return {
            loading: false,
            form: {
                id: 0,
                role_id: '',
                status: 0,
                status_name: true,
                password: ''
            },
            query: {
                is_admin: 0,
                page: 1,
                per_page: 1000
            },
            roles: []
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
                this.form.id = this.adminInfo.id;
                this.form.role_id = this.adminInfo.role_id;
                this.form.status_name = this.adminInfo.status;
            });
        },
        // 保存编辑
        saveEdit() {
            this.loading = true;
            if (this.form.status_name == true) {
                this.form.status = 1;
            } else {
                this.form.status = 0;
            }
            editAdmin(this.form).then((res) => {
                if (res.code == 200) {
                    this.$message.success('修改成功');
                    this.$emit('on-success', true);
                } else {
                    this.$message.error(res.msg);
                    this.loading = false;
                }
            });
        }
    }
};
</script>