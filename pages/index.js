
import Link from 'next/link'



export default function Home() {
  return (
    <>
      <h1>Next Auth Credentials</h1>
      <button>
        <Link href="/signup">Register</Link>
      </button>
      <button>
        <Link href="/signin">Sign In</Link>
      </button>
    </>
  )
}
