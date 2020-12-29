import React from 'react';
import classNames from 'classnames/dedupe';
import Button from './Button';
// import './ValueChooser.css';

class ValueChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            value: null
        }
        this.decrementButton = React.createRef();
        this.incrementButton = React.createRef();
        this.mainContainer = React.createRef();
        this.input = React.createRef();
        this.leftSeparator = React.createRef();
        this.rightSeparator = React.createRef();

        this.update = this.update.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlurI = this.onBlurI.bind(this);
        this.onFocusI = this.onFocusI.bind(this);

        this.oldInputValue = null;
    }

    update(prevState, prevProps) {
        var cl;
        if (prevState == null || this.state.active !== prevState.active) {
            cl = this.mainContainer.current.getAttribute("class");
            if (this.state.active) {
                cl = classNames(cl, {active:true, inactive: false});
            }
            else {
                cl = classNames(cl, {active:false, inactive: true});
            }
            this.mainContainer.current.setAttribute("class", cl);
        }

        if (prevProps == null || this.props.leftSeparator !== prevProps.leftSeparator) {
            cl = this.leftSeparator.current.getAttribute("class");
            if (this.props.leftSeparator) {
                cl = classNames(cl, {active:true, inactive: false});
            }
            else {
                cl = classNames(cl, {active:false, inactive: true});
            }
            this.leftSeparator.current.setAttribute("class", cl);
        }

        if (prevProps == null || this.props.rightSeparator !== prevProps.rightSeparator) {
            cl = this.rightSeparator.current.getAttribute("class");
            if (this.props.rightSeparator) {
                cl = classNames(cl, {active:true, inactive: false});
            }
            else {
                cl = classNames(cl, {active:false, inactive: true});
            }
            this.rightSeparator.current.setAttribute("class", cl);
        }
        if (prevProps == null) {
            if (prevState == null) {
                this.input.current.value = this.state.value;
            }
        }
        else if (prevProps == null || this.props.currentValue !== this.input.current.value) {
            this.input.current.value = this.props.currentValue;
        }

    }

    onKeyDown(e) {
        if (this.props.blurAndEnterHandler != null && e.keyCode === 13  && this.oldInputValue !== this.input.current.value) { // ENTER
            this.props.blurAndEnterHandler(this.input.current.value);
            this.oldInputValue = this.input.current.value;
        }
    }

    onBlurI(e) {
        if (this.props.blurAndEnterHandler != null && this.oldInputValue !== this.input.current.value) {
            this.props.blurAndEnterHandler(this.input.current.value);
            this.oldInputValue = null;
        }
    }

    onFocusI(e) {
        if (this.props.blurAndEnterHandler != null) {
            this.oldInputValue = this.input.current.value;
        }
    }
       
    componentDidUpdate(prevProps, prevState) {
        this.update(prevState, prevProps);
    }
    
    componentDidMount() {
        this.input.current.addEventListener("keydown", this.onKeyDown, true);
        this.update();
    }
  
    render() {
        var clName = "inactive blockdiv";
        if (this.props.className != null) {
            clName += " " + this.props.className;
        }
        return (
            <div className={clName} ref={this.mainContainer}>
                <div ref={this.leftSeparator} className="separator inactive"></div>
                <Button ref={this.decrementButton} title={this.props.dbTitle} handleClick={ this.props.dbCallback }>
                    <img alt={this.props.dbTitle} src={this.props.dbIconSrc}></img>
                </Button>
                <input 
                    className="value_input" 
                    ref={this.input} 
                    type="text"
                    placeholder={this.props.prompt} 
                    min={this.props.minValue}
                    max={this.props.maxValue} 
                    step={this.props.step} 
                    onBlur={this.onBlurI} 
                    onFocus={this.onFocusI}
                    >
                </input>
                <Button ref={this.incrementButton} title={this.props.ibTitle} handleClick={ this.props.ibCallback }>
                    <img alt={this.props.ibTitle}src={this.props.ibIconSrc}></img>
                </Button>
                <div ref={this.rightSeparator} className="separator inactive"></div>
                {this.props.children}
            </div>
        )
  }
}

export default ValueChooser;
