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
  const [counter, setCounter] = useState(0);

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
        {data.categories.map((category, index) => {
          return (
            category.meals.length > 0 && (
              <section className="category container">
                <h2 key={index}>{category.name}</h2>
                <div>
                  {category.meals.map((element, id) => {
                    return (
                      <article
                        key={id}
                        onClick={() => {
                          console.log(element);
                          const copy = [...total];
                          copy.push(element);
                          setTotal(copy);
                          setCounter(counter + 1);
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
                          <img src={element.picture} alt="photo-restaurant" />
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>
            )
          );
        })}

        <aside className="bucket">
          <button>Valider mon panier</button>
          {total.map(element => {
            return (
              <div>
                <button>-</button>
                <p>{counter}</p>
                <button>+</button>
                <p>{element.title}</p>
                <p>{element.price}</p>
              </div>
            );
          })}
        </aside>
      </main>
    </>
  );
}

export default App;
