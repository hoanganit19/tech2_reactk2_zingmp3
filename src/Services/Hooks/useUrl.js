import React from "react";

const useUrl = () => {
  const url = {
    login: "/dang-nhap",
    register: "/dang-ky",
    account: "/tai-khoan",
    categories: "/the-loai",
    getCategory: function (id) {
      return this.categories + "/" + id;
    },
    getPlaylist: function (id) {
      return `/danh-sach-phat/${id}`;
    },
  };

  return url;
};

export default useUrl;
