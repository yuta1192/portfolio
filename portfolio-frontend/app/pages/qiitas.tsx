import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Qiita() {
  return (
    <>
      <Header />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <Footer />
    </>
  );
}
