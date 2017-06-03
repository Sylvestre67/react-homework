import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

export class Product extends Component {
	render(){
		return <div>{this.props.face} for ${this.props.price * 0.01}</div>;
	}
}