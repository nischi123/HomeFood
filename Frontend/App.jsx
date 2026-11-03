import { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UserRound,
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Cart from "./Cart";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

// Food menu
const foods = [
  {
    name: "Chicken Dum Biryani",
    price: 150,
    image: "/images/ChickenDumBiryani.png",
  },
  {
    name: "Veg Dum Biryani",
    price: 130,
    image: "/images/VegDum Biryani.png",
  },
  {
    name: "Egg Biryani",
    price: 100,
    image: "/images/Egg Biryani.png",
  },
  {
    name: "Chicken FryPiece Biryani",
    price: 100,
    image: "/images/ChickenFry Piece Biryani.png",
  },
  {
    name: "Chicken65 Biryani",
    price: 300,
    image: "/images/Chicken65 Biryani.png",
  },
  {
    name: "Panner Biryani",
    price: 130,
    image: "/images/Panner Biryani.png",
  },
  {
    name: "Chicken Shawarma",
    price: 100,
    image: "/images/Chicken Shawarma.png",
  },
  {
    name: "Veg Thaali",
    price: 100,
    image: "/images/Veg thaali.png",
  },
  {
    name: "Non-Veg Thaali",
    price: 160,
    image: "/images/Nonveg thaali.png",
  },
  {
    name: "Mutton Biryani",
    price: 300,
    image: "/images/Mutton Biryani.png",
  },
];

// Food details component
function FoodDetails({
  food,
  page,
  totalPages,
  cart,
  addToCart,
  removeFromCart,
}) {
  if (!food) return null;

  const isAdded = cart.includes(food.name);

  return (
    <div className="book-food-details">
      <p className="page-number">
        FOOD MENU · {page + 1} / {totalPages}
      </p>

      <div className="page-decoration">
        ❧ ───────── ✦ ───────── ❧
      </div>

      <h2>{food.name}</h2>

      <p className="food-description">
        Freshly prepared with love and delicious ingredients.
      </p>

      <h3 className="book-price">₹{food.price}</h3>

      <button
        className={isAdded ? "remove-btn" : "add-btn"}
        onClick={() =>
          isAdded
            ? removeFromCart(food.name)
            : addToCart(food.name)
        }
      >
        {isAdded ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

// Home page
function Home({ cart, addToCart, removeFromCart }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState(false);
  const [direction, setDirection] = useState("next");
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Filter food based on search
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentFood = filteredFoods[page];

  // Clean up the page-turn timer
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // Search food
  function handleSearch(value) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;

    setSearch(value);
    setPage(0);
    setTurning(false);
  }

  // Move to another food page
  function turnPage(nextIndex) {
    if (
      turning ||
      nextIndex < 0 ||
      nextIndex >= filteredFoods.length ||
      nextIndex === page
    ) {
      return;
    }

    setDirection(nextIndex > page ? "next" : "previous");
    setTurning(true);

    timeoutRef.current = setTimeout(() => {
      setPage(nextIndex);
      setTurning(false);
      timeoutRef.current = null;
    }, 850);
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUser("");
    setShowProfile(false);
    setShowRegister(false);
  }

  // Show login or registration
  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <Register
          onShowLogin={() => setShowRegister(false)}
        />
      );
    }

    return (
      <Login
        onLogin={(username) => {
          setLoggedInUser(username);
          setIsLoggedIn(true);
        }}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  // Show profile
  if (showProfile) {
    return (
      <Profile
        onLogout={handleLogout}
        onProfileUpdated={setLoggedInUser}
      />
    );
  }

  // HomeFood page
  return (
    <div className="app">
      <header className="header">
        <h1>🍲 Home Food</h1>

        <div className="header-actions">
          <button
            className="profile-btn"
            onClick={() => setShowProfile(true)}
          >
            <UserRound size={20} />
            {loggedInUser || "Profile"}
          </button>

          <button
            className="cart"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
          </button>
        </div>
      </header>

      <section className="hero">
        <h3>Homemade Food, Made with Love ❤️</h3>
        <p>Discover delicious homemade meals near you</p>

        <input
          placeholder="Search for food..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </section>

      <section className="book-section">
        <div className="book-heading">
          <BookOpen size={28} />
          <h2>Our Food Book</h2>
        </div>

        {currentFood ? (
          <>
            <div className="food-book">
              <div className="book-spine" />

              <div className="book-spread">
                {/* LEFT PAGE: Plate and food */}
                <div className="book-left-page">
                  <div className="book-image-area food-scene" key={currentFood.name}>
                    {/* Step 1: Empty plate */}
                    <div className="food-plate">
                      <div className="plate-rim">
                        <div className="plate-center" />
                      </div>
                    </div>

                    {/* Step 2: Food appears after 1 second */}
                    <img
                      className="book-food-image animated-food"
                      src={currentFood.image}
                      alt={currentFood.name}
                    />
                    {/* Step 3: Steam appears after the food animation */}
                    <div className={`food-steam ${turning ? "steam-hidden" : ""}`}>
                      <span className="steam steam-1"></span>
                      <span className="steam steam-2"></span>
                      <span className="steam steam-3"></span>
                    </div>
                    <span className="food-tag">
                      Homemade ❤️
                    </span>
                  </div>
                </div>

                {/* RIGHT PAGE: Food details */}
                <div className="book-right-page">
                  <FoodDetails
                    food={currentFood}
                    page={page}
                    totalPages={filteredFoods.length}
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                  />
                </div>
                {/* REALISTIC PAGE-TURN ANIMATION: ADD HERE */}
                {turning && (
                  <div
                    key={`${page}-${direction}`}
                    className={`page-flip ${direction}`}
                  >
                    <div className="page-flip-front">
                      <span>🍲 Home Food</span>
                      <h2>{currentFood?.name}</h2>
                    </div>

                    <div className="page-flip-back">
                      <span>Our Food Book ❤️</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Previous button */}
              <button
                className="page-arrow left-arrow"
                onClick={() => turnPage(page - 1)}
                disabled={page === 0 || turning}
                aria-label="Previous food"
              >
                <ChevronLeft size={30} />
              </button>

              {/* Next button */}
              <button
                className="page-arrow right-arrow"
                onClick={() => turnPage(page + 1)}
                disabled={
                  page === filteredFoods.length - 1 || turning
                }
                aria-label="Next food"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            <p className="book-hint">
              <ChevronLeft size={17} />
              Turn the pages to explore our food
              <ChevronRight size={17} />
            </p>

            {/* Page indicators */}
            <div className="page-dots">
              {filteredFoods.map((food, index) => (
                <button
                  key={food.name}
                  className={
                    index === page
                      ? "page-dot active"
                      : "page-dot"
                  }
                  onClick={() => turnPage(index)}
                  disabled={turning}
                  aria-label={`Go to ${food.name}`}
                  aria-current={
                    index === page ? "page" : undefined
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <p className="no-food">
            No food items found. Try another search.
          </p>
        )}
      </section>
    </div>
  );
}

// Main application and cart state
function AppContent() {
  const [cart, setCart] = useState([]);

  function addToCart(foodName) {
    setCart((previousCart) =>
      previousCart.includes(foodName)
        ? previousCart
        : [...previousCart, foodName]
    );
  }

  function removeFromCart(foodName) {
    setCart((previousCart) =>
      previousCart.filter((name) => name !== foodName)
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            addedItems={cart}
            foods={foods}
            removeFromCart={removeFromCart}
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}