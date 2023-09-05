// Node.js program to demonstrate the  
// crypto.privateEncrypt() method 
  
// Including crypto and fs module 
const crypto = require('crypto'); 
const fs = require("fs"); 
  
// Using a function generateKeyFiles 
function generateKeyFiles() { 
  
    const keyPair = crypto.generateKeyPairSync('rsa', { 
        modulusLength: 520, 
        publicKeyEncoding: { 
            type: 'spki', 
            format: 'pem'
        }, 
        privateKeyEncoding: { 
        type: 'pkcs8', 
        format: 'pem', 
        cipher: 'aes-256-cbc', 
        passphrase: ''
        } 
    }); 
       
    // Creating private key file  
    // fs.writeFileSync("private_key", keyPair.privateKey); 
	console.log(keyPair);
} 
  
// Generate keys 
generateKeyFiles(); 