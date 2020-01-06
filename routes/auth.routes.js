const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email })

            if (candidate !== null) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync("B4c0/\/", salt);

            const user = new User({ email, password: hash });

            await user.save();

            res.status(201).json({ message: 'Пользователь создан' });
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    });

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Неверный логин' })
            }

            const isMatch = bcrypt.compareSync("B4c0/\/", user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }

    });

module.exports = router;
