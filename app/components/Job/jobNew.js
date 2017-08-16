import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

class JobNew extends React.Component(){
    constructor(props){
        this.state = {
            JNumExist : false
        }
        this.successCallback = this.successCallback.bind(this)
        this.onJNumInput =this.onJNumInput.bind(this)
        this.ShowInfo = this.ShowInfo.bind(this)
        this.onSubmitClickHandle = this.ShowInfo.bind(this)
        this.dataRefresh = this.dataRefresh.bind(this)
    }

    successCallback(){
        return(function(data){
            let jsRes = JSON.parse(data);
            if (jsRes.res == 'suc'){
                alert('insert success! ')
                this.props.refreshCallback()
                $('#btnNewJobClose').click()
            }
        })
    }

    onJNumInput(event){
        if($('#txtJobNum').val().trim()==''){
            return
        }
        Axios.get('/jobs/'+('#txtJobNum').val().trim()).then(
            data=>{
                if(data.data.data != null && data.data.data.length !=0){
                    this.setState({JNumExist:true})
                    this.ShowInfo('作业编号重复！')
                }else{
                    this.setState({JNumExist :false})
                    this.ShowInfo(null)
                }
            },
            err =>{}
        )
    }

    ShowInfo(mess){
        if(mess == null) {
            ReactDOM.render(<div></div>,document.getElementById('in-info'))
        }else{
            ReactDOM.render(                
                <div id="jn-id-null" className="alert alert-block alert-danger fade in">
                    <button type="button" className="close close-sm" data-dismiss="alert">
                        <i className="fa fa-times"></i>
                    </button>
                    {mess}
                </div>,document.getElementById('jn-info'))
        }
    }

    onSubmitClickHandle(){
        if($('#txtJobNum').val().trim() == '')
        {
            this.ShowInfo('请输入作业编号！');
            return;
        }
        if(this.state.JNumExist)
        {
           return;
        }
        if($('#txtJobName').val().trim() == '')
        {
            this.ShowInfo('请输入作业名称！');
            return;
        }
        Axios.post('/jobs',{
            j_num : $('#txtJobNum').val(),
            j_name : $('#txtJobName').val(),
            j_des : $('#txtJobDes').val()
        }).then(function(response){
            console.log(response)
            this.successCallback().bind(this)
        }).catch(function(error){
            console.log(error)
        })
        // $.ajax({
        //     url:'/jobs',
        //     type:'POST',
        //     data:{
        //         j_num : $('#txtJobNum').val(),
        //         j_name : $('#txtJobName').val(),
        //         j_des : $('#txtJobDes').val()
        //     },
        //     success:this.successCallback().bind(this)
        // });
    }
    
    dataRefresh(){
        this.props.refreshCallback();
    }

    render(){
        return(
            <div className="m-bot15">
                <button className="btn btn-success" type="button" data-toggle="modal" href="#mdNewJob" >新增</button>&nbsp;&nbsp;&nbsp;
                <button className="btn btn-info" type="button" onClick={this.dataRefresh} ><i className="fa fa-refresh"></i>刷新</button>
                <div aria-hidden="false" aria-labelledby="myModalLabel" role="dialog" tabIndex="-1" id="mdNewJob" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                                <h4 className="modal-title">新增作业</h4>
                            </div>
                            <div className="modal-body">
                                <form role="form">
                                    <div className="form-group">
                                        <label htmlFor="txtJobNum" >作业编号：</label>
                                        <input id="txtJobNum" type="text" className="form-control" onBlur={this.onJNumInput} />
                                        <label htmlFor="txtJobName" >作业名称：</label>
                                        <input id="txtJobName" type="text" className="form-control" />
                                        <label htmlFor="txtJobDes" >作业描述：</label>
                                        <textarea id="txtJobDes" type="text" className="form-control" />
                                    </div>
                                </form>
                                <div id="jn-info" ></div>
                            </div>

                            <div className="modal-footer">
                                <button id="btnNewJobClose" type="button" className="btn btn-default" data-dismiss="modal"  >取消</button>
                                <button type="button" className="btn btn-success" onClick={this.onSubmitClickHandle}>提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default JobNew