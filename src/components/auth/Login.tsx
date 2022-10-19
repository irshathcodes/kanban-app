import { useState, useEffect } from "react";
import request from '../../utils/axios-instance';
import {useNavigate} from 'react-router-dom';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

      request.post("/auth/login", {email, password}).then((res) => {  
         const username = res.data
         navigate("/", {state: username, replace: true});
      }).catch((err) => {
         if(err.response.status === 401){
            setError(err.response.data.msg);
         }
      })
	};

   useEffect(() => {
      const timeout = setTimeout(() => {
         setError("");
      }, 3000)

      return () => {
         clearTimeout(timeout);
      }
   }, [error])
	return (
		<>
			<div className="flex h-screen flex-col items-center bg-gray-50 pt-20 ">
				<div className="w-96 rounded-md border border-gray-200 px-6 py-6 ">
					<h1 className="py-2 text-center text-2xl font-bold ">
						Sign in to your account
					</h1>
					<form onSubmit={handleSubmit}>
						<div className="my-4 flex flex-col gap-1">
							<label
								htmlFor="email"
								className="text-[15px] font-semibold text-slate-600"
							>
								email
							</label>
							<input
								type="email"
								name="email"
								required
								className="rounded border-2 border-slate-300 px-2 py-[3px] focus:outline-primary-500"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								placeholder="example@gmail.com"
							/>
						</div>
						<div className="my-4 flex flex-col gap-1">
							<label
								htmlFor="password"
								className="text-[15px] font-semibold text-slate-600"
							>
								password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="rounded border-2 border-slate-300  px-2 py-[3px] focus:outline-primary-500"
							/>
						</div>

						<button
							type="submit"
							className="my-4 w-full rounded bg-primary-600 py-1 font-semibold text-slate-100 ring-primary-100 focus:outline-primary-100 focus:ring-2"
						>
							Sign in
						</button>
					</form>

               {error && <p className="text-center text-red-600">{error}</p>}
				</div>
			</div>
		</>
	);
}
