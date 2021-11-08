import { useAuth } from "hooks/useAuth";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import sc from "./header.module.scss";

export const useHeaderLinks = () => {
	const { currentUser, logout } = useAuth();
	const location = useLocation();

	const isActive = useCallback(
		(to) => {
			return location.pathname.slice(1) === to;
		},
		[location]
	);

	const links = useMemo(() => {
		const links: string[] = currentUser?.username
			? ["habits", "logout"]
			: ["login", "register"];

		return links.map((view) => (
			<NavLink
                key={Math.random()}
				end
				className={`${sc.Buttons__button}`}
				style={{
					backgroundColor: isActive(view) ? "deepskyblue" : "",
					color: isActive(view) ? "#111" : "azure",
				}}
				to={view === "logout" ? "habits" : view}
				onClick={
					view === "logout"
						? () => logout()
						: () => {
								return;
						  }
				}
			>
				{view[0].toUpperCase() + view.slice(1)}
			</NavLink>
		));
	}, [currentUser, location]);

	console.log(location.pathname);

	return links;
};
