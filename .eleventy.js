const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const moment = require('moment');
const twitterText = require('twitter-text');
const markdownIt = require('markdown-it');
const fs = require('fs');

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('page', 'layouts/layouts.page.html');
  eleventyConfig.addLayoutAlias('post', 'layouts/layouts.post.html');
  eleventyConfig.addLayoutAlias('work', 'layouts/layouts.work.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/layouts.default.html');

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy({'src/_assets/fonts': 'fonts'});
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('cssrev', function cssrev(asset) {
    if (process.env.ELEVENTY_ENV === 'production'){
      const manifest = require('./dist/css/css-manifest.json');
      return manifest[asset];
    }
    return asset;
  });

  eleventyConfig.addFilter('autop', function autoParagraph(text) {
    return '<p>' + text.split(/\n\n+/).join('</p>\n<p>') + '</p>';
  });

  eleventyConfig.addFilter('tweet_time_to_iso', function(time) {
    return moment(time, 'ddd MMM D HH:mm:ss ZZ YYYY').toDate().toISOString();
  });

  eleventyConfig.addFilter('tweet_time_to_human', function(time) {
    const m = moment(time, 'ddd MMM D HH:mm:ss ZZ YYYY');
    if (m.year() === moment().year()) {
      return m.format('MMM D');
    }
    return m.format('MMM D, YYYY');
  });

  eleventyConfig.addFilter('twitter_text', function(tweet) {
    let linkedText = twitterText.autoLink(tweet.full_text, {
      urlEntities: tweet.entities.urls,
      target: '_blank',
      invisibleTagAttrs: 'class="u-visually-hidden"',
      usernameIncludeSymbol: true
    });

    tweet.entities.urls.forEach(function(entity) {
      linkedText = linkedText.replace(entity.url, entity.expanded_url);
    });

    return linkedText;
  });

  eleventyConfig.addShortcode('image', function(imageDataFile) {
    const imageFile = fs.readFileSync('./dist/figma-img' + imageDataFile);
    const image = JSON.parse(imageFile);

    return `<picture>
      <source srcset="${image.webpSrcset}" type="image/webp" sizes="100vw">
      <img src="${image.src}" srcset="${image.pngSrcset}" sizes="100vw" class="o-ratio__content">
    </picture>`;
  });

  eleventyConfig.addShortcode('card-image', function(imageDataFile) {
    const imageFile = fs.readFileSync('./dist/figma-img' + imageDataFile);
    const image = JSON.parse(imageFile);

    return `<picture>
      <source srcset="${image.webpSrcset}" type="image/webp" sizes="100vw">
      <img src="${image.src}" srcset="${image.pngSrcset}" sizes="100vw">
    </picture>`;
  });

  eleventyConfig.setLibrary('md', markdownIt({
    html: true,
    typographer: true
  }));

  return {
    dir: {
      input: './src',
      output: './dist'
    },
    passthroughFileCopy: true
  };
};
