   const weatherForm= document.querySelector('form')
   const searchValue = document.querySelector('input')
   const error= document.querySelector('#error') 
   const message= document.querySelector('#message') 

   error.textContent=''
   message.textContent=''

   weatherForm.addEventListener('click',(e)=>
   {
       e.preventDefault()
       error.textContent='Loading ....'
       let location = searchValue.value

       fetch('/weather?address='+location).then((response)=>
       {
           response.json().then((data)=>
           {
               if(data.error)
               {
                   error.textContent=data.error
                   message.textContent=''
               }else
               {
                   message.textContent=data.data
                   error.textContent=''
               }
           })
       })   
   

   })


   
