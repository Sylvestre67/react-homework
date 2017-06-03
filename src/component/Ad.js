import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

export class Ad extends Component {
	render(){
		return (
			<div>
				<img class="ad" src="/ad/?r=' {this.props.id} '"/>
			</div>
		)
	}
}
