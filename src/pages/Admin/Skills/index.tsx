import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Pagination } from "antd";
import request from "../../../server/https_request";
interface SkillsType {
  _id: string;
  name: string;
  percent: number;
}

const SkillsP = () => {
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [myskills, setMyskills] = useState<SkillsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  console.log(setPageSize);
  const getSkills = useCallback(async () => {
    try {
      const { data } = await request.get(
        `skills?user=64df214c47c39400140004d9`
      );
      setMyskills(data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      const values = await form.validateFields();
      if (selected) {
        await request.put(`skills/${selected}, values`);
      } else {
        await request.post("skills", values);
      }
      form.resetFields();
      hideModal();
      getSkills();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editTeacher(id: string) {
    const { data } = await request.get(`skills/${id}`);
    console.log(data);
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }

  const openModal = () => {
    showModal();
    form.resetFields();
    setSelected(null);
  };

  const filteredProduct = myskills.filter(
    (pr) =>
      pr && pr.name && pr.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = filteredProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function deleteTeacher(id: string) {
    Modal.confirm({
      title: "Do you Want to delete this post?",
      onOk: async () => {
        try {
          await request.delete(`skills/${id}`);
          getSkills();
        } catch (err) {
          console.log(err);
        }
      },
    });
  }
  return (
    <section className="slider">
      <div className="container">
        <div className="slider-paragraph" style={{ marginTop: "40px" }}>
          <Search
            placeholder="Search skills..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search"
          />
          <Button onClick={openModal}>Add</Button>
        </div>
        <Modal
          title="Add Skill"
          open={isModalOpen}
          onOk={submit}
          okText={selected ? "Save" : "Add"}
          onCancel={hideModal}
        >
          <Form
            initialValues={{
              isMarried: false,
            }}
            form={form}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="Skill"
              rules={[
                {
                  required: true,
                  message: "Skill is required",
                },
              ]}
            >
              <Input type="text" placeholder="Angular JS" />
            </Form.Item>
            <Form.Item
              name="percent"
              label="Percent"
              rules={[
                {
                  required: true,
                  message: "Percent is required",
                },
              ]}
            >
              <Input type="number" placeholder="99.9% :)" />
            </Form.Item>
          </Form>
        </Modal>
        <section className="skills">
          <div className="skills__container grid">
            {paginatedTeachers?.map((pr) => (
              <div key={pr._id} className="admin__skills">
                <div className="card-main">
                  <div className="card-header">
                    <h1><span>Skill name:</span> {pr.name}</h1>
                    <p><span>Percent:</span> {pr.percent}</p>
                  </div>
                  <div className="main-description">
                    <Button
                      onClick={() => editTeacher(pr._id)}
                      className="tag__item"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Button>
                    <Button
                      onClick={() => deleteTeacher(pr._id)}
                      className="tag__item"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div className="paganation">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProduct.length}
              showSizeChanger={false}
              onChange={handlePageChange}
              style={{ padding: "10px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsP;
