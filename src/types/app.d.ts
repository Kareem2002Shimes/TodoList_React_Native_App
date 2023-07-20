export type ListItemProps = {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
};
export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
