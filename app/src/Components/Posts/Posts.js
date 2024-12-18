import React, {useState, useEffect, useContext} from 'react';
import {db} from '../../firebase/firebase';
import {collection,getDocs} from 'firebase/firestore'
import Heart from '../../assets/Heart';
import './Post.css';
import { Timestamp } from 'firebase/firestore';
import { PostContext } from '../../context/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const navigate = useNavigate()
  const {postDetails,setPostDetails} = useContext(PostContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    }
    return '';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 const handleCardClick = (products) =>{
  setPostDetails(products);
  console.log(postDetails)
  navigate('/view');
 }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {
          products.map((product) =>
          <div
          key={product.id}
          onClick={()=>handleCardClick(product)}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="img" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>
          )
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {
          products.map((product) =>
          <div
          key={product.id}
          onClick={()=>handleCardClick(product)}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="img" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
