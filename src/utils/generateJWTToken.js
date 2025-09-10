// utils/generateJWTToken.ts
import { encode } from 'react-native-jwt-io';

export const generateJWTToken = () => {

  // const apiIss = import.meta.env.VITE_API_ISS;
  // const apiAud = import.meta.env.VITE_API_AUD;
  // const apiEmail = import.meta.env.VITE_API_EMAIL;
  // const apiSecret = import.meta.env.VITE_API_SECRET;


const apiUrl = window.RUNTIME_CONFIG.API_URL;
const apiIss = window.RUNTIME_CONFIG.ISS;
const apiAud = window.RUNTIME_CONFIG.AUD;
const apiEmail = window.RUNTIME_CONFIG.EMAIL;

 const apiSecret = window.RUNTIME_CONFIG.SECRET;





  const payload = {
    iss: `${apiIss}`,
    aud: `${apiAud}`,
    email: `${apiEmail}`,
    expiry: Math.floor(Date.now() / 1000) + 3600,
  };

  const secret = `${apiSecret}`;
  return encode(payload, secret);
};
