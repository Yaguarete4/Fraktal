const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkN2I4Yjc5Ny1hZGZkLTRiNjAtOTA0OC04YzFhMTkzZTUzM2MiLCJlbWFpbCI6Im1hdGlhcy5idW5lc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDQ5NzU4NTliN2UxYTE5MzZiNDUiLCJzY29wZWRLZXlTZWNyZXQiOiJlZjNhNDI2Yzk5MGIzMmFhODc0MDJmM2IxZjY5Mzg3NzRmZWI0MmM5MmM4ODdlYjAzMTQ1ZjBjYWNmMGIyNTg2IiwiZXhwIjoxNzUwODc3MzAyfQ.WrmOc5N3_8gRmNKGIFRxCFP4z8fvKRZkFLjcNVgKmRA
const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
