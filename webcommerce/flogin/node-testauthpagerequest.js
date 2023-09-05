'use strict';

const appid = '50002TFS01'
const appsecret = 'd293rj1wx2qqkn44n615eyt73xj80w35';
const private_key_str = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALx3pq2z4LxhA2Ff5ZI8uvWATwGNyxgQqq2MHZdJ/85ElM15fmWRfapx5acOHFIpBADmUbopyNzfMAXTMNaOxUUcbaGTicE1ajAicjIl+cf5BPdblALMSMKuGO+J0cxA7toan4Umoy7o6wwpsSBVSSkpODnEzUAGrLJTVyJqok21AgMBAAECgYEApt1lRPwzKXbXkFpgn0aH3Z951A1f2PHAvCGHfZC2HUGZYgeEwpa7ZbKsO2mB57iK4+UITUR7pBszoKSo4/7KZu2mGidnK30ry1QhDmjI75Kwf8uMf5SUPENrj7bO9TBQeU6DbZqVpSVvPeoPYsZKeV/H37OMdEyT09rGu/p5K80CQQDpWM4I0dy3cmK8JUVFzMmyp7sKP3jhB1qw01L3PapmW/wlVYJFh5XW0l1rF/29JCoEOHasVFdP2d5UAF+Ybg/fAkEAzsN9VM7ZHL8My17th4NK7cBEZ4wWmuKHeD7O0WaorPOqZFwRj+I/usLlb/oZtK31/R1OcFxkKKL1CjGoeO3E6wJBAKZ2U4S3MV0snILbk69XiAuK3ENTREhDls7N8kGuHAEpXZbEiUpQjvPQ3hOn6bskMVURcpc9E4xDP/dszMVQvsECQQCLk5o6svwLlMj9TNLKJQ5i2uUShZYI7p0Gxld1Mnjxb/f5kdFlMRVWbRTXd5z8xGaHfM4juar/Z6pFPGp/X/sLAkBOvKZCUNbpJAd83eVOBw8B13UuVB8J+xO9jINtFHRa0mqUgegf3Bx05oLxJFQqhFJ7eAaZdvFKY7BzxquO8qcv';

const crypto = require('crypto');
const header = {
	'nonce': Math.floor(Math.random() * 100000000).toString(), 
	'timestamp': Date.now().toString(),
	'Content-Type': 'application/json', 
	'appId': appid
}


const body = {};
const body_str = JSON.stringify(body)
const arr = [header.appId, header.nonce, header.timestamp, appsecret, body_str]

// // Concat all items in the list to a single string
const data = arr.join('')

// // Use sha256 algorithm to generate a digest
var obj = crypto.createHash('sha256');
obj.update(data);
var digest=obj.digest();

// // Use rsa private key to generate a sign by encrypting the digest
var encrypted = crypto.privateEncrypt(private_key_str, digest).toString('hex')

// //Adding encrypted sign key to header.sign
// header.sign = encrypted;


