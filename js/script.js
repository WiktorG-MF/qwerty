'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    console.log('pętla usunięcie');
    activeLink.classList.remove('active');
  }

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  let correctArticle = document.querySelector(articleSelector);
  console.log(correctArticle);

  correctArticle.classList.add('active');
}

// Generate Title Links
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListsSelector = '.list .tags', 
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  /* ... */
  document.querySelector(optTitleListSelector).innerHTML = '';
  /* find all the articles and save them to variable: articles */
  /* ... */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for(let article of articles){
    /* get the article id */
    /* ... */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* ... */
    const articleTitle = article.querySelector(optTitleSelector);
    /* get the title from the title element */
    /* ... */
    const titleContent = articleTitle.innerHTML;
    /* create HTML of the link */
    /* ... */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + titleContent + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;
  }
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
// generateTitleLinks();
function calculateTagsParams(tags){
  const params = {max : 0, min : 999999};
  for(let tag in tags){
    console.log(tag+ 'is used' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function generateTags(){
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    console.log('sprawdzam sprawdzam 1');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */}
  const tagList = document.querySelector('.tags');
  // tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
  console.log('brzoza jak mnie słyszysz');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams)
  let allTagsHtml = '';

  for(let tag in allTags){
    allTagsHtml += '<li><a href=#tag-' + tag + '>' + tag + ' (' + allTags[tag] + ')</a></li>';
  }
  console.log(allTagsHtml);
    
  tagList.innerHTML = allTagsHtml;
    
}
calculateTagClass(count, params);
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTags of activeLinks){
    /* remove class active */
    activeTags.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalHref = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let tags of equalHref){

    /* add class active */
    tags.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('[href^="#tag-"]');
  console.log('coś');
  console.log(allTagsLinks);
  /* START LOOP: for each link */
  for(let link of allTagsLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */}
}

addClickListenersToTags();

function generateAuthor(){
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  console.log('pierwsze');

  for(let authorin of articles){
    const authorWrapper = authorin.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);
    console.log('dugie');
    let html = '';
    const articleAuthor = authorin.getAttribute('data-author');
    console.log(articleAuthor);
    console.log('trzecie');
    const linkHTML ='<ul><li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li></ul>';
    console.log(linkHTML);
    html = html + linkHTML;
    console.log(html);
    authorWrapper.innerHTML = html;
  }
}

generateAuthor();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for(let activeauthor of activeLinks){
    /* remove class active */
    activeauthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalHref = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let authors of equalHref){
    /* add class active */
    authors.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const allAuthorLinks = document.querySelectorAll('[href^="#author"]');
  console.log('coś');
  console.log(allAuthorLinks);
  /* START LOOP: for each link */
  for(let link of allAuthorLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */}
}

addClickListenersToAuthors();

