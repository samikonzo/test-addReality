import React, { Component } from 'react'
import ScreenViewerZone from './ScreenViewerZone.jsx'

let l = console.log
l('')

class ScreenViewer extends Component{

	constructor(props){
		super(props)

		this.state = {
			selected: undefined,
		}

		this.mouseoverHandler = this.mouseoverHandler.bind(this)
		this.mouseoutHandler = this.mouseoutHandler.bind(this)
	}

	componentDidMount(){
		this.elem.addEventListener('mouseover', this.mouseoverHandler)
		this.elem.addEventListener('mouseout', this.mouseoutHandler)
	}

	componentWillUnmount(){
		this.elem.remvoeEventListener('mouseover', this.mouseoverHandler)
		this.elem.remvoeEventListener('mouseout', this.mouseoutHandler)
	}

	mouseoverHandler(e){
		var target = e.target
		if(!target) return

		// if no 'data-zone_id' attribute, search in parent 	
		while(target){
			if(target.hasAttribute('data-zone_id')){
				break;
			} else {
				target = target.parentElement
			}
		}	

		if(!target) return

		let zone_id = target.dataset.zone_id
		if(zone_id === this.state.selected) return

		this.setState({
			selected: zone_id
		})
	}

	mouseoutHandler(e){
		var target = e.relatedTarget
		
		if(!target) this.setState({ selected: undefined })

		// if no 'data-zone_id' attribute, search in parent 	
		while(target){
			if(target.hasAttribute('data-zone_id')){
				break;
			} else {
				target = target.parentElement
			}
		}	

		//if(!target) => selected: undefined
		if(!target) this.setState({ selected: undefined })
	}


	render(){
		let fullSize = this.props.fullSize
		let screen = this.props.screen
		//let name = screen && ( screen.label || 'id : ' + screen.id )

		// zones sort by area, then map with change values to procent 
		let zones = screen && screen.zones && screen.zones.sort( (z1, z2) => {
			return z2.w * z2.h - z1.w * z1.h
		}).map( (zone, i) => {
			return Object.assign({}, zone, {
				w: zone.w / fullSize.width * 100 + '%',
				x: zone.x / fullSize.width * 100 + '%',
				h: zone.h / fullSize.height * 100 + '%',
				y: zone.y / fullSize.height * 100 + '%',
				zIndex: i,
			})
		})

		// calculate padding bottom for size control
		let ratio = fullSize.height / fullSize.width;
		let paddingBottom = ratio * 100 

		//l('paddingBottom : ', paddingBottom)


		let maxHeight = document.documentElement.clientHeight * .5
		let maxWidth = maxHeight / ratio;
		//l('MAX HEIGHT : ', maxHeight) 
		//l('ratio :', ratio)

		return(
			<div className="ScreenViewer_wrapper" style={{maxWidth: maxWidth + 'px'}}> 
				
				<div className="ScreenViewer" ref={elem => this.elem = elem} style={{paddingBottom: paddingBottom + '%'}}>
					{zones &&
						zones.map(zone => {
							let zoneSelected = false

							if(this.state.selected === undefined){
								zoneSelected = true
							} else {
								if(zone.id.toString() === this.state.selected) zoneSelected = true
							}

							return <ScreenViewerZone key={zone.id} zone={zone} selected={zoneSelected}/>
						})
					}
				</div>

				{/* name && 
					<div className="ScreenViewer_label">{name}</div>
				*/}
			</div>
		)
	}
}

export default ScreenViewer