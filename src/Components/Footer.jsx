import react from "react";

function Footer() {
    const current_year = new Date().getFullYear();
  return <footer className="footer"> <p>Copyright @{current_year} All Rights Reserved</p> </footer>;
}

export default Footer;  
