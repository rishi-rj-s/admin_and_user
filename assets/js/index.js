     

$("#add_user").submit(function(event){
     alert("User created successfully! ")
})

$("#update_user").submit(function(event){
     event.preventDefault()
     var unindexed_array = $(this).serializeArray()
     var data = {}
     $.map(unindexed_array, function(n, i){
          data[n['name']] = n['value']
     })

     var request = {
          "url" : `http://localhost:5002/api/users/${data.id}`, 
          "method" : "put",
          "data" : data
     }

     $.ajax(request).done(function(response){
          alert("User updated successfully");
     })
})

if(window.location.pathname == '/home' || window.location.pathname == '/search'){
     $ondelete = $(".table tbody td a.delete")
     $ondelete.click(function(){
          var id = $(this).attr("data-id")
          var request = {
               "url" : `http://localhost:5002/api/users/${id}`, 
               "method" : "delete",
          }

          if(confirm("Do you really want to delete?")){
               $.ajax(request).done(function(response){
                    alert("User deleted successfully")
                    location.reload()
               })
          }
     })
}


