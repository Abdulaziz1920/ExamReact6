import "./contact.scss";

interface typeContact {
  img: string;
  title: string;
  link: string;
  id: number;
}

function Contact() {
  const sendMessages = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const contactUser: typeContact[] = [
    {
      img: "/github.png",
      title: "Github",
      link: "https://github.com/Abdulaziz1920",
      id: 1,
    },
    {
      img: "/instagram.png",
      title: "Instagram",
      link: "https://www.instagram.com/k.a.m_1920/",
      id: 2,
    },
    {
      img: "/telegram.png",
      title: "Telegram",
      link: "https://t.me/Liberty_47",
      id: 3,
    },
    {
      img: "/phone.png",
      title: "Telephone",
      link: "tel: +998906525678",
      id: 4,
    },
  ];
  return (
    <section>
      <div className="contact">
        <h1>- Contact -</h1>
        <div className="user__contact">
          <ul>
            {contactUser.map((el) => {
              return (
                <li key={el.id}>
                  <a target="blank" href={el.link}>
                    <img src={el.img} alt="Github" />
                    <h2>{el.title}</h2>
                  </a>
                </li>
              );
            })}
          </ul>
          <form id="form">
            <input type="text" placeholder="Your Name" />
            <input type="number" placeholder="Your Number" />
            <textarea placeholder="Messages"></textarea>
            <button onClick={sendMessages} type="submit">
              Send messages
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
