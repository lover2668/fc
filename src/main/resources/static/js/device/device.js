Vue.component('option-item', {
    props: ['todo'],
    template: '<option>{{todo.name}}</option>'
});
new Vue({
    el:"#myDevice",
    data:{
        deviceName:"添加设备",
        inputLimit:"",
        selected:"3",
        delId:"",
        delErrorMsg:"",
        projectList:[
            {val:1,name:"成都华西"},
            {val:2,name:"成都龙泉"},
            {val:3,name:"项目二"}
        ]
    },
    methods:{
        addDevice:function(){
            this.deviceName = "添加设备";
            $("#modal-default").addClass("in").css("display","block");
            this.devicePopTable(false);
        },
        devicePopTable:function(flag){
            var _this = this;
            var postData = {
                "page":1,
                "rows":10
            };
            $('#addDevice').DataTable( {
                "ajax":{
                    url:contextPath +"device/page",
                    dataSrc:"data.list",
                    "data":postData
                },
                "info":false,
                "searching": false,
                "lengthChange": false,
                "ordering": false,
                "destroy":flag,
                columnDefs: [ {
                    orderable: false,
                    className: 'select-checkbox',
                    targets:   0
                } ],
                select: {
                    // style:    'os',
                    style: 'multi',
                    selector: 'td:first-child'
                },
                "order": [[ 1, 'asc' ]],
                // "pagingType": "full_numbers",
                "language": {
                    "paginate": {
                        "next": "下一页",
                        "previous": "上一页"
                    }
                },
                "columns": [
                    { "data": "intermediary.intermediary" },
                    { "data": "operateUser.name" }
                ],
                "pageLength": 10,
                "stateLoadParams": function (settings, data) {

                }
            } );
        },
        nultiSure:function(){ //添加弹窗复选框点击确定
            $("#addDevice .select-checkbox").each(function(key,value){
                if($(this).parent().hasClass('selected')){
                    console.log(11);
                }
            })
        },
        closePop:function(){
            $("#modal-default").removeClass("in").css("display","none")
        },
        closeDelPop:function(){
            $(".modalAll").removeClass("in").css("display","none");
        },
        searchLimit:function(){ //按条件进行搜索
            var _this = this;
            _this.tableInit(true);
        },
        sureDel:function(){
            var _this = this;
            $.axspost(contextPath + "device/"+_this.delId+"","delete","",function(data){
                if(data.status == "200"){
                    $("#canDelate").removeClass("in").css("display","none");
                    _this.tableInit(true);
                }else{
                    $("#canDelate").removeClass("in").css("display","none");
                    $("#errorMsg").addClass("in").css("display","block");
                    _this.delErrorMsg = data.messages;
                    // console.log( _this.delErrorMsg);
                }
            },function(data){})
        },
        tableInit : function(flag){
            var _this = this;
            var val = parseInt($("#limitSelect").val());
            var postData = {
                "page":1,
                "rows":10
            };
            switch (val){
                case 1 :{
                    postData.deviceProductionNum = _this.inputLimit;//生产编号
                    break;
                }
                case 2:{
                    postData["project.projectName"]= _this.inputLimit;//项目名称
                    break;
                }
                case 3:{
                    postData["operateUser.name"] = _this.inputLimit; //操作员名称
                    break;
                }
                case 4:{
                    postData["transcribeUser.name"] = _this.inputLimit; //抄表员名称
                    break;
                }
            }
            $('#deviceForm').DataTable({
                "ajax":{
                    // url:"../dist/data/device.json",
                    url: contextPath +"device/page",
                    dataSrc:"data.list",
                    "data":postData
                },
                "info":false,
                "searching": false,
                "lengthChange": false,
                "ordering": false,
                // "pagingType": "full_numbers",
                "language": {
                    "paginate": {
                        "next": "下一页",
                        "previous": "上一页"
                    }
                },
                "destroy":flag,
                "columns": [
                    { "data": "deviceProductionNum"},
                    { "data": "deviceType"},
                    { "data": "project.projectName"},
                    { "data": "operateUser.name"},
                    { "data": "transcribeUser.name","render":function(data){
                            if(data == null){
                                return ''
                            }else{
                                return data
                            }
                        }},
                    { "data": "deivceStatus","render": function(data, type, row, meta){
                            var status;
                            if(data == 0){
                                status = "在线"
                            }else{
                                status = "不在线"
                            }
                            return status;
                        }},
                    { "data": "intermediary.intermediaryName" },
                    { "data": "", "render": function(data, type, row, meta){
                            var html = "<button type='button' class='Normal margin-right-4 btn btn-primary' data-id='"+row.id+"' id='editDevice'>编辑</button>" +
                                "<button type='button' class='Normal margin-right-4 btn btn-primary' data-id='"+row.id+"' id='delete'>删除</button>" +
                                "<button type='button' class='Normal margin-right-4 btn btn-primary' data-id='"+row.id+"' id='control'>控制</button>" +
                                "<button type='button' class='Normal margin-right-4 btn btn-primary' data-id='"+row.id+"' id='log'>日志</button>";
                            return html;
                        }}

                ],
                "pageLength": 10,
                "stateLoadParams": function (settings, data) {
                    alert(1);
                }
            });
        }
    },
    mounted:function(){
        var _this = this;
        $(document).on("click","#editDevice",function(){
            _this.deviceName = "编辑设备";
            $("#modal-default").addClass("in").css("display","block")
        });

        $(document).on("click","#log",function(){
            window.location.href = "log?menuId=1&"+$(this).attr("data-id");
        });

        //控制
        $(document).on("click","#control",function(){
            window.location.href = "control?menuId=1&"+$(this).attr("data-id");

        });
        //删除
        $(document).on("click","#delete",function(){
            var id = $(this).attr("data-id");
            _this.delId = id;
            $("#canDelate").show();
            $("#canDelate").addClass("in").css("display","block")

        });
        _this.tableInit(false); //创建表格

        //
        $("#intermediaryName").html5Validate(function() {

        })
    }
});

$("#deviceForm").on( 'init.dt', function ( e, settings ) {
    //在此给变量赋值
    // console.log(1);
    $(".content-list").removeClass("display-none")
});
$("#deviceForm").on( 'draw', function () {
    alert( 'Table redrawn' );
} );