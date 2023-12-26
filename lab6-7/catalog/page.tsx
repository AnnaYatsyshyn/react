// Home.tsx
'use client'
import React, { useState, useEffect } from 'react';
import styles from '../Header.module.css';
import Header from '../header';


const Notification: React.FC<{ message: string }> = ({ message }) => (
    <div className={`favorite-notification visible`}>
        <p>{message}</p>
        <style jsx>{`
   .favorite-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px;
    background-color: #2196f3; /* Змініть колір фону за потребою */
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease-in-out;
    z-index: 1000;
  }
    .visible {
      opacity: 1;
    }
    .hidden {
      opacity: 0;
    }
  `}</style>
    </div>
);

async function getAllProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  console.log(res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getAllCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}
function getProducts(categories: string[], products:any[]) {
  return products.filter((prod) => categories.includes(prod.category))
}

function CategoryId() {
  const [sortOption, setSortOption] = useState<string>('');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [productToView, setProductToView] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>('');

  const showNotification = (message:string) => {
    setNotification(message);
    // Закриття нотіфікації через 2 секунди
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };
  useEffect(() => {
    const fetchData = async () => {
        const allProductsFetch = await getAllProducts();
        const allCategoriesFetch = await getAllCategories();
        if(categories.length == 0)
        {
          setProductToView(allProductsFetch);
        }
        else
        {
          setProductToView(getProducts(categories, allProductsFetch));
        }
        setAllProducts(allProductsFetch);
        setAllCategories(allCategoriesFetch);
    };

    fetchData();


    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
    }
}, [categories]);
const handleCheckboxChange = async (category:string) => {
  if (categories.includes(category)) {
      setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
  } else {
      setCategories((prevCategories) => [...prevCategories, category]);
  }
};


const toggleFavorite = (productId: string) => {
    // Додавання або видалення товару зі списку улюблених
    const updatedFavorites = favorites.includes(productId)
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];
    setFavorites(updatedFavorites);

    // Збереження улюблених товарів у локальному сховищі
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    const product = allProducts.find((p) => p.id.toString() === productId);
    const message = `${product.title} ${
      favorites.includes(productId) ? 'removed from' : 'added to'
    } Favorites | `;
    showNotification(message);
};

  return (
    <div id="portal-root">
      <Header></Header>
      {notification && (
          <>
            <Notification message={notification} />
          </>
        )}
      <div className={styles.container}>
        <div className={styles.container}>
          <div>
            <div className={styles['sort-container']}>
              <label className={styles['sort-label']}>Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles['sort-select']}
              >
                <option value="">-- Select --</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <br />
            <div className={styles['category-container2']}>
              <div className={styles['category-row2']}>
              {allCategories.map((category, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`categoryCheckbox_${index}`}
                                            value={category}
                                            checked={categories.includes(category)}
                                            onChange={() => handleCheckboxChange(category)}
                                        />
                                        <label className="form-check-label" htmlFor={`categoryCheckbox_${index}`}>
                                            {category}
                                        </label>
                                    </div>
                                ))}
              </div>
            </div>
            <div className={styles['product-container']}>
              {productToView
                .sort((a: any, b: any) => {
                  if (sortOption === 'price') {
                    return a.price - b.price;
                  } else if (sortOption === 'rating') {
                    return b.rating.rate - a.rating.rate;
                  } else {
                    return 0;
                  }
                })
                .map((product: any, index: number) => (
                  <div key={index} className={styles['product-card']}>
                    <div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className={styles['product-image']}
                      />
                    </div>
                    <div className={styles['product-info']}>
                      <div className={styles['product-title']}>
                        <div className={styles['product-title']}>
                          {truncateText(product.title, 20)}
                        </div>
                      </div>
                      <div className={styles['product-description']}>
                        {truncateText(product.description, 100)}
                      </div>
                      <div className={styles['product-price']}>
                        Price: {product.price}
                      </div>
                      <div className={styles['product-rating']}>
                        Rating: {product.rating.rate} ({product.rating.count} reviews)
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id.toString())}
                        className={styles['favorite-button']}
                      >
                        {favorites.includes(product.id.toString()) ? '❤️' : '🤍'}
                      </button>
                      
                      <button>🛒</button>
                    </div>
                  </div>
                ))}
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryId;
