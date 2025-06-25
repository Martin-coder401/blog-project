
const API_URL = 'http://localhost:3000/posts';

document.addEventListener('DOMContentLoaded', function () {
  displayPosts();
  addNewPostListener();
});

function displayPosts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = '';

      posts.forEach(post => {
        const div = document.createElement('div');
        div.textContent = post.title;
        div.classList.add('post-item');
        div.addEventListener('click', () => handlePostClick(post.id));
        postList.appendChild(div);
      });
    })
    .catch(error => console.error('Error loading posts:', error));
}

function handlePostClick(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      showPostDetail(post);
    })
    .catch(error => console.error('Error loading post details:', error));
}

function showPostDetail(post) {
  const detail = document.getElementById('post-detail');
  detail.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <small>By: ${post.author}</small>
    <div class="detail-buttons">
      <button id="edit-btn">Edit</button>
      <button id="delete-btn">Delete</button>
    </div>
  `;

  document.getElementById('edit-btn').addEventListener('click', () => openEditForm(post));
  document.getElementById('delete-btn').addEventListener('click', () => deletePost(post.id));
}

//  Handle adding new post
function addNewPostListener() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(post => {
        console.log('Post added:', post);
        form.reset();
        displayPosts(); //  refresh the post list
      })
      .catch(error => console.error('Error adding post:', error));
  });
}

//  Delete a post
function deletePost(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
      document.getElementById('post-detail').innerHTML = '<p>Select a post to view details.</p>';
      displayPosts();
    })
    .catch(error => console.error('Error deleting post:', error));
}

//  Open the edit form and update post
function openEditForm(post) {
  const form = document.getElementById('edit-post-form');
  form.classList.remove('hidden');
  form['title'].value = post.title;
  form['content'].value = post.content;

  document.getElementById('cancel-edit').onclick = () => {
    form.classList.add('hidden');
  };

  form.onsubmit = e => {
    e.preventDefault();
    const updated = {
      title: form['title'].value,
      content: form['content'].value
    };

    fetch(`${API_URL}/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        form.classList.add('hidden');
        displayPosts();
        handlePostClick(post.id);
      })
      .catch(error => console.error('Error updating post:', error));
  };
}
