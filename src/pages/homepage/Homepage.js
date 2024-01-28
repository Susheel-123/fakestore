// Homepage.js
import { useContext, useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { Cartcontext } from "../../context/Context";
import Pagination from "../../pagination/Pagination";

const Homepage = () => {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setdata(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      {currentItems.map((item, index) => {
        item.quantity = 1;
        return (
          <div className="card" key={index}>
            <img src={item.image} alt="" />
            <p>{item.title}</p>
            <h3>$. {item.price}</h3>
            <button onClick={() => dispatch({ type: "ADD", payload: item })}>
              add to cart
            </button>
          </div>
        );
      })}

      {/* Render the Pagination component */}
      <Pagination
        totalPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Homepage;
