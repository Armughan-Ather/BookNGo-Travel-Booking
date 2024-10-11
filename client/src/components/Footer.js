import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
export default function Footer() {
  return (
    <MDBFooter style={{ backgroundColor: '#001f3f', color: '#ffffff' }} className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' style={{ borderColor: '#17a2b8' }}>
        <div className='me-5 d-none d-lg-block'>
          <span style={{ color: '#f8f9fa' }}>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#17a2b8' }} fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#17a2b8' }} fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#17a2b8' }} fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#17a2b8' }} fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#17a2b8' }} fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#17a2b8' }} fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#17a2b8' }}>
                <MDBIcon icon='gem' className='me-3' />
                Company name
              </h6>
              <p style={{ color: '#f8f9fa' }}>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#17a2b8' }}>Products</h6>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#17a2b8' }}>Useful links</h6>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style={{ color: '#f8f9fa' }}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#17a2b8' }}>Contact</h6>
              <p>
                <MDBIcon icon='home' className='me-2' style={{ color: '#17a2b8' }} />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon='envelope' className='me-3' style={{ color: '#17a2b8' }} />
                info@example.com
              </p>
              <p>
                <MDBIcon icon='phone' className='me-3' style={{ color: '#17a2b8' }} /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon='print' className='me-3' style={{ color: '#17a2b8' }} /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: '#17a2b8', color: '#ffffff' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/' style={{ color: '#ffffff' }}>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}
