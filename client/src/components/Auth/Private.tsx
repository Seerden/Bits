import { useAuth } from "hooks/useAuth";
import { useMemo } from "react";
import Login from "./Login/Login";

type PrivateProps = {
	children: React.ReactChildren | React.ReactChild;
};

const Private = (props: PrivateProps) => {
	const { currentUser } = useAuth();
	const isLoggedIn = useMemo(() => currentUser?.username?.length > 0, [currentUser]);

	return (
		<>
			{isLoggedIn ? (
				props.children
			) : (
				<>
					<Login message={"You need to be logged in to view this page"} />
				</>
			)}
		</>
	);
};

export default Private;
