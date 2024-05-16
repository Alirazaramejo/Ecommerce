import { useEffect, useState } from 'react';
import { db } from '../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const UserGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading state is set to false even if there's an error
      }
    };

    getData();
  }, [collectionRef]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collectionRef);
      const fetchedData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setLoading(false); // Ensure loading state is set to false even if there's an error
    }
  };

  return { data, loading, refreshData };
};

export default UserGetData;
