import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

export class Ad extends Component {
	render(){
		return (
			<div>
				<img className="ad" src="/ad/?r=' {this.props.key} '"/>
			</div>
		)
	}
}
