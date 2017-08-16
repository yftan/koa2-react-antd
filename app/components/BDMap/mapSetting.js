import React from 'react'
import JobSelect from '../Job/jobSelect'
import RiverPtDetail from '../RiverPt/riverPtDetail'
import MapInfoWin from './MapInfoWindowFactory'

class MapSetting extends React.Component{
    constructor(props){
        super(props)
        this.onPtShowHandle = this.onPtShowHandle.bind(this)
        this.addPtCilckHandle = this.addPtCilckHandle.bind(this)
    }

    onPtShowHandle(){
        if($('#cb_PtDisplay')[0].checked)
        {
            var query = "";
            if($('#j_num').val() != -1)
            {
                query = "?jnum=" + $('#j_num').val();
            }
            else{
                return;
            }
            window.openPtInfo = function (id) {
                this.refs.RiverPtDetail.updateInfo(id);
                $('#model_rpt_info').modal('show');
            }.bind(this);
            //显示数据
            $.ajax({
                url : '/riverptinfo/bd/all' + query,
                success : function (data) {
                    var jsData = JSON.parse(data);
                    let mapInfoWin = new MapInfoWin(130,100,'<strong class="PtInfoWinTitle">点位信息tyf:</strong>')
                    for(var i = 0; i < jsData.length; i++) {
                        var mrkCurPt = new BMap.Marker(new BMap.Point(jsData[i].rt_lng, jsData[i].rt_lat));
                        mrkCurPt.setTitle(jsData[i]._id);
                        var blackStatus = window.commonMethod.TransBlack2HTML(jsData[i].rt_black);

                        var infowin = mapInfoWin.createPtWin('点位编号 : &nbsp;' + jsData[i].rt_num +
                            ' <br />河流名称 : &nbsp;' + jsData[i].r_name +
                            '<br />黑臭情况 : &nbsp;' + blackStatus +
                            '<br /><a onclick="openPtInfo(\'' + jsData[i]._id + '\')">详情</a>');
                        this.addPtCilckHandle(infowin, mrkCurPt);
                        map.addOverlay(mrkCurPt);
                        window.riverPtCollection.pts.push(mrkCurPt);
                    }
                }.bind(this)
            });
        }
        else
        {
            window.riverPtCollection.removeAll();
        }
    }

    addPtCilckHandle(infowin,marker){
        marker.addEventListener("click",function(e){
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng,p.getPosition().lat);
            map.openInfoWindow(infowin,point);

            var bounds = map.getBounds();
            var ptSW = bounds.getSouthWest();
            var ptNE = bounds.getNorthEast();

            var length = (ptNE.lat - ptSW.lat)/6
            point.lat = point.lat +length

            map.panTo(point)
        }.bind(this))
    }

    render(){
        return(
            <div>
                <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex="-1" id="modal_setting" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                                <h4 className="modal-title">设置</h4>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="j_num" >选择作业</label>
                                <JobSelect source="/api/jobs/all" inputid="j_num" />
                                <input id="cb_PtDisplay" type="checkbox" className="js-switch" onChange={ this.onPtShowHandle } /> 是否显示已输入的点
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
                <RiverPtDetail ref="RiverPtDetail" />
            </div>
        )
    }
}
export default MapSetting