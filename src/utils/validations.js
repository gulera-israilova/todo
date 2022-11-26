import {check} from 'express-validator';

export const registerValidation = [
    check('username','Username cannot be empty').notEmpty(),
    check('password','Minimum password length=5').isLength({
        min: 5,
    }),
];

export const todoValidation = [
    check('title','Title cannot be empty').notEmpty(),
];
