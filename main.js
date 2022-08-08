let latestNews = []
let page = 1
let totalPage = 0

let menu = document.querySelectorAll(".menu button")
menu.forEach((menu) => 
    menu.addEventListener("click", (event) => getNewsByTopic(event))
)

let searchBtn = document.querySelector(".searchBar button")
let url // 지역변수로 쓰이면 getNews에서 호출하는 url이 호출되지 않기 때문에 전역변수로 우선 선언해준다.

const getNews = async() => {
    try {
        let header = new Headers({
            'x-api-key':'FrONHsW-_XbULyU-GbIss54VHbyoNzG1E69oTuz023E'
        })
        let response = await fetch(url,{headers:header})  // ajax, http, fetch 방법이 있다.
        let data = await response.json()
        if(response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색된 결과값이 없습니다. 검색값을 확인해 주십시오.")
            }
            console.log("받는 데이터가 뭐지?",data)
            totalPage = data.total_pages
            page = data.page
            news = data.articles
            console.log(news)
            render()
            pagination()
        }else{
            throw new Error(data.message)
        }
    } catch (error) {
        console.log("잡힌 에러는", error.message)
        errorRender(error.message)
    }
}

const getLatestNews = async() => {  // await을 쓸때는 async가 항상 같이 있어야한다
    url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
    )
    //단순히 let url = '' 이 아닌 new URL('')을 써준다면 콘솔에서 호출시에 URL에 관한 정보를 준다.
    getNews()
}

const getNewsByTopic = async (event) => {     //addEventListener가 주는 모든 event에 관한 정보를 함수에 담아서 전달해준다.
   // console.log("worked!",event.target.textContent)     // textContent는 해당 태그안의 내용만 호출해준다.
    let topic = event.target.textContent.toLowerCase()
    url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
    )
    getNews()

}

const getNewsByKeyword = async() => {
    let keyword = document.querySelector("input").value //input값 받기
    url = new URL(
        `https://api.newscatcherapi.com/v2/search?page_size=10&q=${keyword}`
    )
    getNews()
}

const render = () => {
    let newsHTML = ''
    newsHTML = news.map((item)=>{
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${
                item.media || 
                "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg" //null값인 이미지에는 default이미지 설정해주기
            }" />
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>${
                item.summary == null || item.summary == ""
                ? "내용없음"
                : item.summary.length > 200
                ? item.summary.substring(0, 200) + "..."
                : item.summary
                }
            </p>
            <div>
                ${item.rights || "no source"} ,
                ${moment(item.published_date).fromNow()}
            </div>
        </div>
    </div>`
    }).join('')

    document.getElementById("news-board").innerHTML = newsHTML
} 

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
    ${message}
  </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

const pagination = () => {
    let paginationHTML = ``
    // page group
    let pageGroup = Math.ceil(page/5)
    //last
    let last = pageGroup*5
    // first
    let first = last - 4
    // first ~ last 페이지 프린트
    for(let i = first; i<=last; i++){
        paginationHTML+= `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`

    }
    document.querySelector(".pagination").innerHTML = paginationHTML
}

function openMenu() {
    document.getElementById("mySideMenu").style.width = "250px"
}
  
function closeMenu() {
    document.getElementById("mySideMenu").style.width = "0"
}

function toggleSearch() {
    var searchBar = document.getElementById("search");
    if (searchBar.style.display === "block") {
        searchBar.style.display = "none";
    } else {
        searchBar.style.display = "block";
    }
    console.log("worked!")
}

searchBtn.addEventListener("click", getNewsByKeyword)
getLatestNews() 


