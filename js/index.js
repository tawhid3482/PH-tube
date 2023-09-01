const loadCategories = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
  const data = await res.json()
  const course = data.data

  // console.log(course)

  const divContainer = document.getElementById('tab-container')

  // divContainer.textContent = '';
  course.forEach((categorie) => {
    const divCreate = document.createElement('div')
    divCreate.innerHTML = `
        <a onclick="handleClick('${categorie.category_id}')" class="tab bg-gray-400 hover:bg-orange-600 text-white">${categorie?.category}</a> 
        `
    divContainer.appendChild(divCreate)

  })
}

const handleClick = async (id) => {
  const cardContainer = document.getElementById('card-container')
  cardContainer.textContent = '';
  const noDataContainer = document.getElementById('nodata-container')
  noDataContainer.textContent = '';
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await res.json()
  // console.log(data)
  const cards = data.data
  if (cards.length === 0) {
    const cardCreate = document.createElement('div')
    cardCreate.innerHTML = `
       <div class="flex items-center justify-center mt-10">
      <div class="card w-96 bg-base-100 shadow-lg">
        <figure class="px-24 pt-10">
          <img src="./image/Icon.png" alt="Shoes"  />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
      </div>
    </div>
       `
    noDataContainer.appendChild(cardCreate)
  }

  cards.forEach((card) => {
console.log(card)
    const cardCreate = document.createElement('div')
    const seconds = card?.others?.posted_date
    const time = secondsToHoursAndMinutes(seconds); 
    if (time.hours > 0) {
        formattedTime = `${time.hours}hrs`;
        if (time.minutes > 0) {
            formattedTime += ` ${time.minutes}min`;
        }
        formattedTime += ' ago';
    }
    else if (time.minutes > 0) {
        formattedTime = `${time.minutes}min ago`;
    }
    // Check if both hours and minutes are 0 before displaying the time
    if (time.hours === 0 && time.minutes === 0) {
        formattedTime = '';
    }
    cardCreate.innerHTML = `
        
        <div class="card w-72 p-4 bg-base-100 shadow-xl">
        <figure><img class="relative h-52" src="${card?.thumbnail}" alt="" />
        <p class="absolute pl-32 text-white pt-36">
        ${formattedTime}
        </p>
        </figure>
        <div class="">
          <div class="card-footer flex justify-between mt-8">
            <div class="flex items-center gap-3 ">
                <div class="p-0">
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                          <img src="${card?.authors[0]?.profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 mb-0">
                    <h1 class="text-lg font-medium">${card?.title}</h1>
                </div>
            </div>
            </div>
            </div>
            <div class="flex justify-center gap-1 items-center">
               <h2 >${card?.authors[0]?.profile_name}</h2>
               <span>
               ${card?.authors[0]?.verified ? '<img class="w-5" src="./image/fi_10629607.png">' : ' '}
            </span>
           </div>
            <p class="text-center "> ${card?.others?.views} views</p>
        </div>
      </div>
        `
    cardContainer.appendChild(cardCreate)
  })
}

loadCategories()
handleClick('1000')


const blog = () => {
  window.location.href = 'blog.html'
}
function secondsToHoursAndMinutes(seconds) {

  const hours = Math.floor(seconds / 3600);

  const remainingSeconds = seconds % 3600;

  const minutes = Math.floor(remainingSeconds / 60);

  return {
    hours,
    minutes,
  };
}
// const shotByview = async(id) => {
 
//   const cardContainer = document.getElementById('card-container')
//   cardContainer.textContent = '';
//   const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
//   const sortring = await res.json()

//   console.log(sortring.data)
// }


