<template>
    <div class="menu-create">
        <el-form :model="form" :rules="rules" ref="createMenu" label-width="58px">
            <el-form-item prop="parent_id" label="父级">
                <el-select v-model="form.parent_id" placeholder="请选择父级菜单" style="width: 100%">
                    <el-option key="0" label="顶级菜单" value="0"></el-option>
                    <el-option v-for="item in menus" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="name" label="名称">
                <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item prop="alias" label="别名">
                <el-input v-model="form.alias" placeholder="请输入菜单别名"></el-input>
            </el-form-item>
            <el-form-item prop="icon" label="图标">
                <el-input v-model="form.icon" placeholder="请输入图标类名，例：el-icon-lx-home（顶级菜单必填）"></el-input>
            </el-form-item>
            <el-form-item prop="sort" label="排序">
                <el-input v-model="form.sort" type="number" placeholder="请输入数字0~100"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="状态">
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
            <el-button type="primary" @click="saveCreate" :loading="loading">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { menuList } from '../../api/menu';
import { createMenu } from '../../api/menu';
export default {
    name: 'createMenu',
    data() {
        return {
            loading: false,
            menus: [],
            form: {
                parent_id: '',
                name: '',
                alias: '',
                icon: '',
                sort: '',
                status: '',
                status_name: true
            },
            rules: {
                parent_id: [{ required: true, message: '请选择父级菜单', trigger: 'blur' }],
                name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                alias: [{ required: true, message: '请输入菜单别名', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取菜单列表
        getData() {
            menuList({ parent_id: 0 }).then((res) => {
                this.menus = res.data;
            });
        },
        // 保存添加
        saveCreate() {
            this.$refs.createMenu.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.form.status_name == true) {
                        this.form.status = 1;
                    } else {
                        this.form.status = 0;
                    }
                    createMenu(this.form).then((res) => {
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