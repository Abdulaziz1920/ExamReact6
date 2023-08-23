import { useQuery } from "react-query";
import request from "../../server/https_request";
import "./experiences.scss";
interface typeSkills {
  workName: string;
  companyName: string;
  description: string;
}

function Experiences() {
  const getData = async () => {
    const { data } = await request("experiences?user=64df214c47c39400140004d9");
    return data.data;
  };

  const { data } = useQuery<typeSkills[]>("experiences", getData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  return (
    <div>
      <section>
        <div className="experiences">
          <h1>- Experiences -</h1>
          <div className="experiences__user__information">
            <div className="rectangle">
              <img src="/rectangle.svg" alt="Rectangle" />
            </div>
            <div className="information">
              {data?.map((el) => {
                return (
                  <div className="items" key={el.workName}>
                    <h2>Work name: {el.workName}</h2>
                    <p>Company name: {el.companyName}</p>
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
