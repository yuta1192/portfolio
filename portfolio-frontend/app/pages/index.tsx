import React, { FC } from "react";
import { GetStaticProps } from "next";
import Error from "next/error";

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
        {props.posts?.map((post) => (
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
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      props: {},
    };
  }

  return {
    props: {
      posts: json,
    },
  };
};

export default Home;
