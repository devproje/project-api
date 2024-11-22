import { IconButton } from "@mui/joy";
import { MouseEvent } from "react";

export function CustomButton({
	icon,
	onClick
}: {
	icon: string;
	onClick?: (ev: MouseEvent<HTMLAnchorElement>) => void | undefined;
}) {	
	return (
		<IconButton onClick={onClick} sx={{
			width: "25px",
			height: "25px",
			color: "var(--foreground)",
			transitionDuration: "0.3s",
			backgroundColor: "transparent",
		}}>
			<i className={icon} />
		</IconButton>
	);
}
