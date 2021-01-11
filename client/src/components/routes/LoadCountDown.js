import React from 'react';
import {useHistory} from 'react-router-dom';

const LoadCountDown = () =>{
    const [count,setCount] = React.useState(5);
    const history = useHistory();

    React.useEffect(() => {
        const inter = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && history.push("/")
        return () => clearInterval(inter);
    })

    return(
        <div className="container p-5 text-center">
            <p className="display-3">Not Authorized</p>
            <p className="display-4">Redirecting You In {count} Seconds</p>
        </div>
    )
}

export default LoadCountDown;