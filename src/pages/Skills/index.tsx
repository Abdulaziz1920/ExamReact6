import { useQuery } from "react-query";
import request from "../../server/https_request";
import "./skills.scss";

interface typeSkills {
  name: string;
  percent: number;
}

function Skills() {
  const dataset = {
    HTML5: "/public/html.svg",
    Javascript: "/public/js.png",
    CSS: "/public/css.png",
    SASS: "/public/sass.png",
    Git: "/public/git.png",
    Github: "/public/github.png",
    AJAX: "/public/ajax.png",
    React: "/public/react.png",
    RTK_Query: "/public/redux.png",
    NextJS: "/public/next.png",
    Typescript: "/public/ts.png",
    Gulp: "/public/gulpp.png",
    Webpack: "/public/webpack.png",
    TailwindCSS: "/public/tailwindcss.png",
    Bootstrap: "/public/bootstrap-logo-vector.svg",
  };

  const getData = async () => {
    const { data } = await request(
      "skills?user=64df214c47c39400140004d9&limit=50"
    );
    return data.data;
  };

  const { data } = useQuery<typeSkills[]>("skills", getData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <section>
      <div className="title">
        <h1>- My Skills -</h1>
      </div>
      <div className="skills__cards">
        {data?.map(({ name }) => (
          <div className="items" key={name}>
            <img width={114} src={dataset[name]} alt="" />
            <h2>{name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
