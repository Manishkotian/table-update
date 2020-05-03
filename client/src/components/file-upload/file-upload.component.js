import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import './file-upload.component.css'

class FileUpload extends Component {
  constructor (props) {
		super(props)
		this.state = {
      drag: false
    }
	}

	dropRef = React.createRef()

	uploadFile = (e) => {
		this.props.uploadFileCallback( e.target.files[0])
	}

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
	}
	
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
	}
	
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.uploadFileCallback( e.dataTransfer.files[0])
      e.dataTransfer.clearData()
      this.dragCounter = 0    
    }
  }
  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
	}

  render() {
    return (
      <div className='file-upload' ref={this.dropRef}>
        {this.state.drag &&
          <div
						className='drag-container'
          />
        }
				<div className='text-container'>
					<Button
						variant="contained"
						component="label"
					>
						Upload File
						<input
							type="file"
							style={{ display: "none" }}
							name="imgUpload" accept='.txt' onChange={this.uploadFile}
						/>
					</Button>		
					<div className='drag-text'>Drag & Drap here</div>
				</div> 
			</div>
    )
  }
}

export default FileUpload;