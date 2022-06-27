import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'

const users = () => {
	const [validUrl, setValidUrl] = useState(false);
	const params = useParams()
    const router = useRouter()

	useEffect(() => {
        router.isReady && verifyEmailUrl();
	}, [router.isReady]);

    const verifyEmailUrl = async () => {
        try {
            const url = `http://localhost:4000/auth/${router.query.id}/verify/${router.query.token}`;
            const { data } = await axios.get(url);
        
            console.log(router.query.id)
            console.log(router.query.token)

            setValidUrl(true);
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    };

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

export default users;