import React, { Component } from 'react'
import ScreenViewerZone from './ScreenViewerZone.jsx'
import './styles.scss'

let l = console.log
l('')

class ScreenViewer extends Component{

	constructor(props){
		super(props)

		this.state = {
			//selected: undefined,
		}

		//this.mouseoverHandler = this.mouseoverHandler.bind(this)
		//this.mouseoutHandler = this.mouseoutHandler.bind(this)
	}

	componentDidMount(){
		//this.elem.addEventListener('mouseover', this.mouseoverHandler)
		//this.elem.addEventListener('mouseout', this.mouseoutHandler)
	}

	componentWillUnmount(){
		//this.elem.remvoeEventListener('mouseover', this.mouseoverHandler)
		//this.elem.remvoeEventListener('mouseout', this.mouseoutHandler)
	}
/*
	mouseoverHandler(e){
	}

	mouseoutHandler(e){
	}
*/

	render(){
		l('SCREEN : ')
		l(this.props.screen)
		let fullSize = this.props.fullSize
		let screen = this.props.screen
		let name = screen && ( screen.label || 'id : ' + screen.id )

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

		//l(zones)
		//l(screen.zones)

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
						zones.map(zone => (
							<ScreenViewerZone key={zone.id} zone={zone}/>
						))
					}
				</div>

				{ name && 
					<div className="ScreenViewer_label">{name}</div>
				}
			</div>
		)
	}
}

export default ScreenViewer