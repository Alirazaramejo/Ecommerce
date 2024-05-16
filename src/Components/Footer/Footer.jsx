import React from 'react'
import "./Footer.css"
import { Container,Row,Col,ListGroup,ListGroupItem } from "reactstrap";
import { Link } from 'react-router-dom';


function Footer() {
  return <footer className="footer">
    <Container>
<Row>

  <Col lg="4">
  <div className="logo">
         
            <div className="LogoChild">
              <h1 className='text-white'>MultiMart</h1>
        
            </div>
          
          </div>
          <p className="footer__text mt-4">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum minima, quidem impedit omnis alias repellat delectus dolor atque libero nostrum unde asperiores
            </p>
  </Col>

  <Col lg="3">
  <div className="footer__quick__link">
    <h3 className="quick__link__title">
      Top Categories
    </h3>
    <ListGroup className='mb-3'>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="#" >
Mobile Phone
  </Link>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="#" >
Modern Sofa
  </Link>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="#" >
Arm Chair
  </Link>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="#" >
Smart Watches
  </Link>
</ListGroupItem>
    </ListGroup>
  </div>
  </Col>

  <Col lg="2">
  <div className="footer__quick__link">
    <h3 className="quick__link__title">
      UseFul
    </h3>
    <ListGroup className='mb-3'>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="/shop" >
Shop
  </Link>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="/cart" >
Cart
  </Link>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="/login" >
Login
  </Link>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration'>
  <Link to="#" >
Privacy Policy
  </Link>
</ListGroupItem>
    </ListGroup>
  </div>
  </Col>

  <Col lg="3">
    <div className="footer__quick__link">
    <h3 className="quick__link__title">
      Contact
    </h3>
    <ListGroup className='mb-3 footer__Content'>

<ListGroupItem className='ps-0 border-0 decoration d-flex align-items-center gap-2'>
<span>
  <i className='ri-map-pin-line'></i>
</span>
<p>
  123, Bilwala Shah Noorani Goth
</p>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration d-flex align-items-center gap-2'>
<span>
  <i className='ri-phone-line'></i>
</span>
<p>
  +923012140811
</p>
</ListGroupItem>

<ListGroupItem className='ps-0 border-0 decoration d-flex align-items-center gap-2'>
<span>
  <i className='ri-mail-line'></i>
</span>
<p>
 Alirazakhan2540@gmail.com
</p>
</ListGroupItem>


    </ListGroup>
  </div>
  </Col>
  <Col lg="12">
    <div className="footer__bottom">
      <p className='text-center'>
        &copy; 2024 All Rights Reserved. Designed by <span>Ali Raza</span>
      </p>
    </div>
  </Col>
</Row>

    </Container>
  </footer>
}

export default Footer