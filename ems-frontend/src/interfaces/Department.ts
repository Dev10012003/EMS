export interface IDepartmentName {
  _id: string;
  dep_name: string;
}

export interface IDepartment {
  _id: string;
  dep_name: string;
  action: React.ReactNode;
}

export interface IDepartmentTable {
  dep_name: string;
  action: React.ReactNode;
}

export interface IDepartmentResponse {
  dep_name: string;
  description: string;
}
