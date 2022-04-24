<template>
    <div class="login-log">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-date-picker
                    class="mr10"
                    v-model="dateTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
            </div>
            <el-table :data="data" class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="login_ip" label="IP"></el-table-column>
                <el-table-column prop="created_at" label="登录时间"></el-table-column>
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
    </div>
</template>

<script>
import { loginLog } from '../../api/log';
export default {
    name: 'loginLog',
    data() {
        return {
            dateTime: [],
            query: {
                username: '',
                start: '',
                end: '',
                page: 1,
                per_page: 15
            },
            total: 0,
            data: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            loginLog(this.query).then((res) => {
                this.data = res.data.data;
                this.total = res.data.total;
            });
        },
        // 重置
        handleReset() {
            this.$set(this.query, 'username', '');
            this.$set(this.query, 'start', '');
            this.$set(this.query, 'end', '');
            this.dateTime = [];
        },
        // 搜索
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.$set(this.query, 'start', this.dateTime[0]);
            this.$set(this.query, 'end', this.dateTime[1]);
            this.getData();
        },
        // 分页
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.container {
    color: aqua !important;
}

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
    margin-right: 15px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
