import { Link } from "react-router-dom";
import pageimage from "../../assets/image/page404.gif"
const PageNotFound = () => {

	return (


		<div className="flex justify-center items-center flex-col gap-6 min-h-screen">

			<img src="../../assets/image/page404.gif" alt="Page Not Found" className=" items-center" />

			<h1 className="text-2xl">Route to Home Page</h1>
			<Link to={'/'} className="border-green-300 bg-green-400 p-2 rounded-2xl  hover:scale-115 duration-150  " replace={true}>Home</Link >
		</div>

	);
};

export default PageNotFound;