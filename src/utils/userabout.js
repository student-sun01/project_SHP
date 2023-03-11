import { v4 as uuidv4 } from "uuid";
function getUserTempId() {
  // debugger;
  // 这个函数是让用户获取到唯一的标识
  // 1.先从loaclStorage当中获取
  let userTempId = localStorage.getItem("USERTEMPID_KEY");
  // 2.如果没有id，就调用uuid创建新的，并存储到localStorage
  if (!userTempId) {
    userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    localStorage.setItem("USERTEMPID_KEY", userTempId);
  }
  return userTempId;
}

export { getUserTempId };
