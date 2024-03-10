import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../reduxtoolkit/authSlice";
import { BASE_API_URL } from "../config/app";

const useSearchUser = (searchQuery, tokenFromLocal) => {
  const dispatch = useDispatch();
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const cacheSearchData = useSelector((store) => store.auth.searchUser);
  //fetch data;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cacheSearchData[searchQuery]) {
        setSearchSuggestion(cacheSearchData[searchQuery]);
      } else {
        if (searchQuery.length > 0) getSearchSuggestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    console.log("api call with ", searchQuery);
    const res = await fetch(`${BASE_API_URL}/api/users/${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromLocal}`,
      },
    });
    const resData = await res.json();
    dispatch(searchUser({ [searchQuery]: resData }));
    setSearchSuggestion(resData);
  };

  return searchSuggestion;
};

export default useSearchUser;
