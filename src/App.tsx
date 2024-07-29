import LoginPage from "./pages/login/pages/LoginPage";
import RegisterPage from "./pages/registration/pages/RegisterPage";

const App = () => {
  return (
    <>
      <div className="overflow-hidden">  
        <RegisterPage />
        <LoginPage />
      </div>
    </>
  );
};

export default App;
