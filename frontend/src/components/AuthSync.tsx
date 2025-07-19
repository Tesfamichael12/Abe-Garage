"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, removeAuthState } from "@/features/auth/authSlice";
import { persistor } from "@/store/store";

const AuthSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.token) {
      dispatch(
        setAuthState({
          employee_id: session.user.employee_id,
          employee_email: session.user.employee_email,
          employee_first_name: session.user.employee_first_name,
          employee_role: session.user.employee_role,
          token: session.user.token,
        })
      );
    } else {
      dispatch(removeAuthState());
      persistor.purge();
    }
  }, [session, status, dispatch]);

  return null;
};

export default AuthSync;
