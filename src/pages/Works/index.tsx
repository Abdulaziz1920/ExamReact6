import { useQuery } from "react-query";
import request from "../../server/https_request";
import "./works.scss";
// import { IMG_URL } from "../../constants";
import { Link } from "react-router-dom";

interface typeSkills {
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

  const { data } = useQuery<typeSkills[]>("works", getData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <section>
      <div className="working__cards">
        {data?.map((el) => {
          return (
            <div className="work__items" key={el.name}>
              <h2>{el.name}</h2>
              <p>{el.description}</p>
              {/* {el.photo ? (
                <img
                  id="mypostimg"
                  src={`${IMG_URL}${el.photo._id}.${
                    el.photo.name.split(".")[1]
                  }`}
                />
              ) : (
                <div>No Image Available</div>
              )} */}
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
