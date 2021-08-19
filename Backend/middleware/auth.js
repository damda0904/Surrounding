import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import {jwtSecretKey} from '../secure/auth.js';

const AUTH_ERROR = {message: '인증에 실패했습니다'}

//요청을 수행하기 전, 요청을 수행할 자격이 있는지 확인(ex. delete, update...)
export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        jwtSecretKey,
        async (error, decoded) => {
            if(error) {
                return res.status(401).json(AUTH_ERROR);
            }

            const user = await userRepository.findById(decoded.id);
            if(!user) {
                return res.status(403).json(AUTH_ERROR);
            }
            req.userId = user.userId;
            next();
        }
    )
}