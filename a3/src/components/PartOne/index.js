import React,{Component} from 'react';
import Select from 'react-select';

import './style.scss';

const options = [
    { value: 'userDefined', label: 'User Defined' },
    { value: 'whiteSpace', label: 'White Space' },
    { value: 'numberRange', label: 'Number Range' },
    { value: 'selectCharacters', label: 'Select Character' },
  ];


class PartOne extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            patterns: [],
            usedColors: 0,
            defaultList: ["iPhone 6-7-8-1", "iPhoneX 6-7-8-1", "iPhoneS6", "iPhone 3", "iPhoneXL 10", ],
            selectedList: []
        }
        this.displayPatterns = this.displayPatterns.bind(this);
        this.addPatterns = this.addPatterns.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
        this.inputDisplay = this.inputDisplay.bind(this);
        this.applyPattern = this.applyPattern.bind(this);
        this.displayDefault = this.displayDefault.bind(this);
        this.displaySelected = this.displaySelected.bind(this);
        this.displayRegex = this.displayRegex.bind(this);
    }

//Still have to add the remove button 

//Order Button


displayRegex = () => {
    let regex = [];
    

    regex.push(<div className="pattern-item">
        <p id="pattern">Iphone</p>
    </div>)
    regex.push(<div className="pattern-item">
        <span className="box"></span>
    </div>)

    return regex;


}


//Loops out the default list
displayDefault = () => {
    return this.state.defaultList.map( (item, idx) => {
       return <h3 key={idx}>{item}</h3>
    });
}

//Loops out the selected list
displaySelected = () => {
    return this.state.selectedList.map( (item, idx) => {
        return <h3 key={idx}>{item}</h3>
    });
}

//Where you can take the input from the screen and apply the pattern
applyPattern = (e, id) => {
    //Pattern Id
    //Value Name, can be the first input or second
    console.log(e.target.name)

    //Value Of input
    console.log(e.target.value)
}    

//Updates the type of pattern for each box
updatePattern = (e, id) => {
    
    let tempPatterns = this.state.patterns; 

    for(let i = 0; i < tempPatterns.length; i++) {
        if(tempPatterns[i].id === id.name ) {
            tempPatterns[i].type = e.value;
        }
    }

    this.setState({
        patterns: tempPatterns
    })

}



//Used to create a new pattern option 
//NOTE: when removing patterns dont touch this.state.usedColors, it's suppose to be unqiue 
addPatterns = (e) => {
        
    e.preventDefault();

       var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
       '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
       '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
       '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
       '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
       '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
       '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
       '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
       '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        

        let selectColors = colorArray[this.state.usedColors]
        let tempPatterns = this.state.patterns;
        
        let order = 0;

        for(let i = 0; i < tempPatterns.length; i++) {
            if(tempPatterns[i].order > order) {
                order = tempPatterns[i].order + 1
            }
        }

        let pattern = {
            id: this.state.usedColors,
            order: order,
            type: "userDefined",
            valueOne: "",
            valueTwo: "",
            color: selectColors
        }

        tempPatterns.push(pattern)

        //Dont remove colors used !!!
        this.setState({
            patterns: tempPatterns,
            usedColors: this.state.usedColors + 1
        })

    }

    RemovePattern = (e) => {
        
        e.preventDefault();
    
           var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
           '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
           '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
           '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
           '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
           '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
           '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
           '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
           '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
           '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
            
    
            let selectColors = colorArray[this.state.usedColors]
            let tempPatterns = this.state.patterns;
            
            let order = 0;
    
            for(let i = 0; i < tempPatterns.length; i++) {
                if(tempPatterns[i].order > order) {
                    order = tempPatterns[i].order + 1
                }
            }
    
            let pattern = {
                id: this.state.usedColors,
                order: order,
                type: "userDefined",
                valueOne: "",
                valueTwo: "",
                color: selectColors
            }
    
            tempPatterns.pop(pattern);
    
            //Dont remove colors used !!!
            this.setState({
                patterns: tempPatterns,
                usedColors: this.state.usedColors + 1
            })
    
        }

