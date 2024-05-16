import {useEffect, useState} from "react";

export default function useScroll() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    function handleScroll(){
      setValue(window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return value;
}
