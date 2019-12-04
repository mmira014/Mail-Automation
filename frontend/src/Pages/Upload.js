import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import MainBar from '../Components/MainBar'

// function logFileBin(event) {
//   console.log("logFileBin Output:\n",event.target.result);
//   return event.target.result
// }

class UploadPage extends React.Component {
  state = {
    userFiles: null,
    uploadDone: false,
    redirect:false
  }

  // grabs selected files and stores array in state userFiles
  fileSelectHandler = event => {
    
    // save files into userFiles[] and call upload function
    this.setState(
      {
        userFiles: event.target.files
      }, 
      () => this.uploadFiles())
  }

  printFiles = files => {
    for(var i = 0; i < files.length; ++i) {
      console.log("File:", files[i])
    }
    // console.log(this.state.userFiles[0])
  }

  // transfer user uploaded files into ./tempresources folder
  uploadFiles = async () => {
    // var reader = new FileReader();
    // var reader2 = new FileReader();

    // reader.addEventListener('load', logFileBin); // will call logFileBin when load complete
    // reader.addEventListener('load', logFileBin);

    // reader.readAsBinaryString(this.state.userFiles[0])
    // var strData = reader.readAsText(this.state.userFiles[0]);

    console.log("First File:", this.state.userFiles[0])
    // let fd = new FormData();
    let files = this.state.userFiles;
    let axiosArr = [];

    console.log("File:", files[0], "\nfiles[0].name", files[0].name)
    console.log("Num Files: ", files.length)
    
    for (var i = 0; i < files.length; ++i) {
      let fd = new FormData();
      fd.append('file', files[i], files[i].name) 
      
      const newPromise = axios({
        method: 'post',
        url: 'http://localhost:9000/upload', 
        data: fd,
      });
      axiosArr.push(newPromise);
    }

    console.log("TEST")
    await axios.all(axiosArr)
    .then((resolve, reject) => {
        // this.setState({uploadDone: true});
    })
    .catch((err) => {
      console.log("Error:", err);
    });
    console.log("DONE")
    alert("Files uploaded");
  }

  renderRedirect = () => {
    if(this.state.redirect) {
      console.log("redirecting!")
      return <Redirect to='/'/>
    }
    else {
      console.log("no redirect")
    }
  }

  processFiles = async(event) => {
    console.log("making fetch...")
    await fetch('http://localhost:9000/submitFile')
    .then((resolve, reject) => {
      console.log("Fetch made");
      alert("Processing Complete");
      this.setState({redirect:true}, this.renderRedirect);
    })
    .catch((err) => {
      alert("PROCESSING ERROR");
      console.log("processing error");
    })
  }

  render() {
    return (
      <div>
        {/* <h1>Insert file upload box here</h1> */}
        {this.renderRedirect()}
        <MainBar content={"Upload"}/>
        <input type="file" multiple={true} accept=".heic,image/*" onChange={this.fileSelectHandler} />
        <input type="button" value="Process" onClick={this.processFiles}/>
      </div>
    );
  }
}

export default UploadPage;