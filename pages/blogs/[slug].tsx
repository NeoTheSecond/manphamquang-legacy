import { gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import client from "../../apollo-client";
import { PostType } from "../../types";

const BlogDetail: NextPage<BlogDetailProps> = (props) => {
  return <div>{props.post.title}</div>;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface BlogDetailProps {
  post: PostType;
}

export const getStaticProps: GetStaticProps<BlogDetailProps, Params> = async ({
  params,
}) => {
  const slug = params?.slug;

  const { data } = await client.query({
    query: gql`
      query {
        post(where: { slug: "${slug}" }) {
          id
          title
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
      post: data.post,
    },
  };
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        posts {
          slug
        }
      }
    `,
  });

  return {
    paths: data.posts.map((postData: { slug: string }) => ({
      params: {
        slug: postData.slug,
      },
    })),
    fallback: false,
  };
}

export default BlogDetail;
