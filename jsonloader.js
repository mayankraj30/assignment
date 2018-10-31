var cartProductItems=[];//array to store products in cart 
var wishListProductItems=[];//array to store products in cart
var company=new Set();


function home()
{
    document.getElementById("productDisplay").innerHTML="";
    $("#productDisplay").append(`
    <div class="container ">
   
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div class="item active">
        <img src="images/home/home1.jpg" alt="Los Angeles" style="width:100%;">
      </div>

      <div class="item">
        <img src="images/home/home2.jpg" alt="Chicago" style="width:100%;">
      </div>
    
      <div class="item">
        <img src="images/home/home3.jpg" alt="New york" style="width:100%;">
      </div>
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12">
            
</div>

    
    `)
}


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
        for(d of data)
        {
            if(d.category==subcategoryName)
            {
                company.add(d.company);
            }
        }
        for(d of company){
            $("#productDisplay").append(`
                <div class="filter" style="float:left;postion:relative"><label><input type="checkbox"  onclick="checkbox_click(this,'${subcategoryName}')" value="${d}">${d}</label></div>
                
                `)
        }



        
        for (d of data) {
            console.log(d.category, subcategoryName);
            if (d.category == subcategoryName) {
                $("#productDisplay").append(`<div class="col-md-4 col-sm-6 col-xs-12">
                            
                <div class="card">
                <a href="#">
  <img src="${d.image}" onclick="openProductDescription(${d.id})" alt="sorry" style="width:100%"></a>
  <h1>${d.name}</h1>
  <p class="price">Price Rs ${d.price}</p>

  <p><button onclick="addToCart(${d.id})">Add to cart<span class="glyphicon glyphicon-shopping-cart"><span></button></p>
  <p><button id="wishlist" onclick="addToWishList(${d.id})">Add to wishlist<span class="glyphicon glyphicon-heart"></span></button></p>
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
function openCartPage(){
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
            
            <div class="card">
  <img src="${d.image}" alt="sorry" style="width:100%">
  <h1>${d.name}</h1>
  <p class="price">Price Rs ${d.price}</p>
  <p class="description">${d.description}</p>
  <p><button onclick="removeCartItem(${d.id})">remove from cart</button></p>
</div>
            
          </div>`)
        }
    }


}

function removeCartItem(prodId)
{
    for(index in cartProductItems)
    {
        
        if(cartProductItems[index].id==prodId)
        {
            cartProductItems.splice(index,1)
            openCartPage()
            alert("product removed from cart");
            break;

        }
    }

}


function openProductDescription(prodId){
    document.getElementById("productDisplay").innerHTML="";
    $.getJSON("products.json",function(data){
        for(d of data)
        {
            if(d.id==prodId)
            {

                console.log("innside if of open product descripion page",d.name);
                $("#productDisplay").append(`
                <div class="card">
                    <img src="${d.image}" alt="Denim Jeans" style="width:100%">
                     <h1>${d.name}</h1>
                        <p class="price">Price Rs=${d.price}</p>
                        <p class="description">${d.description}</p>
                         <p><button onclick="addToCart(${d.id})">Add to Cart</button></p>
                         <p><button onclick="addToWishList(${d.id})">Add to List</button></p>
                </div>

                
                
                
                `);
                break;
            }
        }

    });
}


function addToWishList(prodId)
{
    
    $.getJSON("products.json",function(data){
        for(d of data)
        {
            if(d.id==prodId)
            {
                wishListProductItems.push(d);
                alert("product added to wish list");
                console.log(d);
                console.log(wishListProductItems.length);
                break;
            }
        }

    });


}



function openWishListPage()
{
    document.getElementById("productDisplay").innerHTML="";
    if(wishListProductItems.length==0)
    {
        $("#productDisplay").append(`
        <div class="jumbotron">
            <div class="conatiner text-center">
                <h2>Wishlist is empty</h2>
                <a href="#" class="btn btn-primary"><span class="glyphicon glyphicon-home" ></span>Back to home</a>
            
            </div>
        
        
        </div>
        
        `);
    }
    else{
        for(d of wishListProductItems)
        {
            console.log(d);

            $("#productDisplay").append(`<div class="col-md-4 col-sm-6 col-xs-12">
            
            <div class="card">
  <img src="${d.image}" alt="sorry" style="width:100%">
  <h1>${d.name}</h1>
  <p class="price">Price Rs ${d.price}</p>
  <p class="description">${d.description}</p>
  <p><button onclick="removeFromWishlist(${d.id})">remove from Wishlistt</button></p>
</div>
            
          </div>`)
        }
    }


productDisplay
}

function removeFromWishlist(prodId){
    for(index in wishListProductItems)
    {
        if(wishListProductItems[index].id==prodId)
        {
            wishListProductItems.splice(index,1);
            alert("product removed from wishlist");
            openWishListPage();
            break;


        }
    }
}




