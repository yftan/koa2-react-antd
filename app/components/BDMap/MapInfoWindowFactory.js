class MapInfoWindowFactory {
    constructor(height,width,title){
        this.state = {
            width : width,
            height :height,
            title :title,
            enableMessage : true,
            message :""
        }
    }

    createPtWin(mess){
        let infowin = new BMap.infoWindow(mess,this.state)
        infowin.disableAutoPan()
        return infowin
    }
}
export default MapInfoWindowFactory