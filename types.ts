declare interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  interests: string[];
  bio: string;
  profilePictures: string[];
  location: string;
  telegramChatId: string;
}
