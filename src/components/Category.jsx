const Category = () => {
  return (
    <section className="choices container">
      <h2 key={index}>{category.name}</h2>
      <div>
        {category.meals.map((element, id) => {
          return (
            <article key={id}>
              <div>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <p>{element.price} €</p>
                {element.popular && (
                  <p>
                    <FaStar />
                    Populaire
                  </p>
                )}
              </div>
              {element.picture ? (
                <div className="photo-restaurant">
                  <img src={element.picture} alt="photo-restaurant" />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
