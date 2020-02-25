   const weatherForm= document.querySelector('form')
   const searchValue = document.querySelector('input')
   const error= document.querySelector('#error') 
   const summary= document.querySelector('#summary') 
   const rainChance= document.querySelector('#rainChance') 
   const visibility= document.querySelector('#visibility') 
   const temperature= document.querySelector('#temperature') 
   const windSpeed= document.querySelector('#windSpeed') 


   error.textContent=''
   summary.textContent=''
   rainChance.textContent=''
   visibility.textContent=''
   temperature.textContent=''
   windSpeed.textContent=''

   weatherForm.addEventListener('submit',(e)=>
   {
       e.preventDefault()
       if(searchValue.value === '')
       {
           return error.textContent= 'You Must Provide an Address'
       }
       error.textContent='Loading ....'
       summary.textContent=''
       rainChance.textContent=''
       visibility.textContent=''
       temperature.textContent=''
       windSpeed.textContent=''
       let location = searchValue.value

       fetch('/weather?address='+location).then((response)=>
       {
           response.json().then((data)=>
           {
               if(data.error)
               {
                   error.textContent=data.data.error
               }else
               {
                   summary.textContent=data.data.summary +' in '+data.place_name
                   rainChance.textContent='Chances of rain are ' +data.data.rainChance +' %'
                   visibility.textContent='Visibilty is '+data.data.visibility+' %'
                   temperature.textContent='Current Temperature is ' +data.data.temperature+ ' F.H'
                   windSpeed.textContent='Wind Speed is '+data.data.windSpeed+' KMPH'
                   error.textContent=''
               }
           })
       })   
   

   })


   
