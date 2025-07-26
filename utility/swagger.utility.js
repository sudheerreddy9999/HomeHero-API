'use strict';

import swaggerUI from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'fs';
import logger from './logger.utility.js';

let swaggerDocument;
const yamlPath = './.openapi/openapi.docs.yaml';
if (fs.existsSync(yamlPath)) {
  swaggerDocument = yaml.parse(fs.readFileSync(yamlPath, 'utf8'));
} else {
  logger.error({ SwaggerOpenAPI: `Open API file doesn't exist in ${yamlPath}` });
}

const OpenApi = {
  serve: swaggerUI.serve,
  docPath: swaggerUI.setup(swaggerDocument),
};

export default OpenApi;
