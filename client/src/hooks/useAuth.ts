import { useLoginMutation } from "helpers/api/mutateLogin";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "state/auth";
import { Credentials } from "types/credentials";
import type { Maybe } from "../../../shared/types/Maybe";
import type { User } from "../../../shared/types/User";

export function useAuth() {
	const [currentUser, setCurrentUser] =
		useRecoilState<Maybe<Partial<User>>>(currentUserAtom);
	const { data, mutate, isSuccess } = useLoginMutation();
	const navigate = useNavigate();

	useEffect(() => {
		data && console.log(data);
	}, [data]);

	useEffect(() => {
		if (data && isSuccess) {
			setCurrentUser((c) => ({
				username: data.username,
				userId: data.userId,
			}));
			updateLocalStorageUser({
				action: "set",
				user: data,
			});
			navigate("/habits");
		}
	}, [data, isSuccess]);

	const login = useCallback(
		(credentials: Credentials) => {
			mutate(credentials);
		},
		[mutate]
	);

	const logout = () => {
		updateLocalStorageUser({ action: "remove" });
		setCurrentUser(null);
	};

	return {
		currentUser,
		login,
		logout,
	} as const;
};

type UpdateProps = {
	action: "set" | "remove";
	user?: any;
};

function updateLocalStorageUser({ action, user }: UpdateProps) {
	if (action === "set") {
		localStorage.setItem("currentUser", JSON.stringify(user));
	} else {
		localStorage.removeItem("currentUser");
	}
};
