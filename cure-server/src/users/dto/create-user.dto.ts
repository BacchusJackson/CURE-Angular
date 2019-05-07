export class CreateUserDto {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly password: string;
    readonly displayName: string;
    readonly site: string;
    readonly clinic: string;
    readonly status: string;
}