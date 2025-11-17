import LibGenerateTestUserSig from './lib-generate-test-usersig-es.min.js';

let SDKAPPID = 0;
let SECRETKEY = '';

/**
 * Expiration time for the signature, it is recommended not to set it too short.
 * Time unit: seconds
 * Default time: 7 x 24 x 60 x 60 = 604800 = 7 days
 */
const EXPIRETIME = 604800;

/**
 * genTestUserSig function
 * Generates a test user signature using the provided user ID, SDK App ID, and Secret Key.
 * @param {object} params - The parameters for generating the user signature.
 * @param {string} params.userID - The user ID for which to generate the signature.
 * @param {number} params.SDKAppID - The SDK App ID.
 * @param {string} params.SecretKey - The Secret Key.
 * @returns {object} - An object containing the SDK App ID and the generated user signature.
 */
export function genTestUserSig({ userID, SDKAppID, SecretKey }) {
  if (SDKAppID) SDKAPPID = SDKAppID;
  if (SecretKey) SECRETKEY = SecretKey;
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);

  return {
    SDKAppID: SDKAPPID,
    userSig,
  };
}

export default genTestUserSig;