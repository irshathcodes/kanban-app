import {useState} from 'react';
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";
import "./home.css";
import {useQuery} from '@tanstack/react-query';
import getAllTodos from '../../api/getAllTodos';


export default function Home() {
	const {data : allTodos, isLoading, } = useQuery(["fetch-all-todos"], () => getAllTodos());


	const allBoards = allTodos?.map((item) => item.kanbanBoard );

	const allStatus = allTodos?.map((todo) => todo.status)
	const uniqueStatus = [...new Set(allStatus)];


	return <>
	<div className="grid grid-cols-[300px_1fr] bg-neutral-900">
	<Sidebar allBoards={allBoards}  />
	<div>

	<Navbar />
	<main>
		{allTodos?.map((todo) => {
			return <>
			<section>
				<div>{todo.status}</div>
				<Card heading={todo.todoName} />
			</section>
			</>
		})}
	</main>
	{/* <Card heading="Create reddit videos" /> */}
	</div>
	</div>
		
	</>;
}
