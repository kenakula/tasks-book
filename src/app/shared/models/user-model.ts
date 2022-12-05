import { MediaModel } from './media-model';

export interface UserModel {
  id: string;
  name?: string;
  subscribed?: boolean;
  userImage?: string | MediaModel;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
