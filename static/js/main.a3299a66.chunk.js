(this.webpackJsonpextractor=this.webpackJsonpextractor||[]).push([[0],{38:function(e,t){},39:function(e,t){},40:function(e,t){},53:function(e,t){},54:function(e,t){},55:function(e,t){},56:function(e,t){},57:function(e,t){},60:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var i=a(0),s=a(2),n=a.n(s),r=a(28),o=a.n(r),l=a(5),c=a(6),u=a(1),h=a(8),p=a(7),d=a(4),v=a.n(d),m=n.a.forwardRef((function(e,t){return Object(i.jsx)("button",{ref:t,onClick:e.handleClick,title:e.title,className:e.className,disabled:!0===e.disabled,children:e.children})})),f=a(13),g=a(3);function b(e,t,a){t=t||"",a=a||512;for(var i=atob(e),s=[],n=0;n<i.length;n+=a){for(var r=i.slice(n,n+a),o=new Array(r.length),l=0;l<r.length;l++)o[l]=r.charCodeAt(l);var c=new Uint8Array(o);s.push(c)}return new Blob(s,{type:t})}function y(e,t,a){var i=a.points[this.pointIndex].x-a.pathOffset.x,s=a.points[this.pointIndex].y-a.pathOffset.y;return g.fabric.util.transformPoint({x:i,y:s},g.fabric.util.multiplyTransformMatrices(a.canvas.viewportTransform,a.calcTransformMatrix()))}function j(e,t,a,i){var s=t.target,n=s.controls[s.__corner],r=s.toLocalPoint(new g.fabric.Point(a,i),"center","center"),o=s._getNonTransformedDimensions(),l=s._getTransformedDimensions(0,0),c={x:r.x*o.x/l.x+s.pathOffset.x,y:r.y*o.y/l.y+s.pathOffset.y};return s.points[n.pointIndex]=c,!0}function k(e){var t=e.paper.getActiveObject();t||(e.paper.setActiveObject(e.mask),t=e.mask),t.edit=!1,t.objectCaching=!1,t.controls=g.fabric.Object.prototype.controls,t.cornerStyle="rect",t.cornerColor="red",t.transparentCorners=!0,t.borderColor="red",t.hasBorders=!0,e.paper.requestRenderAll()}var O=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).state={file:null},i.updateViewBoxPosition=i.updateViewBoxPosition.bind(Object(u.a)(i)),i.setZoom=i.setZoom.bind(Object(u.a)(i)),i.resetPosition=i.resetPosition.bind(Object(u.a)(i)),i.clearCanvas=i.clearCanvas.bind(Object(u.a)(i)),i.cropImage=i.cropImage.bind(Object(u.a)(i)),i.loadRasterImage=i.loadRasterImage.bind(Object(u.a)(i)),i.loadSVGImage=i.loadSVGImage.bind(Object(u.a)(i)),i.loadResultSVGImage=i.loadResultSVGImage.bind(Object(u.a)(i)),i.loadCropedImage=i.loadCropedImage.bind(Object(u.a)(i)),i.cancelMask=i.cancelMask.bind(Object(u.a)(i)),i.onKeyDown=i.onKeyDown.bind(Object(u.a)(i)),i.removeOldImage=i.removeOldImage.bind(Object(u.a)(i)),i.toggleSelectionMode=i.toggleSelectionMode.bind(Object(u.a)(i)),i.polyModeMouseDown=i.polyModeMouseDown.bind(Object(u.a)(i)),i.rectModeMouseDown=i.rectModeMouseDown.bind(Object(u.a)(i)),i.isCropEnabled=i.isCropEnabled.bind(Object(u.a)(i)),i.removeProcessedImages=i.removeProcessedImages.bind(Object(u.a)(i)),i.wrapper=n.a.createRef(),i.paperId=n.a.createRef(),i.pathSelection=!1,i.activeLine=null,i.lineArray=[],i.pointArray=[],i.crBlob=null,i.crImgUrl=null,i.paper=null,i.mask=null,i.startPos=null,i.moveFlag=!1,i.newFlag=!1,i.mdp=null,i.pausePanning=!1,i.allowedTypes=["image/jpeg","image/png","image/svg+xml"],i.imageOptions={hasControls:!1,hasBorders:!1,lockMovementX:!0,lockMovementY:!0,lockScalingX:!0,lockScalingY:!0,lockScewingX:!0,lockScewingY:!0,lockRotation:!0,selectable:!1,hoverCursor:"default"},i}return Object(c.a)(a,[{key:"toggleSelectionMode",value:function(){if(this.pathSelection?this.pathSelection=!1:this.pathSelection=!0,this.cancelMask(),!this.pathSelection&&null!=this.paper){var e=this.paper,t=this.paper.getObjects();null!=t&&(t=t.reverse()).forEach((function(t){"target"!==t.id&&"croped"!==t.id&&"result"!==t.id&&e.remove(t)})),this.paper.requestRenderAll()}}},{key:"onMouseWheel",value:function(e){var t=this.paper.getPointer(e),a=new g.fabric.Point(t.x,t.y);this.props.onMouseWheelZoom(e.e.deltaY<0,a),e.e.preventDefault(),e.e.stopPropagation()}},{key:"onMouseDblclick",value:function(e){if(!e.e.ctrlKey&&this.pathSelection&&!this.newFlag&&null!=this.mask){var t=this.paper.findTarget(e);null!=t&&t===this.mask&&function(e){var t=e.paper.getActiveObject();t||(e.paper.setActiveObject(e.mask),t=e.mask),t.edit=!0,t.objectCaching=!1;var a=t.points.length-1;t.cornerStyle="circle",t.controls=t.points.reduce((function(e,t,i){var s,n;return e["p"+i]=new g.fabric.Control({positionHandler:y,actionHandler:(s=i>0?i-1:a,n=j,function(e,t,a,i){var r=t.target,o=g.fabric.util.transformPoint({x:r.points[s].x-r.pathOffset.x,y:r.points[s].y-r.pathOffset.y},r.calcTransformMatrix()),l=n(e,t,a,i);r._setPositionDimensions({});var c=r._getNonTransformedDimensions(),u=(r.points[s].x-r.pathOffset.x)/c.x,h=(r.points[s].y-r.pathOffset.y)/c.y;return r.setPositionByOrigin(o,u+.5,h+.5),l}),actionName:"modifyPolygon",pointIndex:i}),e}),{}),t.hasBorders=!1,e.paper.requestRenderAll()}(this)}}},{key:"onSelectionCleared",value:function(e){this.pathSelection&&(this.newFlag||null==this.mask||e.deselected&&e.deselected.length>0&&e.deselected.forEach((function(e){"mask"===e.id&&"polygon"===e.type&&(e.edit=!1,e.controls=g.fabric.Object.prototype.controls)})))}},{key:"onSelectionCreated",value:function(e){this.pathSelection&&(this.newFlag||null==this.mask||e.selected&&1===e.selected.length&&"mask"===e.selected[0].id&&k(this))}},{key:"onMouseDown",value:function(e){e.e.type.startsWith("touch")||(this.mdp={x:e.e.screenX,y:e.e.screenY},e.e.ctrlKey||(this.pathSelection?this.polyModeMouseDown(e,this):this.rectModeMouseDown(e)))}},{key:"onMouseUp",value:function(e){if(!e.e.type.startsWith("touch")){if(e.e.ctrlKey)this.updateViewBoxPosition(e);else if(this.pathSelection)this.polyModeMouseUp(e,this);else if(null!=this.mask){if(this.moveFlag){var t=this.paper.getPointer(e);this.mask.set({width:Math.abs(t.x-this.startPos.x),height:Math.abs(t.y-this.startPos.y)});var a={left:this.startPos.x,top:this.startPos.y};t.x<this.startPos.x&&(a.left=t.x),t.y<this.startPos.y&&(a.top=t.y),this.mask.setCoords(a),this.paper.setActiveObject(this.mask),this.paper.requestRenderAll()}else this.newFlag&&(this.paper.remove(this.mask),this.mask=null);this.newFlag=!1}this.moveFlag=!1,this.startPos=null,this.mdp=null}}},{key:"onMouseMove",value:function(e){e.e.type.startsWith("touch")||(e.e.ctrlKey?this.updateViewBoxPosition(e):this.pathSelection?this.polyModeMouseMove(e,this):this.rectModeMouseMove(e))}},{key:"onWindowResize",value:function(e){this.paper.setWidth(this.wrapper.current.offsetWidth),this.paper.setHeight(this.wrapper.current.offsetHeight),this.paper.renderAll()}},{key:"updateViewBoxPosition",value:function(e){if(!e.e.type.startsWith("touch")&&null!=this.mdp){var t=e.e.screenX-this.mdp.x,a=e.e.screenY-this.mdp.y;this.mdp={x:e.e.screenX,y:e.e.screenY};var i=new g.fabric.Point(t,a);this.paper.relativePan(i)}}},{key:"setZoom",value:function(e,t){var a=t;null==a&&(a=this.paper.getVpCenter()),this.paper.zoomToPoint(a,e)}},{key:"resetPosition",value:function(){this.paper.absolutePan(new g.fabric.Point(0,0))}},{key:"onKeyDown",value:function(e){if(27===e.keyCode&&(this.cancelMask(e),this.pathSelection&&null!=this.paper)){var t=this.paper,a=this.paper.getObjects();null!=a&&(a=a.reverse()).forEach((function(e){"target"!==e.id&&"croped"!==e.id&&"result"!==e.id&&t.remove(e)})),this.paper.requestRenderAll()}}},{key:"cancelMask",value:function(e){this.moveFlag=!1,this.newFlag=!1,this.startPos=null,null!=this.mask&&(this.paper.remove(this.mask),this.mask=null),this.pointArray=[],this.lineArray=[],this.activeLine=null,this.paper.requestRenderAll()}},{key:"removeOldImage",value:function(){if(null!=this.props.resetZoom&&this.props.resetZoom(),this.resetPosition(),this.moveFlag=!1,this.newFlag=!1,this.mask=null,this.pointArray=[],this.lineArray=[],this.activeLine=null,null!=this.paper){var e=this.paper,t=this.paper.getObjects();null!=t&&(t=t.reverse()).forEach((function(t){e.remove(t)})),this.paper.clear(),this.paper.requestRenderAll()}}},{key:"removeProcessedImages",value:function(){if(this.crBlob=null,this.crImgUrl=null,null!=this.paper){var e=this.paper,t=this.paper.getObjects();null!=t&&(t=t.reverse()).forEach((function(t){"target"!==t.id&&e.remove(t)})),this.paper.requestRenderAll()}}},{key:"clearCanvas",value:function(){this.removeOldImage(),this.setState({file:null}),null!=this.props.cropButtonStateHandler&&this.props.cropButtonStateHandler()}},{key:"cropImage",value:function(){if(null!=this.paper){this.paper.discardActiveObject(),this.setZoom(1),this.resetPosition();var e=null,t=this.paper.getObjects();if(null!=t&&t.forEach((function(t){if(null!=t&&("target"===t.id||"croped"===t.id))return e=t,!1})),null!=e){var a=this.paper.getZoom(),i=e.getCoords(),s=i[0].x,n=i[1].x,r=i[0].y,o=i[2].y,l=0,c=0,u=e.width,h=e.height,p=this.mask;if(null!=p){var d=p.getCoords();d[0].x>s&&(s=d[0].x),d[0].y>r&&(r=d[0].y),d[2].y<o&&(o=d[2].y),d[1].x<n&&(n=d[1].x),l=(s-i[0].x)/(e.scaleX*a),c=(r-i[0].y)/(e.scaleY*a),u=(n-s)/(e.scaleX*a),h=(o-r)/(e.scaleY*a),e.dirty=!0,e.clipPath=p;var v=p.getCenterPoint(),m=e.getCenterPoint();this.paper.remove(p),p.originX="center",p.originY="center",p.left=-(m.x-v.x)/e.scaleX,p.top=-(m.y-v.y)/e.scaleY,p.scaleX=1*a/e.scaleX,p.scaleY=1*a/e.scaleY,p.setCoords(),p.dirty=!0,this.paper.renderAll()}var f={left:l,top:c,width:u,height:h,withoutTransform:!0,withoutShadow:!0},y=e.toDataURL(f),j=b(y.split(",")[1],"image/png");this.crBlob=j,this.crImgUrl=y,null!=this.props.vectButtonStateHandler&&this.props.vectButtonStateHandler(),g.fabric.Image.fromURL(y,this.loadCropedImage)}null!=this.props.resetZoom&&this.props.resetZoom()}}},{key:"loadCropedImage",value:function(e){this.clearCanvas(),e.set(this.imageOptions),e.set({id:"croped"}),e.height>e.width?e.scaleToHeight(this.paper.getHeight()):e.scaleToWidth(this.paper.getWidth()),this.paper.add(e),e.center().setCoords(),this.paper.requestRenderAll(),this.paper.fire("object:modified"),null!=this.props.cropButtonStateHandler&&this.props.cropButtonStateHandler(),null!=this.props.shieldHandler&&this.props.shieldHandler(!1)}},{key:"loadResultSVGImage",value:function(e){this.clearCanvas(),g.fabric.loadSVGFromString(e,this.loadSVGImage,null,{crossOrigin:"anonymous",id:"result"})}},{key:"loadSVGImage",value:function(e,t){var a=g.fabric.util.groupSVGElements(e,t);a.set(this.imageOptions),this.paper.add(a),a.center().setCoords(),a.set({id:t.id}),this.paper.renderAll(),this.paper.fire("object:modified"),null!=this.props.shieldHandler&&this.props.shieldHandler(!1)}},{key:"loadRasterImage",value:function(e){e.set(this.imageOptions),e.set({id:"target"});var t=this.paper.getWidth(),a=this.paper.getHeight();e.height>e.width?e.scaleToHeight(a):e.width===e.height&&t>a?e.scaleToWidth(a):e.scaleToWidth(t),this.paper.add(e),e.center().setCoords(),this.paper.renderAll(),this.paper.fire("object:modified");var i={left:0,top:0,width:e.width,height:e.height,withoutTransform:!0,withoutShadow:!0},s=e.toDataURL(i),n=b(s.split(",")[1],"image/png");this.crBlob=n,this.crImgUrl=s,null!=this.props.vectButtonStateHandler&&this.props.vectButtonStateHandler(),null!=this.props.cropButtonStateHandler&&this.props.cropButtonStateHandler(),null!=this.props.shieldHandler&&this.props.shieldHandler(!1)}},{key:"polyModeMouseDown",value:function(e,t){(t.newFlag||null==t.mask)&&(null!=t.mask&&e.target&&e.target.id===this.pointArray[0].id?function(e){var t,a=[],i=Object(f.a)(e.pointArray);try{for(i.s();!(t=i.n()).done;){var s=t.value;a.push({x:s.left,y:s.top}),e.paper.remove(s)}}catch(c){i.e(c)}finally{i.f()}var n,r=Object(f.a)(e.lineArray);try{for(r.s();!(n=r.n()).done;){var o=n.value;e.paper.remove(o)}}catch(c){r.e(c)}finally{r.f()}e.paper.remove(e.mask).remove(e.activeLine);var l=new g.fabric.Polygon(a,{id:"mask",objectCaching:!1,moveable:!1,selectable:!0,fill:"rgba(255,255,0,0.2)",stroke:"red",strokeDashArray:[8,8],strokeWidth:1,opacity:1});e.paper.add(l),e.mask=l,e.mask.setControlVisible("mtr",!1),function(e){e.newFlag?(e.activeLine=null,e.lineArray=[],e.pointArray=[],e.newFlag=!1):e.newFlag=!0}(e),k(e)}(t):function(e,t){var a=t.paper.getPointer(e),i={id:(new Date).getTime(),radius:5,fill:"#ffffff",stroke:"#333333",strokeWidth:.5,left:a.x,top:a.y,selectable:!1,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",objectCaching:!1},s=[a.x,a.y,a.x,a.y],n=new g.fabric.Circle(i);0===t.pointArray.length&&(t.newFlag=!0,n.set({fill:"red"}));var r=new g.fabric.Line(s,{strokeWidth:2,fill:"#999999",stroke:"#999999",originX:"center",originY:"center",selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1});r.class="line";var o=null;if(null!=t.mask){var l=t.mask.get("points");l.push({x:a.x,y:a.y}),o=new g.fabric.Polygon(l,{stroke:"#333333",strokeWidth:1,fill:"#cccccc",opacity:.3,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1}),t.paper.remove(t.mask),t.paper.add(o),t.mask=o,t.paper.renderAll()}else{var c=[{x:a.x,y:a.y}];o=new g.fabric.Polygon(c,{stroke:"#333333",strokeWidth:1,fill:"#cccccc",opacity:.3,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1}),t.mask=o,t.paper.add(o)}t.activeLine=r,t.pointArray.push(n),t.lineArray.push(r),t.paper.add(r),t.paper.add(n)}(e,t))}},{key:"polyModeMouseMove",value:function(e,t){if(t.newFlag){if(t.activeLine&&"line"===t.activeLine.class){var a=t.paper.getPointer(e);t.activeLine.set({x2:a.x,y2:a.y});var i=t.mask.get("points");i[t.pointArray.length]={x:a.x,y:a.y},t.mask.set({points:i})}t.paper.renderAll()}}},{key:"polyModeMouseUp",value:function(e,t){}},{key:"rectModeMouseDown",value:function(e){if(!this.pathSelection&&(this.startPos=this.paper.getPointer(e),null==this.mask)){var t={fill:"rgba(255,255,0,0.2)",stroke:"red",strokeDashArray:[8,8],"stroke-width":2,opacity:1,left:this.startPos.x,top:this.startPos.y,width:0,height:0,evented:!0,selectable:!0,lockScewingX:!0,lockScewingY:!0,lockRotation:!0,selectionBorderColor:"red",transparentCorners:!0,cornerColor:"red",cornerStrokeColor:"red",hasBorder:!1,id:"mask"};this.newFlag=!0,this.mask=new g.fabric.Rect(t),this.paper.add(this.mask),this.mask.setControlVisible("mtr",!1),this.paper.requestRenderAll()}}},{key:"rectModeMouseMove",value:function(e){if(!this.pathSelection&&null!=this.mask&&null!=this.startPos&&this.newFlag){var t=this.paper.getPointer(e),a=t.x-this.startPos.x,i=t.y-this.startPos.y;this.mask.set({width:a,height:i}),this.paper.requestRenderAll(),this.moveFlag=!0}}},{key:"rectModeMouseUp",value:function(e){if(!this.pathSelection){if(null!=this.mask)if(this.moveFlag){var t=this.paper.getPointer(e);this.mask.set({width:Math.abs(t.x-this.startPos.x),height:Math.abs(t.y-this.startPos.y)});var a={left:this.startPos.x,top:this.startPos.y};t.x<this.startPos.x&&(a.left=t.x),t.y<this.startPos.y&&(a.top=t.y),this.mask.setCoords(a),this.paper.setActiveObject(this.mask),this.paper.requestRenderAll()}else this.newFlag&&(this.paper.remove(this.mask),this.mask=null);this.moveFlag=!1,this.newFlag=!1,this.startPos=null,this.mdp=null}}},{key:"isCropEnabled",value:function(){if(null!=this.paper){var e=this.paper.getObjects();if(null!=e){var t=null;return e.forEach((function(e){if(null!=e&&("target"===e.id||"croped"===e.id))return t=e,!1})),null!=t}}return!1}},{key:"initCanvas",value:function(){this.paper.selection=!1,null!=this.props.onMouseWheelZoom&&this.paper.on("mouse:wheel",this.onMouseWheel.bind(this)),this.paper.on("mouse:down",this.onMouseDown.bind(this)),this.paper.on("mouse:up",this.onMouseUp.bind(this)),this.paper.on("mouse:move",this.onMouseMove.bind(this)),this.paper.on("mouse:move",this.onMouseMove.bind(this)),this.paper.on("mouse:dblclick",this.onMouseDblclick.bind(this)),this.paper.on("selection:cleared",this.onSelectionCleared.bind(this)),this.paper.on("selection:created",this.onSelectionCreated.bind(this)),window.addEventListener("resize",this.onWindowResize.bind(this))}},{key:"componentDidMount",value:function(){this.paper=new g.fabric.Canvas(this.paperId.current.id,{height:this.wrapper.current.offsetHeight,width:this.wrapper.current.offsetWidth}),this.wrapper.current.tabIndex=1,this.wrapper.current.addEventListener("keydown",this.onKeyDown,!0),this.initCanvas()}},{key:"componentDidUpdate",value:function(e,t){if(this.props.zoom!==this.paper.getZoom()&&this.setZoom(this.props.zoom,this.props.point),null!==this.state.file){var a=this.state.file;if(this.clearCanvas(),this.allowedTypes.includes(a.type)){var i=new FileReader,s=null;if("image/svg+xml"===a.type)return s=this.loadSVGImage,i.onload=function(e){g.fabric.loadSVGFromString(e.target.result,s,null,{crossOrigin:"anonymous",id:"target"})},void i.readAsText(a);s=this.loadRasterImage,i.onload=function(e){g.fabric.Image.fromURL(e.target.result,s)},i.readAsDataURL(a)}}}},{key:"render",value:function(){return Object(i.jsx)("div",{className:"main",children:Object(i.jsx)("div",{className:"canvasWrapper",ref:this.wrapper,children:Object(i.jsx)("canvas",{id:"canvasElementId",className:"paper",ref:this.paperId})})})}}]),a}(n.a.Component),S=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).state={active:!1,value:null},i.decrementButton=n.a.createRef(),i.incrementButton=n.a.createRef(),i.mainContainer=n.a.createRef(),i.input=n.a.createRef(),i.leftSeparator=n.a.createRef(),i.rightSeparator=n.a.createRef(),i.update=i.update.bind(Object(u.a)(i)),i.onKeyDown=i.onKeyDown.bind(Object(u.a)(i)),i.onBlurI=i.onBlurI.bind(Object(u.a)(i)),i.onFocusI=i.onFocusI.bind(Object(u.a)(i)),i.oldInputValue=null,i}return Object(c.a)(a,[{key:"update",value:function(e,t){var a;if(null!=e&&this.state.active===e.active||(a=this.mainContainer.current.getAttribute("class"),a=this.state.active?v()(a,{active:!0,inactive:!1}):v()(a,{active:!1,inactive:!0}),this.mainContainer.current.setAttribute("class",a)),this.state.active&&(null!=t&&this.props.leftSeparator===t.leftSeparator||(a=this.leftSeparator.current.getAttribute("class"),a=this.props.leftSeparator?v()(a,{active:!0,inactive:!1}):v()(a,{active:!1,inactive:!0}),this.leftSeparator.current.setAttribute("class",a)),null!=t&&this.props.rightSeparator===t.rightSeparator||(a=this.rightSeparator.current.getAttribute("class"),a=this.props.rightSeparator?v()(a,{active:!0,inactive:!1}):v()(a,{active:!1,inactive:!0}),this.rightSeparator.current.setAttribute("class",a)),null==t?null==e&&(this.input.current.value=this.state.value):null!=t&&this.props.currentValue===this.input.current.value||(this.input.current.value=this.props.currentValue),null!=this.input.current)){var i=parseFloat(this.input.current.value),s=parseFloat(this.input.current.min),n=parseFloat(this.input.current.max);null!=this.decrementButton.current&&(!isNaN(i)&&i>s?this.decrementButton.current.disabled=!1:this.decrementButton.current.disabled=!0),null!=this.incrementButton.current&&(!isNaN(i)&&i<n?this.incrementButton.current.disabled=!1:this.incrementButton.current.disabled=!0)}}},{key:"onKeyDown",value:function(e){null!=this.props.blurAndEnterHandler&&13===e.keyCode&&this.oldInputValue!==this.input.current.value&&(this.props.blurAndEnterHandler(parseFloat(this.input.current.value)),this.oldInputValue=this.input.current.value)}},{key:"onBlurI",value:function(e){null!=this.props.blurAndEnterHandler&&this.oldInputValue!==this.input.current.value&&(this.props.blurAndEnterHandler(this.input.current.value),this.oldInputValue=null)}},{key:"onFocusI",value:function(e){null!=this.props.blurAndEnterHandler&&(this.oldInputValue=this.input.current.value)}},{key:"componentDidUpdate",value:function(e,t){this.update(t,e)}},{key:"componentDidMount",value:function(){this.input.current.addEventListener("keydown",this.onKeyDown,!0),this.update()}},{key:"render",value:function(){var e="inactive blockdiv";return null!=this.props.className&&(e+=" "+this.props.className),Object(i.jsxs)("div",{className:e,ref:this.mainContainer,children:[Object(i.jsx)("div",{ref:this.leftSeparator,className:"separator inactive"}),Object(i.jsx)(m,{ref:this.decrementButton,title:this.props.dbTitle,handleClick:this.props.dbCallback,children:Object(i.jsx)("img",{alt:this.props.dbTitle,src:this.props.dbIconSrc})}),Object(i.jsx)("input",{className:"value_input",ref:this.input,type:"text",placeholder:this.props.prompt,min:this.props.minValue,max:this.props.maxValue,step:this.props.step,onBlur:this.onBlurI,onFocus:this.onFocusI}),Object(i.jsx)(m,{ref:this.incrementButton,title:this.props.ibTitle,handleClick:this.props.ibCallback,children:Object(i.jsx)("img",{alt:this.props.ibTitle,src:this.props.ibIconSrc})}),Object(i.jsx)("div",{ref:this.rightSeparator,className:"separator inactive"}),this.props.children]})}}]),a}(n.a.Component),x=a(41),w=a(58);x.GlobalWorkerOptions.workerSrc=w;var C=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).state={totalPageNumber:0,currentPage:0,paperSetImage:null,paperRemoveOldImage:null,file:null},i.hiddenCanvas=n.a.createRef(),i.pager=n.a.createRef(),i.update=i.update.bind(Object(u.a)(i)),i.loadPdfFile=i.loadPdfFile.bind(Object(u.a)(i)),i.saveImageToState=i.saveImageToState.bind(Object(u.a)(i)),i.loadPage=i.loadPage.bind(Object(u.a)(i)),i.loadPdfDocument=i.loadPdfDocument.bind(Object(u.a)(i)),i.loadPage=i.loadPage.bind(Object(u.a)(i)),i.renderPage=i.renderPage.bind(Object(u.a)(i)),i.processError=i.processError.bind(Object(u.a)(i)),i.changePage=i.changePage.bind(Object(u.a)(i)),i.setCurrentPage=i.setCurrentPage.bind(Object(u.a)(i)),i.pdfDocument=null,i}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.update()}},{key:"componentWillUnmount",value:function(){this.pdfDocument=null,this.setState({currentPage:0,totalPageNumber:0})}},{key:"componentDidUpdate",value:function(e,t){if(this.update(t)&&null!==this.state.file&&this.state.file.name.endsWith(".pdf")&&null!=t){if(t.file!==this.state.file)return void this.loadPdfFile(this.state.file);this.state.totalPageNumber>=1&&this.state.currentPage<=this.state.totalPageNumber&&null!=this.pdfDocument&&this.state.currentPage!==t.currentPage&&this.loadPage(parseInt(this.state.currentPage),this.pdfDocument)}}},{key:"saveImageToState",value:function(){var e=this.hiddenCanvas.current.toDataURL("image/png");null!=e&&null!=this.state.paperSetImage&&g.fabric.Image.fromURL(e,this.state.paperSetImage)}},{key:"loadPage",value:function(e,t){null!=this.props.shieldHandler&&this.props.shieldHandler(!0),null!=this.state.paperRemoveOldImage&&this.state.paperRemoveOldImage(),t.getPage(e).then(this.renderPage)}},{key:"renderPage",value:function(e){var t=e.getViewport({scale:8}),a=this.hiddenCanvas.current.getContext("2d");this.hiddenCanvas.current.height=t.height,this.hiddenCanvas.current.width=t.width,e.render({canvasContext:a,viewport:t}).promise.then(this.saveImageToState)}},{key:"loadPdfDocument",value:function(e){this.pdfDocument=e,this.setState({totalPageNumber:e.numPages,currentPage:1})}},{key:"processError",value:function(e){console.log(e)}},{key:"loadPdfFile",value:function(e){var t=new FileReader,a=this.loadPdfDocument,i=this.processError;this.pdfDocument=null,this.setState({currentPage:0,totalPageNumber:0}),t.onload=function(e){var t=new Uint8Array(e.target.result);x.getDocument(t).promise.then(a,i)},null!=this.props.shieldHandler&&this.props.shieldHandler(!0),t.readAsArrayBuffer(e)}},{key:"update",value:function(e){var t=null!=this.state.file&&this.state.file.name.endsWith(".pdf");return this.pager.current.state.active!==t&&this.pager.current.setState({active:t}),t}},{key:"changePage",value:function(e){if(this.state.totalPageNumber>0){var t=parseInt(this.state.currentPage);isNaN(t)||(e?t--:t++,this.setCurrentPage(t))}}},{key:"setCurrentPage",value:function(e){e<1&&(e=1),e>this.state.totalPageNumber&&(e=this.state.totalPageNumber),this.setState({currentPage:e})}},{key:"render",value:function(){var e=this,t=this.state.totalPageNumber,a=this.state.currentPage;return Object(i.jsx)(S,{ref:this.pager,dbIconSrc:"assets/chevron-back-circle-outline.svg",ibIconSrc:"assets/chevron-forward-circle-outline.svg",dbTitle:"Previous page",ibTitle:"Next page",dbCallback:function(){return e.changePage(!0)},ibCallback:function(){return e.changePage(!1)},prompt:"Page Nr",minValue:1,maxValue:t,step:1,leftSeparator:!0,className:"pager",blurAndEnterHandler:function(t){e.setCurrentPage(t)},currentValue:a,children:Object(i.jsx)("canvas",{id:"hiddenCanvasForPdfId",ref:this.hiddenCanvas,style:{display:"none"}})})}}]),a}(n.a.Component),P=n.a.forwardRef((function(e,t){return Object(i.jsxs)("div",{className:"shield inactive",ref:t,children:[Object(i.jsx)("div",{className:"viewer-busyind"}),e.children]})})),I=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).state={modal:!0,active:!1},i.ok=n.a.createRef(),i.cancel=n.a.createRef(),i.dialogWrapper=n.a.createRef(),i.content=n.a.createRef(),i.shield=n.a.createRef(),i.doAccept=i.doAccept.bind(Object(u.a)(i)),i.doCancel=i.doCancel.bind(Object(u.a)(i)),i.show=i.show.bind(Object(u.a)(i)),i.hide=i.hide.bind(Object(u.a)(i)),i}return Object(c.a)(a,[{key:"show",value:function(){var e=this.dialogWrapper.current.getAttribute("class");e=v()(e,{active:!0,inactive:!1}),this.dialogWrapper.current.setAttribute("class",e),this.state.modal&&(e=this.shield.current.getAttribute("class"),e=v()(e,{active:!0,inactive:!1}),this.shield.current.setAttribute("class",e))}},{key:"hide",value:function(){var e=this.shield.current.getAttribute("class");e=v()(e,{active:!1,inactive:!0}),this.shield.current.setAttribute("class",e),e=this.dialogWrapper.current.getAttribute("class"),e=v()(e,{active:!1,inactive:!0}),this.dialogWrapper.current.setAttribute("class",e)}},{key:"doAccept",value:function(){null!=this.props.acceptCallback&&this.props.acceptCallback(),this.setState({active:!1})}},{key:"doCancel",value:function(){this.setState({active:!1})}},{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t){null!=t&&this.state.active===t.active||(this.state.active?this.show():this.hide())}},{key:"render",value:function(){var e=this,t=this.props.title,a="dlgtitle"+(null==t?" inactive":" active");return Object(i.jsxs)("div",{className:"inactive dialogwrapper",ref:this.dialogWrapper,children:[Object(i.jsx)("div",{className:"shield inactive",ref:this.shield}),Object(i.jsxs)("div",{className:"dlg",children:[Object(i.jsx)("div",{className:a,children:t}),Object(i.jsx)("div",{className:"dlgcontent",ref:this.content,children:this.props.children}),Object(i.jsxs)("div",{className:"toolbar",children:[Object(i.jsx)(m,{name:"ok",title:"Accept",ref:this.ok,className:"active",handleClick:function(){return e.doAccept()},children:"Ok"}),Object(i.jsx)("div",{className:"filler"}),Object(i.jsx)(m,{name:"cancel",title:"Cancel",ref:this.cancel,className:"active",handleClick:function(){return e.doCancel()},children:"Cancel"})]})]})]})}}]),a}(n.a.Component),A=n.a.createContext(1),R=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).pap=n.a.createRef(),i.hiddenFileInput=n.a.createRef(),i.pdfRend=n.a.createRef(),i.zoomer=n.a.createRef(),i.busyind=n.a.createRef(),i.modDialog=n.a.createRef(),i.measurment=n.a.createRef(),i.exportFileName=n.a.createRef(),i.saveButton=n.a.createRef(),i.cropButton=n.a.createRef(),i.vectButton=n.a.createRef(),i.processFiles=i.processFiles.bind(Object(u.a)(i)),i.loadImage=i.loadImage.bind(Object(u.a)(i)),i.doZoom=i.doZoom.bind(Object(u.a)(i)),i.setZoom=i.setZoom.bind(Object(u.a)(i)),i.setShieldActive=i.setShieldActive.bind(Object(u.a)(i)),i.showModalDialog=i.showModalDialog.bind(Object(u.a)(i)),i.onDialogAccept=i.onDialogAccept.bind(Object(u.a)(i)),i.doVectorizeExtern=i.doVectorizeExtern.bind(Object(u.a)(i)),i.doVectorizeIntern=i.doVectorizeIntern.bind(Object(u.a)(i)),i.showSVGResult=i.showSVGResult.bind(Object(u.a)(i)),i.toggleSelectionMode=i.toggleSelectionMode.bind(Object(u.a)(i)),i.updateSaveButton=i.updateSaveButton.bind(Object(u.a)(i)),i.updateCropButton=i.updateCropButton.bind(Object(u.a)(i)),i.updateVectButton=i.updateVectButton.bind(Object(u.a)(i)),i.state={polySelection:!1,zoom:"1.0",point:null,saveEnabled:!1,cropEnabled:!1,vectEnabled:!1},i.zoomFactor=.05,i.minZoom=.05,i.maxZoom=5,i.svgString=null,i}return Object(c.a)(a,[{key:"toggleSelectionMode",value:function(e){null!=this.pap.current&&(this.pap.current.toggleSelectionMode(),this.setState({polySelection:this.pap.current.pathSelection}))}},{key:"setShieldActive",value:function(e){if(null!=this.busyind.current){var t=this.busyind.current.getAttribute("class");t=e?v()(t,{active:!0,inactive:!1}):v()(t,{active:!1,inactive:!0}),this.busyind.current.setAttribute("class",t)}}},{key:"showModalDialog",value:function(){null!=this.modDialog.current&&this.modDialog.current.setState({active:!0})}},{key:"processFiles",value:function(e){null!=e.target.files&&1===e.target.files.length&&(this.svgString=null,this.updateSaveButton(),(this.pap.current.allowedTypes.includes(e.target.files.item(0).type)||e.target.files.item(0).name.endsWith(".pdf"))&&(this.setShieldActive(!0),this.pap.current.crBlob=null,this.pap.current.crImgUrl=null,this.updateVectButton(),this.pdfRend.current.setState({paperSetImage:this.pap.current.loadRasterImage,file:e.target.files.item(0)}),this.pap.current.setState({file:e.target.files.item(0)})),e.target.value=null)}},{key:"doZoom",value:function(e,t){var a=e?this.zoomFactor:-this.zoomFactor,i=parseFloat(this.state.zoom)+a;this.setZoom(i,t)}},{key:"setZoom",value:function(e,t){var a=parseFloat(e);a>this.maxZoom&&(a=this.maxZoom),a<this.minZoom&&(a=this.minZoom),this.setState({zoom:parseFloat(a).toPrecision(3),point:t})}},{key:"componentDidMount",value:function(){this.pdfRend.current.setState({paperSetImage:this.pap.current.loadRasterImage,paperRemoveOldImage:this.pap.current.removeOldImage}),this.zoomer.current.setState({active:!0}),this.updateSaveButton()}},{key:"componentDidUpdate",value:function(e,t){}},{key:"loadImage",value:function(e){e.preventDefault(),this.hiddenFileInput.current.click()}},{key:"onDialogAccept",value:function(){if(null!=this.svgString){var e=null;null!=this.measurment.current&&(e=this.measurment.current.value),null==e&&(e="");var t='desc="',a=this.svgString.indexOf(t);if(a>=0){var i=this.svgString.indexOf('"',a+t.length);if(i>=0){var s=this.svgString.substring(0,a+t.length)+e+this.svgString.substring(i);this.svgString=s}}var n=null;if(null!=this.exportFileName.current&&(n=this.exportFileName.current.value),null!=n){var r=new Blob([this.svgString],{type:"image/svg+xml"}),o=document.createElement("a");o.download=n,o.href=URL.createObjectURL(r),document.body.appendChild(o),o.click(),document.body.removeChild(o)}}}},{key:"doVectorizeExtern",value:function(e){if(null!=e){this.setShieldActive(!0);var t=new XMLHttpRequest;t.open("POST","https://api.vectorizer.io/v3/vectorize?apikey=69936907-18666295&colors=8&minarea=5&threshold=20",!0),t.setRequestHeader("Cache-Control","no-cache"),t.setRequestHeader("Content-Type","multipart/form-data"),t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var e=t.responseText;console.log(e.type)}else console.log("Vectorize error: "+t.status)},t.send(e)}}},{key:"showSVGResult",value:function(e){this.svgString=e,this.updateSaveButton(),this.pap.current.loadResultSVGImage(e)}},{key:"doVectorizeIntern",value:function(e){null!=e&&(this.setShieldActive(!0),null!=window.ImageTracer&&window.ImageTracer.imageToSVG(e,this.showSVGResult))}},{key:"updateSaveButton",value:function(){null!=this.saveButton.current&&(null!=this.svgString?this.setState({saveEnabled:!0}):this.setState({saveEnabled:!1}))}},{key:"updateCropButton",value:function(){null!=this.cropButton.current&&(null!=this.pap.current?this.setState({cropEnabled:this.pap.current.isCropEnabled()}):this.setState({cropEnabled:!1}))}},{key:"updateVectButton",value:function(){null!=this.vectButton.current&&(null!=this.pap.current&&null!=this.pap.current.crImgUrl?this.setState({vectEnabled:!0}):this.setState({vectEnabled:!1}))}},{key:"render",value:function(){var e=this,t=this.state.zoom,a=this.state.point,s=this.state.polySelection?"assets/square-dashed-outline.svg":"assets/analytics-outline.svg";return Object(i.jsxs)("div",{className:"main",children:[Object(i.jsxs)(A.Provider,{value:t,children:[Object(i.jsxs)("div",{className:"toolbar shadow",children:[Object(i.jsx)(m,{name:"load",title:"Load file",className:"active",handleClick:function(t){return e.loadImage(t)},children:Object(i.jsx)("img",{alt:"Load file",src:"assets/image-outline.svg"})}),Object(i.jsx)(m,{name:"clear",title:"Clear canvas",className:"active",handleClick:function(){e.svgString=null,e.pap.current.removeProcessedImages(),e.pap.current.clearCanvas(),e.pdfRend.current.setState({file:null}),e.updateSaveButton(),e.updateCropButton(),e.updateVectButton()},children:Object(i.jsx)("img",{alt:"Clear canvas",src:"assets/close-circle-outline.svg"})}),Object(i.jsx)(m,{name:"sel_mode",title:"Selection mode",className:"active",handleClick:function(t){e.toggleSelectionMode(t)},children:Object(i.jsx)("img",{alt:"Selection mode",src:s})}),Object(i.jsx)(m,{name:"crop",ref:this.cropButton,title:"Crop image",className:"active",handleClick:function(){e.setShieldActive(!0),e.pap.current.cropImage()},disabled:!this.state.cropEnabled,children:Object(i.jsx)("img",{alt:"Crop",src:"assets/crop-outline.svg"})}),Object(i.jsx)(m,{name:"to_vector",ref:this.vectButton,title:"Vectorize",className:"active",handleClick:function(){return e.doVectorizeIntern(e.pap.current.crImgUrl)},disabled:!this.state.vectEnabled,children:Object(i.jsx)("img",{alt:"Vectorize",src:"assets/vector.svg"})}),Object(i.jsx)(m,{name:"save",ref:this.saveButton,title:"Save",className:"active",handleClick:function(){return e.showModalDialog()},disabled:!this.state.saveEnabled,children:Object(i.jsx)("img",{alt:"Save",src:"assets/save-outline.svg"})}),Object(i.jsx)(C,{ref:this.pdfRend,shieldHandler:this.setShieldActive}),Object(i.jsx)("div",{className:"filler"}),Object(i.jsx)(m,{name:"reset_position",title:"Reset position",className:"active",handleClick:function(){return e.pap.current.resetPosition()},children:Object(i.jsx)("img",{alt:"Reset position",src:"assets/locate.svg"})}),Object(i.jsx)(m,{name:"reset_zoom",title:"Reset zoom",className:"active",handleClick:function(){return e.setState({zoom:1})},children:Object(i.jsx)("img",{alt:"Reset zoom",src:"assets/zoom-to-actual-size.svg"})}),Object(i.jsx)(S,{ref:this.zoomer,dbIconSrc:"assets/zoom-in.svg",ibIconSrc:"assets/zoom-out.svg",dbTitle:"Zoom in",ibTitle:"Zoom out",dbCallback:function(){return e.doZoom(!0)},ibCallback:function(){return e.doZoom(!1)},prompt:"Zoom",minValue:.05,maxValue:5,step:.05,className:"zoomer",blurAndEnterHandler:function(t){e.setZoom(t)},currentValue:t})]}),Object(i.jsx)("div",{className:"sand shadow",children:Object(i.jsx)(O,{ref:this.pap,zoom:t,point:a,onMouseWheelZoom:this.doZoom,resetZoom:function(){return e.setState({zoom:1})},shieldHandler:this.setShieldActive,cropButtonStateHandler:this.updateCropButton,vectButtonStateHandler:this.updateVectButton})})]}),Object(i.jsx)("input",{ref:this.hiddenFileInput,type:"file",style:{display:"none"},onChange:this.processFiles}),Object(i.jsx)(P,{ref:this.busyind}),Object(i.jsxs)(I,{ref:this.modDialog,acceptCallback:this.onDialogAccept,title:"Save dialog",children:[Object(i.jsxs)("div",{className:"dlgrow",children:[Object(i.jsx)("label",{children:"Measurement"}),Object(i.jsx)("input",{ref:this.measurment,type:"text",placeholder:"30 ft"})]}),Object(i.jsxs)("div",{className:"dlgrow",children:[Object(i.jsx)("label",{children:"File name"}),Object(i.jsx)("input",{ref:this.exportFileName,type:"text"})]})]})]})}}]),a}(n.a.Component);a(60);o.a.render(Object(i.jsx)(R,{}),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.a3299a66.chunk.js.map