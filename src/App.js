import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Display from "./components/Display";
import { apiConnector } from "./services/apiconnector";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");

  const handleGroupByChange = (group) => setGroupBy(group);

  const handleOrderByChange = (sort) => setOrderBy(sort);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector(
          "GET",
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        console.log("API response data:", response);
        setUsers(response?.data?.users || []); // Safe access with fallback to empty array
        setTickets(response?.data?.tickets || []);
      } catch (err) {
        console.error("API call error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar
        groupBy={groupBy}
        orderBy={orderBy}
        onGroupByChange={handleGroupByChange}
        onOrderByChange={handleOrderByChange}
      />
      <Display tickets={tickets} users={users} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
}

export default App;
