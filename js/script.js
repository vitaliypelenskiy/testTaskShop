$(document).ready(function(){

// Component v-header start
//**************************************************************************************************
	var Vheader = {
		template: `<header>
				   		<div class="logo" @click="chanchRouting('shop')">{{name}}</div> 
				   		<div class="nav">
				   			<a href="" @click.prevent ="chanchRouting('shop')">Shop</a>
				   			<a href="" @click.prevent ="chanchRouting('cart')">Cart</a>
						</div>
				   		<div class="cart" @click="chanchRouting('cart')">
				   			<div>
				   				<span class="count">{{count}}</span>
				   				<img src="img/shopping-cart.png" alt="" />
				   				<span class="price">{{price}} $</span>
				   			</div>
				   		</div>
				   	</header>`,
		props:['price', 'count', 'rout'],
        data: function(){
			return {
				name: 'Shop',
			}
		},
		methods: {
			chanchRouting: function(page){
				if(page=='shop'){
                    this.rout = true;
				}
				else if(page=='cart'){
                    this.rout = false;
                }
				this.$emit('chanch', this.rout);
			}
		}
		
	};
// Component v-header end
//**************************************************************************************************
// Component v-shop start
	var Vshop = {
		template: `<div class="main-content">
					  <div class="product" v-for="product in products">
					  		<div class="img-product" v-bind:style='{ backgroundImage: "url(" + product.url + ")" }'></div>
					  		<p class="name">{{product.name}}</p>
					  		<p class="price">
					  			<span class="old-price">{{product.oldPrice}} $</span>
					  			<span class="new-price">{{product.newPrice}} $</span>
					  		</p>
					  		<button @click="addToCart(product)">ADD TO CART</button>	
					  </div>
			      </div>`,
		data: function(){
			return {
				products: [
					{
						id:1,
						name: 'LG',
						url: 'img/1.jpg',
						oldPrice: 200,
						newPrice: 175
					},
					{
						id:2,
						name: 'Samsung',
						url: 'img/2.png',
						oldPrice: 300,
						newPrice: 200
					},
					{
						id:3,
						name: 'Iphone',
						url: 'img/3.jpg',
						oldPrice: 500,
						newPrice: 300
					},
                    {
                        id:4,
                        name: 'LG',
                        url: 'img/1.jpg',
                        oldPrice: 200,
                        newPrice: 175
                    },
                    {
                        id:5,
                        name: 'Samsung',
                        url: 'img/2.png',
                        oldPrice: 300,
                        newPrice: 200
                    },
                    {
                        id:6,
                        name: 'Iphone',
                        url: 'img/3.jpg',
                        oldPrice: 500,
                        newPrice: 300
                    },
				]
			}
		},
		methods: {
			addToCart: function(product){
				this.$emit('products', product);
			}
		}
	};
// Component v-shop end
//**************************************************************************************************
// Component v-cart start
var Vcart = {
		template:  `<div class="cart-wrapper">
						<div class="cart" v-for="product in products">
							<div class="img-cart">
								<img :src="product.url" alt="" />
							</div>
							<div class="name-cart">
								{{product.name}}
							</div>
							<div class="price-cart">
								{{product.newPrice}} $
							</div>
							<div class="price-count">
								<input type="number" min="1" :value ="product.count" v-model="product.count" @input="chancheCount()" />
							</div>
							<div class="delete-cart">
								<button @click="deleteProduct(product)">X</button>
							</div>
						</div>	
						<div class="info" v-if="isProduct">
							<div class="delete-all">
								<button @click="deleteAllProduct()">DELETE ALL</button>
							</div>
							<div class="price-cart-all">
								{{priceAll}} $
							</div>
						</div>
						<div class="noProduct" v-else>
							NO PRODUCTS
						</div>
				    </div>`,
		// props:['products'],
		data: function(){
			return {
				priceAll:0,
				products: [],
				isProduct : true
			}
		},
	     mounted: function(){
			var products = JSON.parse(localStorage.getItem('products'));
			this.products = products ? products : [];
             this.priceAllCalc();
             this.isProduct = this.products.length>0 ? true : false;

         },
		methods: {
				deleteProduct: function(product){
					let deleteProductId = product.id;
					for(let i = 0; i<this.products.length; i++){
						if(this.products[i].id == deleteProductId){
							this.products.splice(i,1);
							this.priceAllCalc();
                            localStorage.setItem('products', JSON.stringify(this.products));
                        }
					}
                    this.chancheCount();
                    this.isProduct = this.products.length>0 ? true : false;
                },
				deleteAllProduct: function(){
					this.products.splice(0,this.products.length);
                    localStorage.setItem('products', JSON.stringify(this.products));
                    this.priceAll = 0;
                    localStorage.setItem('price', JSON.stringify(this.priceAll));
                    this.chancheCount();
                    this.isProduct = this.products.length>0 ? true : false;
				},
				priceAllCalc: function(){
					this.priceAll = 0;
					for(let i = 0 ; i<this.products.length; i++){
						this.priceAll += this.products[i].newPrice*this.products[i].count;
				    }
                    localStorage.setItem('price', JSON.stringify(this.priceAll));
					this.$emit('priceall', this.priceAll);
                },
            	chancheCount: function(){
					let count = 0;
                    for(let i = 0 ; i<this.products.length; i++){
                        count += +this.products[i].count;
                    }
                    localStorage.setItem('products', JSON.stringify(this.products));
                    localStorage.setItem('count', JSON.stringify(count));
					this.$emit('newcount', count);
                    this.priceAllCalc();
                }
			}
		}
// Component v-cart end
//**************************************************************************************************
// Great a new Object Vue

   var shop = new Vue({
   el: "#app",
   data: {
   	  count: 0,
      cartArray:[],
      price:0,
      rout: true
   },
   components: {
   	'v-header': Vheader,
   	'v-shop'  : Vshop,
   	'v-cart'  : Vcart
   },
	mounted: function(){
        var countNow = JSON.parse(localStorage.getItem('count'));
        var priceNow = JSON.parse(localStorage.getItem('price'));
   		this.count = countNow ? countNow : 0;
   		this.price = priceNow ? priceNow: 0;
	},
   methods: {
  		clickAdd: function(product){
            var countNow = JSON.parse(localStorage.getItem('count'));
            var priceNow = JSON.parse(localStorage.getItem('price'));
            var products = JSON.parse(localStorage.getItem('products'));
            this.count = countNow ? countNow : 0;
            this.price = priceNow ? priceNow: 0;
            this.cartArray = products ? products: [];
			
  			this.count += 1;
            localStorage.setItem('count', JSON.stringify(this.count));
            let attached = false;
  			if(this.cartArray.length>0)
  			{
  				for(let i =0; i<this.cartArray.length; i++){
  					if(this.cartArray[i].id == product.id){
  						this.cartArray[i].count++;
  						this.endPrice();
                        localStorage.setItem('products', JSON.stringify(this.cartArray));
  						return;
  					}
  				}
  			}
		    product.count = 1;
			this.cartArray.push(product);
            localStorage.setItem('products', JSON.stringify(this.cartArray));
            this.endPrice();
  		},
  		endPrice: function(){
  			this.price = 0;
  			for(let i = 0; i<this.cartArray.length; i++){
  				this.price += this.cartArray[i].newPrice*this.cartArray[i].count; 
  			}
            localStorage.setItem('price', JSON.stringify(this.price));
        },
       newPrice: function(newPrice){
  			this.price = newPrice;
	   },
       newCount: function (newCount) {
		   this.count = newCount;
       }
   },
  });
});
