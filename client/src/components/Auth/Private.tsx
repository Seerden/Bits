import { useAuth } from "hooks/useAuth";
import Login from "./Login";

type PrivateProps = {
    children: React.ReactChildren | React.ReactChild
}

const Private = (props: PrivateProps) => {
    const { currentUser } = useAuth();
    
    return (
        <>
            { currentUser 
                ? props.children
                : <Login />
            }
        </>
    )
}

export default Private