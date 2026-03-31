
var apiFetch = async () => {
    var data = await fetch('https://dummyjson.com/products?limit=12&skip=1');
    var data = await data.json();
    displayData(data.products);
}


var displayData = (products) => {
    
    var finalData = '';

    products.forEach((v,i) => {
        finalData += `
            <article class="product" data-category="electronics" data-price="299" data-title="Noise-cancelling Headphones">
					<img src="${ v.thumbnail }" alt="Headphones">
					<div class="product-body">
						<h3 class="title">${ v.title }</h3>
						<p class="meta">${v.category} • ${ v.brand }</p>
						<div class="price-row">
							<div class="price">$${v.price}</div>
							<button class="btn add">Add</button>
						</div>
					</div>
				</article>`
    })

    document.getElementById('products').innerHTML = finalData;
}

apiFetch();