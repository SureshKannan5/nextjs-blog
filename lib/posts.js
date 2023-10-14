import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getSortedPostData() {
  const postDirectory = path.join(process.cwd(), "posts");
  console.log("postDirectory", postDirectory);

  const fileNames = fs.readdirSync(postDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data, // Assuming data contains the metadata you want
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}
