// Home.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../Header.module.css';
import Header from '../../header';

async function getCategoryData(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getData() {
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

function CategoryId({ params: { id } }: { params: { id: string } }) {
  const [sortOption, setSortOption] = useState<string>('');
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [data, setData] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const normalizedId = id.replace(/%20/g, ' ');
        const categoryData = await getCategoryData(normalizedId);
        const categories = await getData();

        setDataCategory(categoryData);
        setData(categories);
    };
    fetchData();


    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
    }
}, []);

const toggleFavorite = (productId: string) => {
    // Додавання або видалення товару зі списку улюблених
    const updatedFavorites = favorites.includes(productId)
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];
    setFavorites(updatedFavorites);

    // Збереження улюблених товарів у локальному сховищі
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

  return (
    <div>
      <Header></Header>
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
            <div className={styles['title']}>{id}</div>
            <br />
            <div className={styles['category-container2']}>
              <div className={styles['category-row2']}>
                {data.map((category: string, index: number) => (
                  <div key={index} className={styles['category-button2']}>
                    <Link href={`/catalog/${encodeURIComponent(category)}`}>
                      <div>{category}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['product-container']}>
              {dataCategory
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
