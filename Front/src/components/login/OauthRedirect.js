import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OauthRedirect = () => {
  const navigate = useNavigate();
  const getUrlParameter = (keyVal) => {
    keyVal = keyVal.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + keyVal + "=([^&#]*)");

    let results = regex.exec(window.location);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    const token = getUrlParameter("token");
    const error = getUrlParameter("error");
    if (token) {
      sessionStorage.setItem("accessToken", token);
      const getUserInfo = async (token) => {
        await axios
          .get("https://k7d204.p.ssafy.io/api/user", {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            sessionStorage.setItem("name", res.data.name);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("userCharacter", res.data.userCharacter);
            sessionStorage.setItem("visitedBefore", res.data.visitedBefore);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const getUserBadge = async (token) => {
        await axios
          .get("https://k7d204.p.ssafy.io/api/badge", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            sessionStorage.setItem("badges", JSON.stringify(res.data));
          });
      };

      getUserBadge(token);
      getUserInfo(token);
      navigate("/main/main");
    } else {
      console.log(error);
      navigate("/");
    }
  });
  return (
    <div>
      리다이렉트 페이지
      <div>Name : {sessionStorage.getItem("name")}</div>
      <div>email : {sessionStorage.getItem("email")}</div>
      <div>userCharacter : {sessionStorage.getItem("userCharacter")}</div>
      <div>accessToken : {sessionStorage.getItem("accessToken")}</div>
    </div>
  );
};

export default OauthRedirect;
