import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import request from "../../server/https_request";
import typeEducation from "../../types/index";

import "./education.scss";

function Education() {
  const getData = async () => {
    const { data } = await request("education?user=64df214c47c39400140004d9");
    return data.data;
  };

  const { data } = useQuery<typeEducation[]>("education", getData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <section>
      <Helmet>
        <title>Education</title>
      </Helmet>
      <div className="education">
        <h1>Education</h1>
        <div className="education__user__information">
          <div className="rectangle">
            <img src="/rectangle.svg" alt="Rectangle" />
          </div>
          <div className="information">
            {data?.map((el) => {
              return (
                <div className="items" key={el.name}>
                  <p>
                    <span>University name: </span>
                    <a href="https://nuu.uz/" target="_blank">
                      {el.name}
                    </a>
                  </p>
                  <p>
                    <span>Level:</span> {el.level}
                  </p>
                  <p>
                    <span>Faculty:</span> {el.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
