
	
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(new URL('../service-worker.js', import.meta.url))
      .then((reg) => {
        // регистрация сработала
        console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch((error) => {
        // регистрация прошла неудачно
        console.log('Registration failed with ' + error);
      });
    }




async function getNews(){

  const news = document.querySelectorAll('.news-container')
  // const url  = 'http://localhost:7071/api/news/'
  const url = 'https://workers-back.onrender.com/api/news/'
  let response
  try {
    response = await fetch(url);
    if(response.ok){
      const res = await response.text()
      console.log(res)
  
      news.forEach(container => {
        container.querySelector('.news-content').innerText = res
        container.classList.remove('load-news')
      })
    } 
  } catch (err) {
    const newsContainer = document.querySelector('.content-container')
    const unavalible = document.querySelector('.unavalible')

    newsContainer.classList.add('hide')
    unavalible.classList.remove('hide')
  }
  

}

getNews()