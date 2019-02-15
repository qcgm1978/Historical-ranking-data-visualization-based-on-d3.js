/**
 * @type Jannchie
 * @email jannchie@gmail.com
 * @create date 2018-05-02 13:17:10
 * @modify date 2018-11-18 16:12:46
 * @desc 可视化核心代码
 */
// import * as d3 from 'd3';
// require("./stylesheet.css");
$('#inputfile').change(function () {
    $('#inputfile').attr('hidden', true);
    var r = new FileReader();
    r.readAsText(this.files[0], config.encoding);
    r.onload = function () {
        //读取完成后，数据保存在对象的result属性中
        var data = d3.csvParse(this.result);
        draw(data);
    }
});