import React from "react";

type Props = {
  content: string;
};

const ArticleBody = ({ content }: Props) => {
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleBody;
