import React from 'react'

import RiverPtNew from '../RiverPt/riverPtNew.js'
import MapSetting from './mapSetting.js'
// import MapDataControl from './mapDataControl.js'
// import MapSettingControl from './mapSettingControl.js'
// import MapInit from './mapInit.js'
var MapInit = require('./mapInit');


class BDMap extends React.Component{
    componentDidMount() {
        $('#allmap').css('height',$('#main_context').height());
        
        MapInit.init();
        var MapDataControl = require('./mapDataControl');
        var MapSettingControl = require('./mapSettingControl');

        /*------------------自定义控件-------------------------*/
        var myDataCtrl = new MapDataControl();
        map.addControl(myDataCtrl);

        var mySettingControl = new MapSettingControl();
        map.addControl(mySettingControl);

        // /*------------------添加事件-------------------------*/
        map.addEventListener("click",MapInit.onClick);
    }
    render(){
        return(
            <div >
                <div id='allmap' style={{width:'100%',height:'700px'}}></div>
                <RiverPtNew />
                <MapSetting />  
            </div>
        )
    }
}

export default BDMap