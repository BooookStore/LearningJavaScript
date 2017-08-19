// #11.1 Access a Given Element and Find Its Parent and Child Elements
let basicInfoNode = document.getElementById('basicInfo');
let basicInfoParentNode = basicInfo.parentNode;
let basicInfoChildNodes = basicInfo.childNodes;

// #11.2 Accessing All div in the Web Page
let divNodes = document.getElementsByTagName('div');
console.assert(divNodes.item(0));

let basicInfoP = document.createElement("p");
basicInfoP.innerHTML = "description 002 inserted by js";
divNodes.item(1).appendChild(basicInfoP);

// #11.3 Discover All h1 Within an Article
// このやり方は動作が重いので、11.4のやり方を推奨
{
  // find all articles
  let articles = document.getElementsByTagName('article');

  // find all div in article
  for (let i = 0, len = articles.length; i < len; i++) {
    let articleTitleNode = articles[i].getElementsByTagName('h1');
  }
}

// #11.4 Discover all h1 in Articles Using the Selectors API
{
  {
    // article の間接的・直接的なh1子要素を取得
    let articleTitleNodes = document.querySelectorAll("article h1");
    console.assert(articleTitleNodes.length === 3);
  } {
    // article の直接的なh1子要素を取得
    let articleTitleNodes = document.querySelectorAll("article> h1");
    console.assert(articleTitleNodes.length === 2);
  } {
    // article の中で h1 要素の次に p となっている p を取得
    let articleParagraphs = document.querySelectorAll("h1 + p");
    console.assert(articleParagraphs.length === 1);
  } {
    // class 属性が article-title で付与されている要素を取得
    // 非推奨：getEementsByClassNameの方が高速
    let articleTitles = document.querySelectorAll('[class="articleTitles"]');
    console.log(articleTitles);
  }
}

// #11.6 Highlighting the First Paragraph in Every Element
{
  let paras = document.querySelectorAll('article> h1:first-of-type');
  for (let i = 0, len = paras.length; i < len; i++) {
    paras[i].setAttribute('style','background-color: #ffff00');
  }
}

// # 11.9 Creating an Array of All Elements of a Given Class
{
  let articleTitles = document.getElementsByClassName('article-title');
  console.log(articleTitles);
}
