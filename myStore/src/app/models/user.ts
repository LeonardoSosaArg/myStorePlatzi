export interface User {
    id: number;
    email: string;
    password: string;
    name?:string;
    role?: 'customer' | 'admin';
}

export interface CreateUserDto extends Omit<User, 'id' | 'role'> {

}
