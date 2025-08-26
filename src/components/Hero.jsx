const Hero = ({ infos }) => {
  return (
    <section className="hero">
      <div className="container">
        <div>
          <h1>{infos.name}</h1>
          <p>{infos.description}</p>
        </div>
        <img src={infos.picture} alt="photo-entête" />
      </div>
    </section>
  );
};

export default Hero;
