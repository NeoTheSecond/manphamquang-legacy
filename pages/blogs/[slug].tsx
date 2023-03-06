import { gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import client from "../../apollo-client";
import { PostType } from "../../types";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import CustomDocumentRenderer from "../../components/DocumentRenderer";

const BlogDetail: NextPage<BlogDetailProps> = (props) => {
  return (
    <div className="pt-3">
      <h1>{props.post.title}</h1>
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
