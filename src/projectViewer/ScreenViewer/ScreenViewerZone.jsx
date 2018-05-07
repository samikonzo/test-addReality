import React, { Component } from 'react'

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

		let className = 'ScreenViewerZone '
		if(this.props.selected) className += 'ScreenViewerZone--selected '

		//l(label,width,height,xOffset,yOffset, zIndex)


		return(
			<div className={className} style={styleObj} selectable="true" data-zone_id={this.props.zone.id}>
				<div className="ScreenViewerZone_label">{label}</div>
			</div>
		)
	}
}

export default ScreenViewerZone