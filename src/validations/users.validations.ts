import { body, param, check } from 'express-validator';

export const storeValidationRules = [
  body(['name', 'email', 'password'], 'Required').notEmpty(),
  check('email').isEmail(),
];

export const showAndUpdateValidationRules = [
  param('id')
    .notEmpty()
    .withMessage('Required')
    .isUUID()
    .withMessage(`It's not a UUID`),
];
