import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const checkGuest = (Component) => {
  function Wrapper(props) {
    const user = useSelector((store) => store.auth.user);

    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        navigate("/home");
      }
    }, [user]);

    return <Component {...props} />;
  }

  return Wrapper;
};

export default checkGuest;