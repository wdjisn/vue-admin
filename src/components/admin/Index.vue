<template>
    <div class="admin-list">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
                <el-button type="warning" icon="el-icon-download" @click="handleExport">导出</el-button>
            </div>
            <el-button type="primary" icon="el-icon-circle-plus-outline" class="mt20" @click="handleCreate">添加</el-button>
            <el-table :data="data">
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column label="最后登录IP">
                    <template slot-scope="scope">{{ scope.row.last_ip != null ? scope.row.last_ip : '暂无数据' }}</template>
                </el-table-column>
                <el-table-column label="最后登录时间">
                    <template slot-scope="scope">{{ scope.row.last_login | formatDa }}</template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            class="tablescope"
                            @change="changeStatus($event, scope.row.id)"
                            v-model="scope.row.status"
                            active-color="#409EFF"
                            inactive-color="#dcdfe6"
                            active-text="开启"
                            inactive-text="关闭"
                            v-if="scope.row.is_admin != 1"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180px">
                    <template slot-scope="scope">
                        &nbsp;
                        <el-button
                            style="margin-left: -4px"
                            v-if="scope.row.is_admin != 1"
                            icon="el-icon-edit"
                            type="primary"
                            @click="handleEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            v-if="scope.row.is_admin != 1"
                            icon="el-icon-delete"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
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
        <drawer title="添加管理员" :display.sync="createVisible" :width="drawerWidth">
            <create-admin v-if="createVisible == true" @on-success="onSuccess"></create-admin>
        </drawer>
        <!-- 编辑弹出框 -->
        <drawer title="编辑管理员" :display.sync="editVisible" :width="drawerWidth">
            <edit-admin v-if="editVisible == true" :adminInfo="adminInfo" @on-success="onSuccess"></edit-admin>
        </drawer>
    </div>
</template>

<script>
import drawer from '../component/Drawer';
import editAdmin from './Edit';
import createAdmin from './Create';
import { delAdmin } from '../../api/admin';
import { adminList } from '../../api/admin';
import { quickEditAdmin } from '../../api/admin';
import { formatDate } from '@/assets/js/common.js';
import { json2excel } from '@/utils/common';
export default {
    name: 'admin',
    components: { createAdmin, editAdmin, drawer },
    data() {
        return {
            drawerWidth: '500px',
            query: {
                username: '',
                page: 1,
                per_page: 15
            },
            total: 0,
            data: [],
            createVisible: false,
            editVisible: false,
            adminInfo: {}
        };
    },
    created() {
        this.getData();
    },
    filters: {
        // 时间格式化
        formatDa(time) {
            if (time == 0) {
                return '暂无数据';
            }
            var jsTime = parseInt(time + '000');
            let date = new Date(jsTime);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    methods: {
        // 获取管理员列表
        getData() {
            adminList(this.query).then((res) => {
                this.data = res.data.data;
                this.total = res.data.total;
            });
        },
        // 重置
        handleReset() {
            this.$set(this.query, 'username', '');
            this.dateTime = [];
        },
        // 搜索
        handleSearch() {
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
            quickEditAdmin({ id: id, status: status }).then((res) => {
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
            this.adminInfo = row;
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
                    delAdmin({ id: row.id }).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('删除成功');
                            this.getData();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
                .catch(() => {});
        },
        // 数据导出
        handleExport() {
            var name = '管理员列表';
            var header = ['用户名', '角色', '创建时间'];
            var filter = ['username', 'role_name', 'created_at'];
            var data = [
                { username: 'admin', role_name: '超级管理员', created_at: '2020-11-15 17:44:57' },
                { username: 'style', role_name: '技术', created_at: '2020-11-25 22:31:19' }
            ];
            let excelDatas = [
                {
                    tHeader: header,
                    filterVal: filter,
                    tableDatas: data,
                    sheetName: name
                }
            ];
            //引入的函数
            json2excel(excelDatas, name, true, 'xlsx');
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
        left: 55px;
        color: #fff;
        z-index: -100;
    }
    .el-switch__core {
        width: 55px !important;
    }
    .el-switch__label--right {
        position: relative;
        right: 55px;
        color: #fff;
        z-index: -100;
    }
    .el-switch__label--right.is-active {
        z-index: 100;
        color: #fff !important;
    }
    .el-switch__label--left.is-active {
        z-index: 100;
        color: #777777 !important;
    }
    .el-switch__label * {
        font-size: 12px;
    }
}
</style>