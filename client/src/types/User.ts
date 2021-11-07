export type User = {
    username: string,
    userId: string,
    password: string,
}

export type NewUser = {
	username?: string;
	password?: string;
	repeatPassword?: string;
};

export type UserResponse = Omit<User, 'password'>