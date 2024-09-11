import { useEffect, useState } from 'react'

const useFetch = (url : string) => {
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${url}`, {
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem("data", JSON.stringify(res.results));
            setStatus(true);
        });
      }, [])

    return {status};
}

export default useFetch