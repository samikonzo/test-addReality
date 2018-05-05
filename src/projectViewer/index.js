import React, { Component } from 'react';
import ScreenViewer from './ScreenViewer/ScreenViewer'
import CustomSelect from './CustomSelect/CustomSelect'
import parsingInvalidJSON from './parsingInvalidJSON'
import './styles.scss';

const l = console.log
l('')

class App extends Component {

	constructor(props){
		super(props)

		let structure = parsingInvalidJSON(this.props.structure)

		this.state = {
			project: structure.project,
			modules: structure.modules,
			screens: structure.screens[0],
			selectedScreenNum: 0, 
		}

		this.handleScreenChange = this.handleScreenChange.bind(this)
	}

	componentWillReceiveProps(nextProps){
		//l(nextProps)

		let structure = parsingInvalidJSON(nextProps.structure)
		this.setState({
			project: structure.project,
			modules: structure.modules,
			screens: structure.screens[0],
			selectedScreenNum: 0, 
		})
	}

	handleScreenChange(e){
		this.setState({
			selectedScreenNum: e.target.value
		})
	}

  render() {
  	//let { width, height} = this.state.project
  	let screens = this.state.screens
  	let selectedScreen = this.state.screens && this.state.screens[this.state.selectedScreenNum]

  	return (
      <div className="projectViewer">
       {/* project size : {width} x {height}   */}

        {/*screens && 
        	<label className="projectViewer_screenSelectorLabel"> select screen 

	        	<select 
	        		value={this.state.selectedScreenNum} 
	        		onChange={this.handleScreenChange}
	        		className="projectViewer_screenSelector"
	        	> 

	        		{screens.map( (screen, i) => {
	        			let name = screen.label || screen.id
	        			return (
	        				<option key={name} value={i}> {name} </option>
	        			)
	        		})}

	        	</select>

        	</label>
        */}

        <ScreenViewer screen={selectedScreen} fullSize={this.state.project}/>
        
        <CustomSelect screens={screens} selectedScreenNum={this.state.selectedScreenNum} onChange={this.handleScreenChange}/>

        

      </div>
    );
  }
}

export default App;
