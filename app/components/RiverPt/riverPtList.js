import React from 'react'
import Axios from 'axios'
import MapInitControl from '../BDMap/mapInit'
import RiverPtDetail from './riverPtDetail'

class RiverPtList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            err:null,
            data:null,
            keyword:null
        },
        this.onShowDetailHandle =this.onShowDetailHandle.bind(this)
        this.Refresh = this.Refresh.bind(this)
    }

    componentDidMount(){
        this.Refresh()
    }

    onShowDetailHandle(){
        this.refs.RiverPtDetail.updateInfo(rt_id);
        $('model_rpt_info').modal('show');
    }

    Refresh(){
        Axios.get(this.props.source).then(
            data => (this.setState({loading : false,err:null,data:data})),
            err => {this.setState({loading:false,err:err,data:null})}
        )
    } 

    render(){
        if(this.state.loading){
            return(
                <span>loading...</span>
            )
        }
        if(this.state.err){
            return(
                <span>Error</span>
            )
        }
        var ptlist = this.state.data.data.map(function(item){
            let mapInitControl = new MapInitControl();
            var black =mapInitControl.TransBlack2HTML(item.rt_black)
        })
        return(
            <div>
                <h5>已有采样点数：{this.state.data.data.length}</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>时间</th>
                            <th>情况</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ptlist}
                    </tbody>
                </table>
                <RiverPtDetail ref="RiverPtDetail" listRefreshCallback={this.Refresh} />
            </div>
        )
    }
}

export default RiverPtList


