import React from "react";
import { gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { DocumentRenderer } from "@keystone-6/document-renderer";

import client from "apollo-client";
import CustomDocumentRenderer from "components/DocumentRenderer";
import { PostType } from "types";

const BlogDetail: NextPage<BlogDetailProps> = (props) => {
  return (
    <div className="pt-3">
      <h1 className="mb-4 text-4xl text-bold">{props.post.title}</h1>
      <DocumentRenderer
        document={props.post.content.document}
        renderers={CustomDocumentRenderer}
      />
    </div>
  );
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
          content {
            document
          }
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