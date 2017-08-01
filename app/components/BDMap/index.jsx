import React from 'react'

class BDMap extends React.Component{
    componentDidMount(){
        var map = new BMap.Map('allmap');
        map.centerAndZoom(new BMap.Point(118.784419, 32.061826), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("南京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        //添加控件
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
        });
        geolocationControl.addEventListener("locationError",function(e){
            // 定位失败事件
            alert(e.message);
        });

        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        map.addControl(geolocationControl);

    ////////////////自定义控件 start
    //导入数据控件
    function DataControl()
    {
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(30, 40);
    }

    DataControl.prototype = new BMap.Control();

    DataControl.prototype.initialize = function (map)
    {
        var dataimg = document.createElement('img');
        dataimg.src = "/images/data_add.png";

        dataimg.onclick = function (event)
        {
            var pt = marker.getPosition();
            if(pt.lng == 118 && pt.lat == 32)
            {
                alert("请选择一个点！");
                return;
            }
            var date = new Date();
            $('#txtLng').val(pt.lng);
            $('#txtLat').val(pt.lat);
            $('#txtDateTime').val( date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
                + date.getHours() + '时' + date.getMinutes() + '分');
            $('#model_datainput').modal('show');
        };

        map.getContainer().appendChild(dataimg);

        return dataimg;
    }

       // 创建数据控件
    var myDataCtrl = new DataControl();
    // 添加到地图当中
    map.addControl(myDataCtrl);

    //查看已有点
    function SettingControl()
    {
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(30, 140);
    }

    //设置窗口
    SettingControl.prototype = new BMap.Control();

    SettingControl.prototype.initialize = function (map)
    {
        var dataimg = document.createElement('img');
        dataimg.src = "/images/settings.png";

        dataimg.onclick = function (event)
        {
            $('#model_setting').modal('show');
        };

        map.getContainer().appendChild(dataimg);

        return dataimg;
    }

    var mySettingControl = new SettingControl();
    map.addControl(mySettingControl);

    ////////////////自定义控件 end
       //清理对话窗口所有记录
    function clearForm() {
        $('#txtDateTime').val('');
        $('#txtLat').val('');
        $('#txtLng').val('');
        $('#txtNum').val('');
        $('#txtPtNum').val('');
        $('#txtName').val('');
        $('#txtWidth').val('');
        $('#txtDepth').val('');
        $('#txtBlack').val(-1);
        $('#txtTrans').val(0);
        $('#txtTree').val(-1);
        $('#txtPipe').val(-1);
        $('#txtPipeText').val('');
        $('#txtO2').val('');
        $('#txtPot').val('');
        $('#txtPh').val('');
        $('#txtNote').val('');
    }


    //定位坐标点
    var icnLocateIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0 - 10 * 25)
    });

    var marker = new BMap.Marker(new BMap.Point(118, 32), {icon: icnLocateIcon});

    }

    render(){
        return(
            <div>
                <div id='allmap' style={{width:'100%',height:'700px'}}></div>
            </div>
        )
    }
}

export default BDMap