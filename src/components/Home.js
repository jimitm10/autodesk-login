import React, {useEffect} from 'react';

function Home(props) {
    useEffect(() => {
        console.log(props);
        if (props.user.username === "") {
            props.history.push("/");
        }
      }, [props]);
    return(
        props.user.username && (
        <div className="alert alert-primary" role="alert">
            User successfully Logged in.
        </div>
        )
    );
}

export default Home;
