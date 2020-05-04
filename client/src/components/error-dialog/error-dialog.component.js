import React, { Component } from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'

import './error-dialog.component.css'

class ErrorDialog extends Component {
  render() {
		const { errorMessage } = this.props
		return (
			<Dialog onClose={() => this.props.handleClose()} aria-labelledby="simple-dialog-title" open={true} 
			maxWidth='sm' fullWidth>
				<DialogTitle id="simple-dialog-title">Error</DialogTitle>
				<div className='error-body'>
					{errorMessage}
				</div>
			</Dialog>
		)
	}
}
export default ErrorDialog;