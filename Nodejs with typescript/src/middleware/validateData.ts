import {body, check, param} from "express-validator";


const validateRegisterUser = () => {
    return [
        body('username')
            .escape()
            .notEmpty()
            .withMessage('User name is not empty')
            .isLength({min: 6,max:50})
            .withMessage('phải lớn hơn 6 và nhỏ hơn 50 ký tự')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Độ dài lớn hơn 6 ký tự')
            .notEmpty()
            .withMessage('Password is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
    ];
}

const validateLogin = () => {
    return [
        body('username')
            .escape()
            .notEmpty()
            .withMessage('User name is not empty')
            .isLength({min: 6,max:50})
            .withMessage('phải lớn hơn 6 và nhỏ hơn 50 ký tự')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Độ dài lớn hơn 6 ký tự')
            .notEmpty()
            .withMessage('Password is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
    ];
}

const validateIdFromParam = () => {
    return [
        param('id')
            .notEmpty()
            .withMessage('id param is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
    ];
}

const validateCreateServer = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('name is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
        body('address')
            .notEmpty()
            .withMessage('address is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
        body('password')
            .notEmpty()
            .withMessage('password is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
    ];
}

const validateUpdateServer = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage('id is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
        body('name')
            .notEmpty()
            .withMessage('name is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
        body('address')
            .notEmpty()
            .withMessage('address is not empty')
            .isAlphanumeric()
            .withMessage('chỉ được bao gồm chữ và số'),
    ];
}

export default{
    validateRegisterUser,
    validateLogin,
    validateCreateServer,
    validateIdFromParam,
    validateUpdateServer
};

