import apiClient from "../apiClient";

export const login = async function (data) {
  const response = await apiClient.post("/user/login", data);

  return response;
};

export const sign = async function (data) {
  const response = await apiClient.post("/user/signup", data);

  return response;
};

export const verifyEmail = async function (data) {
  const response = await apiClient.post("/user/verifyEmail", data);

  return response;
};

export const forgetPassword = async function (data) {
  const response = await apiClient.post("/user/forgetPassword", data);

  return response;
};

export const resetPassword = async function ({ data, token }) {
  const response = await apiClient.patch(`/user/resetPassword/${token}`, data);

  return response;
};

export const getMe = async function () {
  const response = await apiClient.get("/user/getMe");

  return response.data.data.user;
};

export const logout = async function () {
  const responce = await apiClient.get("/user/logout");

  return responce.data;
};

export async function cancelSignup(email) {
  const response = await apiClient.delete("/user/cancelSignUp", {
    data: { email }, // DELETE requests send body inside `data`
  });

  return response.data;
}

export async function updateMe(formData) {
  const response = await apiClient.patch("/user/updateMe", formData);

  return response.data;
}

export async function updateMyPassword(data) {
  const response = await apiClient.patch("/user/updatePassword", data);

  return response.data;
}

export async function deleteAccount(password) {
  const response = await apiClient.delete("/user/deleteUser", {
    data: { password },
  });

  return response.data;
}

export async function consultantBooking(data) {
  const response = await apiClient.post("/user/consultant", data);

  return response.data;
}
