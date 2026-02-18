module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");

  return {
    pathPrefix: "", // ✅ مهم: دومين جديد = root
    dir: {
      input: ".",
      includes: "_includes",
      output: "docs"
    }
  };
};
