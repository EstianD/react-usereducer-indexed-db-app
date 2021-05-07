import { useState, useEffect } from "react";
import "./App.css";
import Localbase from "localbase";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import SignupButton from "./Components/SignupButton";

// User functionm
import { getUsers, addUser, checkAuth, logoutUser } from "./Services/users";

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [view, setView] = useState("");
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   // Check auth
  // const handleCheckAuthUser = async () => {
  //   const user = await checkAuth();
  //   console.log("User: ", user);
  //   setLoggedUser(user);
  //   // console.log(Object.keys(loggedUser).length);
  //   if (Object.keys(loggedUser).length === 0) {
  //     console.log("not logged");
  //     setView("login");
  //   }
  // };
  //   handleCheckAuthUser();

  // }, []);

  const handleSignupView = () => {
    console.log("signup view");
    setView("signup");
  };

  //
  useEffect(() => {
    // Check auth
    const handleCheckAuthUser = async () => {
      const user = await checkAuth();
      console.log("User: ", user);
      if (Object.keys(user).length !== 0) {
        console.log("logged");
        setLoggedUser(user);
      } else {
        setView("login");
      }
    };

    const handleGetUsers = async () => {
      const usersRes = await getUsers();
      if (usersRes) {
        console.log("all users: ", usersRes);
        setUsers(usersRes);
      } else {
        console.log("no users");
        // no users
      }
      // console.log("ARRAY: ", usersRes);
    };

    handleGetUsers();
    handleCheckAuthUser();
  }, []);

  // Logout user
  const handleLogout = (id) => {
    logoutUser(id);
    setLoggedUser({});
    setView("login");
  };

  // Render view for login
  const renderLoginView = () => {
    if (view === "login" && users) {
      return (
        <div>
          <Login
            setLoggedUser={setLoggedUser}
            users={users}
            setView={setView}
          />
          <SignupButton handleSignupView={handleSignupView} />
        </div>
      );
    }
  };

  // Render view for signup
  const renderSignupView = () => {
    if (view === "signup") {
      return <Signup setLoggedUser={setLoggedUser} setView={setView} />;
    }
  };

  // Render dashboard if user is logged in
  const renderDashboard = () => {
    console.log("render dashboard");
    console.log("DASH: ", loggedUser);
    if (Object.keys(loggedUser).length !== 0) {
      return <Dashboard loggedUser={loggedUser} handleLogout={handleLogout} />;
    }
  };

  return (
    <div className="App">
      {renderLoginView()}
      {renderSignupView()}
      {renderDashboard()}
    </div>
  );
}

export default App;
