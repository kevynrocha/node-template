import { Router } from 'express';
// import verifyAuthentication from '../middlewares/verifyAuthentication';
import UserController from '../controllers/UserController';
import { validate } from '../middlewares/validateRequest';
import {
  showAndUpdateValidationRules,
  storeValidationRules,
} from '../validations/users.validations';

const router = Router();

router.get('/', UserController.index);
router.get('/:id', showAndUpdateValidationRules, validate, UserController.show);
router.post('/', storeValidationRules, validate, UserController.store);
router.put('/:id', UserController.update);
router.delete(
  '/:id',
  showAndUpdateValidationRules,
  validate,
  UserController.destroy,
);

export default router;
