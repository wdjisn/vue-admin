<template>
    <div class="role-list">
        <div class="container">
            <el-button type="primary" icon="el-icon-circle-plus-outline" class="mt20" @click="handleCreate">添 加</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handleRefresh">刷 新</el-button>
            <el-table :data="data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="name" label="角色名称"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            class="tablescope"
                            @change="changeStatus($event, scope.row.id)"
                            v-model="scope.row.status"
                            active-color="#409EFF"
                            inactive-color="#dcdfe6"
                            active-text="开"
                            inactive-text="关"
                            v-if="scope.row.is_admin != 1"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" minWidth="170" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.is_admin != 1" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)"
                            >编 辑</el-button
                        >
                        <el-button
                            v-if="scope.row.is_admin != 1"
                            icon="el-icon-delete"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删 除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.per_page"
                    :total="total"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="createVisible" width="600px" custom-class="style-dialog">
            <create-role v-if="createVisible == true" @on-success="onSuccess"></create-role>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="600px" custom-class="style-dialog">
            <edit-role v-if="editVisible == true" :roleId="roleId" @on-success="onSuccess"></edit-role>
        </el-dialog>
    </div>
</template>

<script>
import createRole from './Create';
import editRole from './Edit';
import { roleList } from '../../api/role';
import { delRole } from '../../api/role';
import { quickEditRole } from '../../api/role';
export default {
    name: 'role',
    components: { createRole, editRole },
    data() {
        return {
            query: {
                username: '',
                page: 1,
                per_page: 15
            },
            total: 0,
            data: [],
            createVisible: false,
            editVisible: false,
            roleId: 0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取角色列表
        getData() {
            roleList(this.query).then((res) => {
                this.data = res.data.data;
                this.total = res.data.total;
            });
        },
        // 刷新
        handleRefresh() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 分页
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        },
        // 快捷修改状态
        changeStatus($event, id) {
            var status = 0;
            if ($event == false) {
                status = 0;
            }
            if ($event == true) {
                status = 1;
            }
            quickEditRole({ id: id, status: status }).then((res) => {
                if (res.code == 200) {
                    this.$message.success('修改成功');
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 添加
        handleCreate() {
            this.createVisible = true;
        },
        // 编辑
        handleEdit(row) {
            this.roleId = row.id;
            this.editVisible = true;
        },
        // 添加、编辑成功回调
        onSuccess() {
            this.createVisible = false;
            this.editVisible = false;
            this.getData();
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    delRole({ id: row.id }).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('删除成功');
                            this.getData();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="scss">
.handle-box {
    margin-bottom: 20px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.mt20 {
    margin-bottom: 20px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.tablescope {
    .el-switch__label--left {
        position: relative;
        left: 45px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__core {
        width: 45px !important;
    }
    .el-switch__label--right {
        position: relative;
        right: 46px;
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
</style>