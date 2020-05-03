import React, { Component } from 'react'
import {TextField, FormHelperText, Button} from '@material-ui/core'

import './header.component.css'

class Header extends Component {
  constructor (props) {
		super(props)
		this.state = {
			showDelimiterError: false,
			showLineError: false,
			delimiter: ',',
			line: '2'
    }
	}

	onChangeDelimiter = (e) => {
		const text = e.target.value
		var regex = /^[A-Za-z0-9 ]+$/
		if(text && text.length === 1 &&!regex.test(text)) {
			const { showDelimiterError } = this.state
			if(showDelimiterError) {
				this.setState({
					showDelimiterError: false
				})
			}
			this.props.onChangeDelimiterCallback(text)
		} else {
			this.setState({
				showDelimiterError: true
			})
		}
	}

	onChangeLine = (e) => {
		const text = e.target.value
		if(text && !isNaN(text)) {
			const { showLineError } = this.state
			if(showLineError) {
				this.setState({
					showLineError: false
				})
			}
			this.props.onChangeLineCallback(text)
		} else {
			this.setState({
				showLineError: true
			})
		}
	}

	render () {
		const { showLineError, showDelimiterError } = this.state
		const { fileDetails } = this.props
		return (
			<div className='header'>
				{fileDetails && fileDetails.length ? <div className='filter-fields'>
					<div className='field'>
						<TextField
							label="Enter Delimiter"
							id="delimiter"
							onChange={this.onChangeDelimiter}
							defaultValue=','
						/>
						{showDelimiterError && <FormHelperText className='error-text'>Enter Valid delimiter value</FormHelperText>}
					</div>
					<div className='field'>
						<TextField
							label="Enter Number of Lines"
							id="line"
							onChange={this.onChangeLine}
							defaultValue='2'
						/>
						{showLineError && <FormHelperText className='error-text'>Enter Valid Number value</FormHelperText>}
					</div>
				</div> : null}
				<div className='file-upload-button'>
					<Button
						variant="contained"
						component="label"
						onClick={() => this.props.uploadNewFileCallback()}
					>
						Upload New File
					</Button>		
				</div> 
			</div>
		)
	}
}

export default Header