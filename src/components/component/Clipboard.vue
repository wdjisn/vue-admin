<template>
    <div class="clipboard container">
        <span>网址：</span>
        <el-input v-model="value"></el-input>
        <el-button
            v-clipboard:copy="value"
            v-clipboard:success="copySuc"
            v-clipboard:error="copyFail"
            icon="el-icon-copy-document"
            type="primary"
            >复制</el-button
        >
    </div>
</template>

<script>
export default {
    name: 'clipboard',
    data() {
        return {
            value: '欢迎使用剪切板'
        };
    },
    methods: {
        // 复制成功
        copySuc() {
            this.$message.success('复制成功');
        },
        // 复制失败
        copyFail() {
            this.$message.success('复制失败');
        }
    }
};
</script>

<style lang="scss">
.clipboard {
    .el-input {
        width: 60%;
        margin: 0 10px;
    }
}
</style>