import Axios from "axios";
import cookies from "js-cookie";
import { message } from "antd";

const token = cookies.get("token");
const instance = Axios.create({
  baseURL: "https://gentle-escarpment-19443.herokuapp.com/v1/",
  headers: { Authorization: `Bearer ${token}` }
});

class TableApi {
  getToken = async () => {
    cookies.remove("token");
    try {
      const { data } = await instance.post("user/auth", {
        email: "user1@email.com",
        password: "!password!"
      });
      cookies.set("token", data.access_token, { expires: 1 });
      message.success("succeessfully authenticated");
    } catch ({ response }) {
      message.error(response.data.message);
    }
  };

  getDataTable = () => {
    return instance.get("articles", {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
      params: {
        page: 1,
        "per-page": 20
      }
    });
  };

  postNewArticle = article => {
    return instance.post("articles", { ...article, status: 10 });
  };

  updateOrDeleteArticleById = (id, acrticle, status) => {
    return instance.put(`articles/${id}`, { ...acrticle, status });
  };
}

export default TableApi;
