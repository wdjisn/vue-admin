<template>
    <div class="request-log">
        <div class="container">
            <el-table :data="data" class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="method" label="方式"></el-table-column>
                <el-table-column prop="ip" label="IP"></el-table-column>
                <el-table-column prop="param" label="参数"></el-table-column>
                <el-table-column prop="created_at" label="时间"></el-table-column>
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
import { requestLog } from '../../api/log';
export default {
    name: 'requestLog',
    data() {
        return {
            query: {
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
            requestLog(this.query).then((res) => {
                this.data = res.data.data;
                this.total = res.data.total;
            });
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
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
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
