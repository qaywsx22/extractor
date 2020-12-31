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
        totalPageNumber: 0,
        currentPage: 0,
        paperSetImage: null,
        paperRemoveOldImage: null,
        file: null
    }
    this.hiddenCanvas = React.createRef();
    this.pager = React.createRef();

    this.update = this.update.bind(this);
    this.loadPdfFile = this.loadPdfFile.bind(this);
    this.saveImageToState = this.saveImageToState.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.loadPdfDocument = this.loadPdfDocument.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.processError = this.processError.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);

    this.pdfDocument = null;
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    this.pdfDocument = null;
    this.setState({currentPage: 0, totalPageNumber: 0});
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.update(prevState)) {
      return;
    }
    if (this.state.file === null || !this.state.file.name.endsWith(".pdf")) {
        return;
    }
    if (prevState != null) {
      if (prevState.file !== this.state.file) {
        this.loadPdfFile(this.state.file);
        return;
      }
      if (this.state.totalPageNumber >= 1 && this.state.currentPage <= this.state.totalPageNumber && this.pdfDocument != null && this.state.currentPage !== prevState.currentPage) {
        this.loadPage(parseInt(this.state.currentPage), this.pdfDocument);
      }
    }
  }

  saveImageToState() {
    var imgStr = this.hiddenCanvas.current.toDataURL("image/png");
    if (imgStr != null && this.state.paperSetImage != null) {
      fabric.Image.fromURL(imgStr, this.state.paperSetImage);
    }
  }

  loadPage(pageNumber, pdf) {
    // show shield
    if (this.props.shieldHandler != null) {
      this.props.shieldHandler(true);
    }
    if (this.state.paperRemoveOldImage != null) {
      this.state.paperRemoveOldImage();
    }
    pdf.getPage(pageNumber).then(this.renderPage);
  }

  renderPage(page) {
    var viewport = page.getViewport({
        scale: 8.0
    });
    // Prepare canvas using PDF page dimensions
    var context = this.hiddenCanvas.current.getContext('2d');
    this.hiddenCanvas.current.height = viewport.height;
    this.hiddenCanvas.current.width = viewport.width;
    // Render PDF page into canvas context
    var task = page.render({canvasContext: context, viewport: viewport});
    task.promise.then(this.saveImageToState);
  }

  loadPdfDocument(pdf) {
    this.pdfDocument = pdf;
    // Fetch the first page
    this.setState({totalPageNumber: pdf.numPages, currentPage: 1});
  }

  processError(error) {
    console.log(error);
  }

  loadPdfFile(file) {
    var fileReader = new FileReader();
    var lPDFD = this.loadPdfDocument;
    var perr = this.processError;
    this.pdfDocument = null;    
    this.setState({currentPage: 0, totalPageNumber: 0});    
    fileReader.onload = function(ev) {
      var typedarray = new Uint8Array(ev.target.result);
      pdfjsLib.getDocument(typedarray).promise.then(lPDFD, perr);
    };
    // show shield
    if (this.props.shieldHandler != null) {
      this.props.shieldHandler(true);
    }
    fileReader.readAsArrayBuffer(file);
  }

  update(prevState) {
    var act = (this.state.file != null && this.state.file.name.endsWith(".pdf"));
    if (this.state.active !== act) {
      this.pager.current.setState({active: act});
    }
    return act;
  }

  changePage(dec) {
    if (this.state.totalPageNumber > 0) {
      var cp = parseInt(this.state.currentPage);
      if (!isNaN(cp)) {
        dec ? cp-- : cp++;
        this.setCurrentPage(cp);
      }
    }
  }

  setCurrentPage(cp) {
    if (cp < 1) {
      cp = 1;
    }
    if (cp > this.state.totalPageNumber) {
      cp = this.state.totalPageNumber;
    }
    this.setState({currentPage: cp});
  }  

  render() {
    var tp = this.state.totalPageNumber;
    var cp = this.state.currentPage;
    return (
        <ValueChooser 
            ref={this.pager}
            dbIconSrc={"assets/chevron-back-circle-outline.svg"} 
            ibIconSrc={"assets/chevron-forward-circle-outline.svg"}
            dbTitle={"Previous page"}
            ibTitle={"Next page"}
            dbCallback={ () => this.changePage(true) }
            ibCallback={ () => this.changePage(false) }
            prompt={"Page Nr"}
            minValue={1}
            maxValue={tp}
            step={1}
            leftSeparator={true}
            className="pager"
            blurAndEnterHandler={ pn => {this.setCurrentPage(pn);} }
            currentValue={cp}
        >
          <canvas id="hiddenCanvasForPdfId" ref={this.hiddenCanvas} style={{display: 'none'}}></canvas>
        </ValueChooser>
    )
  }
}

export default PDFRenderer;