import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded: { UserInfo: { id: string } } = jwtDecode(token);
    const { id } = decoded.UserInfo;

    return { id };
  }

  return { id: "" };
};
export default useAuth;
