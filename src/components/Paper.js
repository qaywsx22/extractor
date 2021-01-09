import React from 'react';
import {fabric} from 'fabric';
// import './Paper.css';

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function addPoint(evt, peer) {
  var curZoom = peer.paper.getZoom();
  var pointOption = {
    id: new Date().getTime(),
    radius: 5,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5,
    left: evt.e.layerX / curZoom,
    top: evt.e.layerY / curZoom,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    objectCaching: false,
  };
  var linePoints = [
    evt.e.layerX / curZoom,
    evt.e.layerY / curZoom,
    evt.e.layerX / curZoom,
    evt.e.layerY / curZoom,
  ];
  var lineOption = {
    strokeWidth: 2,
    fill: '#999999',
    stroke: '#999999',
    originX: 'center',
    originY: 'center',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false,
  };

  var point = new fabric.Circle(pointOption);

  if (peer.pointArray.length === 0) {
    peer.newFlag = true;
    // fill first point with red color
    point.set({
      fill: 'red'
    });
  }

  var line = new fabric.Line(linePoints, lineOption);
  line.class = 'line';
  
  var polygon = null;

  if (peer.mask != null) {
    var pos = peer.paper.getPointer(evt.e);
    var points = peer.mask.get('points');
    points.push({
      x: pos.x,
      y: pos.y
    });
    polygon = new fabric.Polygon(points, {
      stroke: '#333333',
      strokeWidth: 1,
      fill: '#cccccc',
      opacity: 0.3,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      objectCaching: false,
    });
    peer.paper.remove(peer.mask);
    peer.paper.add(polygon);
    peer.mask = polygon;
    peer.paper.renderAll();
  } 
  else {
    var polyPoint = [{
      x: evt.e.layerX / curZoom,
      y: evt.e.layerY / curZoom,
    }, ];
    polygon = new fabric.Polygon(polyPoint, {
      stroke: '#333333',
      strokeWidth: 1,
      fill: '#cccccc',
      opacity: 0.3,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      objectCaching: false,
    });
    peer.mask = polygon;
    peer.paper.add(polygon);
  }

  peer.activeLine = line;
  peer.pointArray.push(point);
  peer.lineArray.push(line);

  peer.paper.add(line);
  peer.paper.add(point);
}

function generatePolygon(peer) {
  var points = [];
  // collect points and remove them from canvas
  for (var point of peer.pointArray) {
    points.push({
      x: point.left,
      y: point.top,
    });
    peer.paper.remove(point);
  }

  // remove lines from canvas
  for (var line of peer.lineArray) {
    peer.paper.remove(line);
  }

  // remove selected Shape and Line 
  peer.paper.remove(peer.mask).remove(peer.activeLine);

  // create polygon from collected points
  var polygon = new fabric.Polygon(points, {
    id: "mask",
    objectCaching: false,
    moveable: false,
    selectable: true,
    fill: "rgba(255,255,0,0.2)",
    stroke: 'red',
    strokeDashArray: [8, 8],
    strokeWidth: 2,
    opacity: 1.0
});
  peer.paper.add(polygon);
  peer.mask = polygon;

  toggleDrawPolygon(peer);
  resizePolygon(peer);
}

function toggleDrawPolygon(peer) {
  if (peer.newFlag) {
    // stop draw mode
    peer.activeLine = null;
    peer.lineArray = [];
    peer.pointArray = [];
    peer.newFlag = false;
  } else {
    // start draw mode
    peer.newFlag = true;
  }
}

function editPolygon(peer) {
  var activeObject = peer.paper.getActiveObject();
  if (!activeObject) {
    peer.paper.setActiveObject(peer.mask);
    activeObject = peer.mask;
  }

  activeObject.edit = true;
  activeObject.objectCaching = false;

  var lastControl = activeObject.points.length - 1;
  activeObject.cornerStyle = 'circle';
  activeObject.controls = activeObject.points.reduce((acc, point, index) => {
    acc['p' + index] = new fabric.Control({
      positionHandler: polygonPositionHandler,
      actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
      actionName: 'modifyPolygon',
      pointIndex: index,
    });
    return acc;
  }, {});

  activeObject.hasBorders = false;

  peer.paper.requestRenderAll();
}

