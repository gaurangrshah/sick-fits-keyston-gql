import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      {/* nav links */}
      <Link href="/"><a>home</a></Link>
      <Link href="/sell"><a>sell</a></Link>
    </div>
  )
}

export default Nav
