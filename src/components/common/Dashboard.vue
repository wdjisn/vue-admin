<template>
    <div class="dashboard">
        <div class="dashboard-header">智慧管理系统</div>
        <el-row class="dashboard-content">
            <el-col :span="6" class="dashboard-left">
                <div class="dashboard-left-element">
                    <div class="user-info">
                        <img
                            src="../../assets/img/img.jpg"
                            class="user-avator"
                        />
                        <div>
                            <div class="user-info-name">{{ name }}</div>
                            <div class="user-info-role">{{ role }}</div>
                        </div>
                    </div>
                    <div class="last_time">上次登录时间：2020-10-16 12:58:36</div>
                </div>
                <div class="dashboard-left-element">
                    <div id="circle"></div>
                </div>
                <div class="dashboard-left-element">
                    <div id="column"></div>
                </div>
            </el-col>
            <el-col :span="12" class="dashboard-middle">
                <div class="dashboard-middle-element">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-lx-people grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">1234</div>
                            <div>用户总数</div>
                        </div>
                    </div>
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-lx-goods grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">500</div>
                            <div>订单总数</div>
                        </div>
                    </div>
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-connection grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">32197</div>
                            <div>销售总额</div>
                        </div>
                    </div>
                </div>
                <div class="dashboard-middle-element">
                    <div id="mapContainer"></div>
                </div>
            </el-col>
            <el-col :span="6" class="dashboard-right">
                <div class="dashboard-right-element">
                    <div id="clock">
                        <p class="date">{{ date }}</p>
                        <p class="time">{{ time }}</p>
                    </div>
                </div>
                <div class="dashboard-right-element">
                    <div id="broken-line"></div>
                </div>
                <div class="dashboard-right-element">
                    <div id="radar"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import 'echarts/map/js/china.js';
