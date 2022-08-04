let news = []
const getLatestNews = async() => {  // await을 쓸때는 async가 항상 같이 있어야한다
    let url = new URL(
        'https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10'
    )
    //단순히 let url = '' 이 아닌 new URL('')을 써준다면 콘솔에서 호출시에 URL에 관한 정보를 준다.
    let header = new Headers({'x-api-key':'TvKjDF1l8DZ3zLPQDeU7LxuSCqeh2N5mJIWEumwA178'})
    let response = await fetch(url,{headers:header})  // ajax, http, fetch 방법이 있다.
    let data = await response.json()
    news = data.articles
    console.log(news)
    
    render()
}

const render = () => {
    let newsHTML = ''
    newsHTML = news.map((item)=>{
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${item.media}"/>
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
    
            <p>
                ${item.summary}
            </p>
            <div>
                ${item.rights} | ${item.published_date}
            </div>
        </div>
    </div>`
    }).join('')

    document.getElementById("news-board").innerHTML = newsHTML
}

function openMenu() {
    document.getElementById("mySideMenu").style.width = "250px"
}
  
function closeMenu() {
    document.getElementById("mySideMenu").style.width = "0"
}

getLatestNews() 

