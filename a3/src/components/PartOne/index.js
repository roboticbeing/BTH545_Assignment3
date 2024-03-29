import React, { Component } from "react";
import Select from "react-select";
import { ReactComponent as Add } from "./../../assets/icons/add.svg";
import { ReactComponent as Remove } from "./../../assets/icons/remove.svg";
import { ReactComponent as Info } from "./../../assets/icons/info.svg";

import "./style.scss";

const options = [
    { value: "userDefined", label: "User Defined" },
    { value: "whiteSpace", label: "White Space" },
    { value: "numberRange", label: "Number Range" },
    { value: "selectCharacters", label: "Select Character" }
];

var numOfSaved = 0;
var savedPatterns = [];
var saveNames = [];
var tempSaveName = "";

class PartOne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            patterns: [],
            patternString: [],
            usedColors: 0,
            defaultList: [
                "iPhone 6-7-8-1",
                "iPhoneX 6-7-8-1",
                "iPhoneS6",
                "iPhone 3",
                "iPhoneXL 10",
                "index",
                "fonts",
                "123ABC"
            ],
            selectedList: [],
            regex: [],
            toggleSaveScene: false,
        };
        this.displayPatterns = this.displayPatterns.bind(this);
        this.addPatterns = this.addPatterns.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
        this.inputDisplay = this.inputDisplay.bind(this);
        this.applyPattern = this.applyPattern.bind(this);
        this.displayDefault = this.displayDefault.bind(this);
        this.displaySelected = this.displaySelected.bind(this);
        this.displayRegex = this.displayRegex.bind(this);
        this.loadPatterns = this.loadPatterns.bind(this);
        this.togglePopUp = this.togglePopUp.bind(this);
        this.RemoveSpecificPattern = this.RemoveSpecificPattern.bind(this);  
        
    }

    //Still have to add the remove button

    //Order Button

    displayRegex = () => {
        let regex = [];

        //console.log("Showing Patterns");
        for (let i = 0; i < this.state.patterns.length; ++i) {
            //console.log("Pattern " + i + ": " + this.state.patterns[i].type);

            if (this.state.patterns[i].type === "userDefined") {
                regex.push(
                    <div
                        className="pattern-item"
                        style={{ color: this.state.patterns[i].color }}
                    >
                        <p>{this.state.patterns[i].valueOne}</p>
                    </div>
                );
            } else if (this.state.patterns[i].type === "whiteSpace") {
                regex.push(
                    <div className="pattern-item">
                        <span
                            className="box"
                            style={{ color: this.state.patterns[i].color }}
                        ></span>
                    </div>
                );
            } else if (this.state.patterns[i].type === "numberRange") {
                if (
                    this.state.patterns[i].valueOne <= this.state.patterns[i].valueTwo
                ) {
                    regex.push(
                        <div
                            className="pattern-item"
                            style={{ color: this.state.patterns[i].color }}
                        >
                            <p>
                                [{this.state.patterns[i].valueOne} -{" "}
                                {this.state.patterns[i].valueTwo}]
              </p>
                        </div>
                    );
                } else {
                    regex.push(
                        <div
                            className="pattern-item"
                            style={{ color: this.state.patterns[i].color }}
                        >
                            <p>[INVALID NUMBER RANGE]</p>
                        </div>
                    );
                }
            } else if (this.state.patterns[i].type === "selectCharacters") {
                regex.push(
                    <div
                        className="pattern-item"
                        style={{ color: this.state.patterns[i].color }}
                    >
                        <p>[{this.state.patterns[i].valueOne}]</p>
                    </div>
                );

                for (let j = 1; j < this.state.patterns[i].valueTwo; ++j) {
                    regex.push(
                        <div
                            className="pattern-item"
                            style={{ color: this.state.patterns[i].color }}
                        >
                            <p>[{this.state.patterns[i].valueOne}]</p>
                        </div>
                    );
                }
            }
        }

        /*regex.push(<div className="pattern-item">
            <p>Iphone</p>
        </div>);
        
        regex.push(<div className="pattern-item">
            <span className="box"></span>
        </div>);*/

        this.setState({
            regex: regex
        });

        // return regex;
    };
   
   
    handleChange(e) {
        this.setState({ text: e.target.value });
      } 

   

    loadPatterns = () => {

        var d = document.getElementById('savedPatterns');
        var h1= document.createElement('h1');
        h1.innerHTML= "Saved Patterns"
        var child = d.lastElementChild;
        while (child) {
            d.removeChild(child);
            child = d.lastElementChild;
        }



        let p;
        let s;

        for (var i = 0; i < this.state.patternString.length; i++) {
            s = this.state.patternString[i];
            p = document.createElement('h2');
            p.innerHTML = s;
            d.appendChild(p);
        }

    }

    //Loops out the default list
    displayDefault = () => {
        return this.state.defaultList.map((item, idx) => {
            return <h3 key={idx}>{item}</h3>;
        });
    };





    //Loops out the selected list
    displaySelected = () => {
        return this.state.selectedList.map((item, idx) => {
            return <h3 key={idx}>{item}</h3>;
        });
    };

    //Where you can take the input from the screen and apply the pattern
    applyPattern = (e, id) => {
        //Pattern Id
        //Value Name, can be the first input or second
        // console.log(e.target.name);

        //Value Of input
        // console.log(e.target.value);

        let tempPatterns = this.state.patterns;
        let regex = "^";
        let tempSelectedfiles = [];
        let listOfFiles = this.state.defaultList;

        for (let i = 0; i < tempPatterns.length; i++) {
            if (tempPatterns[i].id === id) {
                if (
                    tempPatterns[i].type === "userDefined" ||
                    tempPatterns[i].type === "whiteSpace"
                ) {
                    tempPatterns[i].valueOne = e.target.value;
                } else {
                    if (e.target.name === "valueOne") {
                        tempPatterns[i].valueOne = e.target.value;
                    } else {
                        tempPatterns[i].valueTwo = e.target.value;
                    }
                }
            }

            if (tempPatterns[i].type === "userDefined") {
                regex = regex.concat(tempPatterns[i].valueOne);
            }

            //If White Space
            if (tempPatterns[i].type === "whiteSpace") {
                regex = regex.concat("\\s");
            }
            // If number Range
            if (tempPatterns[i].type === "numberRange") {
                if (tempPatterns[i].valueOne <= tempPatterns[i].valueTwo) {
                    regex = regex.concat(
                        "[",
                        tempPatterns[i].valueOne,
                        "-",
                        tempPatterns[i].valueTwo,
                        "]"
                    );
                }
            }
            // If Character Select
            if (tempPatterns[i].type === "selectCharacters") {
                for (let j = 0; j < tempPatterns[i].valueTwo; ++j) {
                    regex = regex.concat("[", tempPatterns[i].valueOne, "]");
                }
            }
        }

        let regEx = new RegExp(regex);
        console.log("Regular expression is ", { regEx });

        listOfFiles.forEach(element => {
            //   console.log(element);
            if (element.match(regEx)) {
                tempSelectedfiles.push(element);
            }
        });

        this.setState({
            selectedList: tempSelectedfiles
        });
        this.displayRegex();
    };



    //Updates the type of pattern for each box
    updatePattern = (e, id) => {
        let tempPatterns = this.state.patterns;

        for (let i = 0; i < tempPatterns.length; i++) {
            if (tempPatterns[i].id === id.name) {
                tempPatterns[i].type = e.value;
                if (tempPatterns[i].type === "whiteSpace") {
                    tempPatterns[i].valueOne = "";
                    tempPatterns[i].valueTwo = "";
                } else if (tempPatterns[i].type === "numberRange") {
                    tempPatterns[i].valueOne = 0;
                    tempPatterns[i].valueTwo = 9;
                } else if (tempPatterns[i].type === "selectCharacters") {
                    tempPatterns[i].valueTwo = 1;
                }
            }
        }

        this.setState({
            patterns: tempPatterns
        });

        this.applyPattern(e, id);
        this.displayRegex();
    };

    //Used to create a new pattern option
    //NOTE: when removing patterns dont touch this.state.usedColors, it's suppose to be unqiue
    addPatterns = e => {
        e.preventDefault();

        var colorArray = [
            "#FF6633",
            "#FF33FF",
            "#00B3E6",
            "#E6B333",
            "#3366E6",
            "#999966",
            "#99FF99",
            "#B34D4D",
            "#80B300",
            "#809900",
            "#E6B3B3",
            "#6680B3",
            "#66991A",
            "#FF99E6",
            "#CCFF1A",
            "#FF1A66",
            "#E6331A",
            "#33FFCC",
            "#66994D",
            "#B366CC",
            "#4D8000",
            "#B33300",
            "#CC80CC",
            "#66664D",
            "#991AFF",
            "#E666FF",
            "#4DB3FF",
            "#1AB399",
            "#E666B3",
            "#33991A",
            "#CC9999",
            "#B3B31A",
            "#00E680",
            "#4D8066",
            "#809980",
            "#E6FF80",
            "#1AFF33",
            "#999933",
            "#FF3380",
            "#CCCC00",
            "#66E64D",
            "#4D80CC",
            "#9900B3",
            "#E64D66",
            "#4DB380",
            "#FF4D4D",
            "#99E6E6",
            "#6666FF"
        ];

        let selectColors = colorArray[this.state.usedColors];
        let tempPatterns = this.state.patterns;

        let order = 0;

        for (let i = 0; i < tempPatterns.length; i++) {
            if (tempPatterns[i].order >= order) {
                order = tempPatterns[i].order + 1;
            }
        }

        let pattern = {
            id: this.state.usedColors,
            order: order,
            type: "userDefined",
            valueOne: "",
            valueTwo: "",
            color: selectColors
        };

        tempPatterns.push(pattern);

        //Dont remove colors used !!!
        this.setState({
            patterns: tempPatterns,
            usedColors: this.state.usedColors + 1
        });

        this.displayRegex();
    };

    RemoveSpecificPattern = (e, index) => {
        e.preventDefault();

        let tempPatterns = [];

        for (let i = 0; i < this.state.patterns.length; ++i) {
            if (this.state.patterns[i].id !== index) {
                //console.log(i);
                tempPatterns.push(this.state.patterns[i]);
            }
        }

        //console.log(this.state.patterns)
        //console.log(tempPatterns)


        var count = 0;
        tempPatterns.forEach(element => {
            element.order = count;
            count++;
        });

        //Dont remove colors used !!!
        this.setState({
            patterns: tempPatterns,
            usedColors: this.state.usedColors
        }, () => {
            //console.log(this.state.patterns);
            this.forceUpdate();

            let id = this.state.usedColors;
            this.applyPattern(e, id);
            this.displayRegex();
        });

    }

    RemovePattern = e => {
        e.preventDefault();
        let tempPatterns = this.state.patterns;
        tempPatterns.pop();

        //Dont remove colors used !!!
        this.setState({
            patterns: tempPatterns,
            usedColors: this.state.usedColors
        });

        let id = this.state.usedColors;

        this.applyPattern(e, id);
        this.displayRegex();
    };

    displayPatterns = () => {
        let patterns = [];
        let tempPatterns = this.state.patterns;

        //tempPatterns.sort((a, b) => (a.order < b.order) ? 1 : -1)

        tempPatterns.map((obj, idx) => {
            return patterns.push(
                <div
                    key={idx}
                    className="condition-item"
                    style={{ borderColor: obj.color }}
                >
                    <div className="pattern-info">
                        <div className="order">{obj.order}</div>
                        <div className="item-remove-btn" onClick={e => this.RemoveSpecificPattern(e, obj.id)}>
                            <Remove />
                        </div>
                    </div>
                    <div className="select-pattern">
                        <div className="select-content">
                            <Select
                                onChange={this.updatePattern}
                                options={options}
                                name={obj.id}
                                value={this.getType(obj.id)}
                                defaultValue={{ value: "userDefined", label: "User Defined" }}
                            />
                        </div>
                        <div className="info-icon"><Info /></div>
                    </div>
                    <div className="input-pattern">{this.inputDisplay(obj.id)}
                        <div className="color-circle" style={{ backgroundColor: obj.color }}></div>
                    </div>
                </div>
            );
        });

        return patterns;
    };


    getType = id => {
        for (let i = 0; i < this.state.patterns.length; i++) {
            if (this.state.patterns[i].id === id) {
                //If User Defined is selected
                if (this.state.patterns[i].type === "userDefined") {
                    return { value: "userDefined", label: "User Defined" };
                }
                else if (this.state.patterns[i].type === "whiteSpace") {
                    return { value: "whiteSpace", label: "White Space" };
                }
                else if (this.state.patterns[i].type === "numberRange") {
                    return { value: "numberRange", label: "Number Range" };
                }
                else if (this.state.patterns[i].type === "selectCharacters") {
                    return { value: "selectCharacters", label: "Select Characters" };
                }
            }
        }
    };
    //displaySavedPatt

    inputDisplay = id => {
        let tempPatterns = this.state.patterns;

        let inputReturn;

        for (let i = 0; i < tempPatterns.length; i++) {
            if (tempPatterns[i].id === id) {
                //If User Defined is selected
                if (tempPatterns[i].type === "userDefined") {
                    inputReturn = (
                        <div className="pattern-content">
                            <input
                                type="text"
                                name="valueOne"
                                value={tempPatterns[i].valueOne}
                                onChange={e => this.applyPattern(e, id)}
                            ></input>
                        </div>
                    );
                }

                //If White Space
                if (tempPatterns[i].type === "whiteSpace") {
                    inputReturn = (
                        <div className="pattern-content">

                            <input
                                disabled
                                name="valueOne"
                                value=""
                                onChange={e => this.applyPattern(e, id)}
                            ></input>
                        </div>
                    );
                }
                // If number Range
                if (tempPatterns[i].type === "numberRange") {
                    inputReturn = (
                        <div className="pattern-content">

                            <input
                                type="number"
                                className="range-a"
                                defaultValue="0"
                                value={tempPatterns[i].valueOne}
                                name="valueOne"
                                min="0"
                                max="9"
                                onChange={e => this.applyPattern(e, id)}
                            ></input>
                            <span>-</span>
                            <input

                                type="number"
                                className="range-b"
                                defaultValue="9"
                                value={tempPatterns[i].valueTwo}
                                name="valueTwo"
                                min="0"
                                max="9"
                                onChange={e => this.applyPattern(e, id)}
                            ></input>
                            <div className="desc">
                                <h3>Min &nbsp; &nbsp; &nbsp; &nbsp; Max</h3>
                            </div>
                        </div>
                    );
                }
                // If Character Select
                if (tempPatterns[i].type === "selectCharacters") {
                    inputReturn = (
                        <div className="pattern-content">

                            <input
                                type="text"
                                className="range-a"
                                name="valueOne"
                                value={tempPatterns[i].valueOne}
                                onChange={e => this.applyPattern(e, id)}
                            ></input>


                            <input
                                type="number"
                                className="range-b"
                                name="valueTwo"
                                defaultValue="1"
                                value={tempPatterns[i].valueTwo}
                                min="1"
                                onChange={e => this.applyPattern(e, id)}
                            ></input>
                            <div className="desc">
                                <h3>Number of times repeated</h3>
                            </div>

                        </div>
                    );
                }
            }
        }

        return inputReturn;
    };

    savePattern = () => {
        var tempPatterns = [];

        for (let i = 0; i < this.state.patterns.length; ++i) {
            console.log(i);
            tempPatterns.push(this.state.patterns[i]);
        }

        savedPatterns[numOfSaved] = tempPatterns;
        saveNames[numOfSaved] = tempSaveName;
        numOfSaved++;

        console.log(savedPatterns);
        console.log(saveNames);

        this.togglePopUp();
    };

    loadPattern = (e, id) => {
        let tempPattern = []

        for (let i = 0; i < savedPatterns[i].length; ++i) {
            //console.log(i);
            tempPattern.push(savedPatterns[id][i]);
        }

        this.setState({
            patterns: tempPattern
        }, () => {
            console.log(this.state.patterns);
            //this.forceUpdate();
            let id = this.state.usedColors;
            this.applyPattern(e, id);
            this.displayRegex();
        });
    }

    togglePopUp = () => {
        this.setState({toggleSaveScene: !this.state.toggleSaveScene});
    }

    displaySaves = () => {
        let patterns = [];
        let tempPatterns = saveNames;

        //tempPatterns.sort((a, b) => (a.order < b.order) ? 1 : -1)

        tempPatterns.map((obj, idx) => {
            return patterns.push(
                <h4 onClick={e => this.loadPattern(e, idx)}>{obj}</h4> //Onclick load function
            );
        });

        return patterns;
    };

    handleSaveNameChange (evt) {
        tempSaveName = evt.target.value;
        console.log(tempSaveName);
    }

    componentDidMount() { }
    render() {
        return (
            <div>
                <div className="menu-section">
                    <div className="menu-container">
                        <h2>Make A Pattern</h2>
                        <button
                            onClick={e => this.addPatterns(e)}
                            className="menu-add menu-btn"
                        >
                            <p>Add Condition</p>
                            <div className="add-icon"><Add /></div>

                        </button>
                        <button
                            onClick={e => this.RemovePattern(e)}
                            className="menu-add menu-btn"
                        >
                            <p>Remove Condition</p>
                        </button>
                    </div>

                    <div className="menu-container">
                        <button className="menu-add menu-btn">
                            <p>Dictionary</p>
                        </button>

                        <button className="menu-load menu-btn" 
                        onClick={() => this.loadPatterns()}
                        //onClick={e => this.loadPatterns(e)}
                        >
                            <p>Load Pattern Template</p>
                        </button>

                        <button
                            //onClick={e => this.savePattern()}
                            onClick={() => this.togglePopUp()}
                            className="menu-save menu-btn"
                        >
                            <p>Save Pattern Template</p>
                        </button>
                    </div>
                </div>

                <div className="condition-section">{this.displayPatterns()}</div>
                <hr />
                <br />
                <div className="pattern-section">
                    <div className="pattern-container">{this.state.regex}</div>
                </div>
                <br />
                
                <h1>Saved Patterns------</h1>
                <div id="savedPatterns">
                </div>
                <div className="files-section">
                    <br></br>
                    <div className="default-files" id="left">
                        <h1>Default Files------</h1>
                        <br />
                        {this.displayDefault()}
                    </div>
                    <br />
                    <div className="selected-files" id="right">
                        <h1>Select Files------</h1>
                        <br />
                        {this.displaySelected()}
                    </div>
                </div>


                {/* Save pop up  */}
                <div className={`pop-container ${this.state.toggleSaveScene ? "active-pop" :" "}`}>
                    <div className="save-popup">
                       
                        <div className="load-container">
                            <div className="saved-items">
                                {/* Each one should have an Onclick with a unique id attached to it*/}
                                {/* you can map out all you need */}
                                {/* <h4 onClick={}>Save001</h4> */}
                                {this.displaySaves()}
                            </div>
                        </div>

                        <div className="save-container">
                            <input
                                type="text"
                                onChange={ this.handleChange.bind(this)}
                                value={this.state.text}
                                className="save-input"
                                name="save"
                                //This will keep track of the temp save name
                                onChange={this.handleSaveNameChange}
                            ></input>
                            <button
                                //This on click method will use the temp save name to save the pattern under the name,
                                //but the saved object will still need a unique id   
                                onClick={() => this.savePattern()}
                                className=" menu-btn"
                            >
                                <p>Save Pattern</p>
                            </button> 
                        </div>
                        
                        <button className="close-pop" onClick={e => this.togglePopUp()}>
                            <p>Close</p> 
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default PartOne;
