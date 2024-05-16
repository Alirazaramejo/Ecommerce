import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import UserGetData from '../custom-hook/UserGetData';
import { doc,deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
const User = () => {
    const { data: usersData, loading, refreshData } = UserGetData('users');
 

    const deleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            toast.success('User deleted successfully');
            refreshData();
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

  return (
   <section>
        <Container>
            <Row>
            <Col lg="12">
                <h4 className='fw-bold'>Users</h4>
            </Col>
            <Col lg="12" className='pt-5'>
               <table className="table">
                <thead>
                    <tr>
                    <th>Image</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    loading ? <tr><td colSpan="4" className="text-center py-5"><h3>Loading...</h3></td></tr> : (
                        usersData.map((user) => (
                            <tr key={user.uid}>
                            <td data-label="Image">
                                <img src={user.photoURL} alt={user.displayName} className="product-image" />
                            </td>
                            <td data-label="User">{user.displayName}</td>
                            <td data-label="Email">{user.email}</td>
                            <td data-label="Action">
                                
                                <button onClick={() => deleteProduct(user.uid)} className="delete-button">Delete</button>
                            </td>
                            </tr>
                        ))
                        )

                  }
                </tbody>
                </table>
            </Col>
            </Row>
        </Container>
   </section>
  )
}

export default User