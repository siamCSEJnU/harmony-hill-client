import Container from "../Container/Container";
import logo from "../../../../public/logo/logo1.png";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-sky-100 py-5">
      <Container>
        <div className="mb-4  font-semibold  grid grid-cols-2 md:grid-cols-4">
          <div>
            <h2 className="text-lg font-bold">Services</h2>
            <ul>
              <li>Branding</li>
              <li>Designing</li>
              <li>Marketing</li>
              <li>Advertisement</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold">Legal</h2>
            <ul>
              <li>Terms Of Use</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold">Address</h2>
            <ul>
              <li>Motijheel</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold">Contact</h2>
            <ul>
              <li>+880 1735687531,</li>
              <li>+880 1712688045</li>
              <li>harmonyhill@yahoo.com</li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="  border-sky-300 border-dashed border-y"> </div>
      <Container>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex  items-center gap-2">
            <h2 className="order-2 text-3xl font-bold text-sky-950 ">
              Harmony <br /> Hill
            </h2>
            <img src={logo} height="60" width="60" alt="logo" />
          </div>
          <div className="flex gap-2 ">
            <FaFacebookF size={28} />
            <FaYoutube size={28} />
            <FaTwitter size={28} />
          </div>
        </div>
        <div className="text-center font-semibold">
          <p>Copyright © 2023 - All right reserved by Harmony Hill</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
