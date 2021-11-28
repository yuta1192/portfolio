import React, { FC } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

// type Post = {
//   id: number;
//   title: string;
// };

// type Props = {
//   posts: Post[];
// };

// const Home: FC<Props> = (props) => {
//   return (
//     <>
//       <div>
//         <h2>POSTの一覧</h2>
//         <table>
//           {props.posts?.map((post) => (
//             <tr key={post.id}>
//               <td>{post.id}.</td>
//               <td>{post.title}</td>
//             </tr>
//           ))}
//         </table>
//       </div>
//     </>
//   );
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
//   const json = await response.json();

//   // jsonが存在しない場合
//   if (!json) {
//     return {
//       props: {},
//     };
//   }

//   return {
//     props: {
//       posts: json,
//     },
//   };
// };

// export default Home;

export default function Home() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
