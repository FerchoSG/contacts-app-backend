const {writeFileSync} = require('fs')
const {generateKeyPairSync} = require('crypto')

function genKeyPair(){
    const keyPair = generateKeyPairSync('rsa',{
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });

    writeFileSync(__dirname+'/id_rsa_pub.pem', keyPair.publicKey);
    writeFileSync(__dirname+'/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair()