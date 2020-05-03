import React, { Component } from 'react'
import { connect } from "react-redux";
import { splitFileValues } from '../../helper'
import { TableContainer, Table, TableBody, TableCell, Paper, TableRow } from '@material-ui/core'

import FileUpload from '../file-upload/file-upload.component';
import Header from '../header/header.component'
import ErrorDialog from '../error-dialog/error-dialog.component'

import './base-layout.component.css'

class BaseLayout extends Component {
  constructor (props) {
		super(props)
		this.state = {
			showUploadView: true,
			delimiter: ',',
			noOfLines: 2,
			showError: false,
			errorMessage: ''
    }
	}

	getTableValues = (fileData) => {
		const { fileDetails } = this.props
		let details = fileData && fileData.length ? fileData : fileDetails
		const { delimiter, noOfLines} = this.state
		if(delimiter && noOfLines && details && details.length) {
			splitFileValues(details, delimiter, noOfLines).then(result =>{
				this.props.setTableValue(result)
			})
			.catch(error => {
				this.setState({
					showError: true,
					errorMessage: 'Value not found for applied filters'
				}, () => {
					this.props.resetTableValue()
				})
			});
		}
	}

	onChangeDelimiter = (value) => {
		this.setState({
			delimiter: value
		}, () => {
			this.getTableValues()
		})
	}

	onChangeLine = (value) => {
		this.setState({
			noOfLines: value
		}, () => {
			this.getTableValues()
		})
	}

	uploadFile = (file) => {
		if(file.name.split('.')[1] === 'txt') {
			const data = new FormData() 
			data.append('file', file)
			fetch("/file/file-upload", { 
				method: "POST", 
				body: data,
			}) 
			.then(response => response.json())
			.then(data => {
				this.props.uploadFileSuccess(data.data)
				this.getTableValues(data.data)
				this.setState({
					showUploadView: false
				})
			})
			.catch(error => {
				this.setState({
					showError: true,
					errorMessage: 'File Not Found'
				})
				this.props.uploadFileFailure('File Not Found')
			});
		} else {
			this.setState({
				showError: true,
				errorMessage: 'Upload .txt file'
			})
		}
	}

	renderTableView = (tableValue) => {
		return (
			<div className='table-view'>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableBody>
							{tableValue.map((row, index) => (
								<TableRow key={index}>
									<TableCell align="left">{row}</TableCell>
									<TableCell align="left">{row}</TableCell>
									<TableCell align="left">{row}</TableCell>
									<TableCell align="left">{row}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)

	}

	render () {
		const { showUploadView, showError, errorMessage} = this.state
		const { fileDetails, tableValue } = this.props
		return (
			<div className='base-layout'>
				{fileDetails && fileDetails.length && !showUploadView ? <Header 
					onChangeDelimiterCallback={(delimiter) => this.onChangeDelimiter(delimiter)}
					onChangeLineCallback={(line) => this.onChangeLine(line)}
					uploadNewFileCallback={() => this.setState({showUploadView: true})}
					fileDetails={fileDetails}
				/> : null}
				{showUploadView && <FileUpload
					uploadFileCallback={(file) => this.uploadFile(file)}
				/>}
				{tableValue && tableValue.length && !showUploadView ? this.renderTableView(tableValue) : null}
				{showError && <ErrorDialog 
					errorMessage={errorMessage}
					handleClose={() => this.setState({showError: false, errorMessage: ''})}
				/>}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		fileDetails: state.fileDetails,
		tableValue: state.tableValue
	};
}

function mapDispatchToProps(dispatch) {
	return {
		uploadFileSuccess: (data) => dispatch({type: 'FILE_UPLOAD_SUCCESS', payload: data}),
		uploadFileFailure: (error) => dispatch({type: 'FILE_UPLOAD_FAILURE', payload: error}),
		setTableValue: (data) => dispatch({type: 'SET_TABLE_VALUE', payload: data}),
		resetTableValue: () => dispatch({type: 'RESET_TABLE_VALUE'}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);