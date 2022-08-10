const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartItems = async (ID) => {
  const data = await fetchItem(ID);
  const { id, title, price } = data;
  console.log('3', id);
    const cartItem = document.querySelector('.cart__items');
    cartItem.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  };

  const createProduct = async () => {
    const data = await fetchProducts('computador');
    const products = data.results.map((item) => ({
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    }));
    // console.log('1', products);
    products.forEach((element) => {
      const { sku } = element;
      const items = document.querySelector('.items');
      const func = createProductItemElement(element);
      items.appendChild(func);
      // console.log('2', items);
      
      func.addEventListener('click', (event) => {
        cartItems(sku);
      });
    });
  };

window.onload = () => createProduct();
