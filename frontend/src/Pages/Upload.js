import React from 'react'

class UploadPage extends React.Component {
  state = {
    userFiles: null
  }

  // grabs selected files and stores array in state userFiles
  fileSelectHandler = event => {
    this.setState({
      userFiles: event.target.files
    }, () => this.printFiles(this.state.userFiles))
  }

  printFiles = files => {
    for(var i = 0; i < files.length; ++i) {
      console.log("File:", files[i])
    }
    // console.log(this.state.userFiles[0])
  }

  // uploadFiles = _ => {
  //   const files = this.state.userFiles;
  //   fetch(`http://localhost:9000/upload`)
  //   .then(response => response.json())
  //   .then(this.getFiles)
  //   .catch(err => console.err(err))
  // }

  render() {
    return (
      <div>
        <h1>Insert file upload box here</h1>
        <input type="file" multiple={true} onChange={this.fileSelectHandler} />
      </div>
    );
  }
}

export default UploadPage;