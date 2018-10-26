var cartProductItems=[];//array to store products in cart 




$(document).ready(function () {

    $.getJSON("category.json", function (data) {
        $.each(data.categories, function (index, category) {
            var subCategoryData = "";
            $.each(category.subcategory, function (index, subcategory) {
                subCategoryData += "<li onClick=\"openProductPage('" + subcategory.name + "')\"><a href=\"#\">" + subcategory.name + "</a></li>";
                console.log(subcategory.name);
            });

            if (subCategoryData != "") {
                var dropDownData = "<li><a class=\"dropdown-toggle\" data-toggle=\"dropdown\"  href=\"#\">" + category.name + "</a><ul class=\"dropdown-menu\">" + subCategoryData + "</ul></li>"
            }

            $(dropDownData).appendTo(".menu");


        })
        //console.log(data);

    })




});
function openProductPage(subcategoryName) {
    document.getElementById("productDisplay").innerHTML = "";

    $.getJSON("products.json", function (data) {
        for (d of data) {
            console.log(d.category, subcategoryName);
            if (d.category == subcategoryName) {
                $("#productDisplay").append(`<div class="col-md-4 col-sm-6 col-xs-12">
            
                <div class="column">
                  <img src="${d.image}" alt="sorry" style="width:100%">
                  <p>${d.name}</p>
                  <span>Price ${d.price}<span>
                  <div class="btn btn-primary">add to wish list</div>
                  
                  <div>     <button type="button" class="btn btn-primary btn-sm" onClick="addToCart(${d.id})">
                  <span class="glyphicon glyphicon-shopping-cart" ></span> Add to Cart
                </button></div>
                </div>
                
              </div>`)
            }
        }

    });
}






function addToCart(prodId){
    $.getJSON("products.json",function(data){
        for(d of data)
        {
            if(d.id==prodId)
            {
                console.log("inside if of product page");
                cartProductItems.push(d);
                console.log("number of products"+cartProductItems.length);
                alert("product  is added to cart");
                break;
                

            }
        }
    });


}
function openCartPart(){
    document.getElementById("productDisplay").innerHTML="";

    if(cartProductItems.length==0)
    {
        $("#productDisplay").append(`
        <div class="jumbotron">
            <div class="conatiner text-center">
                <h2>Cart is empty</h2>
                <a href="#" class="btn btn-primary"><span class="glyphicon glyphicon-home" ></span>Back to home</a>
            
            </div>
        
        
        </div>
        
        `);
    }
    else{
        for(d of cartProductItems)
        {
            console.log(d);

            $("#productDisplay").append(`<div class="col-md-4 col-sm-6 col-xs-12">
            
            <div class="column">
              <img src="${d.image}" alt="sorry" style="width:100%">
              <p>${d.name}</p>
              <span>Price ${d.price}<span>
              
              
              <div>     <button type="button" class="btn btn-primary btn-sm" onClick="removeCartItem(${d.id})"> Remove from cart
            </button></div>
            </div>
            
          </div>`)
        }
    }


}






