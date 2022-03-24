import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

import { Article, PagedList } from "../interfaces";
import { markdownToHtml } from "../utils";

const sourceDir = join(`${process.cwd()}`, "_source");

export const paginate = (items: Array<any>, page: number, perPage: number) => {
  const total = items.length;
  const lastPage = Math.ceil(total / perPage);

  const from = (page - 1) * perPage;
  const to = from + (perPage - 1);

  const pagedList: PagedList<any> = {
    total,
    currentPage: page,
    lastPage,
    perPage: perPage,
    items: items.slice(from, to + 1),
  };
  return pagedList;
};

export class LocalDb {
  getArticleBySlug(locale: string, subpath: string, slug: string): Article {
    const path = `${locale}/${subpath}/${slug}.md`;
    return this.getArticleByPath(path);
  }

  getArticleByPath(path: any): Article {
    const filePath = `${sourceDir}/${path}`;
    let slug = filePath.replace(/^.*[\\\/]/, "").replace(".md", "");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    let article: Article = {
      slug,
      ...data,
      content,
    };
    return article;
  }

  getArticles(locale: string, subpath: string): Array<Article> {
    let filePaths = fs
      .readdirSync(`${sourceDir}/${locale}/${subpath}`)
      .map((v) => `${sourceDir}/${locale}/${subpath}/${v}`)
      .filter((v) => !fs.lstatSync(v).isDirectory());

    const articles: Array<Article> = [];

    for (let j = 0; j < filePaths.length; j++) {
      const filePath = filePaths[j];
      if (!filePath.includes(".md")) continue;
      let path = filePath.replace(sourceDir, "");
      const article: Article = this.getArticleByPath(path);
      articles.push(article);
    }
    return articles;
  }
}

export const localDb = new LocalDb();
