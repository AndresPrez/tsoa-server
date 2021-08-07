// import swaggerConfig from "src/swagger.config.json";
import swaggerJson from "src/swagger.json";

// const API_KEY_NAME = "apiKey";
const API_KEY_NAME = swaggerJson.components.securitySchemes.apiKey.name;
const JWT_SECRET = "secret";

interface IHost {
  name: string;
  scheme: string;
}

interface IConfig {
  entryRoute: string;
  host: IHost;
  port: number;
  apiKey: string;
  apiKeyName: string;
}

const config: IConfig = {
  entryRoute: "api",
  port: 3000,
  host: {
    scheme: "http",
    name: "localhost",
  },
  apiKeyName: API_KEY_NAME,
  apiKey: "anykey",
};

export default config;
