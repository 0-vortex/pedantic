import * as Joi from 'joi';

export default Joi.object()
  .description('Environment variables validation schema')
  .keys({
    // optional
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    DEBUG: Joi.string(),
    HOST: Joi.string().ip({ version: 'ipv4' }).default('0.0.0.0'),
    PORT: Joi.number().port().default(3001),
  });
