import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div style={styles.card}>
            <h2 style={styles.productName}>{product.productName}</h2>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>Price: ${product.price}</p>
            <p style={styles.stock}>In Stock: {product.stock}</p>
            <img src={product.prodImage.url} alt={product.productName} style={styles.image} />
            <button style={styles.button}>Edit</button>
            <button style={{ ...styles.button, backgroundColor: 'red' }}>Delete</button>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
    productName: {
        fontSize: '1.5em',
        margin: '10px 0',
    },
    description: {
        color: '#555',
        fontSize: '1em',
    },
    price: {
        fontWeight: 'bold',
        margin: '10px 0',
    },
    stock: {
        color: 'green',
    },
    button: {
        margin: '5px',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    }
};

// Example of how to use ProductCard component
const productData = {
    brandId: "67b2fbf380e687bc86f5fa27",
    categoryId: "67b2fdea80e687bc86f5fa34",
    createdAt: "2025-02-19T12:10:55.126Z",
    description: "this description",
    price: 999,
    prodImage: {
        public_id: 'q9o9fdek9jmqgou0h1hm',
        url: 'https://res.cloudinary.com/dfuu1xns9/image/upload/v1739967055/q9o9fdek9jmqgou0h1hm.png',
        _id: '67b5ca4f4b1881680f4dfdb9'
    },
    productName: "table",
    stock: 10,
    updatedAt: "2025-02-19T12:10:55.126Z",
    __v: 0,
    _id: "67b5ca4f4b1881680f4dfdb8"
};