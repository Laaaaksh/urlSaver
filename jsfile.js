let myleads = []
let oldleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById('save-btn')
const deleteEl = document.getElementById("delete-al")
const ulEl = document.getElementById("ul-el")

const leadsFromlocalStorage = JSON.parse(localStorage.getItem("myleads"))
if(leadsFromlocalStorage)
{
    myleads = leadsFromlocalStorage
    RenderFunc(myleads)
}

function RenderFunc()
{
    let listItems = ""
    for(let i = 0 ; i < myleads.length ; i++)
    {
        listItems +=  `
        <li><a href='#' target='_blank'>${myleads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}
saveBtn.addEventListener('click',function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let activeTab = tabs[0].url
        myleads.push(activeTab)
        localStorage.setItem('myleads', JSON.stringify(myleads))
        RenderFunc()
    });
})
deleteEl.addEventListener('dblclick', function(){
    myleads = []
    localStorage.clear()
    RenderFunc()
    })
inputBtn.addEventListener("click", function () {
    myleads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myleads", JSON.stringify(myleads))
    RenderFunc()
})

