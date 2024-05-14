import React, { useEffect , useState} from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callProfilePage = async () => {
    try {
      const res = await fetch('/profile', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    
    catch (err) {
      console.log(err);
      navigate("/signin")
    }
  }

  useEffect(() => {
    callProfilePage();
  }, []);



  const { name, email, phone, work } = userData;
  const profilePicture ="https://w0.peakpx.com/wallpaper/660/478/HD-wallpaper-pride-and-joy-profile-colorful-black-art-rainbow-fantasy-phill314-girl-luminos.jpg";

  return (
    <>
    <Container className="profile py-5 d-flex align-items-center justify-content-center">
      <Row className="justify-content-center shadow rounded w-50 p-5 bg-white">
        <Col md={6} className='w-100'>
          <div className="text-center">
            <Image src={profilePicture} alt="Profile Picture" roundedCircle fluid className="mb-4" style={{ width: '200px', height: '200px' }} />
            <h2 className="mb-2">{name}</h2>
            <p className="text-muted mb-4">{work}</p>
          </div>
          <div className="bg-light p-4 rounded">
            <h5 className="mb-3">Contact Information</h5>
            <p className="mb-1"><strong>Email:</strong> {email}</p>
            <p className="mb-0"><strong>Phone:</strong> {phone}</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
};

export default Profile;
