import { gql } from "@apollo/client";
import classNames from "classnames";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import client from "../../apollo-client";
import { PostStatus, PostType } from "../../types";

const TableHead = ({ children }: { children?: string }) => (
  <th className="p-2 border-b border-slate-300">{children}</th>
);

const TableData = ({
  children,
  isLast,
}: {
  children: string | ReactElement;
  isLast: boolean;
}) => (
  <td
    className={classNames(
      "p-2  border-slate-300",
      isLast ? "border-0" : "border-b"
    )}
  >
    {children}
  </td>
);

const data = [
  {
    title: "How I build my website",
    type: "technical",
    duration: "5 min",
    postedOn: "03/03/2023",
  },
  {
    title: "How I build a better portfolio",
    type: "fun",
    duration: "10 min",
    postedOn: "10/03/2023",
  },
  {
    title: "Practicing guitar is fun",
    type: "fun",
    duration: "3 min",
    postedOn: "24/04/2023",
  },
];

export default function Blogs({ posts }: { posts: PostType[] }) {
  const router = useRouter();

  const handleClickPost = (slug: string) => () => {
    router.push(`blogs/${slug}`);
  };

  return (
    <div>
      <h1 className="text-4xl">Blogs</h1>
      <p>Where I write stuff</p>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Posted on</TableHead>
          </tr>
        </thead>
        <tbody>
          {posts.map((row, idx) => {
            const isLast = idx === data.length - 1;
            return (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={handleClickPost(row.slug)}
              >
                <TableData isLast={isLast}>
                  <Image
                    src="/portrait.jpg"
                    width={60}
                    height={40}
                    alt="Portrait of me"
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/portrait.jpg"
                    className="rounded-sm w-[60px] h-[40px] object-cover"
                  />
                </TableData>
                <TableData isLast={isLast}>{row.title}</TableData>
                <TableData isLast={isLast}>{row.postedOn}</TableData>
                <TableData isLast={isLast}>{row.postedOn}</TableData>
                <TableData isLast={isLast}>{row.postedOn}</TableData>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        posts(where: { status: { equals: "${PostStatus.PUBLISHED}" } }) {
          id
          title
          slug
          tags {
            id
            name
          }
          postedOn
        }
      }
    `,
  });

  return {
    props: {
      posts: data.posts,
    },
  };
};
