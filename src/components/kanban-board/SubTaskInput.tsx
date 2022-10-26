import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";
import { CreateSubTask } from "../../models/Todos";
import Input from "../ui/Input";

interface Props {
	subTasks: CreateSubTask[];
	setsubTasks: React.Dispatch<React.SetStateAction<CreateSubTask[]>>;
}

const subTaskPlaceholders = ["eg: make coffee", "eg: drink coffee and smile"];

export default function SubTaskInput({ subTasks, setsubTasks }: Props) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const inputData = [...subTasks];
		inputData[index].subTask = e.target.value;
		setsubTasks(inputData);
	};

	const handleRemove = (index: number) => {
		const inputData = [...subTasks];
		inputData.splice(index, 1);
		setsubTasks(inputData);
	};
	return (
		<>
			{subTasks.map((input, i) => {
				return (
					<div key={i} className="flex  gap-2 items-center mb-4">
						<Input
							placeholder={subTaskPlaceholders[i]}
							className="mb-0"
							name={`subTask-${i}`}
							value={input.subTask}
							onChange={(e) => handleChange(e, i)}
						/>
						<XMarkIcon
							onClick={() => handleRemove(i)}
							className="w-5 h-5 text-slate-400"
						/>
					</div>
				);
			})}
		</>
	);
}
