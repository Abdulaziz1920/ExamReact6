import { useQuery } from "react-query";
import request from "../../server/https_request";
import "./education.scss";

interface typeEducation {
  name: string;
  description: string;
  level: string;
  startDate: string;
  endDate: string;
}

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
      <div className="education">
        <h1>- Education -</h1>
        <div className="education__user__information">
          <div className="rectangle">
            <img src="/rectangle.svg" alt="Rectangle" />
          </div>
          <div className="information">
            {data?.map((el) => {
              return (
                <div className="items" key={el.name}>
                  <h2>University name: {el.name}</h2>
                  <p>Level: {el.level}</p>
                  <p>Faculty: {el.description}</p>
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
