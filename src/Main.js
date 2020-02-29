import React from 'react';
import Button from './Components/button';
import './Main.css';


const operations = {
    '+': (preVal, nextVal) => Number(preVal) + Number(nextVal),
    '-': (preVal, nextVal) => preVal - nextVal,
    '/': (preVal, nextVal) => preVal / nextVal,
    'x': (preVal, nextVal) => preVal * nextVal
}
class Main extends React.Component{

    constructor(){
        super();
        this.doOperation = this.doOperation.bind(this);
        this.listenerKeyDown = this.listenerKeyDown.bind(this);
        this.viewerTextUpdated = this.viewerTextUpdated.bind(this);
        this.state = {
            viewerText: '0',
            previousValue: '',
            symbol: ''
        }
    }
    // VIEWER
    viewerTextErase = () => {
        let viewerString =  this.state.viewerText;
        if((viewerString.length - 1)  < 1){
            this.setState({
                viewerText: ''
            })
        }else if(viewerString.length > 0){
            viewerString = viewerString.slice(0, -1); 
            this.setState({
                viewerText: viewerString
            })
        }
        
    }
    
    viewerTextUpdated = (digit) => {
        let viewerString = this.state.viewerText;        
        if((viewerString.length + 1) <= 8){
            console.log(this.state.symbol)
            viewerString += digit;
            
            this.setState({
                viewerText: viewerString
            })
        }
        
    }
    
    clearViewer = () => {
        this.setState({viewerText:''})
    }
    
    clearAllViewer = () => {
        this.setState({
            viewerText: '',
            previousValue: '',
            symbol: ''
        })
    }
    
    doOperation = (symbol) => {
        if(symbol){
            if(symbol === '='){
                symbol = this.state.symbol;
            }
            
            //pega o valor que esta no "visor"
            let oldViewerText = this.state.viewerText;

            console.log('previous value', this.state.previousValue)
            if(this.state.previousValue !== ''){
                
                let preVal = Number(this.state.previousValue);
                let nextVal = Number(oldViewerText);
                console.log('preVal',preVal);
                console.log('nextVal',nextVal);
                let result = operations[symbol](preVal, nextVal);
                console.log('result', result);
                this.setState({
                    symbol:symbol, 
                    viewerText: result, 
                    previousValue:''
                });
            }else{
                this.setState({symbol:symbol, viewerText: '', previousValue:oldViewerText});
            }
            
        }
    }

    listenerKeyDown = (event) => {
        console.log(event)
        let { key } = event;

        if(!isNaN(Number(key))){
            this.viewerTextUpdated(String(key))   
        }else if(key in operations){
            this.doOperation(key);        
        }else if(key === "Backspace"){
            this.viewerTextErase()
        }else if(key === "Enter"){
            this.doOperation(this.state.symbol)
        }

    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.listenerKeyDown)
      }
      
    componentWillUnmount() {
        document.removeEventListener('keydown', this.listenerKeyDown)
    }

    render(){
        return(
            <div  className="calculator bg-dark">
                <div className="viewer">
                    <p>{this.state.viewerText !== '' ? this.state.viewerText : this.state.previousValue }</p>
                </div>
                <div className="controller">
                    <div className="basic">
                        <div className="fast-menu">
                            <Button text="C" classCss="btn" eventClick={() => this.clearViewer()}/>
                            <Button text="CA" classCss="btn" eventClick={() => this.clearAllViewer()}/>
                            <Button text="%" classCss="btn"/>
                        </div>
                        <div className="keyboard-numbers">
                            <Button text="1" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(1))}/>
                            <Button text="2" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(2))}/>
                            <Button text="3" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(3))}/>
                            <Button text="4" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(4))}/>
                            <Button text="5" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(5))}/>
                            <Button text="6" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(6))}/>
                            <Button text="7" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(7))}/>
                            <Button text="8" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(8))}/>
                            <Button text="9" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(9))}/>
                            <Button text="+/-" classCss="btn number" />
                            <Button text="0" classCss="btn number" eventClick={() => this.viewerTextUpdated(String(0))}/>
                            <Button text="." classCss="btn number" eventClick={() => this.viewerTextUpdated(String('.'))}/>
                        </div>
                    </div>
                    <div className="operations">
                        <Button text="+" classCss="btn control" eventClick={() => this.doOperation('+')} />
                        <Button text="-" classCss="btn control" eventClick={() => this.doOperation('-')}/>
                        <Button text="x" classCss="btn control" eventClick={() => this.doOperation('x')}/>
                        <Button text="/" classCss="btn control" eventClick={() => this.doOperation('/')}/>
                        <Button text="=" classCss="btn control" eventClick={() => this.doOperation('=')}/>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Main;