function polygonPositionHandler(dim, finalMatrix, fabricObject) {
  var transformPoint = {
    x: fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x,
    y: fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y,
  };
  return fabric.util.transformPoint(transformPoint, fabricObject.calcTransformMatrix());
}

function actionHandler(eventData, transform, x, y) {
  var polygon = transform.target;
  var currentControl = polygon.controls[polygon.__corner];
  var mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center');
  var size = polygon._getTransformedDimensions(0, 0);
  var finalPointPosition = {
    x: (mouseLocalPosition.x * polygon.width) / size.x + polygon.pathOffset.x,
    y: (mouseLocalPosition.y * polygon.height) / size.y + polygon.pathOffset.y,
  };
  polygon.points[currentControl.pointIndex] = finalPointPosition;
  return true;
}

function anchorWrapper(anchorIndex, fn) {
  return function(eventData, transform, x, y) {
    var fabricObject = transform.target;
    var point = {
      x: fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
      y: fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y,
    };

    // update the transform border
    fabricObject._setPositionDimensions({});

    // Now newX and newY represent the point position with a range from
    // -0.5 to 0.5 for X and Y.
    var newX = point.x / fabricObject.width;
    var newY = point.y / fabricObject.height;

    // Fabric supports numeric origins for objects with a range from 0 to 1.
    // This let us use the relative position as an origin to translate the old absolutePoint.
    var absolutePoint = fabric.util.transformPoint(point, fabricObject.calcTransformMatrix());
    fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);

    // action performed
    return fn(eventData, transform, x, y);
  };
}

