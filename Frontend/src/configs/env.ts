const dotEnvs = import.meta.env;

export const ENV = {
  BASE_API_URL: dotEnvs.VITE_CLIENT_API_BASE_URL,
};

export default ENV;