displayPatterns = () => {
       
    let patterns = []
    let tempPatterns  = this.state.patterns;

    //tempPatterns.sort((a, b) => (a.order < b.order) ? 1 : -1)



    tempPatterns.map((obj, idx) => {
     
       patterns.push(
           
        <div key={idx} className="condition-item" style={{borderColor: obj.color}}>
           
            <div className="select-pattern">
                <Select
                    onChange={this.updatePattern}
                    options={options}
                    name={obj.id}
                    defaultValue={ { value: 'userDefined', label: 'User Defined' }}
                />
            </div>
            <div className="input-pattern">
                {this.inputDisplay(obj.id)}
            </div>
       
        </div>
       )
    }) 



    return patterns;
}

inputDisplay = (id) => {
    let tempPatterns = this.state.patterns; 

    let inputReturn;

    for(let i = 0; i < tempPatterns.length; i++) {
        if(tempPatterns[i].id === id ) {
            //If User Defined is selected
            if(tempPatterns[i].type === "userDefined") {
                inputReturn = <div className="pattern-container">
                    <h3>User Defined</h3>
                    <input type="text" name="valueOne" onChange={(e)=> this.applyPattern(e, id)}></input>
                </div>
            }

            //If White Space
            if(tempPatterns[i].type === "whiteSpace") {
                inputReturn = <div className="pattern-container">
                    <h3>White Space</h3>
                    <input disabled name="valueOne" onChange={(e)=> this.applyPattern(e, id)}></input>
                </div>
            }
            // If number Range
            if(tempPatterns[i].type === "numberRange") {
                inputReturn = <div className="pattern-container">
                    <h3>Number Range</h3>
                    <input type="number" className="range-a" name="valueOne" onChange={(e)=> this.applyPattern(e, id)}></input>
                    <span>-</span>
                    <input type="number" className="range-b" name="valueTwo" onChange={(e)=> this.applyPattern(e, id)}></input>
                </div>
            }
            // If Character Select
            if(tempPatterns[i].type === "selectCharacters") {
                inputReturn = <div className="pattern-container">
                    <h3>Select Characters</h3>
                    <input type="text" className="range-a" name="valueOne" onChange={(e)=> this.applyPattern(e, id)}></input>
                    <input type="text" className="range-b" name="valueTwo" onChange={(e)=> this.applyPattern(e, id)}></input>
                </div>
            }
        }
    }


    return inputReturn;

}

    componentDidMount() {
       
    }
    render() {
        return(<div>

             <div className="menu-section">
               
                
                <div className="menu-container">
                    <h2>Make A Pattern</h2>
                    <button onClick={(e) => this.addPatterns(e)} className="menu-add menu-btn">
                       <p>Add Condition</p> 
                    </button>
                    <button onClick={(e) => this.RemovePattern(e)} className="menu-add menu-btn">
                       <p>Remove Condition</p> 
                    </button>

                  
                </div>
                
                <div className="menu-container">
                   
                    <button className="menu-add menu-btn">
                      <p>Dictionary</p>  
                    </button>

                    <button className="menu-load menu-btn">
                        <p>Load Pattern Template</p>
                    </button>
                
                    <button className="menu-save menu-btn">
                        <p>Save Pattern Template</p>
                    </button>
                </div>

             </div>

             <div className="condition-section">

                {this.displayPatterns()}

             </div>
            
            <div className="pattern-section">
                <div className="pattern-container">
                   {this.displayRegex()}
                </div>
            </div>
            <div className="files-section">
                <div className="default-files">
                    <h1>Default Files------</h1>
                    {this.displayDefault()}
                </div>
                <div className="selected-files">
                    <h1>Select Files------</h1>
                    {this.displaySelected()}
                </div>
            </div>
          
        </div>);
    }
}

export default PartOne
