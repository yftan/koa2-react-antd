function SettingControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(30,140);
}

//设置窗口
SettingControl.prototype = new BMap.Control();

SettingControl.prototype.initialize = function(map){
    var dataimg = document.createElement('img');
    dataimg.src = "/public/images/settings.png";
    dataimg.onclick = (event)=>{
        $('#modal_setting').modal('show');
    };

    map.getContainer().appendChild(dataimg);

    return dataimg;
}

export default SettingControl;