import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import request from "../../server/https_request";
import "./experiences.scss";

interface typeExperience {
  workName: string;
  companyName: string;
  description: string;
}

function Experiences() {
  const getData = async () => {
    const { data } = await request("experiences?user=64df214c47c39400140004d9");
    return data.data;
  };

  const { data } = useQuery<typeExperience[]>("experiences", getData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  return (
    <div>
      <section>
        <Helmet>
          <title>Experiences</title>
        </Helmet>
        <div className="experiences">
          <h1>Experiences</h1>
          <div className="experiences__user__information">
            <div className="rectangle">
              <img src="/rectangle.svg" alt="Rectangle" />
            </div>
            <div className="information">
              {data?.map((el) => {
                return (
                  <div className="items" key={el.workName}>
                    <p>
                      <span>Work name:</span> {el.workName}
                    </p>
                    <p>
                      <span>Company name:</span> {el.companyName}
                    </p>
                    <p>{el.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Experiences;
