module.exports = function (eleventyConfig) {

  // نسخ مجلد assets كما هو
  eleventyConfig.addPassthroughCopy("assets");

  // نسخ sitemap و robots
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    // مهم جداً لـ GitHub Pages (اسم الريبو)
    pathPrefix: "/tamimtsouss/"
  };
};
