import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Login Auth API</h1>
      <nav>
        <ul>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
