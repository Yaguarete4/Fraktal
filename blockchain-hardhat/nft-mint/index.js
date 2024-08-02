// const FormData = require("form-data")
// const fs = require("fs")
// const fetch = require("node-fetch")
// require("dotenv").config()

// const uploadFile = async (file) => {
//     try {
//         const data = new FormData()
//         data.append('file', fs.createReadStream(file))
//         data.append('pinataMetadata', '{"name": "FraktalCoin"}')
  
//         const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${process.env.PINATA_JWT}`
//             },
//             body: data
//         })
//         const resData = await res.json()
//         console.log("File uploaded, CID:", resData.IpfsHash)
//         return resData.IpfsHash
//     } catch (error) {
//         console.log(error)
//     }
// }

// const uploadMetadata = async (name, description, external_url, CID) => {
//     try {
//         const data = JSON.stringify({
//             name: name,
//             description: description,
//             external_url: external_url,
//             image: `ipfs://${CID}`,
//         })
//         const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.PINATA_JWT}`
//             },
//             body: data
//         })
//         const resData = await res.json()
//         console.log("Metadata uploaded, CID: ", resData.IpfsHash)
//         return resData.IpfsHash
//     } catch (error) {
//         console.log(error)
//     }
// }

// const mintNFT = async (CID, wallet) => {
//     try {
//         const data = JSON.stringify({
//             recipient: `polygon:${wallet}`,
//             metadata: `https://gateway.pinata.cloud/ipfs/${CID}`,
//         })
//         const res = await fetch("https://staging.crossmint.com/api/2022-06-09/collections/default/nfts", {
//             method: 'POST', // Añadido método POST
//             headers: {
//                 accept: "application/json",
//                 'Content-type': "application/json",
//                 'x-client-secret': `${process.env.CROSSMINT_SERVER_SECRET}`,
//                 'x-project-id': `${process.env.CROSSMINT_PROJECT_ID}`,
//             },
//             body: data
//         })
//         const resData = await res.json()
//         const contractAddress = resData.onChain.contractAddress // Corregido nombre de la variable
//         console.log("NFT minted, contract address:", contractAddress)
//         console.log(`View NFT at https://testnets.opensea.io/assets/mumbai/${contractAddress}`)
//     } catch (error) {
//         console.log(error)
//     }
// }

// const main = async (file, name, description, external_url, wallet) => {
//     try {
//         const imageCID = await uploadFile(file)
//         const metadataCID = await uploadMetadata(name, description, external_url, imageCID)
//         await mintNFT(metadataCID, wallet)
//     } catch (error) {
//         console.log(error)
//     }
// }

// main(
//     "./icono token.png",
//     "FraktalCoin",
//     "1 token = 1 abrazo",
//     "https://pinata.cloud",
//     "0x8CBC19A354E42b7b4765ab3342DAf9d834E56947"
// )


const FormData = require("form-data")
const fs = require("fs")
const fetch = require("node-fetch")
require("dotenv").config()

const uploadFile = async (file) => {
    try {
      const data = new FormData()
      data.append('file', fs.createReadStream(file))
      data.append('pinataMetadata', '{"name": "FraktalCoin"}')
  
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PINATA_JWT}`
        },
        body: data
      })
      resData = await res.json()
      console.log("File uploaded, CID:", resData.IpfsHash)
      return resData.IpfsHash
    } catch (error) {
      console.log(error)
    }
  }

const uploadMetadata = async (name, description, external_url, CID) =>{
    try {
        const data = JSON.stringify({
            name : name, 
            description: description,
            external_url: external_url,
            image: `ipfs://${CID}`,
        })
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PINATA_JWT}`
            },
            body: data
        })
        resData = await res.json()
        console.log("Metada uploaded, CID: ", resData.IpfsHash)
        return resData.IpfsHash
    } catch (error) {
        console.log(error)
    }
}

const mintNFT = async (CID, wallet) => {
    try {
        const data = JSON.stringify({
            recipient: `polygon:${wallet}`,
            metadata: `https://gateway.pinata.cloud/ipfs/${CID}`,
        })
        const res = await fetch("https://www.crossmint.com/api/2022-06-09/collections/default-polygon/nfts", {
            method: 'POST',
            headers: {
                accept: "application/json",
                'Content-type': "application/json",
                'x-client-secret': `${process.env.CROSSMINT_SERVER_SECRET}`,
                'x-project-id': `${process.env.CROSSMINT_PROJECT_ID}`,
            },
            body: data
        })
        resData = await res.json();
        // console.log(resData)
        const contractAddress = resData.onChain.contractAddress
        console.log("NFT minted, contract adress:", contractAddress)
        console.log(`View NFT at https://testnets.opensea.io/assets/mumbai/${contractAddress}`) 
    } catch (error) {
    console.log(error)
    }
}

const main = async (file, name, description, external_url, wallet) =>{
    try {
        const imageCID = await uploadFile(file)
        const metadataCID = await uploadMetadata(name, description, external_url, imageCID)
        await mintNFT(metadataCID, wallet)
    } catch (error) {
        console.log(error)
    }
}

main(
    "./icono token.png",
    "FraktalCoin",
    "1 token = 1 abrazo",
    "https://pinata.cloud",
    "0x8CBC19A354E42b7b4765ab3342DAf9d834E56947"
  )