function resizePolygon(peer) {
  var activeObject = peer.paper.getActiveObject();
  if (!activeObject) {
    peer.paper.setActiveObject(peer.mask);
    activeObject = peer.mask;
  }

  activeObject.edit = false;
  activeObject.objectCaching = false;
  activeObject.controls = fabric.Object.prototype.controls;
  activeObject.cornerStyle = 'rect';
  activeObject.cornerColor = 'red';
  activeObject.transparentCorners = true;
  activeObject.borderColor = 'red';
  activeObject.hasBorders = true;

  peer.paper.requestRenderAll();
}


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
    this.loadResultSVGImage = this.loadResultSVGImage.bind(this);
    this.loadCropedImage = this.loadCropedImage.bind(this);
    this.cancelMask = this.cancelMask.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.removeOldImage = this.removeOldImage.bind(this);
    this.toggleSelectionMode = this.toggleSelectionMode.bind(this);
    this.polyModeMouseDown = this.polyModeMouseDown.bind(this);
    this.rectModeMouseDown = this.rectModeMouseDown.bind(this);

    this.wrapper = React.createRef();
    this.paperId = React.createRef();

    this.pathSelection = false;
    this.activeLine = null;
    this.lineArray = [];
    this.pointArray = [];
    this.crBlob = null;
    this.crImgUrl = null;
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

  toggleSelectionMode() {
    if (this.pathSelection) {
      this.pathSelection = false;
    }
    else {
      this.pathSelection = true;
    }
    this.cancelMask();
    if (!this.pathSelection && this.paper != null) {
      var locPaper = this.paper;
      var items = this.paper.getObjects();
      if (items != null) {
        items = items.reverse();
        items.forEach(function(item){
          if ("target" !== item.id && "croped" !== item.id) {
            locPaper.remove(item);
          }
        });
      }
      this.paper.requestRenderAll();
    }
  }  

  onMouseWheel(opt) {
    var pt = this.paper.getPointer(opt);
    var point = new fabric.Point(pt.x, pt.y);
    this.props.onMouseWheelZoom(opt.e.deltaY < 0, point);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  onMouseDblclick(evt) {
    if (evt.e.ctrlKey || !this.pathSelection) {
      return;
    }
    if (!this.newFlag && this.mask != null) {
      var obj = this.paper.findTarget(evt);
      if (obj != null && obj === this.mask) {
        editPolygon(this);
      }
    }
  }

  onSelectionCleared(evt) {
    if (!this.pathSelection) {
      return;
    }
    if (!this.newFlag && this.mask != null) {
      if (evt.deselected && evt.deselected.length > 0) {
        evt.deselected.forEach((item) => {
          if (item.id === "mask") {
            item.edit = false;
          }
        });
      }
    }
  }

  onSelectionCreated(evt) {
    if (!this.pathSelection) {
      return;
    }
    if (!this.newFlag && this.mask != null) {
      if (evt.selected && evt.selected.length ===1 && evt.selected[0].id === "mask") {
        resizePolygon(this);
      }
    }
  }

  onMouseDown(evt) {
    if (evt.e.type.startsWith("touch")) {
      return;
    }
    this.mdp = {x:evt.e.screenX, y:evt.e.screenY};
    if (evt.e.ctrlKey) {
      return;
    }
    if (this.pathSelection) {
      this.polyModeMouseDown(evt, this);
    }
    else {
      this.rectModeMouseDown(evt);
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
      if (this.pathSelection) {
        this.polyModeMouseUp(evt, this);
      }
      else if (this.mask != null) {
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
        this.newFlag = false;
      }
    }
    this.moveFlag = false;
    this.startPos = null;
    this.mdp = null;
  }

  onMouseMove(evt) {
    if (evt.e.type.startsWith("touch")) {
      return;
    }
    if (evt.e.ctrlKey) {
      this.updateViewBoxPosition(evt);
      return;
    }
    if (this.pathSelection) {
      this.polyModeMouseMove(evt, this);
    }
    else {
      this.rectModeMouseMove(evt);
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
      if (this.pathSelection && this.paper != null) {
        var locPaper = this.paper;
        var items = this.paper.getObjects();
        if (items != null) {
          items = items.reverse();
          items.forEach(function(item){
            if ("target" !== item.id && "croped" !== item.id) {
              locPaper.remove(item);
            }
          });
        }
        this.paper.requestRenderAll();
      }
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
    this.pointArray = [];
    this.lineArray = [];
    this.activeLine = null;
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
    this.pointArray = [];
    this.lineArray = [];
    this.activeLine = null;
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
    // this.crBlob = null
    // this.crImgUrl = null;
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
        target.dirty = true;
        // target.clipPath = mask;
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
        var crBlob = b64toBlob(cloned.split(",")[1], "image/png");
        this.crBlob = crBlob;
        this.crImgUrl = cloned;
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
 
  loadResultSVGImage(svgString) {
    this.clearCanvas();        
    fabric.loadSVGFromString(svgString, this.loadSVGImage, null, {crossOrigin: 'anonymous'});  
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

  polyModeMouseDown(o, peer) {
    if (!peer.newFlag && peer.mask != null) {
      // var obj = peer.paper.findTarget(o);
      // if (obj != null && obj === peer.mask) {
      // }
      return;
    }
    if (peer.mask != null && o.target && o.target.id === this.pointArray[0].id) {
      // when click on the first point
      generatePolygon(peer);
    } else {
      addPoint(o, peer);
    }
  }
  
  polyModeMouseMove(o, peer) {
    if (peer.newFlag) {
      if (peer.activeLine && peer.activeLine.class === 'line') {
        var pointer = peer.paper.getPointer(o.e); /// ???????
        peer.activeLine.set({
          x2: pointer.x,
          y2: pointer.y
        });
        var points = peer.mask.get('points');
        points[peer.pointArray.length] = {
          x: pointer.x,
          y: pointer.y,
        };
        peer.mask.set({
          points
        });
      }
      peer.paper.renderAll();
    }
  }

  polyModeMouseUp(o, peer) {
  }

  rectModeMouseDown(evt) {
    if (this.pathSelection) {
      return;
    }
    this.startPos = this.paper.getPointer(evt);
    if (this.mask == null) {
      var rectMaskOptions = {
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
      };
      this.newFlag = true;
      this.mask = new fabric.Rect(rectMaskOptions);
      this.paper.add(this.mask);
      this.mask.setControlVisible("mtr", false);
      this.paper.requestRenderAll();
    }
  }

  rectModeMouseMove(evt) {
    if (this.pathSelection) {
      return;
    }
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

  rectModeMouseUp(evt) {
    if (this.pathSelection) {
      return;
    }
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
    this.moveFlag = false;
    this.newFlag = false;
    this.startPos = null;
    this.mdp = null;
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
    this.paper.on('mouse:dblclick', this.onMouseDblclick.bind(this));
    this.paper.on('selection:cleared', this.onSelectionCleared.bind(this));
    this.paper.on('selection:created', this.onSelectionCreated.bind(this));
    
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