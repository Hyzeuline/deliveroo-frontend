import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState([]);

  const charge = 2.5;

  const sousTotal = total.reduce((result, item) => {
    return result + item.price * item.qty;
  }, 0);

  const finalTotal = sousTotal + charge;

  const shorteringString = str => {
    if (str.length > 80) {
      return str.slice(0, 80) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    console.log("déclenchement useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <>
      <Header />
      <Hero infos={data.restaurant} />
      <main>
        <div className="container">
          <div>
            {data.categories.map((category, index) => {
              return (
                category.meals.length > 0 && (
                  <section className="category ">
                    <h2 key={index}>{category.name}</h2>
                    <div>
                      {category.meals.map((element, id) => {
                        return (
                          <article
                            key={id}
                            onClick={() => {
                              console.log(element);
                              const copy = [...total];
                              copy.push({ ...element, qty: 1 });
                              setTotal(copy);
                            }}
                          >
                            <div>
                              <h3>{element.title}</h3>
                              <p>{shorteringString(element.description)}</p>
                              <p>{element.price} €</p>
                              {element.popular && (
                                <p className="popular">
                                  <FaStar />
                                  Populaire
                                </p>
                              )}
                            </div>
                            {element.picture ? (
                              <img
                                src={element.picture}
                                alt="photo-restaurant"
                              />
                            ) : null}
                          </article>
                        );
                      })}
                    </div>
                  </section>
                )
              );
            })}
          </div>
          <aside className="bucket">
            <button>Valider mon panier</button>
            {total.map((element, index) => {
              return (
                <div className="articleBucket" key={index}>
                  <div className="addless">
                    <button
                      onClick={() => {
                        if (element.qty > 0) {
                          const copy = [...total];
                          copy[index] = { ...element, qty: element.qty - 1 };
                          setTotal(copy);
                        }
                      }}
                    >
                      -
                    </button>
                    <p>{element.qty}</p>
                    <button
                      onClick={() => {
                        const copy = [...total];
                        copy[index] = { ...element, qty: element.qty + 1 };
                        setTotal(copy);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p>{element.title}</p>
                  <p>{element.price * element.qty}€</p>
                </div>
              );
            })}
            <div className="sous-total">
              <p>Sous-total</p>
              <div>{sousTotal}€</div>
            </div>
            <div className="charges">
              <p>Frais de livraison </p>
              <div>{charge}€</div>
            </div>
            <div className="total">
              <p>Total</p>
              <div>{finalTotal}€</div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
