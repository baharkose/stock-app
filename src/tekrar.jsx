export const login = async (userInfo) => {
  try {
    const data = await axios.post(
      `${process.env.baseURL}/auth/login`,
      userInfo
    );

    console.log(data.data)
    
  } catch (error) {}
};
