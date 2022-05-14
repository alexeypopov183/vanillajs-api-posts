const _URL = 'https://jsonplaceholder.typicode.com/posts';
const postsBlock = document.querySelector('.main__posts');
const buttonsPagination = document.querySelector('.footer__buttons-pagination');
const loader = document.querySelector('#loader');
const searchInput = document.querySelector('.header__search-input');
let currentPage = 1;
let postsArr;

const fetchPosts = async (url) => {
  try {
    const response = await fetch(`${url}?_page=${currentPage}&_limit=10`);
    return await response.json();
  } catch (e) {
    console.log(e)
  }
};

fetchPosts(_URL).then(posts => {
    postsArr = [...posts];
    postsMap(posts);
  });

const postsMap = (posts) => {
  posts.map(post => {
  getPostsBlock(post.id, post.title, post.body);
  })
  loader.classList.add('hide-loader');
};

const getPostsBlock = (id, title, body) => {
  let postHTML = `<div class="main__post">
                <p>${id}.</p>
                <div class="main__post-text">
                    <p class="post-text__title">${title}</p>
                    <p class="post-text__body">${body}</p>
                </div>
            </div>`
  postsBlock.innerHTML += postHTML;
};


const getButtonPagination = (numPages) => {
    let buttonsCount = 1;
    while(numPages >= buttonsCount) {
      let buttonHTML = `<button class="button-pagination">${buttonsCount}</button>`;
      buttonsPagination.innerHTML += buttonHTML;
      buttonsCount++;
    }
};
getButtonPagination(10);

const buttons = document.querySelectorAll('.button-pagination');

const load = (e) => {
  currentPage = e.currentTarget.textContent;
  postsBlock.innerHTML = null;
  loader.classList.remove('hide-loader');
  fetchPosts(_URL).then(posts => {
    postsArr = [...posts];
    postsMap(posts)
  });
}

for (let button of buttons) {
  button.addEventListener('click', load)
}

const search = (e) => {
  const value = e.target.value;
  let filterArr = [];
  postsArr.map(post => {
    postsBlock.innerHTML = null
    const isTitle = post.title.includes(value);
    const isBody = post.body.includes(value);
    if (isBody || isTitle) {
      filterArr.push(post);
    }
  })
  postsMap(filterArr);
}

searchInput.addEventListener('input', search);