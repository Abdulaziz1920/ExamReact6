import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Pagination } from "antd";
import request from "../../../server/https_request";

interface ExpType {
  name: string;
  url: string;
  description: string;
  _id: string;
  image: string;
}

const AdminWork = () => {
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [myskills, setMyskills] = useState<ExpType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  console.log(setPageSize);
  const getSkills = useCallback(async () => {
    try {
      const { data } = await request.get(`portfolios`);
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
        await request.put(`portfolios/${selected}, values`);
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

  async function editItems(id: string) {
    const { data } = await request.get(`portfolios/${id}`);
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
      pr &&
      pr.name &&
      pr.description.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = filteredProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function deleteItems(id: string) {
    Modal.confirm({
      title: "Do you Want to delete this item?",
      onOk: async () => {
        try {
          await request.delete(`portfolios/${id}`);
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
          />
          <Button onClick={openModal}>Add</Button>
        </div>
        <Modal
          title="Add portfolios"
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
              label="Project Name"
              rules={[
                {
                  required: true,
                  message: "Project name is required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="url"
              label="Project URL"
              rules={[
                {
                  required: true,
                  message: "Project is required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: true,
                  message: "Image is required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Form>
        </Modal>
        <section className="skills">
          <div className="skills__container grid">
            {paginatedTeachers?.map((pr) => (
              <div key={pr._id} className="admin__skills">
                <div className="card-main">
                  <div className="info">
                    <div className="card-header">
                      <h1>
                        <span>Project name:</span> {pr.name}
                      </h1>
                      <p>
                        <span>Description: </span>
                        {pr.description}
                      </p>
                    </div>
                  </div>
                  <div className="main-description">
                    <Button
                      onClick={() => editItems(pr._id)}
                      className="tag__item"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Button>
                    <Button
                      onClick={() => deleteItems(pr._id)}
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

export default AdminWork;
