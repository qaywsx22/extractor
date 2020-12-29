import React from 'react';
import Button from './Button';
import Paper from './Paper';
import PDFRenderer from './PDFRenderer';
import ValueChooser from './ValueChooser';
// import './Extractor.css';

var ZoomContext = React.createContext(1.0);

class Extractor extends React.Component {

  constructor(props) {
    super(props)

    this.pap = React.createRef();
    this.hiddenFileInput = React.createRef();
    this.pdfRend = React.createRef();
    this.zoomer = React.createRef();

    this.processFiles = this.processFiles.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.doZoom = this.doZoom.bind(this);

    this.state = {
      zoom: 1.0,
      point: null
    }

    this.zoomFactor = 0.05;
  }

  processFiles(e) {
    if (e.target.files != null && e.target.files.length === 1) {
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
    var zoom = this.state.zoom + zf;
    this.setState({zoom:zoom, point:point});
  }

  componentDidMount() {
    this.pdfRend.current.setState({paperSetImage: this.pap.current.loadRasterImage});
    this.zoomer.current.setState({active: true});
  }

  componentDidUpdate(prevProps, prevState) {
  }

  loadImage(e) {
    e.preventDefault();
    this.hiddenFileInput.current.click();
  }
  
  render() {
    var curzoom = this.state.zoom;
    var point = this.state.point;
    return (
      <ZoomContext.Provider value={curzoom}>
        <div className="main">
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
              <img alt={"Crop"} src="assets/cut-outline.svg"></img>
            </Button>

            <PDFRenderer ref={this.pdfRend} />

            <div className="filler"></div>

            <ValueChooser 
              ref={this.zoomer}
              dbIconSrc={"assets/add-circle-outline.svg"} 
              ibIconSrc={"assets/remove-circle-outline.svg"}
              dbTitle={"Zoom in"}
              ibTitle={"Zoom out"}
              dbCallback={ () => this.doZoom(true) }
              ibCallback={ () => this.doZoom(false) }
              prompt={"Zoom"}
              minValue={0.01}
              maxValue={10.0}
              step={'any'}
              className="zoomer"
              blurAndEnterHandler={ newZoom => this.setState({zoom:newZoom}) }
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
            /> 
          </div>

          <input ref={this.hiddenFileInput} type="file" style={{display: 'none'}} onChange={this.processFiles}/>
        </div>
      </ZoomContext.Provider>
    )
  }
}

export default Extractor;