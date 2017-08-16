import React from 'react'
import Axios from 'axios'
import MapInitControl from '../BDMap/mapInit'

class RiverPtDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : {
                _id : "",
                rt_time : "",
                rt_lng : "",
                rt_lat : "",
                j_num : "",
                rt_num : "",
                r_name : "",
                u_id : "",
                u_name : "",
                rt_width : "",
                rt_depth : "",
                rt_trans : "",
                rt_black : "",
                rt_tree : "",
                rt_pipe : "",
                rt_pipetext : "",
                rt_o2 : "",
                rt_pot : "",
                rt_ph : "",
                rt_note : ""
            },
            err : null
        },
        this.updateInfo = this.updateInfo.bind(this),
        this.onDeleteRptHandle = this.onDeleteRptHandle.bind(this)
    }

    updateInfo(rd_id){
        Axios.get('/riverptinfo/wgs/'+rt_id+'?user=1').then(
            data => {this.setState({loading:false,data:data.data[0]});},
            err=>(this.setState({loading:false,err:err}))
        )
    }

    onDeleteRptHandle(e){ 
        if(confirm("确认删除此点位置？"))
        {
            Axios.delete('/riverptinfo/wgs/'+this.state.data._id).then(
                data=>{
                    if(data.data.n ==1 && data.data.ok ==1){
                        alert("删除成功！")
                        $('#model_rpt_info').modal('hide');
                        window.riverPtCollection.removeByOID(this.state.data._id);
                        map.closeInfoWindow();
                        if(typeof this.props.listRefreshCallback == 'function' )
                        {
                            this.props.listRefreshCallback();
                        }
                    }
                },
                err =>{}
            )
        }
    }

    render(){
        var delButton = (null);
        var context = (
            <div className = "form-group">
                <label> </label><br />
            </div>
        )
        if(this.state.loading){
            context = (
                <div className = "from-group">
                    <label>loading...</label><br />
                </div>
            );
        }else if(this.state.err){
            context = (
                <div className = "from-group">
                    <label>error...</label><br />
                </div>
            )
        }else if(this.state.data){
            var delButton = null;
            // if(getCookie('u_role') == 0 || getCookie('u_id') == this.state.data.u_id)
            // {
            //     delButton = (
            //         <button id="btn_rpt_info_delete" type="button" className="btn btn-danger" onClick={this.onDeleteRptHandle} >删除</button>
            //     );
            // }
            var rt_img = '/public/images/noimg.png';
            if(this.state.data.rt_img != '' && this.state.data.rt_img != undefined){
                rt_img = '/public/rivers/'+this.state.data.rt_img;
            }
            context =  (
                <div className="form-group">
                    <label >时间 : { this.state.data.rt_time }</label><br />
                    <label >经度 : { this.state.data.rt_lng }</label><br />
                    <label >纬度 : { this.state.data.rt_lat }</label><br />
                    <label >作业编号 : { this.state.data.j_num }</label><br />
                    <label >作业人 : { this.state.data.u_id + ' - ' + this.state.data.u_name }</label><br />
                    <label >点位编号 : { this.state.data.rt_num }</label><br />
                    <label >河流名称 : { this.state.data.r_name }</label><br />
                    <label >宽度(单位:m) : { this.state.data.rt_width }</label><br />
                    <label >深度(单位:m) : { this.state.data.rt_depth }</label><br />
                    <label >透明度(单位:cm) : { this.state.data.rt_trans }</label><br />
                    <label >黑臭情况 : { MapInitControl.TransBlack2HTML(this.state.data.rt_black) }</label><br />
                    <label >有无树木遮挡 : { MapInitControl.TransTree2HTML(this.state.data.rt_tree) }</label><br />
                    <label >有无排污口 : { MapInitControl.TransPipe2HTML(this.state.data.rt_pipe) }</label><br />
                    <label >排污口详细说明 : </label><br />
                    <p>{ this.state.data.rt_pipetext }</p>
                    <label >溶解氧(单位:mg/L) : { this.state.data.rt_o2 }</label><br />
                    <label >氧化还原电位(单位:mv) : { this.state.data.rt_pot }</label><br />
                    <label >ph值(单位:ph) : { this.state.data.rt_ph }</label><br />
                    <label >备注 : </label><br />
                    <img alt="" src={ rt_img } height="150" width="200" />
                    <p>{ this.state.data.rt_note }</p>
                </div>
            )
        }
        return(
            <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex="-1" id="model_rpt_info" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                            <h4 className="modal-title">点位信息</h4>
                        </div>
                        <div className="modal-body">
                            <form role="form">
                                {context}
                            </form>
                        </div>
                        <div className="modal-footer">
                            {delButton} &nbsp;
                            <button id="btn_rpt_info_close" type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default RiverPtDetail