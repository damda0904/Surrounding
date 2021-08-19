import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import {jwtSecretKey, salt} from '../secure/auth.js';




//회원가입
export async function signup(req, res) {
    const {userId, password, nickname, town} = req.body;

    const found = await userRepository.findById(userId);
    if(found) {
        return res.status(409).json({message: '이미 존재하는 아이디입니다'});
    }

    const hashed = await bcrypt.hash(password, salt);

    const user = await userRepository.createUser({
        userId,
        password: hashed,
        nickname,
        town
    })
    const token = createJwtToken(user);

    res.status(201).json({token});
}


//로그인
export async function login(req, res) {
    const {userId, password} = req.body;

    const user = await userRepository.findById(userId);
    if(!user) {
        return res.status(401).json({message: '아이디 또는 비밀번호가 틀립니다'})
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        return res.status(401).json({message: '아이디 또는 비밀번호가 틀립니다'})
    }

    const token = createJwtToken(user.userId);

    res.status(200).json({token});
}


//인증
export async function me(req, res) {
    const token = createJwtToken(req.userId)
    res.status(200).json({token});
}

function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecretKey);
}