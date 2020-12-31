import React from 'react';
import classNames from 'classnames/dedupe';
import Button from './Button';
import Paper from './Paper';
import PDFRenderer from './PDFRenderer';
import ValueChooser from './ValueChooser';
import BusyIndicator from './BusyIndicator';
import Dialog from './Dialog';
// import './Extractor.css';

var ZoomContext = React.createContext(1.0);

class Extractor extends React.Component {

  constructor(props) {
    super(props)

    this.pap = React.createRef();
    this.hiddenFileInput = React.createRef();
    this.pdfRend = React.createRef();
    this.zoomer = React.createRef();
    this.busyind = React.createRef();
    this.modDialog = React.createRef();

    this.processFiles = this.processFiles.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.doZoom = this.doZoom.bind(this);
    this.setZoom = this.setZoom.bind(this);
    this.setShieldActive = this.setShieldActive.bind(this);
    this.showModalDialog = this.showModalDialog.bind(this);
    this.onDialogAccept = this.onDialogAccept.bind(this);


    this.state = {
      zoom: '1.0',
      point: null
    }

    this.zoomFactor = 0.05;
    this.minZoom = 0.05;
    this.maxZoom = 5.0;
  }

  setShieldActive(act) {
    if (this.busyind.current != null) {
      var cl = this.busyind.current.getAttribute("class");
      if (act) {
          cl = classNames(cl, {active:true, inactive: false});
      }
      else {
          cl = classNames(cl, {active:false, inactive: true});
      }
      this.busyind.current.setAttribute("class", cl);
    }
  }

  showModalDialog() {
    if (this.modDialog.current != null) {
      this.modDialog.current.setState({active: true});
    }
  }

  processFiles(e) {
    if (e.target.files != null && e.target.files.length === 1) {
      // show shield
      this.setShieldActive(true);
      this.pdfRend.current.setState({
        paperSetImage: this.pap.current.loadRasterImage, 
        file: e.target.files.item(0)
      });
      this.pap.current.setState({file: e.target.files.item(0)});
      e.target.value = null;
    }
  }

  doZoom(out, point) {
    var zf = out ? this.zoomFactor : -this.zoomFactor;
    var zoom = parseFloat(this.state.zoom) + zf;
    this.setZoom(zoom, point);
  }

  setZoom(zoom, point) {
    var z = parseFloat(zoom);
    if (z > this.maxZoom) {
      z = this.maxZoom;
    }
    if (z < this.minZoom) {
      z = this.minZoom;
    }
    this.setState({zoom:parseFloat(z).toPrecision(3), point:point});
  }

  componentDidMount() {
    this.pdfRend.current.setState({paperSetImage: this.pap.current.loadRasterImage, paperRemoveOldImage: this.pap.current.removeOldImage});
    this.zoomer.current.setState({active: true});
  }

  componentDidUpdate(prevProps, prevState) {
  }

  loadImage(e) {
    e.preventDefault();
    this.hiddenFileInput.current.click();
  }
  
  onDialogAccept() {
    console.log("Dialog content accepted");
  }

  render() {
    var curzoom = this.state.zoom;
    var point = this.state.point;
    return (
        <div className="main">
          <ZoomContext.Provider value={curzoom}>
            <div className="toolbar shadow">

              <Button name="load" title={"Load file"} className={"active"} handleClick={ (e) => this.loadImage(e) }>
                <img alt={"Load file"} src="assets/image-outline.svg"></img>
              </Button>

              <Button name="clear" title={"Clear canvas"} className={"active"} handleClick={ () => {
                this.pap.current.clearCanvas();
                this.pdfRend.current.setState({
                  file: null
                });
                      } }>
                <img alt={"Clear canvas"} src="assets/close-circle-outline.svg"></img>
              </Button>

              <Button name="crop" title={"Crop image"} className={"active"} handleClick={ () => this.pap.current.cropImage() }>
                <img alt={"Crop"} src="assets/crop-outline.svg"></img>
              </Button>
              <Button name="to_vector" title={"Vectorize"} className={"active"} handleClick={ () => console.log("Try to vectorize") }>
                <img alt={"Vectorize"} src="assets/vector.svg"></img>
              </Button>
              <Button name="save" title={"Save"} className={"active"} handleClick={ () => this.showModalDialog() }>
                <img alt={"Save"} src="assets/save-outline.svg"></img>
              </Button>

              <PDFRenderer ref={this.pdfRend} shieldHandler={this.setShieldActive}/>

              <div className="filler"></div>

              <Button name="reset_position" title={"Reset position"} className={"active"} handleClick={ () => this.pap.current.resetPosition() }>
                <img alt={"Reset position"} src="assets/locate.svg"></img>
              </Button>
              <Button name="reset_zoom" title={"Reset zoom"} className={"active"} handleClick={ () => this.setState({zoom:1.0}) }>
                <img alt={"Reset zoom"} src="assets/zoom-to-actual-size.svg"></img>
              </Button>

              <ValueChooser 
                ref={this.zoomer}
                dbIconSrc={"assets/zoom-in.svg"} 
                ibIconSrc={"assets/zoom-out.svg"}
                dbTitle={"Zoom in"}
                ibTitle={"Zoom out"}
                dbCallback={ () => this.doZoom(true) }
                ibCallback={ () => this.doZoom(false) }
                prompt={"Zoom"}
                minValue={0.05}
                maxValue={5.0}
                step={0.05}
                className="zoomer"
                blurAndEnterHandler={ newZoom => { this.setZoom(newZoom)} }
                currentValue={curzoom}
            >
            </ValueChooser>

            </div>

            <div className="sand shadow">
              <Paper 
                ref={this.pap} 
                zoom={curzoom}
                point={point}
                onMouseWheelZoom={this.doZoom}
                resetZoom={() => this.setState({zoom:1.0})}
                shieldHandler={this.setShieldActive}
              /> 
            </div>
          </ZoomContext.Provider>

          <input ref={this.hiddenFileInput} type="file" style={{display: 'none'}} onChange={this.processFiles}/>

          <BusyIndicator ref={this.busyind}/>

          <Dialog ref={this.modDialog} acceptCallback={this.onDialogAccept} title={"Save dialog"}>
            <div className={"dlgrow"}>
              <label>Measurement</label>
              <input type="text" placeholder={"30 ft"}></input>
            </div>
            <div className={"dlgrow"}>
              <label>File name</label>
              <input type="text"></input>
            </div>
          </Dialog>

        </div>
    )
  }
}

export default Extractor;