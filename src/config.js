import pkg from '../package.json';

export const appVersion = pkg.version;

const MODE = process.env.REACT_APP_MODE || "DEV"
export const REACT_VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY || ""

export const REACT_APP_API = MODE === "DEV"
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

export const SOCKET_URL = MODE === "DEV"
  ? process.env.REACT_APP_SOCKET_URL_DEV
  : process.env.REACT_APP_SOCKET_URL_PROD;

export const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
export const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY

export const BUSSINES_IMAGE_BASE = "https://bbuohaidrgnmicuzaajd.supabase.co/storage/v1/object/public/bussines";
export const PLACES_IMAGE_BASE = "https://bbuohaidrgnmicuzaajd.supabase.co/storage/v1/object/public/places/images"