import React, { useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db} from '../../firebase/firebase'
import './View.css';
import { PostContext } from '../../context/PostContext';
const View = () => {
  const [sellerDetails, setSellerDetails] = useState(null);
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      if (postDetails && postDetails.userId) {

         try {
          const q = query(collection(db, 'users'), where('id', '==', postDetails.userId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            setSellerDetails(doc.data());
          });
        } catch (error) {
          console.error('Error getting documents: ', error);
        }
      } else {
        console.log('Invalid postDetails or postDetails.userId is undefined.');
      }
    };
    

    fetchSellerDetails();
  }, [postDetails]);

  if (!postDetails || !sellerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageUrl || '../../../Images/R15V3.jpg'} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt.seconds * 1000).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{sellerDetails.username}</p>
          <p>{sellerDetails.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default View;