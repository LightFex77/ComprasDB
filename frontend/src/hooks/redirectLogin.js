import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useRedirectToLogin = () => {
  const history = useHistory();

  useEffect(() => {
    const empleadoGuardado = localStorage.getItem("empleado");
    !empleadoGuardado && history.push("/login");
  }, []);
};