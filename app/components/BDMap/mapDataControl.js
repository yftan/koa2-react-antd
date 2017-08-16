//导入数据控件
function MapDataControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(30,40);
}

MapDataControl.prototype = new BMap.Control();

MapDataControl.prototype.initialize = function(map){
    var dataimg = document.createElement('img');
    dataimg.src = "/images/data_add.png";

    dataimg.onclick = (event)=>{
        var pt = marker.getPosition();
        if(pt.lng ==118 && pt.lat ==32){
            alert("请选择一个点！")
            return;
        }
        var date = new Date();
        $('#txtLng').val(pt.lng);
        $('#txtLat').val(pt.lat);
        $('#txtDateTime').val(date.toLocaleString())
        $('#model_datainput').modal('show');
    }

    map.getContainer().appendChild(dataimg);
    return dataimg;
}

export default MapDataControl;