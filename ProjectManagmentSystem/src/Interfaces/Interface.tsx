export interface ProjectInterface {
  creationDate: string;
  description: string;
  id: number;
  modificationDate: string;
  title: string;
  task: [];
}
export interface TaksInterface {
  creationDate: string;
  title: string;
  description: string;
  id: number;
  status: string;
  employee: Employee;
  project: ProjectInterface;
}

export interface Employee {
  userName: string;
  country: string;
  creationDate: string;
  email: string;
  id: number;
  imagePath: string | null;
  isActivated: boolean;
  isVerified: boolean;
  modificationDate: string;
  verificationCode: string;
}

export interface User {
  country: string;
  email: string;
  id: number;
  imagePath: string | null;
  isActivated: boolean;
  task: TaksInterface;
  userName: string;
  status: string;
  phoneNumber: string;
}
