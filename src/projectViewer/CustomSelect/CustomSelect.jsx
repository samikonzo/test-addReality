import React, { Component } from 'react'
import './CustomSelect.scss'

const l = console.log
l('')

const defaultScreenName = 'no scene name'


class CustomSelect extends Component{

	constructor(props){
		super(props)

		this.state = {
			opened: false,
			selected: this.props.selectedScreenNum,
			clickable: this.props.screens && this.props.screens.length > 1,
		}

		this.onClickButtonHandler = this.onClickButtonHandler.bind(this)
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.openList = this.openList.bind(this)
		this.closeList = this.closeList.bind(this)
		this.onClickOutOfSelect = this.onClickOutOfSelect.bind(this)
	}

	componentDidMount(){
		document.addEventListener('click', this.onClickOutOfSelect)
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.onClickOutOfSelect)
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			opened: false,
			selected: nextProps.selectedScreenNum,
			clickable: nextProps.screens && nextProps.screens.length > 1,
		})
	}

	onClickOutOfSelect(e){
		if(!this.state.opened) return
		if(!this.elem) return

		if(!this.elem.contains(e.target)){
			this.closeList()	
		}
	}

	onClickButtonHandler(e){
		if(!this.state.clickable) return
		if(this.state.opened) this.closeList()
		else this.openList()	
	}

	onChangeHandler(e){
		if(!e.target || e.target.tagName !== 'LI') return
		this.props.onChange(e)
		this.closeList()

	}

	openList(){
		if(!this.state.clickable) return

		this.setState({
			opened: true
		})
	}

	closeList(){
		if(!this.state.clickable) return
		this.setState({
			opened: false
		})
	}

	render(){
		let clickable = this.state.clickable
		let opened = this.state.opened

		let customSelectClass = 'CustomSelect '
		if(opened) customSelectClass += 'CustomSelect--opened '
		if(clickable) customSelectClass += 'CustomSelect--clickable '

		let headerClass = 'CustomSelect_header '
		if(clickable) headerClass += 'CustomSelect_header--clickable '	 

		let buttonClass = 'CustomSelect_button '
		if(opened) buttonClass += 'CustomSelect_button--opened'	

		let screens = this.props.screens
		let selectedScreenNum = this.props.selectedScreenNum
		let selectedName = screens && (screens[selectedScreenNum].label || screens[selectedScreenNum].id)

		let optionClassName = 'CustomSelect_option '

		return (
			<div className={customSelectClass} onClick={this.onChangeHandler} ref={elem => this.elem = elem}> 

				<div className={headerClass} onClick={this.onClickButtonHandler}> 
					<span> {selectedName || defaultScreenName} </span>

					{ clickable && 
						<div className={buttonClass}></div> 
					}
				</div> 

				{ clickable &&
					<ul className='CustomSelect_select'>
						{screens && 
							screens.map((screen, i) => {
								let name = screen.label || screen.id || i
								let optionClassNameCurrent = optionClassName
								if(this.props.selectedScreenNum === i) optionClassNameCurrent += 'CustomSelect_option--selected'
								
								return <li key={name} value={i} className={optionClassNameCurrent}> {name} </li>
							})
						}					
					</ul>
				}	
			</div>
		)
	}
}

export default CustomSelect