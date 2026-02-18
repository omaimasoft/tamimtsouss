module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");

  return {
    pathPrefix: "/tamimtsouss/",
    dir: {
      input: ".",
      includes: "_includes",
      output: "docs"
    }
  };
};
