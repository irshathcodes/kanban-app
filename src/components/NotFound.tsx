import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<>
			<h1>Route not found</h1>
			<Link to="/">Go to home</Link>
		</>
	);
}