import chinaJson from 'echarts/map/json/china.json';
export default {
    name: 'dashboard',
    data() {
        return {
            userTotal: 300 / 10000,
            orderTotal: 200 / 1000,
            monthTotal: 102450 / 10000,
            colors: [
                { color: '#f56c6c', percentage: 10000 },
                { color: '#e6a23c', percentage: 50000 },
                { color: '#5cb87a', percentage: 100000 },
                { color: '#1989fa', percentage: 150000 },
                { color: '#6f7ad3', percentage: 200000 }
            ],
            name: localStorage.getItem('username'),
            // 钟表参数
            time: '',
            date: '',
            week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            timerID: setInterval(this.updateTime, 1000),
            // 饼状图参数
            option1: {
                title: {
                    text: '用户访问来源',
                    left: 'center',
                    top: 'bottom',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '用户访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 548, name: '搜索引擎' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                textStyle: {
                    color: '#ffffff'
                }
            },
            // 柱状图参数
            option2: {
                title: {
                    text: '商品本周销量',
                    left: 'center',
                    top: 'bottom',
                    textStyle: {
                        fontSize: 16,
                        color: '#ffffff'
                    }
                },
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        barWidth: 30, // 柱图宽度
                        data: [5, 20, 36, 16, 10]
                    }
                ],
                textStyle: {
                    color: '#ffffff'
                }
            },
            // 折线图参数
            option3: {
                title: {
                    text: '用户数量统计',
                    left: 'center',
                    top: 'bottom',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    top: '10',
                    left: '10'
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }
                ],
                textStyle: {
                    color: '#ffffff'
                }
            },
            // 雷达图参数
            option4: {
                title: {
                    text: 'AQI - 雷达图',
                    left: 'center',
                    top: 'bottom',
                    textStyle: {
                        color: '#ffffff',
                        lineHeight: 20
                    }
                },
                tooltip: {
                    confine: true,
                    enterable: true //鼠标是否可以移动到tooltip区域内
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            borderRadius: 3
                        }
                    },
                    indicator: [
                        { name: '销售', max: 6500 },
                        { name: '管理', max: 16000 },
                        { name: '信息技术', max: 30000 },
                        { name: '客服', max: 38000 },
                        { name: '研发', max: 52000 }
                    ]
                },
                series: [
                    {
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        areaStyle: { normal: {} },
                        data: [
                            {
                                value: [4300, 10000, 28000, 35000, 50000],
                                name: '预算分配（Allocated Budget）'
                            }
                        ]
                    }
                ],
                textStyle: {
                    color: '#ffffff'
                }
            },
            // 地图
            geoCoordMap: {
                上海: [121.4648, 31.2891],
                新疆: [87.9236, 43.5883],
                甘肃: [103.5901, 36.3043],
                总部: [70.4551, 50.2539],
                北京: [116.4551, 40.2539],
                江苏: [118.8062, 31.9208],
                广西: [108.479, 23.1152],
                江西: [116.0046, 28.6633],
                安徽: [117.29, 32.0581],
                内蒙古: [111.4124, 40.4901],
                黑龙江: [127.9688, 45.368],
                天津: [117.4219, 39.4189],
                山西: [112.3352, 37.9413],
                广东: [113.5107, 23.2196],
                四川: [103.9526, 30.7617],
                西藏: [91.1865, 30.1465],
                云南: [102.9199, 25.4663],
                浙江: [119.5313, 29.8773],
                湖北: [114.3896, 30.6628],
                辽宁: [123.1238, 42.1216],
                山东: [117.1582, 36.8701],
                海南: [110.3893, 19.8516],
                河北: [114.4995, 38.1006],
                福建: [119.4543, 25.9222],
                青海: [101.4038, 36.8207],
                陕西: [109.1162, 34.2004],
                贵州: [106.6992, 26.7682],
                河南: [113.4668, 34.6234],
                重庆: [107.7539, 30.1904],
                宁夏: [106.3586, 38.1775],
                吉林: [125.8154, 44.2584],
                湖南: [113.0823, 28.2568]
            },
            provinceSale: [
                { name: '河南', value: 806524.49 },
                { name: '黑龙江', value: 766534.02 },
                { name: '湖北', value: 778046.06 },
                { name: '江苏', value: 1331694.44 },
                { name: '江西', value: 910583.23 },
                { name: '内蒙古', value: 1139955.46 },
                { name: '青海', value: 632022.57 },
                { name: '上海', value: 1813714.79 },
                { name: '西藏', value: 692687.19 },
                { name: '新疆', value: 1084279.21 },
                { name: '云南', value: 887189.6 }
            ]
        };
    },
    mounted() {
        if (localStorage.getItem('username') == null) {
            this.$router.push('/login');
        }
        this.myEcharts();
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {
        format(percentage) {
            return percentage ? `${percentage}` : `${percentage}%`;
        },
        updateTime() {
            var cd = new Date();
            this.time =
                this.zeroPadding(cd.getHours(), 2) +
                ':' +
                this.zeroPadding(cd.getMinutes(), 2) +
                ':' +
                this.zeroPadding(cd.getSeconds(), 2);
            this.date =
                this.zeroPadding(cd.getFullYear(), 4) +
                '-' +
                this.zeroPadding(cd.getMonth() + 1, 2) +
                '-' +
                this.zeroPadding(cd.getDate(), 2) +
                ' ' +
                this.week[cd.getDay()];
        },
        zeroPadding(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        convertData2(originData) {
            var that = this;
            var res = [];
            var data = JSON.parse(JSON.stringify(originData));
            for (var i = 0; i < data.length; i++) {
                var geoCoord = this.geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(parseInt(that.formatLargeNumber(data[i].value)))
                    });
                }
            }
            return res;
        },
        formatLargeNumber(num) {
            num = num / 10000;
            num = num.toFixed(2);
            return num;
        },
        myEcharts() {
            // 饼状图
            var circle = this.$echarts.init(document.getElementById('circle'));
            circle.setOption(this.option1);
            // 柱状图
            var column = this.$echarts.init(document.getElementById('column'));
            column.setOption(this.option2);
            // 折线图
            var broken_line = this.$echarts.init(document.getElementById('broken-line'));
            broken_line.setOption(this.option3);
            // 雷达图
            var radar = this.$echarts.init(document.getElementById('radar'));
            radar.setOption(this.option4);
            // 地图概览
            this.$echarts.registerMap('china', chinaJson);
            var map = this.$echarts.init(document.getElementById('mapContainer'));
            var that = this;
            var option = {
                title: {
                    text: '用户地域分布图',
                    top: 'bottom',
                    left: 'center',
                    textStyle: {
                        fontSize: 16,
                        color: '#ffffff'
                    }
                },
                // 左侧小导航图标
                visualMap: {
                    show: false,
                    left: '20',
                    top: '300',
                    textStyle: {
                        color: '#ffffff'
                    },
                    splitList: [
                        { start: 200 },
                        { start: 150, end: 200 },
                        { start: 100, end: 150 },
                        { start: 50, end: 100 },
                        { start: 0, end: 50 }
                    ],
                    color: ['#9fb5ea', '#F4E925', '#85daef', '#74e2ca', '#e6ac53']
                },
                // 布局
                grid: [{ x: '100%', y: '100%', width: '100%', height: '100%' }],
                xAxis: [
                    {
                        gridIndex: 0,
                        type: 'value',
                        axisLabel: {
                            show: true
                        }
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: 'category',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: (function getXYData() {
                            var data = that.provinceSale;
                            var property = 'name';
                            var res = [];
                            data.forEach(function (item) {
                                res.push(item[property]);
                            });
                            return res;
                        })()
                    }
                ],
                // 布局e
                geo: {
                    show: true,
                    map: 'china',
                    zoom: 1.1, // 地图绽放
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    // 是否开启鼠标缩放和平移漫游
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: 'transparent',
                            // borderColor: '#3fdaff',
                            borderWidth: 1,
                            shadowColor: 'rgba(63, 218, 255, 0.5)',
                            shadowBlur: 30
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                            color: '#fff'
                        }
                    }
                },
                //调整显示级别
                // layoutCenter: ['25%', '50%'],
                // layoutSize: 400,
                series: [
                    {
                        name: '数量',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: that.convertData2(that.provinceSale),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: function (a) {
                                    return a.value[2] + '万人';
                                },
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        }
                    }
                ]
            };
            map.setOption(option);
        }
    }
};
</script>

