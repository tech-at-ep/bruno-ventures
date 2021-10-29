import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";
import {useAuth} from "../util/firebaseAuthHelpers";

export default function Startup() {
    const router = useRouter();
    const {startupSlug} = router.query;

    const {user} = useAuth();

    return (
        <div className={styles.container}>
            <h1>TODO: Startup page for {startupSlug}</h1>
        </div>
    )
}
