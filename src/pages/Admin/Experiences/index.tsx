import { useEffect, useState, useCallback } from "react";

import { Modal, Form, Input, Button } from "antd";
import { Pagination } from "antd";

import request from "../../../server/https_request";
import typeExperienceAdmin from "../../../types/index";

const AdminExperiences = () => {
  const [myskills, setMyskills] = useState<typeExperienceAdmin[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const { Search } = Input;
  console.log(setPageSize);

  const getData = useCallback(async () => {
    try {
      const { data } = await request.get(
        `experiences?user=64df214c47c39400140004d9`
      );
      setMyskills(data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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
        await request.put(`experiences/${selected}`, values);
      } else {
        await request.post("skills", values);
      }
      form.resetFields();
      hideModal();
      getData();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editItems(id: string) {
    const { data } = await request.get(`experiences/${id}`);
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
      pr.workName &&
      pr.companyName.toLowerCase().includes(search.toLowerCase())
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
          await request.delete(`experiences/${id}`);
          getData();
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
          title="Add experiences"
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
              name="workName"
              label="Work Name"
              rules={[
                {
                  required: true,
                  message: "Work name is required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[
                {
                  required: true,
                  message: "Company is required",
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
              name="startDate"
              label="Start Date"
              rules={[
                {
                  required: true,
                  message: "Start Date is required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End date"
              rules={[
                {
                  required: true,
                  message: "End Date is required",
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
                  <th>Work</th>
                  <th>Company</th>
                  <th>Description</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((el) => {
                  return (
                    <>
                      <tr className="table_information">
                        <td>{el.workName}</td>
                        <td>{el.companyName} </td>
                        <td>{el.description} </td>
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

export default AdminExperiences;
