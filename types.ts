declare interface CreateUserParams {
  username: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  interests: string[];
  bio: string;
  profilePictures: string[];
  location: any;
  telegramChatId: string;
}
