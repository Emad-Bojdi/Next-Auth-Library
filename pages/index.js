
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'



export default function Home() {
  const { status } = useSession();

  const logOutHandler = async () => {
    await signOut();
  }

  return (
    <>
      <h1>Next Auth Credentials</h1>
      {status === "authenticated" ? (<>
        <button>
          <Link href="/dashboard">Dashboard</Link>
        </button>
        <button onClick={logOutHandler}>
          Log Out
        </button>
      </>) : null}
      {status === "unauthenticated" ? (<>
        <button>
          <Link href="/signup">Register</Link>
        </button>
        <button>
          <Link href="/signin">Sign In</Link>
        </button>
      </>) : null}
    </>
  )
}
