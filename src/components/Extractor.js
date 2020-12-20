import React from 'react';
import Button from './Button';
import Paper from './Paper';
// import './Extractor.css';

class Extractor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        items: [
          { value: "Reset zoom", id: "1" },
          { value: "Reset position", id: "2" },
          { value: "Clear info", id: "3" }
      ],
      info: { value: "", rows: "5", id: "4" },
      sih: null
    }
    this.pap = React.createRef();
    this.hiddenFileInput = React.createRef();
    this.updateInfo = this.updateInfo.bind(this);
    this.processFiles = this.processFiles.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
  }

  updateInfo(mess) {
    var sih = this.state.sih;
    if (sih != null) {
      sih(mess);
    }
  }

  loadImage(e) {
    e.preventDefault();
    this.hiddenFileInput.current.click();
  }
  
  processFiles(e) {
    if (e.target.files != null && e.target.files.length === 1) {
      this.pap.current.setState({file: e.target.files.item(0)});
      e.target.value = null;
    }
  }
  
  render() {
    return (
      <div className="main">
        <div className="toolbar shadow">
          <Button name="load" title={"Load image"} handleClick={ (e) => this.loadImage(e) }><img src="assets/image-outline.svg"></img></Button>
          <Button name="zin" title={"Zoom in"} handleClick={ () => this.pap.current.doZoom(true) }><img src="assets/add-circle-outline.svg"></img></Button>
          <Button name="zout" title={"Zoom out"} handleClick={ () => this.pap.current.doZoom(false) }><img src="assets/remove-circle-outline.svg"></img></Button>
          <Button name="clear" title={"Clear canvas"} handleClick={ () => this.pap.current.clearCanvas() }><img src="assets/close-circle-outline.svg"></img></Button>
          <Button name="crop" title={"Crop image"} handleClick={ () => this.pap.current.cropImage() }><img src="assets/scan-outline.svg"></img></Button>
        </div>
        <div className="sand shadow">
            <Paper ref={this.pap}/> 
        </div>
        <input ref={this.hiddenFileInput} type="file" style={{display: 'none'}} onChange={this.processFiles}/>
      </div>
    )
  }
}

export default Extractor;