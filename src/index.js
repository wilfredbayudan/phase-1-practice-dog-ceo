console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  // Challenge 1
  const dogImgContainer = document.querySelector('#dog-image-container')
  const breedDiv = document.querySelector('ul#dog-breeds');
  const breedDropdown = document.querySelector('#breed-dropdown');

  fetch(imgUrl)
    .then(res => res.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.setAttribute("height", '300');
        dogImgContainer.append(img);
      })
    })
    .catch(error => console.log(error));

  // Challenge 2
  const allBreeds = [];
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      for (const breed in data.message) {
        allBreeds.push(breed);
      }
      renderBreeds(sortBreeds());
    })
    .catch(error => console.log(error));

  function renderBreeds(array = allBreeds) {
    breedDiv.textContent = '';
    array.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed;
      // Challenge 3
      li.addEventListener('click', () => {
        li.className = li.className === 'clicked' ? '' : 'clicked';
      })
      breedDiv.append(li);
    })
  }

  // Challenge 4
  breedDropdown.addEventListener('change', () => {
    renderBreeds(sortBreeds(breedDropdown.value));
  })
  
  function sortBreeds(letter = 'a') {
    return allBreeds.filter(breed => breed.charAt(0).toLowerCase() === letter);
  }

})