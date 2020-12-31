import React from 'react';
import Button from './Button';
import classNames from 'classnames/dedupe';
// import './Dialog.css';

class Dialog extends React.Component {
 
  constructor(props) {
    super(props)

    this.state = {
      modal: true,
      active: false
  }

    this.ok = React.createRef();
    this.cancel = React.createRef();
    this.dialogWrapper = React.createRef();
    this.content = React.createRef();
    this.shield = React.createRef();

    this.doAccept = this.doAccept.bind(this);
    this.doCancel = this.doCancel.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    var cl = this.dialogWrapper.current.getAttribute("class");
    cl = classNames(cl, {active:true, inactive: false});
    this.dialogWrapper.current.setAttribute("class", cl);
    if (this.state.modal) {
      cl = this.shield.current.getAttribute("class");
      cl = classNames(cl, {active:true, inactive: false});
      this.shield.current.setAttribute("class", cl);
    }
  }

  hide() {
    var cl = this.shield.current.getAttribute("class");
    cl = classNames(cl, {active:false, inactive: true});
    this.shield.current.setAttribute("class", cl);
    cl = this.dialogWrapper.current.getAttribute("class");
    cl = classNames(cl, {active:false, inactive: true});
    this.dialogWrapper.current.setAttribute("class", cl);
  }

  doAccept() {
    if (this.props.acceptCallback != null) {
      this.props.acceptCallback();
    }
    this.setState({active: false});
  }

  doCancel() {
    this.setState({active: false});
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState == null || this.state.active !== prevState.active) {
      if (this.state.active) {
        this.show();
      }
      else {
        this.hide();
      }
    }
    // if (!this.state.active) {
    //   return;
    // }
  }

  render() {
    var title = this.props.title;
    var titleClassName = "dlgtitle" + (title == null ? " inactive" : " active");
    return (
      <div className="inactive dialogwrapper" ref={this.dialogWrapper}>
        <div className="shield inactive" ref={this.shield}></div>
        <div className="dlg">
          <div className={titleClassName}>
            {title}
          </div>
          <div className="dlgcontent" ref={this.content}>
            {this.props.children}
          </div>

          <div className="toolbar">
            <Button name="ok" title={"Accept"} ref={this.ok} className={"active"} handleClick={ () => this.doAccept() }>
              Ok
            </Button>

            <div className="filler"></div>

            <Button name="cancel" title={"Cancel"} ref={this.cancel} className={"active"} handleClick={ () => this.doCancel() }>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog;
