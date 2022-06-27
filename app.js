
const btn = document.querySelector('button')
const text = document.querySelector('.text')

btn.addEventListener('click', function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSucess,OnError)
    } else {
        text.innerText = 'Your browser does not support this feature'
    }
})

function onSucess(position) {
    text.innerText = 'Fetching device location...'
    console.log(position);
   let {latitude,longitude} = position.coords
   fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dde2dc70e97d4d28a7460143c4205eaf`)
   .then((res) => res.json())
   .then((res) => {text.innerText = (res.results[0].formatted)} )
}

function OnError(error) {
    console.log(error.code);
    if(error.code == 1) {
        text.innerText = 'You denied the request'
    } else if(error.code == 2) {
        text.innerText = 'Location not available'
    } else {
        text.innerText = 'Something went wrong'
    }
}