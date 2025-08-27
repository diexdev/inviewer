import type React from "react"
import { useDispatch, useSelector} from 'react-redux'
import type { AppDispatch, RootState } from "../store/store"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { logout, setUser } from "../slices/userSlice"
import { getUserApi, verifyTokenApi } from "../consts"

interface ProtectedProps {
  children: React.ReactNode;
}

export function Protected({ children }: ProtectedProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(verifyTokenApi, {
          credentials: "include"
        });

        if (!res.ok) {
          setIsLoading(false);
        }

        if (!user) {
          const resUser = await fetch(getUserApi, {
            method: 'GET',
            credentials: 'include'
          });

          if (!resUser.ok) {
            dispatch(logout());
            return navigate('/');
          }

          const userData = await resUser.json();
          dispatch(setUser(userData));
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error de red o servidor:", err);
        dispatch(logout());
        setIsLoading(false);
        return navigate('/');
      }
    };

    checkAuth();
  }, [dispatch, user, navigate]);

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to={'/'} replace />;

  return <>{children}</>;
}