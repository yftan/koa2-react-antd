import React from 'react'
import Axios from 'axios'
import JobSelect from '../Job/jobSelect'

class RiverPtNew extends React.Component{
    constructor(props){
        super(props)
        this.clearForm = this.clearForm.bind(this) 
        this.onSubmitHandle = this.onSubmitHandle.bind(this)
        this.onDialogCloseHandle = this.onDialogCloseHandle.bind(this)
    }

    clearForm(){
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

    onSubmitHandle(){
        var form = new FormData($('#rt_new_form')[0]);

        Axios.post('/api/riverptinfo', form,{
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(
            data => {
                var jsData = data.data;
                if(jsData.res == 'suc')
                {
                    alert('数据上传成功！');
                    this.onDialogCloseHandle();
                    this.clearForm();
                }
            },
            err => {
                alert('数据上传失败！message : ' + JSON.stringify(err));
            }
        );
    }

    onDialogCloseHandle(){
        $('#btn_close').click();
    }

    componentDidMount() {
        
    }

    render(){
        return(
            <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex="-1" id="model_datainput" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                            <h4 className="modal-title">记录数据</h4>
                        </div>
                        <div className="modal-body">
                            <form id="rt_new_form" encType="multipart/form-data" role="form">
                                <div className="form-group">
                                    <label htmlFor="txtDateTime" >当前时间</label>
                                    <input name="rt_time" id="txtDateTime" type="text" className="form-control" readOnly="readonly" />

                                    <label htmlFor="txtLng" >经度</label>
                                    <input name="rt_lng" id="txtLng" type="text" className="form-control" readOnly="readonly" />

                                    <label htmlFor="txtLat" >纬度</label>
                                    <input name="rt_lat" id="txtLat" type="text" className="form-control" readOnly="readonly" />

                                    <label htmlFor="txtNum" >作业编号</label>
                                    <JobSelect inputid="txtNum" inputName="j_num" source="/api/jobs/all" />

                                    <label htmlFor="txtPtNum" >点位编号</label>
                                    <input name="rt_num" id="txtPtNum" type="text" className="form-control" />

                                    <label htmlFor="txtName" >河流名称</label>
                                    <input name="r_name" id="txtName" type="text" className="form-control" />

                                    <label htmlFor="txtWidth" >宽度(单位:m)</label>
                                    <input name="rt_width" id="txtWidth" type="text" className="form-control" />

                                    <label htmlFor="txtDepth" >深度(单位:m)</label>
                                    <input name="rt_depth" id="txtDepth" type="text" className="form-control" />

                                    <label htmlFor="txtTrans" >透明度(单位:cm)</label>
                                    <input name="rt_trans" id="txtTrans" type="text" className="form-control" />

                                    <label htmlFor="txtBlack" >黑臭情况</label>
                                    <select name="rt_black" id="txtBlack" className="form-control" >
                                        <option value="-1" >未知</option>
                                        <option value="0" >无黑臭</option>
                                        <option value="1" >略有臭味</option>
                                        <option value="2" >一般黑臭</option>
                                        <option value="3" >特别黑臭</option>
                                    </select>

                                    <label htmlFor="txtTree" >有无树木遮挡</label>
                                    <select name="rt_tree" id="txtTree" className="form-control" >
                                        <option value="-1" >未知</option>
                                        <option value="0" >无树木遮挡</option>
                                        <option value="1" >有少许树木遮挡</option>
                                        <option value="2" >有大量树木遮挡</option>
                                        <option value="3" >树木完全遮挡</option>
                                    </select>

                                    <label htmlFor="txtPipe" >有无排污口</label>
                                    <select name="rt_pipe" id="txtPipe" className="form-control" >
                                        <option value="-1" >未知</option>
                                        <option value="0" >无排污口</option>
                                        <option value="1" >有排污口</option>
                                    </select>

                                    <label htmlFor="txtPipeText" >排污口详细说明</label>
                                    <textarea name="rt_pipetext" id="txtPipeText" className="form-control" rows="6" value=""></textarea>

                                    <label htmlFor="txtO2" >溶解氧(单位:mg/L)</label>
                                    <input name="rt_o2" id="txtO2" type="text" className="form-control" />

                                    <label htmlFor="txtPot" >氧化还原电位(单位:mv)</label>
                                    <input name="rt_pot" id="txtPot" type="text" className="form-control" />

                                    <label htmlFor="txtPh" >ph值(单位:ph)</label>
                                    <input name="rt_ph" id="txtPh" type="text" className="form-control" />

                                    <label htmlFor="txtNote" >备注</label>
                                    <textarea name="rt_note" id="txtNote" className="form-control"rows="10" value=""> </textarea>

                                    <br />
                                    <div className="form-group last">
                                        <label htmlFor="fileImg" >图像</label>
                                        <div className="col-md-9">
                                            <div className="fileupload fileupload-new" data-provides="fileupload">
                                                <div className="fileupload-new thumbnail" style= { { "width" : "200px", "height" : "150px" } }>
                                                    <img src="/images/noimg.png" alt="" />
                                                </div>
                                                <div className="fileupload-preview fileupload-exists thumbnail" style={ { "maxWidth" : "200px" , "maxHeight" : "150px", "lineHeight " : "20px"}}></div>
                                                <div>
                                                    <span className="btn btn-default btn-file">
                                                        <span className="fileupload-new"><i className="fa fa-paper-clip"> </i> 选择图像</span>
                                                        <span className="fileupload-exists"><i className="fa fa-undo"> </i> 更变</span>
                                                        <input name="fileImg" type="file" id="fileImg" className="default" />          
                                                    </span>
                                                    <a href="#" className="btn btn-danger fileupload-exists" data-dismiss="fileupload"><i className="fa fa-trash"></i> Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="btn_close" type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button id="btn_submit" type="button" className="btn btn-warning" onClick={this.onSubmitHandle}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default RiverPtNew   