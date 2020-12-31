import React from 'react';
import {fabric} from 'fabric';
// import './Paper.css';

class Paper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
          file: null
    }   
    this.updateViewBoxPosition = this.updateViewBoxPosition.bind(this);
    this.setZoom = this.setZoom.bind(this);
    this.resetPosition = this.resetPosition.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.loadRasterImage = this.loadRasterImage.bind(this);
    this.loadSVGImage = this.loadSVGImage.bind(this);
    this.loadCropedImage = this.loadCropedImage.bind(this);
    this.cancelMask = this.cancelMask.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.removeOldImage = this.removeOldImage.bind(this);

    this.wrapper = React.createRef();
    this.paperId = React.createRef();

    this.paper = null;
    this.mask = null;
    this.startPos = null;
    this.moveFlag = false;
    this.newFlag = false;
    this.mdp = null;
    this.pausePanning = false;
    this.allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    this.imageOptions = {
      hasControls: false,
      hasBorders: false,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockScewingX: true,
      lockScewingY: true,
      lockRotation: true,
      selectable: false,
      hoverCursor: 'default'
    };
}

  onMouseWheel(opt) {
    var pt = this.paper.getPointer(opt);
    var point = new fabric.Point(pt.x, pt.y);
    this.props.onMouseWheelZoom(opt.e.deltaY < 0, point);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  onMouseDown(evt) {
    if (evt.e.type.startsWith("touch")) {
      return;
    }
    this.mdp = {x:evt.e.screenX, y:evt.e.screenY};
    if (!evt.e.ctrlKey) {
      this.startPos = this.paper.getPointer(evt);
      if (this.mask == null) {
        this.mask = new fabric.Rect({
          fill: "rgba(255,255,0,0.2)",
          stroke: 'red',
          strokeDashArray: [8, 8],
          "stroke-width": 2,
          opacity: 1.0,
          left: this.startPos.x,
          top: this.startPos.y,
          width: 0,
          height: 0,
          evented: true,
          selectable: true,
          // hasControls: false,
          lockScewingX: true,
          lockScewingY: true,
          lockRotation: true,
          selectionBorderColor: 'red',
          transparentCorners: true,
          cornerColor: 'red',
          cornerStrokeColor: 'red',
          // borderColor: 'red',
          // borderDashArray: [3, 3],
          // padding: 10,
          hasBorder: false,
          id: "mask"
        });
        this.paper.add(this.mask);
        this.mask.setControlVisible("mtr", false);
        this.paper.requestRenderAll();
        this.newFlag = true;
      }
    }
  }

  onMouseUp(evt) {
    if (evt.e.type.startsWith("touch")) {
      return;
    }
    if (evt.e.ctrlKey) {
      this.updateViewBoxPosition(evt);
    }
    else {
      if (this.mask != null) {
        if (this.moveFlag) {
          var endPos = this.paper.getPointer(evt);
          this.mask.set({
            width: Math.abs(endPos.x - this.startPos.x),
            height: Math.abs(endPos.y - this.startPos.y)
          });
          var o = {
            left: this.startPos.x,
            top: this.startPos.y
          };
          if (endPos.x < this.startPos.x) {
            o.left = endPos.x;
          }
          if (endPos.y < this.startPos.y) {
            o.top = endPos.y;
          }
          this.mask.setCoords(o);
          this.paper.setActiveObject(this.mask);
          this.paper.requestRenderAll();
        }
        else if (this.newFlag) {
          this.paper.remove(this.mask);
          this.mask = null;
        }
      }
    }
    this.moveFlag = false;
    this.newFlag = false;
    this.startPos = null;
    this.mdp = null;
  }

  onMouseMove(evt) {
    if (evt.e.type.startsWith("touch")) {
      return;
    }
    if (evt.e.ctrlKey) {
      this.updateViewBoxPosition(evt);
    }
    else {
      if (this.mask != null && this.startPos != null && this.newFlag) {
        var pos = this.paper.getPointer(evt);
        var w = pos.x - this.startPos.x;
        var h = pos.y - this.startPos.y;
        this.mask.set({
          width: w,
          height: h
        });
        this.paper.requestRenderAll();
        this.moveFlag = true;
      }
    }
  }

  onWindowResize(evt) {
    this.paper.setWidth(this.wrapper.current.offsetWidth);
    this.paper.setHeight(this.wrapper.current.offsetHeight);
    this.paper.renderAll();
  }

  updateViewBoxPosition(evt) {
    if (evt.e.type.startsWith("touch")) {
      return;
    }
    if (this.mdp != null) {
      var deltaX = evt.e.screenX - this.mdp.x;
      var deltaY = evt.e.screenY - this.mdp.y;
      this.mdp = {x:evt.e.screenX, y:evt.e.screenY};
      var delta = new fabric.Point(deltaX, deltaY);
      this.paper.relativePan(delta);
    }
  }

  setZoom(val, point) {
    var pt = point;
    if (pt == null) {
      pt = this.paper.getVpCenter();
    }
    this.paper.zoomToPoint(pt, val);
  }

  // reset viewport position to 0,0
  resetPosition() {
    this.paper.absolutePan(new fabric.Point(0, 0));
  }

  onKeyDown(e) {
    if (e.keyCode === 27) { // ESC
      this.cancelMask(e);
    }
  }

  cancelMask(e) {
    this.moveFlag = false;
    this.newFlag = false;
    this.startPos = null;
    if (this.mask != null) {
      this.paper.remove(this.mask);
      this.mask = null;
    }
    this.paper.requestRenderAll();
  }

  removeOldImage() {
    if (this.props.resetZoom != null) {
      this.props.resetZoom();
    }
    this.resetPosition();
    this.moveFlag = false;
    this.newFlag = false;
    this.mask = null;
    if (this.paper != null) {
      var locPaper = this.paper;
      var items = this.paper.getObjects();
      if (items != null) {
        items = items.reverse();
        items.forEach(function(item){
          locPaper.remove(item);
        });
      }
      this.paper.clear();
      this.paper.requestRenderAll();
    }
  }

  clearCanvas() {
    this.removeOldImage();
    this.setState({file: null});
  }

  cropImage() {
    if (this.paper != null) {
      var items = this.paper.getObjects();
      if (items != null && this.mask != null) {
        var target = items[0];
        var mask = this.mask;
        var tco = target.getCoords();
        var mco = mask.getCoords();
        var left = tco[0].x;
        if (mco[0].x > left) {
          left = mco[0].x;
        }
        var top = tco[0].y;
        if (mco[0].y > top) {
          top = mco[0].y;
        }
        var bottom = tco[2].y;
        if (mco[2].y < bottom) {
          bottom = mco[2].y;
        }
        var right = tco[1].x;
        if (mco[1].x < right) {
          right = mco[1].x;
        }
        var zoomF = this.paper.getZoom();
        var cropX = (left - tco[0].x) / (target.scaleX * zoomF);
        var cropY = (top - tco[0].y) / (target.scaleY * zoomF);
        var width = (right - left) / (target.scaleX * zoomF);
        var height = (bottom - top) / (target.scaleY * zoomF);
        target.dirty=true;
        this.paper.remove(mask);

        this.paper.renderAll();

        var optObj = {
          left:cropX, 
          top:cropY, 
          width:width, 
          height:height, 
          withoutTransform: true, 
          withoutShadow: true
        };
        var cloned = target.toDataURL(optObj);
        fabric.Image.fromURL(cloned, this.loadCropedImage);
      }
    }
  }

  loadCropedImage(img) {
    this.clearCanvas();        
    img.set(this.imageOptions);
    img.set({id:"croped"});
    if (img.height > img.width) {
      img.scaleToHeight(this.paper.getHeight());
    }
    else {
      img.scaleToWidth(this.paper.getWidth());
    }
    this.paper.add(img);
    img.center().setCoords();

    this.paper.requestRenderAll();
    this.paper.fire('object:modified');
    // hide shield
    if (this.props.shieldHandler != null) {
      this.props.shieldHandler(false);
    }
  }  

  loadSVGImage(objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);
    obj.set(this.imageOptions);
    this.paper.add(obj);
    obj.center().setCoords();

    this.paper.renderAll()
    this.paper.fire('object:modified')
    // hide shield
    if (this.props.shieldHandler != null) {
      this.props.shieldHandler(false);
    }
  }
  
  loadRasterImage(img) {
    img.set(this.imageOptions);
    img.set({id:"target"});
    if (img.height > img.width) {
      img.scaleToHeight(this.paper.getHeight());
    }
    else {
      img.scaleToWidth(this.paper.getWidth());
    }
    this.paper.add(img);
    img.center().setCoords();

    this.paper.renderAll();
    this.paper.fire('object:modified');
    // hide shield
    if (this.props.shieldHandler != null) {
      this.props.shieldHandler(false);
    }
  }

  initCanvas() {
    this.paper.selection = false;
    if (this.props.onMouseWheelZoom != null) {
      this.paper.on('mouse:wheel', this.onMouseWheel.bind(this));
    }
    this.paper.on('mouse:down', this.onMouseDown.bind(this));
    this.paper.on('mouse:up', this.onMouseUp.bind(this));
    this.paper.on('mouse:move', this.onMouseMove.bind(this));
    this.paper.on('mouse:move', this.onMouseMove.bind(this));
    window.addEventListener("resize", this.onWindowResize.bind(this)); 
  }

  componentDidMount() {
    this.paper = new fabric.Canvas(this.paperId.current.id, {
      height: this.wrapper.current.offsetHeight,
      width: this.wrapper.current.offsetWidth
    });
    this.wrapper.current.tabIndex = 1;
    this.wrapper.current.addEventListener("keydown", this.onKeyDown, true);
    this.initCanvas();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.zoom !== this.paper.getZoom()) {
      this.setZoom(this.props.zoom, this.props.point);
    }
    if (this.state.file === null) {
        return;
    }
    var file = this.state.file;
    this.clearCanvas();
    // check type
    if (this.allowedTypes.includes(file.type)) {
      var reader = new FileReader();
      var callback = null;

      // handle svg
      if (file.type === 'image/svg+xml') {
        callback = this.loadSVGImage;
        reader.onload = function(f) {
          fabric.loadSVGFromString(f.target.result, callback, null, {crossOrigin: 'anonymous'});
        }
        reader.readAsText(file);
        return;
      }

      // handle image, read file, add to canvas
      callback = this.loadRasterImage;
      reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, callback);
      }
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
    <div className="main">
      <div className="canvasWrapper" ref={this.wrapper}>
        <canvas id="canvasElementId" className="paper" ref={this.paperId}></canvas>
      </div>
    </div>
    )
  }
}

export default Paper;