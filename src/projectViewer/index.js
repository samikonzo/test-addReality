/* @flow */

import React, { Component } from 'react';
import ScreenViewer from './ScreenViewer/ScreenViewer'
import CustomSelect from './CustomSelect/CustomSelect'
import parsingInvalidJSON from './parsingInvalidJSON'
import './styles.scss';

const l = console.log
l('')

type Props = {
	structure: string,
};

type State = {
	project: {
		width: number,
		height: number
	},
	modules?: [ {
		id: string,
		screens?: [ {
			id: string,
			label: string, // название сцены
			zones?: [ {
				id: string,
				w: number, // ширина
				h: number, // высота
				x: number, // смещение по оси X
				y: number // смещение по оси Y
			} ]
		} ]
	} ],

	screens?: [ { // dublicate for convenience
		id: string,
		label: string, // название сцены
		zones?: [ {
			id: string,
			w: number, // ширина
			h: number, // высота
			x: number, // смещение по оси X
			y: number // смещение по оси Y
		} ]
	} ],
	
	selectedScreenNum: number,
};

class App extends Component<Props, State> {

	constructor(props: Object){
		super(props)

		let structure = parsingInvalidJSON(this.props.structure)

		this.state = {
			project: structure.project,
			modules: structure.modules,
			screens: structure.screens[0],
			selectedScreenNum: 0, 
		};

		(this: any).handleScreenChange = this.handleScreenChange.bind(this)
	}

	componentWillReceiveProps(nextProps: Object){
		let structure = parsingInvalidJSON(nextProps.structure)

		this.setState({
			project: structure.project,
			modules: structure.modules,
			screens: structure.screens[0],
			selectedScreenNum: 0, 
		})
	}

	handleScreenChange(e: any){ // use any cuz flow dont wanna give me target.value 
		let newNum: number = e.target.value;

		if(newNum === this.state.selectedScreenNum) return

		this.setState({
			selectedScreenNum: newNum
		})
	}

  render() {
  	//let { width, height} = this.state.project
  	let screens = this.state.screens
  	let selectedScreen = this.state.screens && this.state.screens[this.state.selectedScreenNum]

  	return (
      <div className="projectViewer">
       {/* project size : {width} x {height}   */}

        <ScreenViewer screen={selectedScreen} fullSize={this.state.project}/>
        
        <CustomSelect screens={screens} selectedScreenNum={this.state.selectedScreenNum} onChange={this.handleScreenChange}/>

      </div>
    );
  }
}

export default App;
