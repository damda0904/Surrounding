
//데이터베이스 연결 전 임시 데이터
//패스워드 : 12345
let tmpInfo = [
    {
        userId: 'test',
        password: '$2a$10$EqjqQ9HbFajTOWVs/0t5huupfHHkMtMPhBvquj.s73SjrbqtSnOq2',
        nickname: 'test',
        town: '청파동'
    }
]

export async function findById(id) {
    return tmpInfo.find((info) => info.userId === id);
}

export async function createUser(user) {
    tmpInfo.push(user)
    return user.userId;
}