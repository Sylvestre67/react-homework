import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

import './Product.less';

export class Product extends Component {
	render(){
		return <div className="product-item"><code><pre>{this.props.face}</pre></code> for $ {this.props.price * 0.01}</div>;
	}
}