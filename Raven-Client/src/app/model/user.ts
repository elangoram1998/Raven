export interface User {
    _id: string,
    avatar: string,
    username: string,
    email: string,
    profile_type: string,
    user_type: string,
    createdAt?: Date
}
