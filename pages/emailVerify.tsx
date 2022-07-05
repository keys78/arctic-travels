import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const emailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const router = useRouter()
  const x = router.query

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:3000/users/${x.id}/verify/${x.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [x]);

	return (
		<>
			{validUrl ? (
				<div>
					<h1>Email verified successfully</h1>
					<Link href="/login"><a >Login</a></Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default emailVerify;