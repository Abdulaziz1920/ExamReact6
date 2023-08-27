import { useEffect, useState, useCallback } from "react";

import { Modal, Form, Input, Button, Progress } from "antd";
import { Pagination } from "antd";

import request from "../../../server/https_request";
import typeSkillsAdmin from "../../../types/index";

const SkillsP = () => {
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [myskills, setMyskills] = useState<typeSkillsAdmin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [form] = Form.useForm();

  console.log(setPageSize);

  const getSkills = useCallback(async () => {
    try {
      const { data } = await request.get(
        `skills?user=64df214c47c39400140004d9&limit=50`
      );
      setMyskills(data.data);
      console.log(data);
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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search"
            placeholder="Search..."
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
              <Input type="text" />
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
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
        <section className="admin">
          <div className="admin__container">
            <table className="table">
              <thead>
                <tr>
                  <th>Skill name</th>
                  <th>Knowledge percent</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTeachers?.map((el) => {
                  return (
                    <>
                      <tr className="table_information">
                        <td>{el.name}</td>
                        <td>
                          <Progress percent={el.percent} size="small" />
                        </td>
                        <td className="action">
                          <Button
                            onClick={() => editTeacher(el._id)}
                            className="tag__item"
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Button>
                          <Button
                            onClick={() => deleteTeacher(el._id)}
                            className="tag__item"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
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
