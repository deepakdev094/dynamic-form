export interface UserData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender?: string;
  age?: number;
  testimonial?: string;
}

export interface Field {
  fieldName: string;
  type: string;
  value: string;
  options?: string[];
}
