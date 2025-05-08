import AWS from 'aws-sdk';
import crypto from 'crypto';

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-south-1' // e.g. 'us-east-1'
});

const clientId = '1k59dj4ehuc7emhvdu10bip6k5';
const clientSecret = '1oadh6k44uas3jbjc5lkpevd30oql76u2vg2q5nearb8nrkeqhvr';

function generateSecretHash(username, clientId, clientSecret) {
  return crypto.createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64');
}

async function loginUser(username, password) {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: generateSecretHash(username, clientId, clientSecret)
    }
  };

  try {
    const response = await cognito.initiateAuth(params).promise();
    console.log('Login success:', response);
  } catch (err) {
    console.error('Login error:', err);
  }
}
