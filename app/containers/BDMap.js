import React from 'react'
import RSModal from '../components/RSModal'

class BDMap extends React.Component {
    componentDidMount() {
        var map = new BMap.Map('allmap');
        map.centerAndZoom(new BMap.Point(118.784419, 32.061826), 11); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("南京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    }
    render() {
        return ( 
            <div>
                <div id='allmap' style={{width:'100%',height:'700px'}}></div>
                <RSModal/>
            </div>
        )
    }
}

export default BDMap