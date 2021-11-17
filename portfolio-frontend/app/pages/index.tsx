import React, { FC } from "react";
import { GetStaticProps } from "next";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Home: FC<Props> = (props) => {
  return (
    <div>
      <h2>POSTの一覧</h2>
      <table>
        {props.posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}.</td>
            <td>{post.title}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
  const json = await response.json();

  return {
    props: {
      posts: json,
    },
  };
};

export default Home;
