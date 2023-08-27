import "./main.scss";
import { Helmet } from "react-helmet";

function Main() {
  return (
    <>
      <section id="illustrations">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="main">
          <div className="main__user__about">
            <h1>Abdulaziz Allambergenov</h1>
            <h2>Frontend developer</h2>
            <p>
              Frontend developer looking for ideas and projects for himself and
              others
            </p>
          </div>
          <div className="main__user__image">
            <img src="/user.svg" alt="Abdulaziz Allambergenov" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Main;
