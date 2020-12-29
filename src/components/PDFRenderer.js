import React from 'react';
import {fabric} from 'fabric';
import ValueChooser from './ValueChooser';
// import './PDFRenderer.css';

var pdfjsLib = require("pdfjs-dist/build/pdf.js");
var pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const PageContext = React.createContext(1);

class PDFRenderer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        paperSetImage: null,
        file: null
    }
    this.hiddenCanvas = React.createRef();
    this.pager = React.createRef();

    this.update = this.update.bind(this);
    this.loadPdfFile = this.loadPdfFile.bind(this);
    this.saveImageToState = this.saveImageToState.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps, prevState) {
    this.update();
    if (this.state.file === null || !this.state.file.name.endsWith(".pdf") || (prevState != null && prevState.file === this.state.file)) {
        return;
    }
    this.loadPdfFile(this.state.file);
  }

  loadPdfFile(file) {
    var canvas = this.hiddenCanvas.current;
    var fileReader = new FileReader();
    var setPageImage = this.saveImageToState;
    fileReader.onload = function(ev) {
      var typedarray = new Uint8Array(ev.target.result);
      pdfjsLib.getDocument(typedarray).promise.then(function getPdfHelloWorld(pdf) {
        // Fetch the first page
        pdf.getPage(1).then(function getPageHelloWorld(page) {
          var viewport = page.getViewport({
              scale: 8.0
            });
          // Prepare canvas using PDF page dimensions
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // Render PDF page into canvas context
          var task = page.render({canvasContext: context, viewport: viewport});
          task.promise.then(setPageImage);
        });
      }, function(error){
        console.log(error);
      });
    };
    fileReader.readAsArrayBuffer(file);
   
  }

  saveImageToState() {
    var imgStr = this.hiddenCanvas.current.toDataURL("image/png");
    if (imgStr != null && this.state.paperSetImage != null) {
        fabric.Image.fromURL(imgStr, this.state.paperSetImage);
    }
  }

  update() {
    this.pager.current.setState({active:(this.state.file != null && this.state.file.name.endsWith(".pdf"))});
  }

  render() {
    return (
        <ValueChooser 
            ref={this.pager}
            dbIconSrc={"assets/chevron-back-circle-outline.svg"} 
            ibIconSrc={"assets/chevron-forward-circle-outline.svg"}
            dbTitle={"Previous page"}
            ibTitle={"Next page"}
            dbCallback={ () => console.log("Previous page") }
            ibCallback={ () => console.log("Next page") }
            prompt={"Page Nr"}
            minValue={1}
            maxValue={2}
            step={1}
            leftSeparator={true}
            className="pager"
            blurAndEnterHandler={ () => console.log("Page changed") }
            currentValue={1}
        >
          <canvas id="hiddenCanvasForPdfId" ref={this.hiddenCanvas} style={{display: 'none'}}></canvas>
        </ValueChooser>
    )
  }
}

export default PDFRenderer;