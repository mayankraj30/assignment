$(document).ready(function(){
 
    $.getJSON("category.json",function(data){
        $.each(data.categories,function(index,category){
            var subCategoryData="";
            $.each(category.subcategory,function(index,subcategory){
                subCategoryData+="<li onClick=\"openProductPage('"+subcategory.name+"')\"><a href=\"#\">"+ subcategory.name+"</a></li>";
                console.log(subcategory.name);
            });
        
            if(subCategoryData!="")
            {
                var dropDownData="<li><a class=\"dropdown-toggle\" data-toggle=\"dropdown\"  href=\"#\">"+category.name+"</a><ul class=\"dropdown-menu\">"+subCategoryData+"</ul></li>"
            }

            $(dropDownData).appendTo(".menu");
        

        })
        //console.log(data);
    
    })


   

});
function openProductPage(subcategoryName)
{
    document.getElementById("productDisplay").innerHTML="";
    
    $.getJSON("products.json",function(data){
        for(d of data)
        {
            console.log(d.category,subcategoryName);
            if(d.category==subcategoryName)
            {
                $("#productDisplay").append(`<div class="row">
            
                <div class="column">
                  <img src="${d.image}" alt="sorry" style="width:100%">
                </div>
                <div class="btn btn-primary">add to cart</div>
              </div>`)
            }
        }

    });
}


