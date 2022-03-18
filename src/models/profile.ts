export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  profile_id: string;
  login: string,
  firstName: string | null,
  lastName: string | null,
  dateOfLoginAttempt: string,
  countOfLoginAttempts: string,
  forceChangePassword: string
}
