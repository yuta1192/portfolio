import React, { FC } from "react";
import { GetStaticProps } from "next";

type Test = {
  id: number;
  title: string;
};

type Props = {
  tests: Test[];
};

const Home: FC<Props> = (props) => {
  return (
    <div>
      <h2>Testの一覧</h2>
      <table>
        {props.tests.map((test) => (
          <tr key={test.id}>
            <td>{test.id}.</td>
            <td>{test.title}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("http://backend:3000/tests", { method: "GET" });
  const json = await response.json();

  return {
    props: {
      tests: json,
    },
  };
};

export default Home;
