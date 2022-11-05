import React from "react";
import kanbanLogo from "../assets/kanban-logo.png";

export default function KanbanLogo(
	props: React.ImgHTMLAttributes<HTMLImageElement>
) {
	return (
		<img src={kanbanLogo} alt="kanban logo" width={24} height={24} {...props} />
	);
}
