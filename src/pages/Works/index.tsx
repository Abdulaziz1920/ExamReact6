import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import request from "../../server/https_request";

import "./works.scss";

interface typeWorking {
  name: string;
  description: string;
  url: string;
  photo: {
    _id: string;
    name: string;
  };
}

function Work() {
  const getData = async () => {
    const { data } = await request("portfolios?limit=12");
    return data.data;
  };

  const { data } = useQuery<typeWorking[]>("works", getData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <section>
      <Helmet>
        <title>My Works</title>
      </Helmet>
      <div className="working__cards">
        {data?.map((el) => {
          return (
            <div className="work__items" key={el.name}>
              <h2>{el.name}</h2>
              <p>{el.description}</p>
              <Link target="blank" to={el.url}>
                See more
                <i
                  className="fa-solid fa-chevron-right"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Work;