<style scoped>
.dashboard {
    width: 100%;
    height: calc(100% - 50px);
    color: #ffffff;
    border-radius: 4px;
    background: url('~@/assets/img/background.png') 0 0 / 100% 100% no-repeat;
}
.dashboard-header {
    width: 100%;
    height: 50px;
    font-size: 26px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 4px;
}
.dashboard-content {
    width: 100%;
    height: calc(100% - 100px);
}
.user-info {
    display: flex; 
    justify-content: space-between; 
    width: 60%; 
    margin: 0 auto; 
    padding-top: 25px
}
.user-avator {
    width: 60px; 
    height: 60px; 
    border-radius: 50%
}
.user-info-name {
    margin-top: 5px;
    font-size: 26px;
}
.user-info-role {
    font-size: 10px;
}
.last_time {
    width: 60%;
    margin: 0 auto;
    margin-top: 5px;
    font-size:10px;
    padding-left:35px;
}
.dashboard-left,
.dashboard-middle,
.dashboard-right {
    height: 100%;
}
.dashboard-left-element {
    width: 96%;
    margin: 10px auto;
    border-radius: 2px;
}
.dashboard-left-element:nth-child(1) {
    height: 16%;
    margin-bottom: 0;
}
.dashboard-left-element:nth-child(2) {
    height: 40%;
    margin-top: 0;
}
.dashboard-left-element:nth-child(3) {
    height: 44%;
}
.dashboard-middle-element {
    width: 96%;
    margin: 10px auto;
    border-radius: 2px;
    display: flex;
    justify-content: space-around;
}
.dashboard-middle-element:nth-child(1) {
    height: 16%;
    margin-bottom: 0;
}
.dashboard-middle-element:nth-child(2) {
    height: calc(84% + 20px);
    margin-top: -8px;
}
.dashboard-middle-tips {
    color: #ffffff;
    font-size: 14px;
    text-align: center;
}
.el-row {
    margin-bottom: 20px;
}
.grid-content {
    display: flex;
    align-items: center;
    height: 80px;
    margin-top: 15px;
}
.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
}
.grid-num {
    font-size: 26px;
    font-weight: bold;
}
.grid-con-icon {
    width: 45px;
    height: 45px;
    color: #fff;
    font-size: 28px;
    line-height: 45px;
    text-align: center;
    border-radius: 4px;
}
.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}
.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.dashboard-right-element {
    width: 96%;
    margin: 10px auto;
    border-radius: 2px;
}
.dashboard-right-element:nth-child(1) {
    height: 16%;
    margin-bottom: 0;
}
.dashboard-right-element:nth-child(2) {
    height: 40%;
    margin-top: 0;
}
.dashboard-right-element:nth-child(3) {
    height: 44%;
}
#circle {
    width: 100%;
    height: 100%;
}
#column {
    width: 100%;
    height: 100%;
}
#broken-line {
    width: 100%;
    height: 100%;
    margin-left: 18px;
}
#radar {
    width: 100%;
    height: 100%;
}
#mapContainer {
    width: 100%;
    height: 100%;
}
/* 钟表css */
#clock {
    padding-top: 30px;
    color: #ffffff;
    text-align: center;
    /* text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0); */
}
#clock .time {
    letter-spacing: 0.05em;
    font-size: 24px;
    padding: 5px 0;
}
#clock .date {
    letter-spacing: 0.1em;
    font-size: 18px;
}
#clock .name {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
}
</style>