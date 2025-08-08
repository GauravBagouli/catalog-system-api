export const encryptData = (data: unknown): string => {
  try {
    const json = JSON.stringify(data);
    const uriEncoded = encodeURI(json);
    const base64Encoded = btoa(uriEncoded);
    return base64Encoded;
  } catch (error) {
    throw new Error('Data encryption failed');
  }
};

export const decryptData = <T = unknown>(data: string): T => {
  try {
    const base64Decoded = atob(data);
    const uriDecoded = decodeURI(base64Decoded);
    return JSON.parse(uriDecoded) as T;
  } catch (error) {
    throw new Error('Data decryption failed');
  }
};
