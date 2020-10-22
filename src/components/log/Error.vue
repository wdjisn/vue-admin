<template>
    <div class="error-log">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.status" placeholder="请选择" class="mr10">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
            <el-table :data="data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="相关参数" align="center">
                    <template slot-scope="scope">
                        <div>
                            <div class="error-param" v-if="scope.row.status == 0">
                                <el-button type="danger" plain @click="solve(scope.row.id)">标记已处理</el-button>
                            </div>
                            <div class="error-param">
                                <span class="error-title">Method:</span>
                                <el-tag type="warning">{{ scope.row.method }}</el-tag>
                            </div>
                            <div class="error-param">
                                <span class="error-title">Ip:</span>
                                <el-tag type="danger">{{ scope.row.ip }}</el-tag>
                            </div>
                            <div class="error-param">
                                <span class="error-title">Time:</span>
                                <el-tag type="primary">{{ scope.row.created_at }}</el-tag>
                            </div>
                            <div class="error-param">
                                <span class="error-title">Url:</span>
                                <el-tag type="success">{{ scope.row.url }}</el-tag>
                            </div>
                        </div>
                        <div class="error-status">
                            <img v-if="scope.row.status == 1" src="../../assets/img/processed.png" alt="已处理" />
                            <img v-else src="../../assets/img/undisposed.png" alt="未处理" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="错误信息">
                    <template slot-scope="scope">
                        <div class="error-message">Msg：{{ scope.row.message }}</div>
                        <div class="error-message">Param：{{ scope.row.param }}</div>
                        <div class="error-message">File：{{ scope.row.file }}</div>
                        <div class="error-message">Line：{{ scope.row.line }}</div>
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
    </div>
</template>

<script>
import { errorLog } from '../../api/log';
import { editLog } from '../../api/log';
export default {
    name: 'errorLog',
    data() {
        return {
            dateTime: [],
            query: {
                status: '',
                start: '',
                end: '',
                page: 1,
                per_page: 15
            },
            total: 0,
            data: [],
            options: [
                {
                    value: '0',
                    label: '未处理'
                },
                {
                    value: '1',
                    label: '已处理'
                }
            ]
        };
    },
    created() {
        if (this.$route.query.status == 0) {
            this.query.status = '0';
        }
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            errorLog(this.query).then((res) => {
                this.data = res.data.data;
                this.total = res.data.total;
                localStorage.setItem('error_count', res.data.error_count);
            });
        },
        // 重置
        handleReset() {
            this.$set(this.query, 'start', '');
            this.$set(this.query, 'end', '');
            this.$set(this.query, 'status', '');
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
        },
        // 标记为已解决
        solve(id) {
            this.$confirm('确认将此bug标记为已处理, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    editLog({ id: id, status: 1 }).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        });
                        this.getData();
                    });
                })
                .catch(() => {});
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
.error-title {
    display: inline-block;
    width: 70px;
    color: #222;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
}
.error-param,
.error-message {
    text-align: left;
    padding-bottom: 6px;
    padding-top: 6px;
}
.el-tag.el-tag--danger,
.el-tag--small {
    font-size: 14px;
}

.error-status {
    position: absolute;
    width: 70px;
    height: 61px;
    top: 25px;
    right: 25px;
}
.error-status img {
    width: 100%;
    height: 100%;
}
</style>