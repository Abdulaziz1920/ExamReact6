import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import request from "../../server/https_request";
import typeSkills from "../../types/index";

import "./skills.scss";

function Skills() {
  const dataset: Record<string, string> = {
    HTML5: "/html.svg",
    Javascript: "/js.png",
    CSS: "/css.png",
    SASS: "/sass.png",
    Git: "/git.png",
    Github: "/github.png",
    AJAX: "/ajax.png",
    React: "/react.png",
    RTK_Query: "/redux.png",
    NextJS: "/next.png",
    Typescript: "/ts.png",
    Gulp: "/gulpp.png",
    Webpack: "/webpack.png",
    TailwindCSS: "/tailwindcss.png",
    Bootstrap: "/bootstrap-logo-vector.svg",
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
      <Helmet>
        <title>Skills</title>
      </Helmet>
      <div className="title">
        <h1>My Skills</h1>
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
