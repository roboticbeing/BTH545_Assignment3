import React,{Component} from 'react';
import Select from 'react-select';

import './style.scss';

const options = [
    { value: 'userDefine', label: 'User Defined' },
    { value: 'whiteSpace', label: 'White Space' },
    { value: 'numberRange', label: 'Number Range' },
    { value: 'selectCharacter', label: 'Select Character' },
  ];


class PartOne extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            patterns: [],
            usedColors: 0
        }
        this.displayPatterns = this.displayPatterns.bind(this);
        this.addPatterns = this.addPatterns.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
    }
  

updatePattern = (e) => {
    console.log("Update Pattern" + e);
    console.log(e)


}

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

        // if(tempPatterns.length > 0) {
        //     preIdx = tempPatterns[tempPatterns.length - 1].order + 1;
        // }
        
        let pattern = {
            id: this.state.usedColors,
            order: order,
            type: "userDefined",
            valueOne: "",
            valueTwo: "",
            color: selectColors
        }

        tempPatterns.push(pattern)

        this.setState({
            patterns: tempPatterns,
            usedColors: this.state.usedColors + 1
        })

    }

displayPatterns = () => {
       
    let patterns = []
    
    this.state.patterns.map((obj, idx) => {
        console.log(idx)


       patterns.push(
           
        <div key={idx} className="condition-item">
            {/* <select name={obj.id} 

                name="type"
                id="type"
                placeholder="Select Job"
            //   value={type}
                onChange={e => this.updatePattern(e)}
            >
               
            </select> */}
        
        <Select
           
            onChange={this.updatePattern}
            options={options}
            name={obj.id}
        />
            
            <input> 
            </input>

        </div>
       )
    }) 



    return patterns;
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

            </div>
            <div className="files-section">

                
            </div>
          
        </div>);
    }
}

export default PartOne
