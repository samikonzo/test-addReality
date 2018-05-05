import React, { Component } from 'react'
import './styles.scss'

const l = console.log
l('')
class ScreenViewerZone extends Component{
	render(){
		let {id:label, w:width, h:height, x:xOffset, y:yOffset, zIndex} = this.props.zone
		let styleObj = {
			width, height,
			left: xOffset,
			top: yOffset,
			zIndex,
		}

		//l(label,width,height,xOffset,yOffset, zIndex)


		return(
			<div className="ScreenViewerZone" style={styleObj} selectable="true">
				<div className="ScreenViewerZone_label">{label}</div>

			</div>
		)
	}
}

export default ScreenViewerZone