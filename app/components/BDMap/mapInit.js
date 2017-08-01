import React from 'react'

class MapInit {
    init() {
        // 百度地图API功能
        var map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(118.784419, 32.061826), 11); // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("南京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        //初始化数据
        window.map = map;
        window.riverPtCollection = {};
        window.riverPtCollection.pts = [];
        window.riverPtCollection.removeAll = function () {
            for (var i = 0; i < this.pts.length; i++) {
                map.removeOverlay(this.pts[i]);
            }
        };
        window.riverPtCollection.removeByOID = function (oid) {
            for (var i = 0; i < this.pts.length; i++) {
                if (this.pts[i].getTitle() == oid) {
                    map.removeOverlay(this.pts[i]);
                    return;
                }
            }
        };
        //地图组件公共方法
        window.commonMethod = {};
        window.commonMethod.TransBlack2HTML = function (black) {
            var blackStatus = "";
            switch (black) {
                case 0:
                    {
                        blackStatus = "<span class='PtInfoWinBlack-0'>无黑臭</span>";
                        break;
                    }
                case 1:
                    {
                        blackStatus = "<span class='PtInfoWinBlack-1'>略有黑臭</span>";
                        break;
                    }
                case 2:
                    {
                        blackStatus = "<span class='PtInfoWinBlack-2'>一般黑臭</span>";
                        break;
                    }
                case 3:
                    {
                        blackStatus = "<span class='PtInfoWinBlack-3'>特别黑臭</span>";
                        break;
                    }
                default:
                    {
                        blackStatus = "<span class='PtInfoWinBlack--1'>未知</span>";
                    }
            }
            return blackStatus;
        };

        //定位坐标点
        window.icnLocateIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - 10 * 25)
        });

        window.marker = new BMap.Marker(new BMap.Point(118, 32), {
            icon: window.icnLocateIcon
        });
        window.setPoint = function (pt) {
            map.removeOverlay(window.marker);
            marker = new BMap.Marker(pt, {
                icon: window.icnLocateIcon
            });
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1000);
        };


        //添加控件
        var top_left_control = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        }); // 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
        var geolocationControl = new BMap.GeolocationControl();
        var mapTypeControl = new BMap.MapTypeControl({
            type: BMAP_MAPTYPE_CONTROL_MAP,
            mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP],
            anchor: BMAP_ANCHOR_TOP_LEFT
        });

        geolocationControl.addEventListener("locationSuccess", function (e) {
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;

            window.setPoint(e.point);
        });
        geolocationControl.addEventListener("locationError", function (e) {
            // 定位失败事件
            alert(e.message);
        });

        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        map.addControl(geolocationControl);
        map.addControl(mapTypeControl);

    }

    onClick(e){
        window.setPoint(e.point);
    }

    TransBlack2HTML(black){
        var blackStatus = null;
        switch (black)
        {
            case 0 :
            {
                blackStatus = (<span className='PtInfoWinBlack-0'>无黑臭</span>);
                break;
            }
            case 1 :
            {
                blackStatus = (<span className='PtInfoWinBlack-1'>略有黑臭</span>);
                break;
            }
            case 2 :
            {
                blackStatus = (<span className='PtInfoWinBlack-2'>一般黑臭</span>);
                break;
            }
            case 3 :
            {
                blackStatus = (<span className='PtInfoWinBlack-3'>特别黑臭</span>);
                break;
            }
            default :
            {
                blackStatus = (<span className='PtInfoWinBlack--1'>未知</span>);
            }
        }
        return blackStatus;
    }

    TransTree2HTML(tree){
        var treeStatus = null;
        switch (tree)
        {
            case 0 :
            {
                treeStatus = (<span >无树木遮挡</span>);
                break;
            }
            case 1 :
            {
                treeStatus = (<span >有少许树木遮挡</span>);
                break;
            }
            case 2 :
            {
                treeStatus = (<span >有大量树木遮挡</span>);
                break;
            }
            case 3 :
            {
                treeStatus = (<span >树木完全遮挡</span>);
                break;
            }
            default :
            {
                treeStatus = (<span >未知</span>);
            }
        }
        return treeStatus;
    }
    
    TransPipe2HTML(pipe){
        var pipeStatus = null;
        switch (pipe)
        {
            case 0 :
            {
                pipeStatus = (<span >无排污口</span>);
                break;
            }
            case 1 :
            {
                pipeStatus = (<span >有排污口</span>);
                break;
            }
            default :
            {
                pipeStatus = (<span >未知</span>);
            }
        }
        return pipeStatus;
    }
}
export default MapInit