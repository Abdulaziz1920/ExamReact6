import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Pagination } from "antd";
import request from "../../../server/https_request";

interface typeWorkingAdmin {
  name: string;
  url: string;
  description: string;
  _id: string;
  image: string;
}

const AdminWork = () => {
  const [myskills, setMyskills] = useState<typeWorkingAdmin[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [search, setSearch] = useState("");
  const { Search } = Input;
  const [form] = Form.useForm();
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

  const data = filteredProduct.slice(
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

  const dataset: Record<string, string> = {
    ReactJs: "/src/assets/react.svg",
  };

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
        <section className="admin">
          <div className="admin__container">
            <table className="table">
              <thead>
                <tr>
                  <th>Project name</th>
                  <th>Made it</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((el) => {
                  return (
                    <>
                      <tr className="table_information">
                        <td>{el.name}</td>
                        <td>
                          <img
                            width={40}
                            src={dataset[el.description]}
                            alt=""
                          />
                        </td>
                        <td className="action">
                          <Button
                            onClick={() => editItems(el._id)}
                            className="tag__item"
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Button>
                          <Button
                            onClick={() => deleteItems(el._id)}
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

export default AdminWork;
