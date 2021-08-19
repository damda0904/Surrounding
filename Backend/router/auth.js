import express from "express";
import 'express-async-errors';
import { body } from 'express-validator';
import {validate} from '../middleware/validator.js';
import * as authController from '../controller/authController.js';
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredential = [
    body('userId')
    .trim()
    .notEmpty()
    .withMessage('userId should be existed'),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('password should be at least 5 characters')
    .isLength({min:5})
    .withMessage('password should be at least 5 characters'),

    validate
]

const validateSignup = [
    ...validateCredential,

    body("nickname")
    .trim()
    .notEmpty()
    .withMessage('nickname should be existed'),

    body('town')
    .isArray({max: 3})
    .withMessage('town should be less than two'),

    validate
]

//회원가입
router.post('/signup', validateSignup, authController.signup);

//로그인
router.post('/login', validateCredential, authController.login);

//인증
router.get('/me', isAuth, authController.me);

export default router;