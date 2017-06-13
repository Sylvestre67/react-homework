import _ from 'lodash';
import moment from 'moment';

import React, { Component } from 'react'
import './Product.less';

export class Product extends Component {

	_renderPrice(){
		return(
			<p>
				Price: ${Number(this.props.price * 0.01).toFixed(2)};
			</p>
		)
	}

	_renderDate(){
		let date_diff = Math.floor(moment().diff(moment(this.props.date),'days',true));
		if(date_diff > 7){
			return <p>
					Date: {moment(this.props.date).format("dddd, MMMM Do YYYY")}
				</p>
		}
		if(date_diff <= 1){
			return <p>
					Date: {date_diff} Day ago.
				</p>
		}
		else{
			return <p>
					Date: {date_diff} Days ago.
				</p>
		}
	}

	render(){
		return <div className="product-item">
					<code>
						<pre>{this.props.face}</pre>
					</code>
					{this._renderPrice()}
					{this._renderDate()}
				</div>;
	}
}