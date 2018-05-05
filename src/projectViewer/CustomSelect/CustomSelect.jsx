import React, { Component } from 'react'
import './CustomSelect.scss'

const l = console.log
l('')

class CustomSelect extends Component{

	constructor(props){
		super(props)

		this.state = {
			opened: false,
			selected: this.props.selectedScreenNum
		}

		this.onClickButtonHandler = this.onClickButtonHandler.bind(this)
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.openList = this.openList.bind(this)
		this.closeList = this.closeList.bind(this)
	}

	onClickButtonHandler(e){
		if(this.state.opened) this.closeList()
		else this.openList()	
	}

	onChangeHandler(e){
		if(!e.target || e.target.tagName !== 'LI') return
		l('li')	
	}

	openList(){
		this.setState({
			opened: true
		})
	}

	closeList(){
		this.setState({
			opened: false
		})
	}

	render(){
		l(this.props)

		let className = 'CustomSelect '
		if(this.state.opened) className += 'CustomSelect--opened'

		let screens = this.props.screens
		let selectedScreenNum = this.props.selectedScreenNum
		let selectedName = screens[selectedScreenNum].label || 	screens[selectedScreenNum].id

		let optionClassName = 'CustomSelect_option '

		return (
			<div className={className} onClick={this.onChangeHandler}> 
				<div className='CustomSelect_header'> 
					<span> {selectedName} </span>
					<div className='CustomSelect_button' onClick={this.onClickButtonHandler}> X </div>
				</div> 

				<ul className='CustomSelect_select'>
					{screens && 
						screens.map((screen, i) => {
							let name = screen.label || screen.id || i
							let optionClassNameCurrent = optionClassName
							if(this.props.selectedScreenNum === i) optionClassNameCurrent += 'CustomSelect_option--selected'
							
							return <li key={name} className={optionClassNameCurrent}> {name} </li>
						})
					}					
				</ul>
			</div>
		)
	}
}

export default CustomSelect