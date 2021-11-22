export type User = {
    username: string,
    userId: string,
    password: string,
}

export type UserWithoutPassword = Omit<User, "password">;