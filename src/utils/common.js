export function json2excel(tableJson, filenames, autowidth, bookTypes) {
    import("@/vendor/Export2Excel").then(excel => {
        var tHeader = []
        var dataArr = []
        var sheetnames = []
        for (var i in tableJson) {
            tHeader.push(tableJson[i].tHeader)
            dataArr.push(formatJson(tableJson[i].filterVal, tableJson[i].tableDatas))
            sheetnames.push(tableJson[i].sheetName)
        }
        excel.export_json_to_excel({
            header: tHeader,
            data: dataArr,
            sheetname: sheetnames,
            filename: filenames,
            autoWidth: autowidth,
            bookType: bookTypes
        })
    })
}

// 数据过滤，时间过滤
function formatJson(filterVal, jsonData) {
    return jsonData.map(v =>
        filterVal.map(j => {
            if (j === "timestamp") {
                return parseTime(v[j])
            } else {
                return v[j]
            }
        })
    )
}