const CryptoJS = require("crypto-js");

export const cryptoSecureStorage = (value, key) => {
  if (value !== null) {
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      key
    ).toString();
    return ciphertext;
  } else {
    return null;
  }
};

export const cryptoParseStorage = (value, key) => {
  if (value !== null || value !== "null") {
    var bytes = CryptoJS.AES.decrypt(value, key);
    return bytes;
  } else {
    return null;
  }
};

export const parseToJson = (value, key) => {
  const user = JSON.parse(
    cryptoParseStorage(value, key).toString(CryptoJS.enc.Utf8)
  );
  return user;
};
