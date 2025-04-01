import { ReactNode } from "react";

export interface IButtonProps {
  id: string;
}

export interface IButtonWithDeleteProps {
  id: string;
  onDelete: (id: string) => void;
}

export interface IApiResponse {
  success: boolean;
  message: string;
}

export interface IUserInfo {
  _id: string;
  name: string;
  role: string;
}

export interface IUserContextType {
  user: IUserInfo | null;
  login: (user: IUserInfo, rememberMe: boolean) => void;
  logout: () => void;
  loading: boolean;
}

export interface IVerifyResponse {
  success: boolean;
  user: IUserInfo;
}

export interface IAuthContextProps {
  children: ReactNode;
}

export interface IPrivateRoutesProps {
  children: ReactNode;
}

export interface IRoleBasedRoutesProps {
  children: ReactNode;
  requiredRole: string[];
}

export interface ILoginResponse {
  success: boolean;
  loginResponse: {
    token: string;
    user: {
      _id: string;
      name: string;
      role: string;
    };
  };
}

export interface ISettingFormValues {
  userId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IShowPasswordState {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

export interface ISidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}
