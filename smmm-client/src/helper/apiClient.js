import axios from "axios";

import config from "../app.conf.json";

export default axios.create({
  baseURL: `${config.development.api_server.host}:${config.development.api_server.port}`
});
