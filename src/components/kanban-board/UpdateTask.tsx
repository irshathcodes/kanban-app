import { Modal, Select } from "../ui/Index";
import { useLocation } from "react-router-dom";
import Todos from "../../models/Todos";

interface Props {}

export default function UpdateTask() {
	const { task, allStatus } = useLocation().state;
	const { todoName: taskName, description, subTasks } = task as Todos;

	return (
		<Modal>
			<div className="text-slate-200">
				<h1>{taskName}</h1>

				<p>{description}</p>

				{subTasks.map(({ _id, subTask, completed }) => {
					console.log(subTask);
					return (
						<div key={_id}>
							<input
								type="checkbox"
								id={`${subTask}-${_id}`}
								// checked={completed}
							/>
							<label htmlFor={`${subTask}-${_id}`}>{subTask}</label>
						</div>
					);
				})}

				<Select values={allStatus}></Select>
			</div>
		</Modal>
	);
}
