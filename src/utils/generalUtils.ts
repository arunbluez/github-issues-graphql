import { remark } from "remark";
import html from "remark-html";

export const formatNumber = (num: number) => {
  return num > 1000 ? (num / 1000).toFixed(2) + "K" : num;
};

export const processMarkdownData = async (markdownStr: string) => {
  const processedContent = await remark().use(html).process(markdownStr);

  const contentHtml = processedContent.toString();

  return contentHtml;
};
