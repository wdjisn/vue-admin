<template>
    <div class="role-edit">
        <el-form :model="form" :rules="rules" ref="editRole" label-width="78px">
            <el-form-item prop="name" label="角色名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色状态">
                <el-switch
                    v-model="form.status_name"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
                    active-text="正常"
                    inactive-text="禁用"
                ></el-switch>
            </el-form-item>
            <el-form-item prop="menu_ids" label="角色权限">
                <el-tree
                    :data="menus"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-checked-keys="form.menu_ids"
                    :default-expand-all="true"
                    :props="defaultProps"
                ></el-tree>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveEdit" :loading="loading">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { menuTree } from '../../api/menu';
import { editRole } from '../../api/role';
import { roleInfo } from '../../api/role';
export default {
    name: 'editRole',
    props: {
        roleId: {}
    },
    data() {
        return {
            loading: false,
            menus: [],
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            form: {
                id: 0,
                name: '',
                status: '',
                status_name: true,
                menu_ids: []
            },
            rules: {
                name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
                menu_ids: [{ required: true, message: '请选择权限', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取菜单列表
        getData() {
            menuTree({}).then((res) => {
                this.menus = res.data;
                this.getInfo();
            });
        },
        // 获取角色详情
        getInfo() {
            roleInfo({ id: this.roleId }).then((res) => {
                this.form.id = res.data.id;
                this.form.name = res.data.name;
                this.form.status = res.data.status;
                this.form.menu_ids = res.data.menu;
                if (res.data.status == 1) {
                    this.form.status_name = true;
                }
                if (res.data.status == 0) {
                    this.form.status_name = false;
                }
            });
        },
        // 保存编辑
        saveEdit() {
            this.form.menu_ids = this.$refs.tree.getCheckedKeys();
            this.$refs.editRole.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.form.status_name == true) {
                        this.form.status = 1;
                    } else {
                        this.form.status = 0;
                    }
                    var data = {
                        id: this.form.id,
                        name: this.form.name,
                        status: this.form.status,
                        menu_ids: this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
                    };
                    editRole(data).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('编辑成功');
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